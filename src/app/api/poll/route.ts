// src/app/api/poll/route.ts
//
// GET  /api/poll?pollId=<id>            → returns current tally
// POST /api/poll                        → { pollId, option } → casts vote + returns new tally
//
// Cookie-based dedup: if the user already voted we return their choice + tally
// without incrementing again.

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

// ── GET — fetch current results ───────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const pollId = req.nextUrl.searchParams.get('pollId');
  if (!pollId) {
    return NextResponse.json({ message: 'pollId is required.' }, { status: 400 });
  }

  try {
    const client = await getClient();
    const poll   = await client.db(DATABASE_NAME).collection('polls').findOne({ pollId });
    if (!poll) {
      return NextResponse.json({ votes: {}, total: 0 });
    }
    const { votes = {} } = poll;
    const total = Object.values(votes as Record<string, number>).reduce((a, b) => a + b, 0);
    return NextResponse.json({ votes, total });
  } catch (err) {
    console.error('[poll GET] error:', err);
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
}

// ── POST — cast a vote ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { pollId, option } = await req.json();

    if (!pollId || !option) {
      return NextResponse.json({ message: 'pollId and option are required.' }, { status: 400 });
    }

    // Check dedup cookie
    const cookieName  = `voted_${pollId}`;
    const existingVote = req.cookies.get(cookieName)?.value;

    const client = await getClient();
    const db     = client.db(DATABASE_NAME);
    const col    = db.collection('polls');

    if (!existingVote) {
      // Cast new vote
      await col.updateOne(
        { pollId },
        {
          $inc: { [`votes.${option}`]: 1 },
          $set: { updatedAt: new Date() },
          $setOnInsert: { pollId, createdAt: new Date() },
        },
        { upsert: true },
      );
    }

    // Fetch updated tally
    const poll  = await col.findOne({ pollId });
    const votes = poll?.votes ?? {};
    const total = Object.values(votes as Record<string, number>).reduce((a, b) => a + b, 0);

    const res = NextResponse.json({
      ok: true,
      alreadyVoted: !!existingVote,
      yourVote: existingVote ?? option,
      votes,
      total,
    });

    // Set dedup cookie (30 days, HTTP-only)
    if (!existingVote) {
      res.cookies.set(cookieName, option, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
        sameSite: 'lax',
      });
    }

    return res;
  } catch (err) {
    console.error('[poll POST] error:', err);
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
}