// src/app/api/trackJourney/route.ts
// FIXED: Skips admin + api + _next paths, robust upsert
import { NextRequest, NextResponse } from 'next/server';
import { MongoDB } from '&/mongodb';
import { getClientIP } from '&/geoIpProvider';
import { UAParser } from 'ua-parser-js';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, path } = await req.json();

    if (!sessionId || !path) {
      return NextResponse.json({ ok: false });
    }

    // Skip non-page routes
    if (
      path.startsWith('/admin') ||
      path.startsWith('/api')   ||
      path.startsWith('/_next')
    ) {
      return NextResponse.json({ ok: true });
    }

    const ip      = getClientIP(req);
    const isDevTest = ip === 'Unknown' || ip.includes('127.0.0.1') || ip.includes('::1')
                    || req.headers.get('x-developer-test') === 'true';

    const ua     = req.headers.get('user-agent') ?? 'Unknown';
    const parser = new UAParser(ua);
    const device = parser.getDevice().type ?? 'desktop';

    const now = new Date();
    const db  = await MongoDB.getDb();

    await db.collection('JourneySessions').updateOne(
      { sessionId },
      {
        $push:        { pages: path } as any,
        $set:         { lastTouchAt: now, ip, deviceType: device, isDevTest },
        $setOnInsert: { sessionId, firstTouchAt: now, converted: false, leadId: null },
      },
      { upsert: true },
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[trackJourney] error:', err);
    return NextResponse.json({ ok: false });
  }
}
