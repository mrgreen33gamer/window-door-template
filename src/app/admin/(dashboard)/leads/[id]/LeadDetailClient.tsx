// src/app/admin/(dashboard)/leads/[id]/LeadDetailClient.tsx
'use client';
import { useState } from 'react';
import styles from './detail.module.scss';

const STATUSES = ['new', 'contacted', 'qualified', 'converted', 'lost'] as const;
type Status = typeof STATUSES[number];

const STATUS_COLORS: Record<Status, string> = {
  new:       '#b1de00',
  contacted: '#378add',
  qualified: '#ef9f27',
  converted: '#5dcaa5',
  lost:      'rgba(255,255,255,0.3)',
};

export default function LeadDetailClient({
  leadId,
  lead,
}: {
  leadId: string;
  lead:   any;
}) {
  const [status, setStatus]     = useState<Status>(lead.status ?? 'new');
  const [notes, setNotes]       = useState<string>(lead.adminNotes ?? '');
  const [value, setValue]       = useState<string>(
    lead.confirmedValue != null ? String(lead.confirmedValue) : ''
  );
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);

  const patch = async (fields: Record<string, any>) => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch(`/api/admin/leads/${leadId}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(fields),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch { /* non-critical */ }
    setSaving(false);
  };

  return (
    <div className={styles.crmSection}>
      <p className={styles.sectionTitle}>CRM</p>

      {/* Status */}
      <div className={styles.crmRow}>
        <label>Status</label>
        <select
          value={status}
          onChange={e => {
            const s = e.target.value as Status;
            setStatus(s);
            patch({ status: s });
          }}
          className={styles.statusSelect}
          style={{ color: STATUS_COLORS[status], borderColor: `${STATUS_COLORS[status]}35` }}
        >
          {STATUSES.map(s => (
            <option key={s} value={s} style={{ background: '#111811' }}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Confirmed value */}
      <div className={styles.crmRow}>
        <label>Confirmed value ($)</label>
        <input
          type="number"
          value={value}
          placeholder="0"
          onChange={e => setValue(e.target.value)}
          onBlur={() => patch({ confirmedValue: value === '' ? null : Number(value) })}
          className={styles.valueInput}
        />
      </div>

      {/* Notes */}
      <div style={{ marginTop: '0.75rem' }}>
        <p className={styles.sectionTitle} style={{ marginBottom: '0' }}>Admin notes</p>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          onBlur={() => patch({ adminNotes: notes })}
          placeholder="Internal notes — saved on blur…"
          rows={4}
          className={styles.notesField}
        />
      </div>

      {saved && <p className={styles.savedMsg}>Saved ✓</p>}
    </div>
  );
}
