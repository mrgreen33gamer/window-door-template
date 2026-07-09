// Leads CRM list — live data, theme-aware UI.
'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from './leads.module.scss';
import LineChart     from '#/AdminComponents/Charts/LineChart';
import DoughnutChart from '#/AdminComponents/Charts/DoughnutChart';
import LeadStatusTag    from './LeadStatusTag';
import LeadSettingsModal from './LeadSettingsModal';

const LeadMap = dynamic(() => import('#/AdminComponents/Map/LeadMap'), { ssr: false });

interface Lead {
  _id:             string;
  name:            string;
  email:           string;
  phone?:          string;
  services?:       string[];
  serviceType?:    string;
  cityName?:       string;
  ipCity?:         string;
  budget?:         string;
  status:          string;
  confirmedValue?: number | null;
  submittedAt:     string;
  isDevTest?:      boolean;
}

interface LeadsData {
  leads:           Lead[];
  total:           number;
  totalDev:        number;
  page:            number;
  pages:           number;
  leadsPerDay:     { date: string; count: number }[];
  leadsByService:  { label: string; count: number }[];
  leadsByCity:     { city: string; count: number; lat?: number; lng?: number }[];
}

const STATUSES = ['all', 'new', 'contacted', 'qualified', 'converted', 'lost'];
const RANGES = ['24h', '7d', '30d', '90d'] as const;
type Range = typeof RANGES[number];
const RANGE_LABEL: Record<Range, string> = {
  '24h': '24h', '7d': '7d', '30d': '30d', '90d': '90d',
};
const STATUS_COLORS: Record<string, string> = {
  new: '#64748b',
  contacted: '#378add',
  qualified: '#d97706',
  converted: '#0d9488',
  lost: 'var(--admin-text-muted)',
};

async function fetchLeads(page: number, search: string, status: string, range: Range): Promise<LeadsData | null> {
  try {
    const params = new URLSearchParams({ page: String(page), limit: '20', range });
    if (search) params.set('search', search);
    if (status && status !== 'all') params.set('status', status);
    const res = await fetch(`/api/admin/leads?${params}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

export default function AdminLeadsPage() {
  const [page,    setPage]    = useState(1);
  const [search,  setSearch]  = useState('');
  const [query,   setQuery]   = useState('');
  const [status,  setStatus]  = useState('all');
  const [range,   setRange]   = useState<Range>('30d');
  const [data,    setData]    = useState<LeadsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [localStatuses, setLocalStatuses] = useState<Record<string, string>>({});
  const prevDataRef = useRef<string>('');

  const load = useCallback(async () => {
    const result = await fetchLeads(page, query, status, range);
    if (result) {
      const serialized = JSON.stringify(result);
      if (serialized !== prevDataRef.current) {
        prevDataRef.current = serialized;
        setData(result);
        setLocalStatuses({});
      }
    }
    setLoading(false);
  }, [page, query, status, range]);

  useEffect(() => { setLoading(true); prevDataRef.current = ''; load(); }, [load]);
  useEffect(() => { const t = setInterval(load, 30_000); return () => clearInterval(t); }, [load]);
  useEffect(() => { setPage(1); }, [range]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setQuery(search);
  };

  const handleStatusChange = (leadId: string, newStatus: string) => {
    setLocalStatuses(prev => ({ ...prev, [leadId]: newStatus }));
  };

  const totalLeads    = data?.total    ?? 0;
  const devLeadsCount = data?.totalDev ?? 0;
  const realLeads     = totalLeads - devLeadsCount;

  const tableData = data ?? {
    leads: [], total: 0, totalDev: 0, page: 1, pages: 1,
    leadsPerDay: [], leadsByService: [], leadsByCity: [],
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Lead Pipeline</h1>
          <p>
            {totalLeads} total
            {devLeadsCount > 0 && (
              <span className={styles.devNote}> · {devLeadsCount} dev/test</span>
            )}
          </p>
        </div>
        <div className={styles.statsRow}>
          <div style={{ display: 'flex', gap: 0, border: '1px solid var(--admin-border-2)', overflow: 'hidden' }}>
            {RANGES.map(r => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                className={styles.searchBtn}
                style={{
                  borderRadius: 0,
                  border: 'none',
                  borderRight: '1px solid var(--admin-border-2)',
                  background: r === range ? '#64748b' : 'transparent',
                  color: r === range ? '#fff' : undefined,
                }}
              >
                {RANGE_LABEL[r]}
              </button>
            ))}
          </div>
          {[
            { val: String(totalLeads),    label: 'Total'    },
            { val: String(realLeads),     label: 'Real'     },
            { val: String(devLeadsCount), label: 'Dev Test' },
          ].map(s => (
            <div key={s.label} className={styles.statChip}>
              <span className={styles.chipVal}>{s.val}</span>
              <span className={styles.chipLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.chartRow}>
        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>
            {range === '24h' ? 'Leads Per Hour' : 'Leads Per Day'} — {RANGE_LABEL[range]}
          </p>
          {tableData.leadsPerDay?.length ? (
            <LineChart data={tableData.leadsPerDay} label="Leads" color="#64748b" height={200} />
          ) : (
            <p className={styles.empty}>{loading ? 'Loading…' : 'No leads yet.'}</p>
          )}
        </div>
        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>Leads by Service — {RANGE_LABEL[range]}</p>
          {tableData.leadsByService?.length ? (
            <DoughnutChart
              data={tableData.leadsByService.map(d => ({ label: d.label, count: d.count }))}
              height={200}
              showLegend={true}
            />
          ) : (
            <p className={styles.empty}>{loading ? 'Loading…' : 'No service data yet.'}</p>
          )}
        </div>
      </div>

      <div className={styles.mapCard}>
        <p className={styles.cardTitle}>Lead Geography — {RANGE_LABEL[range]}</p>
        <p className={styles.cardHint}>Where leads submitted from in this window. Size = volume.</p>
        {tableData.leadsByCity?.length ? (
          <LeadMap data={tableData.leadsByCity} height={320} />
        ) : (
          <div className={styles.mapPlaceholder}>
            <p className={styles.empty}>{loading ? 'Loading map…' : 'No location data yet.'}</p>
          </div>
        )}
      </div>

      <div className={styles.filters}>
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            className={styles.searchInput}
            placeholder="Search name, email, city…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search leads"
          />
          <button type="submit" className={styles.searchBtn}>Search</button>
          {query && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => { setSearch(''); setQuery(''); setPage(1); }}
            >
              Clear
            </button>
          )}
        </form>

        <div className={styles.statusFilters}>
          {STATUSES.map(s => (
            <button
              key={s}
              type="button"
              className={`${styles.statusBtn} ${s === status ? styles.statusActive : ''} ${s === status ? styles.active : ''}`}
              onClick={() => { setStatus(s); setPage(1); }}
              style={s === status && s !== 'all'
                ? { color: STATUS_COLORS[s], borderColor: `${STATUS_COLORS[s]}88` }
                : undefined}
            >
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.tableCard}>
        {loading ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>Loading leads…</p>
          </div>
        ) : !tableData.leads?.length ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>No leads found</p>
            <p className={styles.emptyBody}>
              {query
                ? `No results for "${query}".`
                : 'Submit a test lead from the site — it will appear here immediately.'}
            </p>
          </div>
        ) : (
          <>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className={styles.hideOnMobile}>Email</th>
                    <th className={styles.hideOnTablet}>Service</th>
                    <th className={styles.hideOnMobile}>Location</th>
                    <th>Status</th>
                    <th className={styles.hideOnTablet}>Date</th>
                    <th className={styles.settingsCell} aria-label="Settings" />
                  </tr>
                </thead>
                <tbody>
                  {tableData.leads.map(lead => {
                    const service = lead.services?.length
                      ? lead.services[0]
                      : (lead.serviceType ?? '—');
                    const displayStatus = localStatuses[lead._id] ?? lead.status;

                    return (
                      <tr key={lead._id}>
                        <td>
                          <Link href={`/admin/leads/${lead._id}`} className={styles.nameCell}>
                            {lead.name}
                            {lead.isDevTest && <span className="adminDevBadge">DEV</span>}
                          </Link>
                        </td>
                        <td className={`${styles.emailCell} ${styles.hideOnMobile}`}>
                          {lead.email}
                        </td>
                        <td className={`${styles.serviceCell} ${styles.hideOnTablet}`}>
                          {service}
                        </td>
                        <td className={`${styles.locationCell} ${styles.hideOnMobile}`}>
                          {lead.ipCity && lead.ipCity !== 'Unknown'
                            ? lead.ipCity
                            : (lead.cityName ?? '—')}
                        </td>
                        <td>
                          <LeadStatusTag status={displayStatus} />
                        </td>
                        <td className={`${styles.dateCell} ${styles.hideOnTablet}`}>
                          {new Date(lead.submittedAt).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: '2-digit',
                          })}
                        </td>
                        <td className={styles.settingsCell}>
                          <LeadSettingsModal
                            leadId={lead._id}
                            leadName={lead.name}
                            currentStatus={displayStatus}
                            initialValue={lead.confirmedValue}
                            onStatusChange={(newStatus) => handleStatusChange(lead._id, newStatus)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {tableData.pages > 1 && (
              <div className={styles.pagination}>
                <button
                  type="button"
                  className={styles.pageBtn}
                  disabled={page <= 1}
                  onClick={() => setPage(p => p - 1)}
                >
                  ← Prev
                </button>
                <span className={styles.pageInfo}>
                  Page {tableData.page} of {tableData.pages} ({tableData.total.toLocaleString()} total)
                </span>
                <button
                  type="button"
                  className={styles.pageBtn}
                  disabled={page >= tableData.pages}
                  onClick={() => setPage(p => p + 1)}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
