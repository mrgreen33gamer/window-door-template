// src/app/api/trackEvent/route.ts
// FIXED:
//  - Removed 'form_open' event type (that concept is retired)
//  - Valid types: click, phone_click, email_click, view, form_submit
//  - 'form_submit' added so Variant1–4 and the contact page can record successful submissions
//  - isDevTest leads are stored but flagged — no longer silently dropped
import { NextRequest, NextResponse } from 'next/server';
import { MongoDB } from '&/mongodb';
import { getClientIP } from '&/geoIpProvider';
import { UAParser } from 'ua-parser-js';

const VALID_TYPES = new Set(['click', 'phone_click', 'email_click', 'view', 'form_submit']);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, eventType, elementLabel, page, section, serviceType, cityName } = body;

    if (!eventType || !elementLabel || !page) {
      return NextResponse.json({ ok: false, reason: 'Missing required fields' });
    }

    if (!VALID_TYPES.has(eventType)) {
      return NextResponse.json({ ok: false, reason: 'Invalid event type' });
    }

    // Skip admin and internal paths
    if (page.startsWith('/admin') || page.startsWith('/_next') || page.startsWith('/api')) {
      return NextResponse.json({ ok: true });
    }

    const ip        = getClientIP(req);
    const isDevTest = ip === 'Unknown' || ip.startsWith('127.') || ip === '::1'
                    || req.headers.get('x-developer-test') === 'true';

    const ua     = req.headers.get('user-agent') ?? 'Unknown';
    const parser = new UAParser(ua);
    const device = parser.getDevice().type ?? 'desktop';

    const db = await MongoDB.getDb();
    await db.collection('Events').insertOne({
      sessionId:   sessionId ?? null,
      eventType,
      elementLabel,
      page,
      section:     section     ?? 'Unknown',
      serviceType: serviceType ?? null,
      cityName:    cityName    ?? null,
      ip,
      deviceType:  device,
      isDevTest,
      timestamp:   new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[trackEvent] error:', err);
    return NextResponse.json({ ok: false });
  }
}