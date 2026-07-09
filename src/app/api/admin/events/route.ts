// src/app/api/admin/events/route.ts
// Range-aware event analytics including 24h.
import { NextRequest, NextResponse } from 'next/server';
import { MongoDB } from '&/mongodb';
import { requireAdminSession, sessionIsDemo } from '&/adminAuth';
import { getRangeDate } from '&/adminRange';
import { getDemoEvents } from '&/demoAdminData';

export async function GET(req: NextRequest) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const range     = req.nextUrl.searchParams.get('range') ?? '30d';
    const sinceDate = getRangeDate(range);
    if (!sinceDate) {
      return NextResponse.json({ error: 'Invalid range. Use 24h, 7d, 14d, 30d, 49d, or 90d.' }, { status: 400 });
    }

    if (sessionIsDemo(session)) {
      return NextResponse.json(getDemoEvents(range));
    }

    const db     = await MongoDB.getDb();
    const filter = { timestamp: { $gte: sinceDate } };

    const INTERACTION_TYPES = ['click', 'phone_click', 'email_click', 'view', 'form_submit'];
    const CLICK_TYPES       = ['click', 'phone_click', 'email_click', 'form_submit'];

    const [topElements, eventsByType, eventsByPage, clicksByHour] = await Promise.all([
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

      db.collection('Events').aggregate([
        { $match: filter },
        { $group: { _id: '$eventType', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $project: { type: '$_id', count: 1, _id: 0 } },
      ]).toArray(),

      db.collection('Events').aggregate([
        { $match: filter },
        { $group: { _id: '$page', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 15 },
        { $project: { page: '$_id', count: 1, _id: 0 } },
      ]).toArray(),

      // Hour-of-day distribution within the selected window
      db.collection('Events').aggregate([
        { $match: { ...filter, eventType: { $in: CLICK_TYPES } } },
        { $group: { _id: { $hour: '$timestamp' }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
        { $project: { hour: '$_id', count: 1, _id: 0 } },
      ]).toArray(),
    ]);

    // Ensure all 24 hours exist for accurate heatmap
    const hourMap = new Map((clicksByHour as { hour: number; count: number }[]).map(h => [h.hour, h.count]));
    const clicksByHourFilled = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      count: hourMap.get(hour) ?? 0,
    }));

    return NextResponse.json({
      range,
      since: sinceDate.toISOString(),
      topElements,
      eventsByType,
      eventsByPage,
      clicksByHour: clicksByHourFilled,
    });
  } catch (err) {
    console.error('[admin/events] error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
