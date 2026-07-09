'use client';
import { useState } from 'react';
import styles from './detail.module.scss';

const STATUSES = ['new', 'contacted', 'qualified', 'converted', 'lost'] as const;
type Status = typeof STATUSES[number];

const STATUS_COLORS: Record<Status, string> = {
  new:       '#64748b',
  contacted: '#378add',
  qualified: '#d97706',
  converted: '#0d9488',
  lost:      '#64748b',
};

export default function LeadDetailClient({
  leadId,
  lead,
}: {
  leadId: string;
  lead:   any;
}) {
  const [status, setStatus] = useState<Status>(lead.status ?? 'new');
  const [notes, setNotes]   = useState<string>(lead.adminNotes ?? '');
  const [value, setValue]   = useState<string>(
    lead.confirmedValue != null ? String(lead.confirmedValue) : ''
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);

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
      <p className={styles.sectionTitle}>
        CRM
        {saving && <span className={styles.saving}> · Saving…</span>}
      </p>

      <div className={styles.crmRow}>
        <label htmlFor="crm-status">Status</label>
        <select
          id="crm-status"
          value={status}
          onChange={e => {
            const s = e.target.value as Status;
            setStatus(s);
            patch({ status: s });
          }}
          className={styles.statusSelect}
          style={{ color: STATUS_COLORS[status], borderColor: `${STATUS_COLORS[status]}55` }}
        >
          {STATUSES.map(s => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.crmRow}>
        <label htmlFor="crm-value">Confirmed value ($)</label>
        <input
          id="crm-value"
          type="number"
          value={value}
          placeholder="0"
          onChange={e => setValue(e.target.value)}
          onBlur={() => patch({ confirmedValue: value === '' ? null : Number(value) })}
          className={styles.valueInput}
        />
      </div>

      <div>
        <p className={styles.sectionTitle}>Admin notes</p>
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
