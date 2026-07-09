// src/app/api/newsletter-signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const MONGODB_URI  = process.env.MONGODB_URI!;
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
    const { email, spot, variant } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: 'A valid email address is required.' }, { status: 400 });
    }

    const client = await getClient();
    const db     = client.db(DATABASE_NAME);
    const col    = db.collection('newsletter_subscribers');

    // Upsert so the same email doesn't appear twice
    await col.updateOne(
      { email: email.toLowerCase() },
      {
        $setOnInsert: { email: email.toLowerCase(), createdAt: new Date() },
        $set: { lastSpot: spot ?? 'unknown', lastVariant: variant ?? 1, updatedAt: new Date() },
        $addToSet: { spots: spot ?? 'unknown' },
      },
      { upsert: true },
    );

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('[newsletter-signup] error:', err);
    return NextResponse.json({ message: 'Server error. Please try again.' }, { status: 500 });
  }
}