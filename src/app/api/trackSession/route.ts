// src/app/api/trackSession/route.ts
//
// FIXED: Removed sectionsTracked — that was old scroll-section data no longer used.
// Now only stores: sessionId, deviceType, operatingSystem, browserType, ip, city, timestamp.
//
// AUDIT FIX: Wired up from <Analytics /> to fire once per session.
//   - Switched plain insertOne → upsert keyed on sessionId. Defense in depth:
//     even if the client-side `sa_session_tracked` flag is bypassed (multi-tab
//     race, incognito edge case, intentional storage clear mid-session, etc.),
//     we'll still only ever have one SessionTracking row per sessionId.
//   - $setOnInsert preserves the original firstSeenAt / ip / city so they
//     reflect the session's first touch, not subsequent retries.
//   - $set updates lastSeenAt + the latest UA fields on every hit, so the
//     row stays useful for diagnosing devices/networks that change mid-session.
//   - Skips admin / api / _next paths via referer header (parity with the
//     other /api/track* routes — third layer of admin exclusion).
import { NextRequest, NextResponse } from 'next/server';
import { MongoDB } from '&/mongodb';
import { getClientIP, getCityFromIP } from '&/geoIpProvider';

export async function POST(request: NextRequest) {
  try {
    const { sessionId, deviceType, operatingSystem, browserType } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ success: false, reason: 'Missing sessionId' });
    }

    // Skip admin/api/_next pages (defense in depth — Analytics.tsx already skips,
    // but a future caller might forget). The referer header reflects the page
    // the request was fired from.
    const referer = request.headers.get('referer') ?? '';
    try {
      if (referer) {
        const refPath = new URL(referer).pathname;
        if (
          refPath.startsWith('/admin') ||
          refPath.startsWith('/api')   ||
          refPath.startsWith('/_next')
        ) {
          return NextResponse.json({ success: true, skipped: 'admin' });
        }
      }
    } catch {
      // Malformed referer — fall through and process the request normally.
    }

    const ip        = getClientIP(request);
    const isDevTest = ip === 'Unknown' || ip.startsWith('127.') || ip === '::1'
                    || request.headers.get('x-developer-test') === 'true';

    const db   = await MongoDB.getDb();
    const city = await getCityFromIP(ip);

    const now = new Date();

    // Upsert keyed on sessionId — see header comment for rationale.
    await db.collection('SessionTracking').updateOne(
      { sessionId },
      {
        $setOnInsert: {
          sessionId,
          firstSeenAt: now,
          // Pin first-touch ip/city to the original. If a user roams networks
          // mid-session we keep the original entry-point geo intact; the
          // updated geo lives under last* fields below.
          firstIp:     ip,
          firstCity:   city,
          isDevTest,
        },
        $set: {
          lastSeenAt:      now,
          lastIp:          ip,
          lastCity:        city,
          deviceType:      deviceType      ?? 'Unknown',
          operatingSystem: operatingSystem ?? 'Unknown',
          browserType:     browserType     ?? 'Unknown',
          // Legacy fields kept on $set so existing admin queries that read
          // these top-level keys continue to work without a migration.
          ip,
          city,
          timestamp:       now,
        },
      },
      { upsert: true },
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[trackSession] error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}