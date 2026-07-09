// Sessions — first-party page view analytics (range-aware including 24h).
'use client';
import { useState, useEffect, useCallback } from 'react';
import styles from './sessions.module.scss';
import LineChart     from '#/AdminComponents/Charts/LineChart';
import DoughnutChart from '#/AdminComponents/Charts/DoughnutChart';

const RANGES = ['24h', '7d', '30d', '90d'] as const;
type Range = typeof RANGES[number];
const RANGE_LABEL: Record<Range, string> = {
  '24h': '24 hours', '7d': '7 days', '30d': '30 days', '90d': '90 days',
};

interface SessionData {
  totalPageViews:   number;
  uniqueSessions:   number;
  deviceBreakdown:  { device: string; count: number }[];
  browserBreakdown: { browser: string; count: number }[];
  topPages:         { path: string; count: number }[];
  pageViewsByDay:   { date: string; count: number }[];
}

async function fetchSessionData(range: Range): Promise<SessionData | null> {
  try {
    const res = await fetch(`/api/admin/sessions?range=${range}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

export default function AdminSessionsPage() {
  const [range,       setRange]       = useState<Range>('30d');
  const [data,        setData]        = useState<SessionData | null>(null);
  const [loading,     setLoading]     = useState(true);
  const [refreshing,  setRefreshing]  = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const load = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true);
    const result = await fetchSessionData(range);
    if (result) { setData(result); setLastUpdated(new Date()); }
    setLoading(false);
    setRefreshing(false);
  }, [range]);

  useEffect(() => { setLoading(true); load(); }, [load]);

  useEffect(() => {
    const interval = setInterval(() => load(false), 30_000);
    return () => clearInterval(interval);
  }, [load]);

  const deviceTotal     = data?.deviceBreakdown?.reduce((a, d) => a + d.count, 0) || 1;
  const maxBrowserCount = Math.max(...(data?.browserBreakdown?.map(d => d.count) ?? [1]), 1);
  const maxPageCount    = Math.max(...(data?.topPages?.map(d => d.count) ?? [1]), 1);

  const avgViews = data && data.uniqueSessions > 0
    ? (data.totalPageViews / data.uniqueSessions).toFixed(1)
    : '—';

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Traffic Sessions</h1>
          <p>
            First-party page view analytics — {RANGE_LABEL[range]}
            {lastUpdated && ` · updated ${lastUpdated.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className={styles.rangeSelect ?? undefined} style={{ display: 'flex', border: '1px solid var(--admin-border-2)', overflow: 'hidden' }}>
            {RANGES.map(r => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                className={styles.refreshBtn}
                style={{
                  borderRadius: 0,
                  border: 'none',
                  borderRight: '1px solid var(--admin-border-2)',
                  background: r === range ? '#64748b' : 'transparent',
                  color: r === range ? '#fff' : 'var(--admin-text-muted)',
                }}
              >
                {r}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={styles.refreshBtn}
            onClick={() => load(true)}
            disabled={refreshing || loading}
            aria-label="Refresh sessions"
          >
            {refreshing ? '…' : '↻'}
          </button>
        </div>
      </div>

      <div className={styles.statsRow}>
        {[
          { label: 'Total Page Views',    value: data?.totalPageViews?.toLocaleString() ?? '—' },
          { label: 'Unique Sessions',     value: data?.uniqueSessions?.toLocaleString() ?? '—' },
          { label: 'Avg Views / Session', value: avgViews },
        ].map(({ label, value }) => (
          <div key={label} className={styles.statCard}>
            <p className={styles.label}>{label}</p>
            <p className={styles.value}>{loading && !data ? '—' : value}</p>
          </div>
        ))}
      </div>

      <div className={styles.card}>
        <p className={styles.cardTitle}>
          {range === '24h' ? 'Page Views Per Hour' : 'Page Views Per Day'} — {RANGE_LABEL[range]}
        </p>
        {data?.pageViewsByDay?.length ? (
          <LineChart
            data={data.pageViewsByDay}
            label="Page views"
            color="#0284c7"
            height={220}
          />
        ) : (
          <p className={styles.empty}>
            {loading ? 'Loading…' : 'No page view data yet — views are recorded as visitors browse.'}
          </p>
        )}
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Device Breakdown</p>
          {data?.deviceBreakdown?.length ? (
            <>
              <DoughnutChart
                data={data.deviceBreakdown.map(d => ({
                  label: (d.device || 'desktop').charAt(0).toUpperCase() + (d.device || 'desktop').slice(1),
                  count: d.count,
                }))}
                height={180}
                showLegend={true}
              />
              <div className={`${styles.barList} ${styles.mt}`}>
                {data.deviceBreakdown.map(item => (
                  <div key={item.device} className={styles.barRow}>
                    <div className={styles.barMeta}>
                      <span className={styles.barLabel}>{item.device || 'desktop'}</span>
                      <span className={styles.barPct}>
                        {Math.round((item.count / deviceTotal) * 100)}%
                      </span>
                    </div>
                    <div className={styles.barTrack}>
                      <div
                        className={styles.barFill}
                        style={{ width: `${Math.round((item.count / deviceTotal) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className={styles.empty}>{loading ? 'Loading…' : 'No device data yet.'}</p>
          )}
        </div>

        <div className={styles.card}>
          <p className={styles.cardTitle}>Browser Breakdown</p>
          {data?.browserBreakdown?.length ? (
            <div className={styles.barList}>
              {data.browserBreakdown.slice(0, 10).map(item => (
                <div key={item.browser} className={styles.barRow}>
                  <div className={styles.barMeta}>
                    <span className={styles.barLabel}>{item.browser || 'Unknown'}</span>
                    <span className={styles.barCount}>{item.count}</span>
                  </div>
                  <div className={styles.barTrack}>
                    <div
                      className={`${styles.barFill} ${styles.barFillCool}`}
                      style={{ width: `${Math.round((item.count / maxBrowserCount) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>{loading ? 'Loading…' : 'No browser data yet.'}</p>
          )}
        </div>

        <div className={`${styles.card} ${styles.fullWidth}`}>
          <p className={styles.cardTitle}>Top Pages by Views</p>
          {data?.topPages?.length ? (
            <div className={styles.barList}>
              {data.topPages.slice(0, 15).map(item => {
                const label = item.path.length > 55
                  ? `…${item.path.slice(-54)}`
                  : item.path;
                return (
                  <div key={item.path} className={styles.barRow}>
                    <div className={styles.barMeta}>
                      <span className={styles.barLabel} title={item.path}>{label}</span>
                      <span className={styles.barCount}>{item.count}</span>
                    </div>
                    <div className={styles.barTrack}>
                      <div
                        className={`${styles.barFill} ${styles.barFillSoft}`}
                        style={{ width: `${Math.round((item.count / maxPageCount) * 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className={styles.empty}>
              {loading ? 'Loading…' : 'No page view data yet — pages are recorded as visitors browse.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
