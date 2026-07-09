// src/app/admin/(dashboard)/sessions/page.tsx
// FIXED: Fetches from dedicated /api/admin/sessions endpoint for accurate
// browser breakdown, device breakdown, top pages, and page views per day.
'use client';
import { useState, useEffect, useCallback } from 'react';
import styles from './sessions.module.scss';
import LineChart     from '#/AdminComponents/Charts/LineChart';
import DoughnutChart from '#/AdminComponents/Charts/DoughnutChart';

interface SessionData {
  totalPageViews:   number;
  uniqueSessions:   number;
  deviceBreakdown:  { device: string; count: number }[];
  browserBreakdown: { browser: string; count: number }[];
  topPages:         { path: string; count: number }[];
  pageViewsByDay:   { date: string; count: number }[];
}

async function fetchSessionData(): Promise<SessionData | null> {
  try {
    const res = await fetch('/api/admin/sessions', { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

export default function AdminSessionsPage() {
  const [data,        setData]        = useState<SessionData | null>(null);
  const [loading,     setLoading]     = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const load = useCallback(async () => {
    const result = await fetchSessionData();
    if (result) { setData(result); setLastUpdated(new Date()); }
    setLoading(false);
  }, []);

  useEffect(() => { setLoading(true); load(); }, [load]);

  // Real-time polling every 30s
  useEffect(() => {
    const interval = setInterval(load, 30_000);
    return () => clearInterval(interval);
  }, [load]);

  const deviceTotal     = data?.deviceBreakdown?.reduce((a, d) => a + d.count, 0) || 1;
  const maxBrowserCount = Math.max(...(data?.browserBreakdown?.map(d => d.count) ?? [1]));
  const maxPageCount    = Math.max(...(data?.topPages?.map(d => d.count) ?? [1]));

  const avgViews = data && data.uniqueSessions > 0
    ? (data.totalPageViews / data.uniqueSessions).toFixed(1)
    : '—';

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <h1>Sessions</h1>
        <p>
          First-party page view analytics — last 30 days
          {lastUpdated && ` · updated ${lastUpdated.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`}
        </p>
      </div>

      {/* ── Stat cards ── */}
      <div className={styles.statsRow}>
        {[
          { label: 'Total Page Views',    value: data?.totalPageViews?.toLocaleString() ?? '—' },
          { label: 'Unique Sessions',     value: data?.uniqueSessions?.toLocaleString() ?? '—' },
          { label: 'Avg Views / Session', value: avgViews },
        ].map(({ label, value }) => (
          <div key={label} className={styles.statCard}>
            <p className={styles.label}>{label}</p>
            <p className={styles.value}>{value}</p>
          </div>
        ))}
      </div>

      {/* ── Page views per day ── */}
      <div className={styles.card}>
        <p className={styles.cardTitle}>Page Views Per Day (30d)</p>
        {data?.pageViewsByDay?.length ? (
          <LineChart
            data={data.pageViewsByDay}
            label="Page views"
            color="#286a99"
            height={220}
          />
        ) : (
          <p className={styles.empty}>
            {loading ? 'Loading…' : 'No page view data yet — views are recorded as visitors browse.'}
          </p>
        )}
      </div>

      {/* ── Device + Browser ── */}
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
              <div className={styles.barList} style={{ marginTop: '1rem' }}>
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
                      className={styles.barFill}
                      style={{
                        width:      `${Math.round((item.count / maxBrowserCount) * 100)}%`,
                        background: '#286a99',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>{loading ? 'Loading…' : 'No browser data yet.'}</p>
          )}
        </div>

        {/* ── Top pages ── */}
        <div className={styles.card} style={{ gridColumn: '1 / -1' }}>
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
                        className={styles.barFill}
                        style={{
                          width:      `${Math.round((item.count / maxPageCount) * 100)}%`,
                          background: 'rgba(222, 126, 0, 0.65)',
                        }}
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
