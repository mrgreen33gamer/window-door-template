// src/app/api/admin/leads/route.ts
// FIX10: Fixed MongoServerError code 28811 —
//   $unwind option was `preserveNullAndEmpty` (invalid).
//   Correct field name is `preserveNullAndEmptyArrays`.
import { NextRequest, NextResponse } from 'next/server';
import { MongoDB } from '&/mongodb';
import { requireAdminSession } from '&/adminAuth';

const TX_COORDS: Record<string, [number, number]> = {
  'Waco': [-97.1467, 31.5493], 'Hewitt': [-97.1958, 31.4604],
  'Robinson': [-97.1197, 31.4638], 'Woodway': [-97.2197, 31.5110],
  'China Spring': [-97.3128, 31.6613], 'Temple': [-97.3427, 31.0982],
  'Killeen': [-97.7278, 31.1171], 'Austin': [-97.7431, 30.2672],
  'Dallas': [-96.7970, 32.7767], 'Houston': [-95.3698, 29.7604],
  'San Antonio': [-98.4936, 29.4241], 'Fort Worth': [-97.3208, 32.7555],
};

function getCoords(city: string): { lat: number; lng: number } | null {
  const entry = TX_COORDS[city]
    ?? TX_COORDS[Object.keys(TX_COORDS).find(k => k.toLowerCase() === city?.toLowerCase()) ?? ''];
  return entry ? { lng: entry[0], lat: entry[1] } : null;
}

export async function GET(req: NextRequest) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = req.nextUrl;
    const page    = Math.max(1, Number(searchParams.get('page')  ?? 1));
    const limit   = Math.min(100, Math.max(1, Number(searchParams.get('limit') ?? 20)));
    const status  = searchParams.get('status')  ?? '';
    const service = searchParams.get('service') ?? '';
    const search  = searchParams.get('search')  ?? '';
    const sort    = searchParams.get('sort')    ?? 'submittedAt';
    const dir     = searchParams.get('dir')     === 'asc' ? 1 : -1;

    const db     = await MongoDB.getDb();
    const filter: Record<string, any> = {};
    // ✅ NO isDevTest filter — all leads shown, dev entries get a DEV badge

    if (status)  filter.status   = status;
    if (service) filter.services = { $elemMatch: { $regex: service, $options: 'i' } };
    if (search) {
      filter.$or = [
        { name:    { $regex: search, $options: 'i' } },
        { email:   { $regex: search, $options: 'i' } },
        { ipCity:  { $regex: search, $options: 'i' } },
        { phone:   { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    const allowedSortFields = ['submittedAt', 'name', 'status', 'ipCity', 'journeyLength'];
    const sortField = allowedSortFields.includes(sort) ? sort : 'submittedAt';

    const since30 = new Date();
    since30.setDate(since30.getDate() - 30);

    const [
      leads,
      total,
      totalDev,
      leadsPerDayRaw,
      leadsByServiceRaw,
      leadsByCityRaw,
    ] = await Promise.all([
      db.collection('Leads')
        .find(filter)
        .sort({ [sortField]: dir })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),

      db.collection('Leads').countDocuments(filter),

      db.collection('Leads').countDocuments({ ...filter, isDevTest: true }),

      // Leads per day — last 30d, no search/status filter for full picture
      db.collection('Leads').aggregate([
        { $match: { submittedAt: { $gte: since30 } } },
        { $group: {
          _id:   { $dateToString: { format: '%Y-%m-%d', date: '$submittedAt' } },
          count: { $sum: 1 },
        }},
        { $sort: { _id: 1 } },
        { $project: { date: '$_id', count: 1, _id: 0 } },
      ]).toArray(),

      // Leads by service — ✅ FIXED: preserveNullAndEmptyArrays (was preserveNullAndEmpty)
      db.collection('Leads').aggregate([
        { $unwind: { path: '$services', preserveNullAndEmptyArrays: false } },
        { $group: { _id: '$services', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 8 },
        { $project: { label: '$_id', count: 1, _id: 0 } },
      ]).toArray(),

      // Leads by city
      db.collection('Leads').aggregate([
        { $group: { _id: '$ipCity', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 20 },
        { $project: { city: '$_id', count: 1, _id: 0 } },
      ]).toArray(),
    ]);

    // Enrich coords, exclude Unknown/null from map
    const leadsByCity = leadsByCityRaw
      .filter(d => d.city && d.city !== 'Unknown')
      .map(d => {
        const coords = getCoords(d.city);
        return coords ? { ...d, ...coords } : d;
      });

    return NextResponse.json({
      leads,
      total,
      totalDev,
      page,
      pages:          Math.ceil(total / limit),
      leadsPerDay:    leadsPerDayRaw,
      leadsByService: leadsByServiceRaw,
      leadsByCity,
    });
  } catch (err) {
    console.error('[admin/leads GET] error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
