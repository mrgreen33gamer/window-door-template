// src/app/admin/(dashboard)/leads/[id]/page.tsx
// FIXED: Robust lead detail page — correctly fetches lead + journey session.
'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './detail.module.scss';
import LeadStatusSelect from '../LeadStatusSelect';

interface Lead {
  _id:               string;
  name:              string;
  email:             string;
  phone?:            string;
  businessName?:     string;
  services?:         string[];
  serviceType?:      string;
  budget?:           string;
  message?:          string;
  cityName?:         string;
  pageSlug?:         string;
  spot?:             string;
  ipCity?:           string;
  ip?:               string;
  deviceType?:       string;
  os?:               string;
  browser?:          string;
  status:            string;
  adminNotes?:       string;
  confirmedValue?:   number | null;
  submittedAt:       string;
  journeyPath?:      string[];
  firstTouchSource?: string;
  lastTouchSource?:  string;
  journeyLength?:    number;
  timeOnSiteSeconds?: number;
  formLabel?:        string;
  recaptchaScore?:   number;
  isDevTest?:        boolean;
}

interface JourneySession {
  pages?:        string[];
  firstTouchAt?: string;
  lastTouchAt?:  string;
}

export default function LeadDetailPage() {
  const { id }    = useParams<{ id: string }>();
  const [lead,    setLead]    = useState<Lead | null>(null);
  const [journey, setJourney] = useState<JourneySession | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes,   setNotes]   = useState('');
  const [value,   setValue]   = useState('');
  const [saving,  setSaving]  = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/leads/${id}`)
      .then(r => r.json())
      .then(data => {
        setLead(data.lead ?? null);
        setJourney(data.journeySession ?? null);
        setNotes(data.lead?.adminNotes ?? '');
        setValue(data.lead?.confirmedValue != null ? String(data.lead.confirmedValue) : '');
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const patch = async (updates: Record<string, unknown>) => {
    if (!id) return;
    setSaving(true);
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(updates),
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <Link href="/admin/leads" className={styles.backLink}>← Back to leads</Link>
        <div className={styles.loading}>Loading lead details…</div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className={styles.page}>
        <Link href="/admin/leads" className={styles.backLink}>← Back to leads</Link>
        <div className={styles.notFound}>
          <p>Lead not found.</p>
          <Link href="/admin/leads" className={styles.backLink}>Return to leads list</Link>
        </div>
      </div>
    );
  }

  const serviceStr = lead.services?.length
    ? lead.services.join(', ')
    : (lead.serviceType ?? 'Not specified');

  return (
    <div className={styles.page}>
      <Link href="/admin/leads" className={styles.backLink}>← Back to leads</Link>

      <div className={styles.header}>
        <div>
          <h1>{lead.name}</h1>
          <p>
            {new Date(lead.submittedAt).toLocaleString('en-US', {
              weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
              hour: 'numeric', minute: '2-digit',
            })}
            {lead.isDevTest && <span className={styles.devBadge}> · DEV TEST</span>}
          </p>
        </div>
        <LeadStatusSelect
          leadId={lead._id}
          initialStatus={lead.status}
          onStatusChange={newStatus => setLead(l => l ? { ...l, status: newStatus } : l)}
        />
      </div>

      <div className={styles.grid}>
        {/* Contact Info */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>Contact Information</p>
          <dl className={styles.dl}>
            <dt>Email</dt>      <dd><a href={`mailto:${lead.email}`}>{lead.email}</a></dd>
            {lead.phone && <><dt>Phone</dt><dd><a href={`tel:${lead.phone}`}>{lead.phone}</a></dd></>}
            {lead.businessName && <><dt>Business</dt><dd>{lead.businessName}</dd></>}
            <dt>Location</dt>   <dd>{lead.ipCity ?? '—'} {lead.cityName ? `(form: ${lead.cityName})` : ''}</dd>
            <dt>IP Address</dt> <dd>{lead.ip ?? '—'}</dd>
          </dl>
        </div>

        {/* Project Details */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>Project Details</p>
          <dl className={styles.dl}>
            <dt>Services</dt>   <dd>{serviceStr}</dd>
            <dt>Budget</dt>     <dd>{lead.budget ?? '—'}</dd>
            <dt>Form</dt>       <dd>{lead.formLabel ?? '—'}</dd>
            <dt>Page</dt>       <dd>{lead.pageSlug ?? '—'}</dd>
            <dt>Spot</dt>       <dd>{lead.spot ?? '—'}</dd>
          </dl>
          {lead.message && (
            <div className={styles.message}>
              <p className={styles.messageLabel}>Message</p>
              <p className={styles.messageText}>{lead.message}</p>
            </div>
          )}
        </div>

        {/* Device & Technical */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>Technical Details</p>
          <dl className={styles.dl}>
            <dt>Device</dt>    <dd>{lead.deviceType ?? '—'}</dd>
            <dt>OS</dt>        <dd>{lead.os ?? '—'}</dd>
            <dt>Browser</dt>   <dd>{lead.browser ?? '—'}</dd>
            <dt>reCAPTCHA</dt> <dd>{lead.recaptchaScore?.toFixed(2) ?? '—'}</dd>
          </dl>
        </div>

        {/* Journey */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>Journey Tracking</p>
          <dl className={styles.dl}>
            <dt>First Touch</dt>  <dd>{lead.firstTouchSource ?? '—'}</dd>
            <dt>Last Touch</dt>   <dd>{lead.lastTouchSource ?? '—'}</dd>
            <dt>Pages Visited</dt><dd>{lead.journeyLength ?? '—'}</dd>
            <dt>Time on Site</dt> <dd>{lead.timeOnSiteSeconds ? `${lead.timeOnSiteSeconds}s` : '—'}</dd>
          </dl>
          {lead.journeyPath?.length ? (
            <div className={styles.journeyPath}>
              {lead.journeyPath.map((p, i) => (
                <span key={i} className={styles.journeyStep}>
                  {p}
                  {i < lead.journeyPath!.length - 1 && <span className={styles.journeyArrow}>→</span>}
                </span>
              ))}
            </div>
          ) : null}
          {journey?.pages?.length ? (
            <div style={{ marginTop: '0.75rem' }}>
              <p className={styles.messageLabel}>Full Session Path</p>
              <div className={styles.journeyPath}>
                {journey.pages.map((p, i) => (
                  <span key={i} className={styles.journeyStep}>
                    {p}
                    {i < journey.pages!.length - 1 && <span className={styles.journeyArrow}>→</span>}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* CRM Notes */}
        <div className={styles.card} style={{ gridColumn: '1 / -1' }}>
          <p className={styles.cardTitle}>Admin Notes {saving && <span className={styles.saving}>Saving…</span>}</p>
          <textarea
            className={styles.notesArea}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            onBlur={() => patch({ adminNotes: notes })}
            placeholder="Internal notes about this lead — calls made, follow-up status, deal value, etc…"
            rows={4}
          />
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', alignItems: 'center' }}>
            <label className={styles.valueLabel}>Confirmed Value ($)</label>
            <input
              className={styles.valueInput}
              type="number"
              min={0}
              value={value}
              onChange={e => setValue(e.target.value)}
              onBlur={() => patch({ confirmedValue: value ? Number(value) : null })}
              placeholder="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
