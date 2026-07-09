// libs/adminRange.ts
// Shared admin date-range helpers. Keys use UTC to match Mongo $dateToString defaults.
// Supported: 24h | 7d | 14d | 30d | 49d | 90d

export type AdminRange = '24h' | '7d' | '14d' | '30d' | '49d' | '90d';

const DAY_RANGES: Record<string, number> = {
  '7d': 7,
  '14d': 14,
  '30d': 30,
  '49d': 49,
  '90d': 90,
};

/** Start of the selected window (inclusive), or null if unknown range. */
export function getRangeDate(range: string): Date | null {
  if (range === '24h' || range === '1d') {
    return new Date(Date.now() - 24 * 60 * 60 * 1000);
  }
  const days = DAY_RANGES[range];
  if (days == null) return null;
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

export function isHourlyRange(range: string): boolean {
  return range === '24h' || range === '1d';
}

/** Mongo $dateToString format (UTC) for time-series buckets. */
export function seriesDateFormat(range: string): string {
  return isHourlyRange(range) ? '%Y-%m-%dT%H:00:00' : '%Y-%m-%d';
}

export type SeriesPoint = { date: string; count: number };

/**
 * Fill missing buckets with 0 so charts are continuous and accurate.
 * 24h → hourly UTC; else → daily UTC from since→now.
 */
export function fillSeries(
  range: string,
  since: Date | null,
  points: SeriesPoint[],
): SeriesPoint[] {
  if (!since) return points;

  const map = new Map(points.map(p => [p.date, p.count]));
  const out: SeriesPoint[] = [];
  const now = new Date();

  if (isHourlyRange(range)) {
    const cur = new Date(since);
    cur.setUTCMinutes(0, 0, 0);
    const end = new Date(now);
    end.setUTCMinutes(0, 0, 0);
    while (cur <= end) {
      const key = formatHourKeyUTC(cur);
      out.push({ date: key, count: map.get(key) ?? 0 });
      cur.setUTCHours(cur.getUTCHours() + 1);
    }
    return out;
  }

  const cur = new Date(Date.UTC(since.getUTCFullYear(), since.getUTCMonth(), since.getUTCDate()));
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  while (cur <= end) {
    const key = formatDayKeyUTC(cur);
    out.push({ date: key, count: map.get(key) ?? 0 });
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return out;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function formatDayKeyUTC(d: Date): string {
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

function formatHourKeyUTC(d: Date): string {
  return `${formatDayKeyUTC(d)}T${pad(d.getUTCHours())}:00:00`;
}
