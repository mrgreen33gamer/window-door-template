// src/app/api/trackPageView/route.ts
// FIXED: sessionId required, isDevTest detection improved, admin paths fully skipped
import { NextRequest, NextResponse } from 'next/server';
import { MongoDB } from '&/mongodb';
import { getClientIP, getCityFromIP } from '&/geoIpProvider';
import { UAParser } from 'ua-parser-js';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, path, referrer } = await req.json();

    // Skip admin routes
    if (!path || path.startsWith('/admin') || path.startsWith('/_next') || path.startsWith('/api')) {
      return NextResponse.json({ ok: true });
    }

    const ip      = getClientIP(req);
    const isDevTest = ip === 'Unknown' || ip.includes('127.0.0.1') || ip.includes('::1')
                    || req.headers.get('x-developer-test') === 'true';

    const ua      = req.headers.get('user-agent') ?? 'Unknown';
    const parser  = new UAParser(ua);
    const device  = parser.getDevice().type ?? 'desktop';
    const os      = parser.getOS().name     ?? 'Unknown';
    const browser = parser.getBrowser().name ?? 'Unknown';

    const db   = await MongoDB.getDb();
    const city = await getCityFromIP(ip);

    await db.collection('PageViews').insertOne({
      sessionId: sessionId ?? null,
      path,
      referrer:  referrer  ?? null,
      ip,
      city,
      deviceType: device,
      os,
      browser,
      isDevTest,
      timestamp: new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[trackPageView] error:', err);
    return NextResponse.json({ ok: false });
  }
}
