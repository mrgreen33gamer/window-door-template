// src/app/admin/(dashboard)/page.tsx
// FINAL FIX:
//  - Refresh flicker fixed: data is set with functional update so chart components
//    only remount when the underlying data array actually changes (via JSON comparison).
//  - Full responsive: desktop / tablet (≥768px) / mobile (<768px) handled in SCSS.
//  - Interval auto-refresh preserved (30s).
'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import styles from './page.module.scss';
import LineChart     from '#/AdminComponents/Charts/LineChart';
import DoughnutChart from '#/AdminComponents/Charts/DoughnutChart';

const PageViewMap = dynamic(() => import('#/AdminComponents/Map/PageViewMap'), { ssr: false });

const RANGES = ['7d', '30d', '49d', '90d'] as const;
type Range = typeof RANGES[number];
const RANGE_LABEL: Record<Range, string> = { '7d': '7d', '30d': '30d', '49d': '7wk', '90d': '90d' };

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
      fetch('/api/admin/sessions', { cache: 'no-store' }),
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

const STATUS_COLOR: Record<string, string> = {
  new: '#f97316', contacted: '#378add', qualified: '#27ef27',
  converted: '#5dcaa5', lost: 'rgba(255,255,255,0.28)',
};

export default function AdminOverviewPage() {
  const [range,       setRange]       = useState<Range>('30d');
  const [data,        setData]        = useState<OverviewData | null>(null);
  const [loading,     setLoading]     = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  // Stable refs to avoid full chart remount on every polling tick
  const prevDataRef = useRef<string>('');

  const load = useCallback(async () => {
    const result = await fetchOverview(range);
    if (result) {
      const serialized = JSON.stringify(result);
      // Only update state if data actually changed — avoids destroying/remounting Chart.js canvases
      if (serialized !== prevDataRef.current) {
        prevDataRef.current = serialized;
        setData(result);
      }
      setLastUpdated(new Date());
    }
    setLoading(false);
  }, [range]);

  useEffect(() => {
    setLoading(true);
    prevDataRef.current = ''; // force refresh when range changes
    load();
  }, [load]);

  useEffect(() => {
    const t = setInterval(load, 30_000);
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

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <h1>Overview</h1>
          <p>
            Site-wide analytics · {RANGE_LABEL[range]}
            {devCount > 0 && <span style={{ color: '#ef9f27', marginLeft: '0.5rem' }}>· {devCount} dev test entries</span>}
            {lastUpdated && ` · ${lastUpdated.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`}
          </p>
        </div>
        <div className={styles.rangeSelect}>
          {RANGES.map(r => (
            <button key={r} className={`${styles.rangeBtn} ${r === range ? styles.active : ''}`} onClick={() => setRange(r)}>
              {RANGE_LABEL[r]}
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className={styles.statsGrid}>
        {[
          { label: 'Unique Sessions',     value: data?.uniqueSessions?.toLocaleString() ?? '—' },
          { label: `Leads (${RANGE_LABEL[range]})`, value: realLeads > 0 ? realLeads.toLocaleString() : (loading ? '—' : (data?.leadsThisPeriod?.toLocaleString() ?? '—')) },
          { label: 'Total Leads',         value: data?.totalLeads?.toLocaleString() ?? '—' },
          { label: 'Conversion Rate',     value: data?.conversionRate ?? '—' },
          { label: 'Avg Journey Pages',   value: data?.avgJourneyLength ? `${data.avgJourneyLength}p` : '—' },
          { label: 'Top Converting Page', value: data?.topConvertingPage ?? '—' },
        ].map(({ label, value }) => (
          <div key={label} className={styles.statCard}>
            <p className={styles.statLabel}>{label}</p>
            <p className={styles.statValue} title={value}>{value}</p>
          </div>
        ))}
      </div>

      {/* Page views/day + Device breakdown */}
      <div className={styles.chartRow}>
        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>Page Views Per Day</p>
          {data?.pageViewsByDay?.length ? (
            <LineChart data={data.pageViewsByDay} label="Page Views" color="#286a99" height={220} />
          ) : (
            <p className={styles.empty}>{loading ? 'Loading…' : 'No page view data yet.'}</p>
          )}
        </div>
        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>Device Breakdown</p>
          {data?.deviceBreakdown?.length ? (
            <DoughnutChart
              data={data.deviceBreakdown.map(d => ({
                label: (d.device || 'desktop').charAt(0).toUpperCase() + (d.device || 'desktop').slice(1),
                count: d.count,
              }))}
              height={200}
              showLegend={true}
            />
          ) : (
            <p className={styles.empty}>{loading ? 'Loading…' : 'No device data yet.'}</p>
          )}
        </div>
      </div>

      {/* Funnel + Lead Status */}
      <div className={styles.chartRowEqual}>
        <div className={styles.funnelCard}>
          <p className={styles.chartTitle}>Conversion Funnel</p>
          {funnelSteps.length ? (
            <div className={styles.funnel}>
              {funnelSteps.map((step, i) => {
                const h = Math.max(6, Math.round((step.count / funnelMax) * 80));
                return (
                  <div key={step.label} className={styles.funnelBar}>
                    <span className={styles.funnelCount}>{step.count.toLocaleString()}</span>
                    <div
                      className={`${styles.funnelFill} ${i === funnelSteps.length - 1 ? styles.last : ''}`}
                      style={{ height: `${h}px` }}
                    />
                    <span className={styles.funnelLabel}>{step.label}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className={styles.empty}>{loading ? 'Loading…' : 'No data yet.'}</p>
          )}
        </div>

        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>Lead Status</p>
          {data?.statusBreakdown?.length ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '0.5rem' }}>
              {data.statusBreakdown.map(item => (
                <div key={item.status}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--font-poppins)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'capitalize' }}>{item.status}</span>
                    <span style={{ fontFamily: 'var(--font-poppins)', fontSize: '0.8rem', color: STATUS_COLOR[item.status] ?? '#fff' }}>
                      {Math.round((item.count / statusTotal) * 100)}%
                    </span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                    <div style={{
                      height: '100%',
                      width: `${Math.round((item.count / statusTotal) * 100)}%`,
                      background: STATUS_COLOR[item.status] ?? '#f97316',
                      borderRadius: 2,
                      transition: 'width 0.5s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>{loading ? 'Loading…' : 'No lead status data yet.'}</p>
          )}
        </div>
      </div>

      {/* Visitor Location Map */}
      <div className={styles.mapCard}>
        <p className={styles.chartTitle}>Live Visitor Locations — Page Views</p>
        <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '0.73rem', color: 'rgba(255,255,255,0.28)', margin: '0 0 0.75rem' }}>
          Where visitors are browsing from. Green = page view activity.
        </p>
        {data?.pageViewsByCity?.length ? (
          <PageViewMap data={data.pageViewsByCity} height={340} />
        ) : (
          <div style={{ height: 340, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className={styles.empty}>{loading ? 'Loading map…' : 'No visitor location data yet.'}</p>
          </div>
        )}
      </div>

      {/* Top Journey Paths */}
      <div className={styles.journeyCard}>
        <p className={styles.chartTitle}>Top Converting Journey Paths</p>
        {data?.topJourneyPaths?.length ? (
          <div className={styles.journeyList}>
            {data.topJourneyPaths.slice(0, 6).map((item, i) => (
              <div key={i} className={styles.journeyItem}>
                <span className={styles.journeyPath} title={item.path.join(' → ')}>{item.path.join(' → ')}</span>
                <span className={styles.journeyCount}>{item.count}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>{loading ? 'Loading…' : 'Journey paths appear after leads convert across multiple pages.'}</p>
        )}
      </div>
    </div>
  );
}
