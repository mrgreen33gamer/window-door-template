// src/app/api/admin/leads/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MongoDB } from '&/mongodb';
import { requireAdminSession, sessionIsDemo } from '&/adminAuth';
import { ObjectId } from 'mongodb';
import { getDemoLeadDetail } from '&/demoAdminData';

// GET — single lead detail with joined journey session
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  try {
    if (sessionIsDemo(session) || String(id).startsWith('demo-')) {
      return NextResponse.json(getDemoLeadDetail(id));
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid lead ID.' }, { status: 400 });
    }

    const db = await MongoDB.getDb();
    const lead = await db.collection('Leads').findOne({ _id: new ObjectId(id) });
    if (!lead) return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });

    let journeySession = null;
    if (lead.sessionId) {
      journeySession = await db.collection('JourneySessions').findOne(
        { sessionId: lead.sessionId },
        { projection: { pages: 1, firstTouchAt: 1, lastTouchAt: 1 } }
      );
    }

    return NextResponse.json({ lead, journeySession });
  } catch (err) {
    console.error('[admin/leads/[id] GET] error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}

// PATCH — update status, notes, confirmedValue
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  try {
    // Demo is read-only for mutations (pretend success so UI works)
    if (sessionIsDemo(session) || String(id).startsWith('demo-')) {
      const body = await req.json().catch(() => ({}));
      return NextResponse.json({
        ok: true,
        demo: true,
        message: 'Demo mode — changes are not saved.',
        applied: body,
      });
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid lead ID.' }, { status: 400 });
    }

    const body = await req.json();
    const allowed = ['status', 'adminNotes', 'confirmedValue'] as const;
    const updates: Record<string, unknown> = {};

    for (const key of allowed) {
      if (key in body) {
        updates[key] = body[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update.' }, { status: 400 });
    }

    if (updates.status) {
      updates.statusUpdatedAt = new Date();
    }

    const db = await MongoDB.getDb();
    const result = await db.collection('Leads').updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/leads/[id] PATCH] error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
