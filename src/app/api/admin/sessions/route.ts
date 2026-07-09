// src/app/api/admin/sessions/route.ts
// Range-aware page-view analytics. Supports 24h hourly + multi-day series.
import { NextRequest, NextResponse } from 'next/server';
import { MongoDB } from '&/mongodb';
import { requireAdminSession, sessionIsDemo } from '&/adminAuth';
import { fillSeries, getRangeDate, seriesDateFormat, type SeriesPoint } from '&/adminRange';
import { getDemoSessions } from '&/demoAdminData';

export async function GET(req: NextRequest) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const range = req.nextUrl.searchParams.get('range') ?? '30d';
    const since = getRangeDate(range);
    if (!since) {
      return NextResponse.json({ error: 'Invalid range. Use 24h, 7d, 14d, 30d, 49d, or 90d.' }, { status: 400 });
    }

    if (sessionIsDemo(session)) {
      return NextResponse.json(getDemoSessions(range));
    }

    const db         = await MongoDB.getDb();
    const pvFilter   = { timestamp: { $gte: since } };
    const dateFormat = seriesDateFormat(range);

    const [
      totalPageViews,
      uniqueSessionIds,
      deviceBreakdown,
      browserBreakdown,
      topPages,
      pageViewsByDayRaw,
    ] = await Promise.all([
      db.collection('PageViews').countDocuments(pvFilter),
      db.collection('PageViews').distinct('sessionId', pvFilter),

      db.collection('PageViews').aggregate([
        { $match: pvFilter },
        { $group: { _id: { $toLower: { $ifNull: ['$deviceType', 'desktop'] } }, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $project: { device: '$_id', count: 1, _id: 0 } },
      ]).toArray(),

      db.collection('PageViews').aggregate([
        { $match: pvFilter },
        { $group: { _id: '$browser', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
        { $project: { browser: { $ifNull: ['$_id', 'Unknown'] }, count: 1, _id: 0 } },
      ]).toArray(),

      db.collection('PageViews').aggregate([
        { $match: pvFilter },
        { $group: { _id: '$path', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 20 },
        { $project: { path: '$_id', count: 1, _id: 0 } },
      ]).toArray(),

      db.collection('PageViews').aggregate([
        { $match: pvFilter },
        { $group: {
          _id:   { $dateToString: { format: dateFormat, date: '$timestamp' } },
          count: { $sum: 1 },
        }},
        { $sort: { _id: 1 } },
        { $project: { date: '$_id', count: 1, _id: 0 } },
      ]).toArray(),
    ]);

    const pageViewsByDay = fillSeries(range, since, pageViewsByDayRaw as SeriesPoint[]);

    return NextResponse.json({
      range,
      since: since.toISOString(),
      totalPageViews,
      uniqueSessions: uniqueSessionIds.filter(Boolean).length,
      deviceBreakdown,
      browserBreakdown,
      topPages,
      pageViewsByDay,
    });
  } catch (err) {
    console.error('[admin/sessions] error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
