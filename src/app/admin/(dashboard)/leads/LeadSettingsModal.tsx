// src/app/admin/(dashboard)/leads/LeadSettingsModal.tsx
// Settings gear → modal with:
//   • Status change with confirmation dialog
//   • If changing to "converted" → must enter deal amount before API fires
//   • All other status changes → simple confirm before API fires
//   • Spinner + success / error feedback inline
'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

const STATUSES = ['new', 'contacted', 'qualified', 'converted', 'lost'] as const;
type Status = typeof STATUSES[number];

const STATUS_META: Record<Status, { color: string; bg: string; border: string; label: string }> = {
  new:       { color: '#f97316', bg: 'rgba(177,222,0,0.10)',  border: 'rgba(222, 100, 0, 0.28)',  label: 'New'       },
  contacted: { color: '#378add', bg: 'rgba(55,138,221,0.10)', border: 'rgba(55,138,221,0.25)', label: 'Contacted' },
  qualified: { color: '#27ef27', bg: 'rgba(239,159,39,0.10)', border: 'rgba(62, 239, 39, 0.28)', label: 'Qualified' },
  converted: { color: '#5dcaa5', bg: 'rgba(93,202,165,0.10)', border: 'rgba(93,202,165,0.25)', label: 'Converted' },
  lost:      { color: 'rgba(255,255,255,0.45)', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.12)', label: 'Lost' },
};

type ModalStep =
  | 'idle'          // gear icon only
  | 'menu'          // status option list
  | 'confirm'       // "are you sure?" for non-converted changes
  | 'convertAmount' // enter deal $ before confirming converted
  | 'saving'        // spinner while PATCH in flight
  | 'done'          // brief success state
  | 'error';        // error message

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
  const [dealAmount,   setDealAmount]   = useState<string>(
    initialValue != null ? String(initialValue) : ''
  );
  const [errorMsg, setErrorMsg] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);
  const amountRef  = useRef<HTMLInputElement>(null);

  // Focus deal amount input when that step shows
  useEffect(() => {
    if (step === 'convertAmount') {
      setTimeout(() => amountRef.current?.focus(), 60);
    }
  }, [step]);

  // Close on Escape
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

    // Validate deal amount for converted
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
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>

      {/* ── Gear button ── */}
      <button
        onClick={handleGearClick}
        aria-label="Lead settings"
        style={{
          background:    'transparent',
          border:        '1px solid rgba(255,255,255,0.1)',
          borderRadius:  '8px',
          width:         '32px',
          height:        '32px',
          display:       'flex',
          alignItems:    'center',
          justifyContent: 'center',
          cursor:        'pointer',
          color:         'rgba(255,255,255,0.4)',
          fontSize:      '0.9rem',
          transition:    'all 0.15s ease',
          flexShrink:    0,
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(177,222,0,0.4)';
          (e.currentTarget as HTMLElement).style.color = '#b1de00';
          (e.currentTarget as HTMLElement).style.background = 'rgba(177,222,0,0.06)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
          (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)';
          (e.currentTarget as HTMLElement).style.background = 'transparent';
        }}
      >
        ⚙
      </button>

      {/* ── Modal overlay ── */}
      {isModalOpen && (
        <>
          {/* Scrim */}
          <div
            ref={overlayRef}
            onClick={closeAll}
            style={{
              position:   'fixed',
              inset:      0,
              zIndex:     1000,
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(3px)',
            }}
          />

          {/* Modal panel */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position:     'fixed',
              top:          '50%',
              left:         '50%',
              transform:    'translate(-50%, -50%)',
              zIndex:       1001,
              width:        'min(420px, calc(100vw - 2rem))',
              background:   '#111811',
              border:       '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              boxShadow:    '0 32px 80px rgba(0,0,0,0.7)',
              overflow:     'hidden',
              animation:    'modalIn 0.22s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {/* Header */}
            <div style={{
              padding:       '1.25rem 1.5rem 1rem',
              borderBottom:  '1px solid rgba(255,255,255,0.07)',
              display:       'flex',
              alignItems:    'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <p style={{
                  fontFamily:  'var(--font-poppins)',
                  fontSize:    '0.68rem',
                  fontWeight:  600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color:       'rgba(255,255,255,0.35)',
                  margin:      0,
                }}>Lead Settings</p>
                <p style={{
                  fontFamily:  'var(--font-poppins)',
                  fontSize:    '0.92rem',
                  fontWeight:  600,
                  color:       '#fff',
                  margin:      '0.2rem 0 0',
                  overflow:    'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace:  'nowrap',
                  maxWidth:    '260px',
                }}>{leadName}</p>
              </div>
              <button
                onClick={closeAll}
                style={{
                  background:    'rgba(255,255,255,0.07)',
                  border:        'none',
                  borderRadius:  '8px',
                  width:         '32px',
                  height:        '32px',
                  color:         'rgba(255,255,255,0.5)',
                  cursor:        'pointer',
                  fontSize:      '1rem',
                  display:       'flex',
                  alignItems:    'center',
                  justifyContent: 'center',
                  flexShrink:    0,
                }}
              >✕</button>
            </div>

            {/* Body */}
            <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>

              {/* ── STEP: menu ── */}
              {step === 'menu' && (
                <div>
                  <p style={{
                    fontFamily:  'var(--font-poppins)',
                    fontSize:    '0.78rem',
                    fontWeight:  600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color:       'rgba(255,255,255,0.35)',
                    margin:      '0 0 0.75rem',
                  }}>Change Status</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {STATUSES.map(s => {
                      const m       = STATUS_META[s];
                      const isCurrent = s === currentStatus;
                      return (
                        <button
                          key={s}
                          onClick={() => handleStatusSelect(s)}
                          disabled={isCurrent}
                          style={{
                            display:        'flex',
                            alignItems:     'center',
                            justifyContent: 'space-between',
                            padding:        '0.75rem 1rem',
                            background:     isCurrent ? m.bg : 'rgba(255,255,255,0.03)',
                            border:         `1px solid ${isCurrent ? m.border : 'rgba(255,255,255,0.08)'}`,
                            borderRadius:   '10px',
                            cursor:         isCurrent ? 'default' : 'pointer',
                            transition:     'all 0.15s ease',
                            width:          '100%',
                            textAlign:      'left',
                            opacity:        isCurrent ? 0.7 : 1,
                          }}
                          onMouseEnter={e => {
                            if (isCurrent) return;
                            (e.currentTarget as HTMLElement).style.background  = m.bg;
                            (e.currentTarget as HTMLElement).style.borderColor = m.border;
                          }}
                          onMouseLeave={e => {
                            if (isCurrent) return;
                            (e.currentTarget as HTMLElement).style.background  = 'rgba(255,255,255,0.03)';
                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                          }}
                        >
                          <span style={{
                            fontFamily: 'var(--font-poppins)',
                            fontSize:   '0.88rem',
                            fontWeight: isCurrent ? 700 : 500,
                            color:      isCurrent ? m.color : 'rgba(255,255,255,0.7)',
                          }}>
                            {m.label}
                            {s === 'converted' && (
                              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginLeft: '0.5rem' }}>
                                (requires deal amount)
                              </span>
                            )}
                          </span>
                          {isCurrent && (
                            <span style={{
                              fontSize:   '0.65rem',
                              fontFamily: 'var(--font-poppins)',
                              fontWeight: 600,
                              color:      m.color,
                              background: m.bg,
                              border:     `1px solid ${m.border}`,
                              padding:    '0.15rem 0.55rem',
                              borderRadius: '999px',
                              letterSpacing: '0.06em',
                            }}>CURRENT</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP: convertAmount ── */}
              {step === 'convertAmount' && (
                <div>
                  <div style={{
                    display:      'flex',
                    alignItems:   'center',
                    gap:          '0.6rem',
                    marginBottom: '1.25rem',
                  }}>
                    <div style={{
                      width:        '38px',
                      height:       '38px',
                      borderRadius: '10px',
                      background:   'rgba(93,202,165,0.12)',
                      border:       '1px solid rgba(93,202,165,0.25)',
                      display:      'flex',
                      alignItems:   'center',
                      justifyContent: 'center',
                      fontSize:     '1.1rem',
                      flexShrink:   0,
                    }}>💰</div>
                    <div>
                      <p style={{
                        fontFamily: 'var(--font-poppins)',
                        fontSize:   '0.92rem',
                        fontWeight: 700,
                        color:      '#5dcaa5',
                        margin:     0,
                      }}>Mark as Converted</p>
                      <p style={{
                        fontFamily: 'var(--font-poppins)',
                        fontSize:   '0.76rem',
                        color:      'rgba(255,255,255,0.35)',
                        margin:     '0.15rem 0 0',
                      }}>Enter the confirmed deal amount to proceed</p>
                    </div>
                  </div>

                  <label style={{
                    display:       'block',
                    fontFamily:    'var(--font-poppins)',
                    fontSize:      '0.72rem',
                    fontWeight:    600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color:         'rgba(255,255,255,0.35)',
                    marginBottom:  '0.5rem',
                  }}>
                    Deal Amount (USD) *
                  </label>

                  <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
                    <span style={{
                      position:   'absolute',
                      left:       '0.875rem',
                      top:        '50%',
                      transform:  'translateY(-50%)',
                      fontFamily: 'var(--font-poppins)',
                      fontSize:   '1rem',
                      fontWeight: 700,
                      color:      '#5dcaa5',
                    }}>$</span>
                    <input
                      ref={amountRef}
                      type="number"
                      min="1"
                      step="1"
                      placeholder="0"
                      value={dealAmount}
                      onChange={e => { setDealAmount(e.target.value); setErrorMsg(''); }}
                      onKeyDown={e => { if (e.key === 'Enter') handleConfirm(); }}
                      style={{
                        width:        '100%',
                        boxSizing:    'border-box',
                        padding:      '0.875rem 1rem 0.875rem 2rem',
                        background:   'rgba(255,255,255,0.04)',
                        border:       `1px solid ${errorMsg ? 'rgba(248,113,113,0.5)' : 'rgba(93,202,165,0.3)'}`,
                        borderRadius: '12px',
                        fontFamily:   'var(--font-poppins)',
                        fontSize:     '1.35rem',
                        fontWeight:   700,
                        color:        '#5dcaa5',
                        outline:      'none',
                      }}
                    />
                  </div>

                  {errorMsg && (
                    <p style={{
                      fontFamily: 'var(--font-poppins)',
                      fontSize:   '0.78rem',
                      color:      '#f87171',
                      margin:     '0 0 0.75rem',
                    }}>{errorMsg}</p>
                  )}

                  <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem' }}>
                    <button onClick={() => setStep('menu')} style={ghostBtnStyle}>
                      ← Back
                    </button>
                    <button onClick={handleConfirm} style={confirmBtnStyle('#5dcaa5', 'rgba(93,202,165,0.12)')}>
                      Confirm Conversion
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP: confirm (non-converted) ── */}
              {step === 'confirm' && targetStatus && (
                <div>
                  <p style={{
                    fontFamily:  'var(--font-poppins)',
                    fontSize:    '0.92rem',
                    color:       'rgba(255,255,255,0.7)',
                    lineHeight:  1.6,
                    margin:      '0 0 1.25rem',
                  }}>
                    Change status to{' '}
                    <strong style={{ color: STATUS_META[targetStatus].color }}>
                      {STATUS_META[targetStatus].label}
                    </strong>
                    {' '}for <strong style={{ color: '#fff' }}>{leadName}</strong>?
                  </p>

                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <button onClick={() => setStep('menu')} style={ghostBtnStyle}>
                      ← Back
                    </button>
                    <button
                      onClick={handleConfirm}
                      style={confirmBtnStyle(
                        STATUS_META[targetStatus].color,
                        STATUS_META[targetStatus].bg,
                      )}
                    >
                      Yes, update status
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP: saving ── */}
              {step === 'saving' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
                  <div style={{
                    width:        '20px',
                    height:       '20px',
                    border:       '2px solid rgba(255,255,255,0.1)',
                    borderTopColor: '#b1de00',
                    borderRadius: '50%',
                    animation:    'spin 0.65s linear infinite',
                    flexShrink:   0,
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-poppins)',
                    fontSize:   '0.88rem',
                    color:      'rgba(255,255,255,0.6)',
                  }}>
                    Saving changes…
                  </span>
                </div>
              )}

              {/* ── STEP: done ── */}
              {step === 'done' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
                  <span style={{ fontSize: '1.35rem' }}>✅</span>
                  <span style={{
                    fontFamily: 'var(--font-poppins)',
                    fontSize:   '0.88rem',
                    color:      '#5dcaa5',
                    fontWeight: 600,
                  }}>
                    Status updated successfully
                  </span>
                </div>
              )}

              {/* ── STEP: error ── */}
              {step === 'error' && (
                <div>
                  <p style={{
                    fontFamily: 'var(--font-poppins)',
                    fontSize:   '0.88rem',
                    color:      '#f87171',
                    margin:     '0 0 1rem',
                  }}>
                    {errorMsg || 'Something went wrong — please try again.'}
                  </p>
                  <button onClick={() => setStep('menu')} style={ghostBtnStyle}>
                    ← Try again
                  </button>
                </div>
              )}

            </div>
          </div>

          <style>{`
            @keyframes modalIn {
              from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
              to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
            @keyframes spin { to { transform: rotate(360deg); } }
          `}</style>
        </>
      )}
    </div>
  );
}

// ── Shared button styles ──────────────────────────────────────────────────────
const ghostBtnStyle: React.CSSProperties = {
  flex:          '0 0 auto',
  padding:       '0.7rem 1.1rem',
  background:    'transparent',
  border:        '1px solid rgba(255,255,255,0.12)',
  borderRadius:  '10px',
  color:         'rgba(255,255,255,0.5)',
  fontFamily:    'var(--font-poppins)',
  fontSize:      '0.82rem',
  fontWeight:    600,
  cursor:        'pointer',
  transition:    'all 0.15s ease',
  whiteSpace:    'nowrap',
};

function confirmBtnStyle(color: string, bg: string): React.CSSProperties {
  return {
    flex:          1,
    padding:       '0.7rem 1.1rem',
    background:    bg,
    border:        `1px solid ${color}55`,
    borderRadius:  '10px',
    color:         color,
    fontFamily:    'var(--font-poppins)',
    fontSize:      '0.82rem',
    fontWeight:    700,
    cursor:        'pointer',
    transition:    'all 0.15s ease',
    whiteSpace:    'nowrap',
  };
}
