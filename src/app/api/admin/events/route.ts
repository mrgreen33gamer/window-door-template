// src/app/api/admin/events/route.ts
// FIX8:
//  - topElements now groups by { label, page, section } so component column is available
//  - section returned in topElements results
// FIX9:
//  - Added 'form_submit' to INTERACTION_TYPES so form submissions appear in
//    topElements, eventsByType breakdown, and clicksByHour heatmap.
import { NextRequest, NextResponse } from 'next/server';
import { MongoDB } from '&/mongodb';
import { requireAdminSession } from '&/adminAuth';

function getRangeDate(range: string): Date | null {
  const days: Record<string, number> = { '7d': 7, '30d': 30, '90d': 90 };
  const d = days[range];
  if (!d) return null;
  const date = new Date();
  date.setDate(date.getDate() - d);
  return date;
}

export async function GET(req: NextRequest) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const range     = req.nextUrl.searchParams.get('range') ?? '30d';
    const sinceDate = getRangeDate(range);
    const db        = await MongoDB.getDb();

    const filter: Record<string, any> = sinceDate
      ? { timestamp: { $gte: sinceDate } }
      : {};

    // form_submit added — lets the dashboard surface which forms are converting
    const INTERACTION_TYPES = ['click', 'phone_click', 'email_click', 'view', 'form_submit'];

    // Click-type events used for the hour heatmap (intentional actions, not views)
    const CLICK_TYPES = ['click', 'phone_click', 'email_click', 'form_submit'];

    const [
      topElements,
      eventsByType,
      eventsByPage,
      clicksByHour,
    ] = await Promise.all([
      // Top clicked elements — grouped by label + page + section so we can show component
      db.collection('Events').aggregate([
        { $match: { ...filter, eventType: { $in: INTERACTION_TYPES } } },
        { $group: {
          _id:   { label: '$elementLabel', page: '$page', section: '$section' },
          count: { $sum: 1 },
        }},
        { $sort: { count: -1 } },
        { $limit: 20 },
        { $project: {
          label:   '$_id.label',
          page:    '$_id.page',
          section: '$_id.section',
          count:   1,
          _id:     0,
        }},
      ]).toArray(),

      // Events by type (all types — no filter, so new types appear automatically)
      db.collection('Events').aggregate([
        { $match: filter },
        { $group: { _id: '$eventType', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $project: { type: '$_id', count: 1, _id: 0 } },
      ]).toArray(),

      // Events by page (top 15)
      db.collection('Events').aggregate([
        { $match: filter },
        { $group: { _id: '$page', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 15 },
        { $project: { page: '$_id', count: 1, _id: 0 } },
      ]).toArray(),

      // Intentional actions by hour of day (includes form_submit)
      db.collection('Events').aggregate([
        { $match: { ...filter, eventType: { $in: CLICK_TYPES } } },
        { $group: { _id: { $hour: '$timestamp' }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
        { $project: { hour: '$_id', count: 1, _id: 0 } },
      ]).toArray(),
    ]);

    return NextResponse.json({ topElements, eventsByType, eventsByPage, clicksByHour });
  } catch (err) {
    console.error('[admin/events] error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}