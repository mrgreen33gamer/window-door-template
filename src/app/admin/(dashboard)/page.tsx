// src/app/admin/(dashboard)/page.tsx
// Overview — live site analytics with theme-aware UI, skeletons, manual refresh.
'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import styles from './page.module.scss';
import LineChart     from '#/AdminComponents/Charts/LineChart';
import DoughnutChart from '#/AdminComponents/Charts/DoughnutChart';

const PageViewMap = dynamic(() => import('#/AdminComponents/Map/PageViewMap'), { ssr: false });

const RANGES = ['24h', '7d', '30d', '49d', '90d'] as const;
type Range = typeof RANGES[number];
const RANGE_LABEL: Record<Range, string> = {
  '24h': '24h', '7d': '7d', '30d': '30d', '49d': '7wk', '90d': '90d',
};

const STATUS_COLOR: Record<string, string> = {
  new: '#64748b',
  contacted: '#378add',
  qualified: '#d97706',
  converted: '#0d9488',
  lost: 'var(--admin-text-muted)',
};

interface OverviewData {
  uniqueSessions:      number;
  pageViewsByDay:      { date: string; count: number }[];
  deviceBreakdown:     { device: string; count: number }[];
  totalLeads:          number;
  leadsThisPeriod:     number;
  devLeadsThisPeriod?: number;
  conversionRate:      string;
  funnel: { sessions: number; pageViews: number; ctaClicks: number; submissions: number };
  pageViewsByCity:     { city: string; count: number; lng: number; lat: number }[];
  topJourneyPaths:     { path: string[]; count: number }[];
  statusBreakdown:     { status: string; count: number }[];
  avgJourneyLength:    string;
  topConvertingPage:   string;
}

async function fetchOverview(range: Range): Promise<OverviewData | null> {
  try {
    const [aRes, sRes] = await Promise.all([
      fetch(`/api/admin/analytics?range=${range}`, { cache: 'no-store' }),
      fetch(`/api/admin/sessions?range=${range}`,  { cache: 'no-store' }),
    ]);
    if (!aRes.ok) return null;
    const a = await aRes.json();
    const s = sRes.ok ? await sRes.json() : null;

    return {
      uniqueSessions:     a.uniqueSessions    ?? 0,
      pageViewsByDay:     s?.pageViewsByDay   ?? [],
      deviceBreakdown:    s?.deviceBreakdown  ?? a.deviceBreakdown ?? [],
      totalLeads:         a.totalLeads        ?? 0,
      leadsThisPeriod:    a.leadsThisPeriod   ?? 0,
      devLeadsThisPeriod: a.devLeadsThisPeriod ?? 0,
      conversionRate:     a.conversionRate    ?? '0.0%',
      funnel:             a.funnel,
      pageViewsByCity:    a.pageViewsByCity   ?? [],
      topJourneyPaths:    a.topJourneyPaths   ?? [],
      statusBreakdown:    a.statusBreakdown   ?? [],
      avgJourneyLength:   a.avgJourneyLength  ?? '0',
      topConvertingPage:  a.topConvertingPage ?? 'N/A',
    };
  } catch { return null; }
}

function formatUpdated(d: Date | null) {
  if (!d) return '';
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export default function AdminOverviewPage() {
  const [range,       setRange]       = useState<Range>('30d');
  const [data,        setData]        = useState<OverviewData | null>(null);
  const [loading,     setLoading]     = useState(true);
  const [refreshing,  setRefreshing]  = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const prevDataRef = useRef<string>('');

  const load = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true);
    const result = await fetchOverview(range);
    if (result) {
      const serialized = JSON.stringify(result);
      if (serialized !== prevDataRef.current) {
        prevDataRef.current = serialized;
        setData(result);
      }
      setLastUpdated(new Date());
    }
    setLoading(false);
    setRefreshing(false);
  }, [range]);

  useEffect(() => {
    setLoading(true);
    prevDataRef.current = '';
    load();
  }, [load]);

  useEffect(() => {
    const t = setInterval(() => load(false), 30_000);
    return () => clearInterval(t);
  }, [load]);

  const devCount  = data?.devLeadsThisPeriod ?? 0;
  const realLeads = (data?.leadsThisPeriod ?? 0) - devCount;

  const funnelSteps = data ? [
    { label: 'Sessions',   count: data.funnel?.sessions    ?? 0 },
    { label: 'Page Views', count: data.funnel?.pageViews   ?? 0 },
    { label: 'CTA Clicks', count: data.funnel?.ctaClicks   ?? 0 },
    { label: 'Leads',      count: data.funnel?.submissions ?? 0 },
  ] : [];
  const funnelMax = Math.max(...funnelSteps.map(s => s.count), 1);
  const statusTotal = data?.statusBreakdown?.reduce((a, d) => a + d.count, 0) || 1;

  const stats = [
    { label: 'Unique Sessions', value: data?.uniqueSessions?.toLocaleString() ?? null },
    {
      label: `Leads (${RANGE_LABEL[range]})`,
      value: loading ? null : (realLeads > 0
        ? realLeads.toLocaleString()
        : (data?.leadsThisPeriod?.toLocaleString() ?? '0')),
    },
    { label: 'Total Leads', value: data?.totalLeads?.toLocaleString() ?? null },
    { label: 'Conversion Rate', value: data?.conversionRate ?? null },
    {
      label: 'Avg Journey Pages',
      value: data?.avgJourneyLength ? `${data.avgJourneyLength}p` : null,
    },
    { label: 'Top Converting Page', value: data?.topConvertingPage ?? null },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <h1>Command Board</h1>
          <p>
            Live site feed · window {RANGE_LABEL[range]}
            {devCount > 0 && (
              <span className={styles.devNote}>· {devCount} dev test</span>
            )}
            {lastUpdated && ` · synced ${formatUpdated(lastUpdated)}`}
          </p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.rangeSelect} role="group" aria-label="Date range">
            {RANGES.map(r => (
              <button
                key={r}
                type="button"
                className={`${styles.rangeBtn} ${r === range ? styles.active : ''}`}
                onClick={() => setRange(r)}
              >
                {RANGE_LABEL[r]}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={styles.refreshBtn}
            onClick={() => load(true)}
            disabled={refreshing || loading}
            aria-label="Refresh analytics"
            title="Refresh now"
          >
            {refreshing ? '…' : '↻'}
          </button>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {stats.map(({ label, value }, idx) => (
          <div key={label} className={styles.statCard}>
            <span className={styles.statIndex}>{String(idx + 1).padStart(2, '0')}</span>
            <p className={styles.statLabel}>{label}</p>
            {loading && value == null ? (
              <div className={styles.skeleton} />
            ) : (
              <p className={styles.statValue} title={value ?? '—'}>{value ?? '—'}</p>
            )}
          </div>
        ))}
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>
            {range === '24h' ? 'Page Views Per Hour' : 'Page Views Per Day'}
          </p>
          {loading && !data?.pageViewsByDay?.length ? (
            <div className={styles.skeletonBlock} />
          ) : data?.pageViewsByDay?.length ? (
            <LineChart
              data={data.pageViewsByDay}
              label="Page Views"
              color="#0284c7"
              height={220}
            />
          ) : (
            <p className={styles.empty}>No page view data yet.</p>
          )}
        </div>
        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>Device Breakdown</p>
          {loading && !data?.deviceBreakdown?.length ? (
            <div className={styles.skeletonBlock} />
          ) : data?.deviceBreakdown?.length ? (
            <DoughnutChart
              data={data.deviceBreakdown.map(d => ({
                label: (d.device || 'desktop').charAt(0).toUpperCase() + (d.device || 'desktop').slice(1),
                count: d.count,
              }))}
              height={200}
              showLegend={true}
            />
          ) : (
            <p className={styles.empty}>No device data yet.</p>
          )}
        </div>
      </div>

      <div className={styles.chartRowEqual}>
        <div className={styles.funnelCard}>
          <p className={styles.chartTitle}>Conversion Ladder</p>
          {loading && !funnelSteps.length ? (
            <div className={styles.skeletonBlock} />
          ) : funnelSteps.length ? (
            <div className={styles.funnel}>
              {funnelSteps.map((step, i) => {
                const w = Math.max(4, Math.round((step.count / funnelMax) * 100));
                return (
                  <div key={step.label} className={styles.funnelStep}>
                    <span className={styles.funnelLabel}>{step.label}</span>
                    <div className={styles.funnelTrack}>
                      <div
                        className={`${styles.funnelFill} ${i === funnelSteps.length - 1 ? styles.last : ''}`}
                        style={{ width: `${w}%` }}
                      />
                    </div>
                    <span className={styles.funnelCount}>{step.count.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className={styles.empty}>No data yet.</p>
          )}
        </div>

        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>Lead Status</p>
          {loading && !data?.statusBreakdown?.length ? (
            <div className={styles.skeletonBlock} />
          ) : data?.statusBreakdown?.length ? (
            <div className={styles.statusList}>
              {data.statusBreakdown.map(item => {
                const pct = Math.round((item.count / statusTotal) * 100);
                const color = STATUS_COLOR[item.status] ?? '#64748b';
                return (
                  <div key={item.status}>
                    <div className={styles.statusRowMeta}>
                      <span className={styles.statusName}>{item.status}</span>
                      <span className={styles.statusPct} style={{ color }}>{pct}%</span>
                    </div>
                    <div className={styles.statusTrack}>
                      <div
                        className={styles.statusFill}
                        style={{ width: `${pct}%`, background: color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className={styles.empty}>No lead status data yet.</p>
          )}
        </div>
      </div>

      <div className={styles.mapCard}>
        <p className={styles.chartTitle}>Visitor Geography</p>
        <p className={styles.cardHint}>
          Page-view origins from first-party tracking. Marker size scales with volume.
        </p>
        {loading && !data?.pageViewsByCity?.length ? (
          <div className={styles.mapPlaceholder}>
            <p className={styles.empty}>Loading map…</p>
          </div>
        ) : data?.pageViewsByCity?.length ? (
          <PageViewMap data={data.pageViewsByCity} height={340} />
        ) : (
          <div className={styles.mapPlaceholder}>
            <p className={styles.empty}>No visitor location data yet.</p>
          </div>
        )}
      </div>

      <div className={styles.journeyCard}>
        <p className={styles.chartTitle}>Winning Paths</p>
        {loading && !data?.topJourneyPaths?.length ? (
          <div className={styles.skeletonBlock} />
        ) : data?.topJourneyPaths?.length ? (
          <div className={styles.journeyList}>
            {data.topJourneyPaths.slice(0, 6).map((item, i) => (
              <div key={i} className={styles.journeyItem}>
                <span className={styles.journeyPath} title={item.path.join(' → ')}>
                  {item.path.join(' → ')}
                </span>
                <span className={styles.journeyCount}>{item.count}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>
            Journey paths appear after leads convert across multiple pages.
          </p>
        )}
      </div>
    </div>
  );
}
