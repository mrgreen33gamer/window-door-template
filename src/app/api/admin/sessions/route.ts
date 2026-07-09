// src/app/api/admin/sessions/route.ts
// FIXED: Complete sessions analytics endpoint — browser, device, top pages, page views per day
import { NextResponse } from 'next/server';
import { MongoDB } from '&/mongodb';
import { requireAdminSession } from '&/adminAuth';

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const db = await MongoDB.getDb();

    // Last 30 days
    const since = new Date();
    since.setDate(since.getDate() - 30);
    const pvFilter = { timestamp: { $gte: since } };

    const [
      totalPageViews,
      uniqueSessionIds,
      deviceBreakdown,
      browserBreakdown,
      topPages,
      pageViewsByDay,
    ] = await Promise.all([
      // Total page views (30d)
      db.collection('PageViews').countDocuments(pvFilter),

      // Unique session IDs
      db.collection('PageViews').distinct('sessionId', pvFilter),

      // Device breakdown
      db.collection('PageViews').aggregate([
        { $match: pvFilter },
        { $group: { _id: { $toLower: '$deviceType' }, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $project: { device: { $ifNull: ['$_id', 'desktop'] }, count: 1, _id: 0 } },
      ]).toArray(),

      // Browser breakdown
      db.collection('PageViews').aggregate([
        { $match: pvFilter },
        { $group: { _id: '$browser', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
        { $project: { browser: { $ifNull: ['$_id', 'Unknown'] }, count: 1, _id: 0 } },
      ]).toArray(),

      // Top pages by views
      db.collection('PageViews').aggregate([
        { $match: pvFilter },
        { $group: { _id: '$path', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 20 },
        { $project: { path: '$_id', count: 1, _id: 0 } },
      ]).toArray(),

      // Page views per day
      db.collection('PageViews').aggregate([
        { $match: pvFilter },
        { $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          count: { $sum: 1 },
        }},
        { $sort: { _id: 1 } },
        { $project: { date: '$_id', count: 1, _id: 0 } },
      ]).toArray(),
    ]);

    return NextResponse.json({
      totalPageViews,
      uniqueSessions:   uniqueSessionIds.filter(Boolean).length,
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
