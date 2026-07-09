// Lead settings gear → modal for status changes + deal amount on convert.
'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './LeadSettingsModal.module.scss';

const STATUSES = ['new', 'contacted', 'qualified', 'converted', 'lost'] as const;
type Status = typeof STATUSES[number];

const STATUS_META: Record<Status, { color: string; bg: string; border: string; label: string }> = {
  new:       { color: '#64748b', bg: 'rgba(100, 116, 139,0.10)',   border: 'rgba(100, 116, 139,0.28)',   label: 'New' },
  contacted: { color: '#378add', bg: 'rgba(55,138,221,0.10)', border: 'rgba(55,138,221,0.25)', label: 'Contacted' },
  qualified: { color: '#d97706', bg: 'rgba(217,119,6,0.10)',  border: 'rgba(217,119,6,0.28)',  label: 'Qualified' },
  converted: { color: '#0d9488', bg: 'rgba(13,148,136,0.10)', border: 'rgba(13,148,136,0.25)', label: 'Converted' },
  lost:      { color: '#64748b', bg: 'rgba(100,116,139,0.10)', border: 'rgba(100,116,139,0.25)', label: 'Lost' },
};

type ModalStep =
  | 'idle'
  | 'menu'
  | 'confirm'
  | 'convertAmount'
  | 'saving'
  | 'done'
  | 'error';

interface Props {
  leadId:          string;
  leadName:        string;
  currentStatus:   string;
  initialValue?:   number | null;
  onStatusChange?: (newStatus: string, newValue?: number | null) => void;
}

export default function LeadSettingsModal({
  leadId,
  leadName,
  currentStatus,
  initialValue,
  onStatusChange,
}: Props) {
  const [step,         setStep]         = useState<ModalStep>('idle');
  const [targetStatus, setTargetStatus] = useState<Status | null>(null);
  const [dealAmount,   setDealAmount]   = useState(
    initialValue != null ? String(initialValue) : ''
  );
  const [errorMsg, setErrorMsg] = useState('');
  const amountRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === 'convertAmount') {
      setTimeout(() => amountRef.current?.focus(), 60);
    }
  }, [step]);

  useEffect(() => {
    if (step === 'idle') return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setStep('idle');
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [step]);

  const closeAll = useCallback(() => {
    setStep('idle');
    setTargetStatus(null);
    setErrorMsg('');
  }, []);

  const handleGearClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStep('menu');
  };

  const handleStatusSelect = (s: Status) => {
    if (s === currentStatus) { closeAll(); return; }
    setTargetStatus(s);
    if (s === 'converted') {
      setStep('convertAmount');
    } else {
      setStep('confirm');
    }
  };

  const handleConfirm = async () => {
    if (!targetStatus) return;

    if (targetStatus === 'converted') {
      const num = Number(dealAmount);
      if (!dealAmount || isNaN(num) || num <= 0) {
        setErrorMsg('Please enter a valid deal amount greater than $0.');
        return;
      }
    }

    setStep('saving');
    setErrorMsg('');

    try {
      const body: Record<string, unknown> = { status: targetStatus };
      if (targetStatus === 'converted') {
        body.confirmedValue = Number(dealAmount);
      }

      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Server error');

      onStatusChange?.(
        targetStatus,
        targetStatus === 'converted' ? Number(dealAmount) : undefined
      );

      setStep('done');
      setTimeout(() => setStep('idle'), 1800);
    } catch {
      setErrorMsg('Something went wrong — please try again.');
      setStep('error');
    }
  };

  const isModalOpen = step !== 'idle';

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        onClick={handleGearClick}
        aria-label="Lead settings"
        className={styles.gear}
      >
        ⚙
      </button>

      {isModalOpen && (
        <>
          <div className={styles.scrim} onClick={closeAll} aria-hidden="true" />

          <div
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-settings-title"
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.header}>
              <div>
                <p className={styles.headerEyebrow}>Lead Settings</p>
                <p id="lead-settings-title" className={styles.headerName}>{leadName}</p>
              </div>
              <button type="button" onClick={closeAll} className={styles.closeBtn} aria-label="Close">
                ✕
              </button>
            </div>

            <div className={styles.body}>
              {step === 'menu' && (
                <div>
                  <p className={styles.stepLabel}>Change Status</p>
                  <div className={styles.statusList}>
                    {STATUSES.map(s => {
                      const m = STATUS_META[s];
                      const isCurrent = s === currentStatus;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleStatusSelect(s)}
                          disabled={isCurrent}
                          className={`${styles.statusOption} ${isCurrent ? styles.statusOptionCurrent : ''}`}
                          style={isCurrent ? {
                            color: m.color,
                            background: m.bg,
                            borderColor: m.border,
                          } : undefined}
                        >
                          <span>
                            {m.label}
                            {s === 'converted' && (
                              <span className={styles.hint}>(requires deal amount)</span>
                            )}
                          </span>
                          {isCurrent && (
                            <span
                              className={styles.currentBadge}
                              style={{ color: m.color, background: m.bg, borderColor: m.border }}
                            >
                              CURRENT
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 'convertAmount' && (
                <div>
                  <div className={styles.amountHead}>
                    <div className={styles.amountIcon}>💰</div>
                    <div>
                      <p className={styles.amountTitle}>Mark as Converted</p>
                      <p className={styles.amountSub}>Enter the confirmed deal amount to proceed</p>
                    </div>
                  </div>

                  <label className={styles.fieldLabel} htmlFor="deal-amount">
                    Deal Amount (USD) *
                  </label>
                  <div className={styles.amountWrap}>
                    <span className={styles.dollar}>$</span>
                    <input
                      id="deal-amount"
                      ref={amountRef}
                      type="number"
                      min="1"
                      step="1"
                      placeholder="0"
                      value={dealAmount}
                      onChange={e => { setDealAmount(e.target.value); setErrorMsg(''); }}
                      onKeyDown={e => { if (e.key === 'Enter') handleConfirm(); }}
                      className={`${styles.amountInput} ${errorMsg ? styles.error : ''}`}
                    />
                  </div>

                  {errorMsg && <p className={styles.errorText}>{errorMsg}</p>}

                  <div className={styles.actions}>
                    <button type="button" onClick={() => setStep('menu')} className={styles.ghostBtn}>
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirm}
                      className={styles.confirmBtn}
                      style={{
                        color: STATUS_META.converted.color,
                        background: STATUS_META.converted.bg,
                        borderColor: `${STATUS_META.converted.color}55`,
                      }}
                    >
                      Confirm Conversion
                    </button>
                  </div>
                </div>
              )}

              {step === 'confirm' && targetStatus && (
                <div>
                  <p className={styles.confirmText}>
                    Change status to{' '}
                    <strong style={{ color: STATUS_META[targetStatus].color }}>
                      {STATUS_META[targetStatus].label}
                    </strong>
                    {' '}for <strong>{leadName}</strong>?
                  </p>
                  <div className={styles.actions}>
                    <button type="button" onClick={() => setStep('menu')} className={styles.ghostBtn}>
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirm}
                      className={styles.confirmBtn}
                      style={{
                        color: STATUS_META[targetStatus].color,
                        background: STATUS_META[targetStatus].bg,
                        borderColor: `${STATUS_META[targetStatus].color}55`,
                      }}
                    >
                      Yes, update status
                    </button>
                  </div>
                </div>
              )}

              {step === 'saving' && (
                <div className={styles.inlineStatus}>
                  <div className={styles.spinner} />
                  <span>Saving changes…</span>
                </div>
              )}

              {step === 'done' && (
                <div className={styles.inlineStatus}>
                  <span aria-hidden="true">✅</span>
                  <span className={styles.successText}>Status updated successfully</span>
                </div>
              )}

              {step === 'error' && (
                <div>
                  <p className={styles.errorText}>
                    {errorMsg || 'Something went wrong — please try again.'}
                  </p>
                  <button type="button" onClick={() => setStep('menu')} className={styles.ghostBtn}>
                    ← Try again
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
