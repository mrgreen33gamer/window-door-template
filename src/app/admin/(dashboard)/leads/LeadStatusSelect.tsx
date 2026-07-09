// Status select for lead detail header — optimistic UI + deal value on convert.
'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './LeadStatusSelect.module.scss';

const STATUSES = ['new', 'contacted', 'qualified', 'converted', 'lost'] as const;
type Status = typeof STATUSES[number];

const STATUS_COLORS: Record<Status, string> = {
  new:       '#64748b',
  contacted: '#378add',
  qualified: '#d97706',
  converted: '#0d9488',
  lost:      '#64748b',
};

const STATUS_BG: Record<Status, string> = {
  new:       'rgba(100, 116, 139,0.10)',
  contacted: 'rgba(55,138,221,0.12)',
  qualified: 'rgba(217,119,6,0.12)',
  converted: 'rgba(13,148,136,0.12)',
  lost:      'rgba(100,116,139,0.12)',
};

interface Props {
  leadId:           string;
  initialStatus:    string;
  initialValue?:    number | null;
  onStatusChange?:  (status: string) => void;
}

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

export default function LeadStatusSelect({
  leadId,
  initialStatus,
  initialValue,
  onStatusChange,
}: Props) {
  const [status,    setStatus]    = useState<Status>((initialStatus as Status) ?? 'new');
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [showValue, setShowValue] = useState((initialStatus as Status) === 'converted');
  const [dealValue, setDealValue] = useState<string>(initialValue != null ? String(initialValue) : '');
  const [valSaving, setValSaving] = useState(false);
  const [valSaved,  setValSaved]  = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const valTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRef.current)    clearTimeout(timerRef.current);
    if (valTimerRef.current) clearTimeout(valTimerRef.current);
  }, []);

  const patch = async (body: Record<string, unknown>) => {
    const res = await fetch(`/api/admin/leads/${leadId}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    });
    if (!res.ok) throw new Error('patch failed');
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Status;
    setStatus(newStatus);
    setSaveState('saving');
    setShowValue(newStatus === 'converted');
    onStatusChange?.(newStatus);
    try {
      await patch({ status: newStatus });
      setSaveState('saved');
      timerRef.current = setTimeout(() => setSaveState('idle'), 2200);
    } catch {
      setSaveState('error');
      timerRef.current = setTimeout(() => setSaveState('idle'), 3000);
    }
  };

  const handleValueBlur = async () => {
    const num = dealValue === '' ? null : Number(dealValue);
    setValSaving(true);
    try {
      await patch({ confirmedValue: num });
      setValSaved(true);
      valTimerRef.current = setTimeout(() => setValSaved(false), 2200);
    } catch { /* silent */ }
    finally { setValSaving(false); }
  };

  const color = STATUS_COLORS[status];
  const bg    = STATUS_BG[status];

  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <div className={styles.selectWrap}>
          <select
            value={status}
            onChange={handleStatusChange}
            disabled={saveState === 'saving'}
            className={styles.select}
            style={{ background: bg, borderColor: `${color}55`, color }}
            aria-label="Lead status"
          >
            {STATUSES.map(s => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <span className={styles.chevron} style={{ color }}>▾</span>
        </div>

        {saveState === 'saving' && <span className={styles.spinner} aria-label="Saving" />}
        {saveState === 'saved' && <span className={styles.ok} aria-label="Saved">✓</span>}
        {saveState === 'error' && <span className={styles.err}>Failed — retry</span>}
      </div>

      {showValue && (
        <div className={styles.dealPanel}>
          <span className={styles.dealLabel}>DEAL $</span>
          <input
            type="number"
            placeholder="0"
            value={dealValue}
            onChange={e => setDealValue(e.target.value)}
            onBlur={handleValueBlur}
            disabled={valSaving}
            className={styles.dealInput}
            aria-label="Confirmed deal value"
          />
          {valSaving && <span className={styles.miniSpinner} />}
          {valSaved && !valSaving && <span className={styles.ok}>✓</span>}
        </div>
      )}
    </div>
  );
}
