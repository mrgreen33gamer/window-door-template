// src/app/api/trackConsent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const MONGODB_URI   = process.env.MONGODB_URI!;
const DATABASE_NAME = process.env.DATABASE_NAME ?? 'scottapplicationsllc';

let _client: MongoClient | null = null;
async function getClient() {
  if (!_client) {
    _client = new MongoClient(MONGODB_URI);
    await _client.connect();
  }
  return _client;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      consent,
      consentLevel,
      deviceType,
      operatingSystem,
      browserType,
      referrer,
      timestamp,
      url,
    } = body;

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      ?? req.headers.get('x-real-ip')
      ?? 'unknown';

    const client = await getClient();
    await client.db(DATABASE_NAME).collection('cookie_consents').insertOne({
      consent:         !!consent,
      consentLevel:    consentLevel ?? (consent ? 'full' : 'declined'),
      deviceType:      deviceType      ?? 'unknown',
      operatingSystem: operatingSystem ?? 'unknown',
      browserType:     browserType     ?? 'unknown',
      referrer:        referrer        ?? null,
      url:             url             ?? null,
      ip,
      createdAt: timestamp ? new Date(timestamp) : new Date(),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('[trackConsent] error:', err);
    // Return 200 so the client never shows an error for a non-critical call
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}