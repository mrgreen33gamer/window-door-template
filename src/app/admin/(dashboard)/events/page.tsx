// src/app/admin/(dashboard)/events/page.tsx
// FIX8:
//  - Top clicked elements table now shows "Component" column (section field)
//  - Refresh flicker fix preserved (prevDataRef)
//  - HourHeatmap now gets proper interactive hover via the updated component
// FIX9:
//  - Added 'form_submit' to TYPE_LABELS so it renders correctly in the doughnut
//  - Added "Form Submits" stat card to the header row
'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './events.module.scss';
import HourHeatmap   from '#/AdminComponents/Charts/HourHeatmap';
import DoughnutChart from '#/AdminComponents/Charts/DoughnutChart';

const RANGES = ['7d', '30d', '90d'] as const;
type Range = typeof RANGES[number];

const TYPE_LABELS: Record<string, string> = {
  click:        'CTA Click',
  phone_click:  'Phone Click',
  email_click:  'Email Click',
  view:         'View',
  form_submit:  'Form Submit',
};

interface TopElement {
  label:   string;
  page:    string;
  section: string;
  count:   number;
}

interface EventsData {
  topElements:  TopElement[];
  eventsByType: { type: string; count: number }[];
  eventsByPage: { page: string; count: number }[];
  clicksByHour: { hour: number; count: number }[];
}

async function fetchEvents(range: Range): Promise<EventsData | null> {
  try {
    const res = await fetch(`/api/admin/events?range=${range}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

// Pretty-print section names
function fmtSection(s: string): string {
  if (!s || s === 'Unknown') return '—';
  return s
    .replace(/([A-Z])/g, ' $1')
    .replace(/-/g, ' ')
    .trim();
}

// Shorten page paths for display
function fmtPage(p: string): string {
  if (!p) return '—';
  if (p.length <= 36) return p;
  return `…${p.slice(-35)}`;
}

export default function AdminEventsPage() {
  const [range,       setRange]       = useState<Range>('30d');
  const [data,        setData]        = useState<EventsData | null>(null);
  const [loading,     setLoading]     = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const prevDataRef = useRef<string>('');

  const load = useCallback(async () => {
    const result = await fetchEvents(range);
    if (result) {
      const serialized = JSON.stringify(result);
      if (serialized !== prevDataRef.current) {
        prevDataRef.current = serialized;
        setData(result);
      }
      setLastUpdated(new Date());
    }
    setLoading(false);
  }, [range]);

  useEffect(() => { setLoading(true); prevDataRef.current = ''; load(); }, [load]);
  useEffect(() => { const t = setInterval(load, 30_000); return () => clearInterval(t); }, [load]);

  const maxPageCount   = Math.max(...(data?.eventsByPage?.map(d => d.count) ?? [1]));
  const totalEvents    = data?.eventsByType?.reduce((a, d) => a + d.count, 0) ?? 0;
  const ctaClicks      = data?.eventsByType?.find(e => e.type === 'click')?.count        ?? 0;
  const phoneClicks    = data?.eventsByType?.find(e => e.type === 'phone_click')?.count  ?? 0;
  const emailClicks    = data?.eventsByType?.find(e => e.type === 'email_click')?.count  ?? 0;
  const formSubmits    = data?.eventsByType?.find(e => e.type === 'form_submit')?.count  ?? 0;

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Events</h1>
          <p>
            CTA clicks, phone &amp; email interactions, and form submissions
            {lastUpdated && ` · ${lastUpdated.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`}
          </p>
        </div>
        <div className={styles.rangeSelect}>
          {RANGES.map(r => (
            <button key={r} onClick={() => setRange(r)}
              className={`${styles.rangeBtn} ${range === r ? styles.active : ''}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className={styles.statsRow}>
        {[
          { label: 'Total Events',   value: totalEvents.toLocaleString()  },
          { label: 'CTA Clicks',     value: ctaClicks.toLocaleString()    },
          { label: 'Phone Clicks',   value: phoneClicks.toLocaleString()  },
          { label: 'Email Clicks',   value: emailClicks.toLocaleString()  },
          { label: 'Form Submits',   value: formSubmits.toLocaleString()  },
        ].map(({ label, value }) => (
          <div key={label} className={styles.statCard}>
            <p className={styles.label}>{label}</p>
            <p className={styles.value}>{value}</p>
          </div>
        ))}
      </div>

      {/* Top clicked elements — now with Component column */}
      <div className={styles.card}>
        <p className={styles.cardTitle}>Top Clicked Elements</p>
        {data?.topElements?.length ? (
          <div className={styles.tableWrapper}>
            <table className={styles.elementsTable}>
              <thead>
                <tr>
                  <th>Element</th>
                  <th>Component</th>
                  <th className={styles.hideOnMobile}>Page</th>
                  <th style={{ textAlign: 'right' }}>Clicks</th>
                </tr>
              </thead>
              <tbody>
                {data.topElements.slice(0, 12).map((item, i) => (
                  <tr key={i}>
                    <td className={styles.labelCell}>{item.label}</td>
                    <td>
                      <span className={styles.sectionBadge}>
                        {fmtSection(item.section)}
                      </span>
                    </td>
                    <td className={`${styles.pageCell} ${styles.hideOnMobile}`}
                        title={item.page}>
                      {fmtPage(item.page)}
                    </td>
                    <td className={styles.countCell}>{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className={styles.empty}>
            {loading
              ? 'Loading…'
              : 'No click events yet. CTA buttons across the site will populate this list.'}
          </p>
        )}
      </div>

      {/* Type doughnut + Page breakdown */}
      <div className={styles.grid}>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Events by Type</p>
          {data?.eventsByType?.length ? (
            <DoughnutChart
              data={data.eventsByType.map(e => ({
                label: TYPE_LABELS[e.type] ?? e.type,
                count: e.count,
              }))}
              height={200}
              showLegend={true}
            />
          ) : (
            <p className={styles.empty}>{loading ? 'Loading…' : 'No event data yet.'}</p>
          )}
        </div>

        <div className={styles.card}>
          <p className={styles.cardTitle}>Events by Page</p>
          {data?.eventsByPage?.length ? (
            <div className={styles.barList}>
              {data.eventsByPage.slice(0, 12).map(item => (
                <div key={item.page} className={styles.barRow}>
                  <div className={styles.barMeta}>
                    <span className={styles.barLabel} title={item.page}>
                      {fmtPage(item.page)}
                    </span>
                    <span className={styles.barCount}>{item.count}</span>
                  </div>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{
                        width:      `${Math.round((item.count / maxPageCount) * 100)}%`,
                        background: '#286a99',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>{loading ? 'Loading…' : 'No page data yet.'}</p>
          )}
        </div>
      </div>

      {/* Hour heatmap */}
      <div className={styles.card}>
        <p className={styles.cardTitle}>Click Activity by Hour of Day</p>
        <p style={{
          fontFamily: 'var(--font-poppins)',
          fontSize:   '0.73rem',
          color:      'rgba(255,255,255,0.28)',
          margin:     '0 0 1rem',
        }}>
          Hover any bar to see exact click count. Includes CTA clicks and form submissions. Useful for timing campaigns.
        </p>
        <HourHeatmap data={data?.clicksByHour ?? []} />
      </div>
    </div>
  );
}