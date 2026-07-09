// src/app/admin/(dashboard)/leads/page.tsx
// FIX11: Status column shows a static colored pill + gear ⚙ icon to the right.
// Clicking ⚙ opens LeadSettingsModal for status changes with full confirmation flow.
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
const STATUS_COLORS: Record<string, string> = {
  new: '#f97316', contacted: '#378add', qualified: '#27ef27',
  converted: '#5dcaa5', lost: 'rgba(255,255,255,0.28)',
};

async function fetchLeads(page: number, search: string, status: string): Promise<LeadsData | null> {
  try {
    const params = new URLSearchParams({ page: String(page), limit: '20' });
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
  const [data,    setData]    = useState<LeadsData | null>(null);
  const [loading, setLoading] = useState(true);
  // Track optimistic status updates so UI reflects changes instantly
  const [localStatuses, setLocalStatuses] = useState<Record<string, string>>({});
  const prevDataRef = useRef<string>('');

  const load = useCallback(async () => {
    const result = await fetchLeads(page, query, status);
    if (result) {
      const serialized = JSON.stringify(result);
      if (serialized !== prevDataRef.current) {
        prevDataRef.current = serialized;
        setData(result);
        // Reset local overrides when fresh data arrives
        setLocalStatuses({});
      }
    }
    setLoading(false);
  }, [page, query, status]);

  useEffect(() => { setLoading(true); prevDataRef.current = ''; load(); }, [load]);
  useEffect(() => { const t = setInterval(load, 30_000); return () => clearInterval(t); }, [load]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setQuery(search);
  };

  const handleStatusChange = (leadId: string, newStatus: string) => {
    // Optimistically update the pill without waiting for a re-fetch
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
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Leads</h1>
          <p>
            {totalLeads} total
            {devLeadsCount > 0 && (
              <span style={{ color: '#ef9f27' }}> · {devLeadsCount} dev/test</span>
            )}
          </p>
        </div>
        <div className={styles.statsRow}>
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

      {/* Charts */}
      <div className={styles.chartRow}>
        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>Leads Per Day</p>
          {tableData.leadsPerDay?.length ? (
            <LineChart data={tableData.leadsPerDay} label="Leads" color="#f97316" height={200} />
          ) : (
            <p className={styles.empty}>{loading ? 'Loading…' : 'No leads yet.'}</p>
          )}
        </div>
        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>Leads by Service</p>
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

      {/* Map */}
      <div className={styles.mapCard}>
        <p className={styles.cardTitle}>Lead Geography</p>
        <p style={{
          fontFamily: 'var(--font-poppins)',
          fontSize:   '0.73rem',
          color:      'rgba(255,255,255,0.28)',
          margin:     '0 0 0.75rem',
        }}>
          Where leads are submitting from. Size = volume.
        </p>
        {tableData.leadsByCity?.length ? (
          <LeadMap data={tableData.leadsByCity} height={320} />
        ) : (
          <div style={{
            height: 320, display: 'flex', alignItems: 'center',
            justifyContent: 'center', background: 'rgba(255,255,255,0.02)',
            borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <p className={styles.empty}>{loading ? 'Loading map…' : 'No location data yet.'}</p>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            className={styles.searchInput}
            placeholder="Search name, email, city…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="submit" className={styles.searchBtn}>Search</button>
          {query && (
            <button type="button" className={styles.clearBtn}
              onClick={() => { setSearch(''); setQuery(''); setPage(1); }}>
              Clear
            </button>
          )}
        </form>

        <div className={styles.statusFilters}>
          {STATUSES.map(s => (
            <button
              key={s}
              className={`${styles.statusBtn} ${s === status ? styles.statusActive : ''}`}
              onClick={() => { setStatus(s); setPage(1); }}
              style={s === status && s !== 'all'
                ? { color: STATUS_COLORS[s], borderColor: `${STATUS_COLORS[s]}55` }
                : {}}
            >
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
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
                    {/* Settings column — no header text, aligned right */}
                    <th style={{ width: '40px' }} />
                  </tr>
                </thead>
                <tbody>
                  {tableData.leads.map(lead => {
                    const service = lead.services?.length
                      ? lead.services[0]
                      : (lead.serviceType ?? '—');
                    // Use optimistic local status if we just changed it
                    const displayStatus = localStatuses[lead._id] ?? lead.status;

                    return (
                      <tr key={lead._id}>
                        <td>
                          <Link href={`/admin/leads/${lead._id}`} className={styles.nameCell}>
                            {lead.name}
                            {lead.isDevTest && (
                              <span style={{
                                color: '#ef9f27', fontSize: '0.65rem',
                                marginLeft: '0.35rem', fontWeight: 600,
                              }}>DEV</span>
                            )}
                          </Link>
                        </td>

                        <td className={`${styles.emailCell} ${styles.hideOnMobile}`}>
                          {lead.email}
                        </td>

                        <td className={styles.hideOnTablet}
                            style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)' }}>
                          {service}
                        </td>

                        <td className={styles.hideOnMobile}
                            style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)' }}>
                          {lead.ipCity && lead.ipCity !== 'Unknown'
                            ? lead.ipCity
                            : (lead.cityName ?? '—')}
                        </td>

                        {/* Status pill — read-only display */}
                        <td style={{ whiteSpace: 'nowrap' }}>
                          <LeadStatusTag status={displayStatus} />
                        </td>

                        <td className={`${styles.dateCell} ${styles.hideOnTablet}`}>
                          {new Date(lead.submittedAt).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: '2-digit',
                          })}
                        </td>

                        {/* Gear settings icon — far right */}
                        <td style={{ textAlign: 'right', paddingRight: '0.875rem' }}>
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
                <button className={styles.pageBtn} disabled={page <= 1}
                  onClick={() => setPage(p => p - 1)}>← Prev</button>
                <span className={styles.pageInfo}>
                  Page {tableData.page} of {tableData.pages} ({tableData.total.toLocaleString()} total)
                </span>
                <button className={styles.pageBtn} disabled={page >= tableData.pages}
                  onClick={() => setPage(p => p + 1)}>Next →</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
