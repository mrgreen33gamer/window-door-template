// src/app/api/admin/analytics/route.ts
// FIXED:
//  - isDevTest leads NOW SHOWN in dashboard (flagged but included) so localhost
//    testing actually shows data. They appear with a DEV badge.
//  - Funnel simplified: Sessions → Page Views → CTA Clicks → Leads
//  - form_open removed from funnel (that event type is retired)
//  - pageViewsByCity added for Overview map
//  - leadsByCity enriched with lat/lng for Leads map
import { NextRequest, NextResponse } from 'next/server';
import { MongoDB } from '&/mongodb';
import { requireAdminSession } from '&/adminAuth';

function getRangeDate(range: string): Date | null {
  const days: Record<string, number> = { '7d': 7, '14d': 14, '30d': 30, '49d': 49, '90d': 90 };
  if (!days[range]) return null;
  const d = new Date();
  d.setDate(d.getDate() - days[range]);
  return d;
}

const TX_COORDS: Record<string, [number, number]> = {
  'Waco':           [-97.1467, 31.5493],
  'Hewitt':         [-97.1958, 31.4604],
  'Robinson':       [-97.1197, 31.4638],
  'Woodway':        [-97.2197, 31.5110],
  'China Spring':   [-97.3128, 31.6613],
  'Valley Mills':   [-97.4718, 31.6571],
  'Hillsboro':      [-97.1272, 32.0098],
  'Temple':         [-97.3427, 31.0982],
  'Killeen':        [-97.7278, 31.1171],
  'Belton':         [-97.4641, 31.0560],
  'Georgetown':     [-97.6772, 30.6327],
  'Round Rock':     [-97.6789, 30.5083],
  'Austin':         [-97.7431, 30.2672],
  'Dallas':         [-96.7970, 32.7767],
  'Fort Worth':     [-97.3208, 32.7555],
  'Houston':        [-95.3698, 29.7604],
  'San Antonio':    [-98.4936, 29.4241],
  'Lubbock':        [-101.8552, 33.5779],
  'Amarillo':       [-101.8313, 35.2220],
  'Abilene':        [-99.7331, 32.4487],
  'El Paso':        [-106.4850, 31.7619],
  'Corpus Christi': [-97.3964, 27.8006],
  'Denton':         [-97.1331, 33.2148],
  'Plano':          [-96.6989, 33.0198],
  'Arlington':      [-97.1081, 32.7357],
  'Waxahachie':     [-96.8467, 32.3868],
  'Corsicana':      [-96.4689, 32.0954],
  'Gatesville':     [-97.7445, 31.4351],
  'Ross':           [-97.2933, 31.7115],
  'Lacy Lakeview':  [-97.1175, 31.6049],
  'Midland':        [-102.0779, 31.9973],
  'Odessa':         [-102.3677, 31.8457],
  'Wichita Falls':  [-98.4934, 33.9137],
  'Tyler':          [-95.3010, 32.3513],
  'Laredo':         [-99.5075, 27.5306],
  'McAllen':        [-98.2300, 26.2034],
  'Brownsville':    [-97.4975, 25.9017],
};

function getCoordsForCity(city: string): [number, number] | null {
  if (TX_COORDS[city]) return TX_COORDS[city];
  const key = Object.keys(TX_COORDS).find(k => k.toLowerCase() === city.toLowerCase());
  return key ? TX_COORDS[key] : null;
}

export async function GET(req: NextRequest) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const range     = req.nextUrl.searchParams.get('range') ?? '30d';
    const sinceDate = getRangeDate(range);
    const db        = await MongoDB.getDb();

    // FIXED: Include ALL leads (including isDevTest) so localhost testing shows data.
    // The dashboard shows a DEV badge on test entries.
    const dateFilter = sinceDate
      ? { submittedAt: { $gte: sinceDate } }
      : {};

    const pvFilter = sinceDate ? { timestamp: { $gte: sinceDate } } : {};
    const evFilter = sinceDate ? { timestamp: { $gte: sinceDate } } : {};

    const [
      totalLeads,
      leadsThisPeriod,
      devLeadsThisPeriod,
      uniqueSessions,
      leadsByDay,
      leadsByService,
      leadsByCity,
      topJourneyPaths,
      deviceBreakdown,
      statusBreakdown,
      funnelPageViews,
      funnelCtaClicks,
      pageViewsByCity,
    ] = await Promise.all([
      // Total leads all time (ALL including dev)
      db.collection('Leads').countDocuments({}),

      // Leads this period (ALL)
      db.collection('Leads').countDocuments(dateFilter),

      // How many are dev test this period
      db.collection('Leads').countDocuments({ ...dateFilter, isDevTest: true }),

      // Unique sessions
      db.collection('PageViews').distinct('sessionId', pvFilter).then(ids => ids.filter(Boolean).length),

      // Leads per day
      db.collection('Leads').aggregate([
        { $match: dateFilter },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$submittedAt' } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
        { $project: { date: '$_id', count: 1, _id: 0 } },
      ]).toArray(),

      // Leads by service
      db.collection('Leads').aggregate([
        { $match: dateFilter },
        { $unwind: { path: '$services', preserveNullAndEmptyArrays: false } },
        { $group: { _id: '$services', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
        { $project: { service: '$_id', count: 1, _id: 0 } },
      ]).toArray(),

      // Leads by city
      db.collection('Leads').aggregate([
        { $match: { ...dateFilter, ipCity: { $nin: ['Unknown', null, ''] } } },
        { $group: { _id: '$ipCity', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 50 },
        { $project: { city: '$_id', count: 1, _id: 0 } },
      ]).toArray(),

      // Top journey paths (only from non-dev leads with journey data)
      db.collection('Leads').aggregate([
        { $match: { ...dateFilter, isDevTest: { $ne: true }, journeyPath: { $exists: true, $not: { $size: 0 } } } },
        { $group: { _id: '$journeyPath', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
        { $project: { path: '$_id', count: 1, _id: 0 } },
      ]).toArray(),

      // Device breakdown
      db.collection('Leads').aggregate([
        { $match: dateFilter },
        { $group: { _id: { $toLower: { $ifNull: ['$deviceType', 'desktop'] } }, count: { $sum: 1 } } },
        { $project: { device: '$_id', count: 1, _id: 0 } },
      ]).toArray(),

      // Status breakdown (all leads)
      db.collection('Leads').aggregate([
        { $match: {} },
        { $group: { _id: { $ifNull: ['$status', 'new'] }, count: { $sum: 1 } } },
        { $project: { status: '$_id', count: 1, _id: 0 } },
      ]).toArray(),

      // Funnel: page views
      db.collection('PageViews').countDocuments(pvFilter),

      // Funnel: CTA clicks (click + phone_click + email_click)
      db.collection('Events').countDocuments({
        ...evFilter,
        eventType: { $in: ['click', 'phone_click', 'email_click'] },
      }),

      // Page view locations for Overview map
      db.collection('PageViews').aggregate([
        { $match: { ...pvFilter, city: { $nin: ['Unknown', null, ''] } } },
        { $group: { _id: '$city', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 100 },
        { $project: { city: '$_id', count: 1, _id: 0 } },
      ]).toArray(),
    ]);

    // Top converting page
    const topPageResult = await db.collection('Leads').aggregate([
      { $match: { ...dateFilter, isDevTest: { $ne: true }, lastTouchSource: { $exists: true, $ne: null } } },
      { $group: { _id: '$lastTouchSource', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]).toArray();

    const topConvertingPage = topPageResult[0]?._id ?? 'N/A';

    const realLeads       = leadsThisPeriod - devLeadsThisPeriod;
    const conversionRate  = uniqueSessions > 0
      ? ((realLeads / uniqueSessions) * 100).toFixed(1)
      : '0.0';

    const avgJourneyResult = await db.collection('Leads').aggregate([
      { $match: { ...dateFilter, isDevTest: { $ne: true }, journeyLength: { $gt: 0 } } },
      { $group: { _id: null, avg: { $avg: '$journeyLength' } } },
    ]).toArray();

    const avgJourneyLength = avgJourneyResult[0]?.avg?.toFixed(1) ?? '0';

    // Enrich with coords
    const leadsByCityWithCoords = (leadsByCity as any[]).map(item => {
      const coords = getCoordsForCity(item.city);
      return { ...item, lng: coords?.[0] ?? null, lat: coords?.[1] ?? null };
    }).filter(item => item.lat && item.lng);

    const pageViewsByCityWithCoords = (pageViewsByCity as any[]).map(item => {
      const coords = getCoordsForCity(item.city);
      return { ...item, lng: coords?.[0] ?? null, lat: coords?.[1] ?? null };
    }).filter(item => item.lat && item.lng);

    return NextResponse.json({
      totalLeads,
      leadsThisPeriod,
      devLeadsThisPeriod,
      uniqueSessions,
      conversionRate:    `${conversionRate}%`,
      avgJourneyLength,
      topConvertingPage,
      leadsByDay,
      leadsByService,
      leadsByCity:       leadsByCityWithCoords,
      pageViewsByCity:   pageViewsByCityWithCoords,
      topJourneyPaths,
      deviceBreakdown,
      statusBreakdown,
      funnel: {
        sessions:    uniqueSessions,
        pageViews:   funnelPageViews,
        ctaClicks:   funnelCtaClicks,
        submissions: leadsThisPeriod,
      },
    });
  } catch (err) {
    console.error('[admin/analytics] error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
