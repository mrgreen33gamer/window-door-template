// src/app/admin/(dashboard)/leads/LeadStatusSelect.tsx
// FINAL FIX:
//  - Loading spinner while saving (replaces broken "Saving…" text)
//  - Success flash (green check) on save
//  - Error toast on failure
//  - "Converted" → opens inline deal-value input panel
//  - Pill shows correct color immediately (optimistic UI)
'use client';
import { useState, useRef, useEffect } from 'react';

const STATUSES = ['new', 'contacted', 'qualified', 'converted', 'lost'] as const;
type Status = typeof STATUSES[number];

const STATUS_COLORS: Record<Status, string> = {
  new:       '#f97316',
  contacted: '#378add',
  qualified: '#27ef27',
  converted: '#5dcaa5',
  lost:      'rgba(255,255,255,0.38)',
};

const STATUS_BG: Record<Status, string> = {
  new:       'rgba(222, 133, 0, 0.1)',
  contacted: 'rgba(55,138,221,0.12)',
  qualified: 'rgba(72, 239, 39, 0.1)',
  converted: 'rgba(93,202,165,0.12)',
  lost:      'rgba(255,255,255,0.05)',
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
  // Converted value panel
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: 0 }}>
      {/* Status pill + save indicator row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {/* Custom select wrapper */}
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
          <select
            value={status}
            onChange={handleStatusChange}
            disabled={saveState === 'saving'}
            style={{
              padding:          '0.38rem 2rem 0.38rem 0.75rem',
              background:       bg,
              border:           `1px solid ${color}55`,
              borderRadius:     '999px',
              color:            color,
              fontFamily:       'var(--font-poppins)',
              fontSize:         '0.78rem',
              fontWeight:       600,
              cursor:           saveState === 'saving' ? 'not-allowed' : 'pointer',
              appearance:       'none',
              WebkitAppearance: 'none',
              outline:          'none',
              transition:       'all 0.2s ease',
              opacity:          saveState === 'saving' ? 0.6 : 1,
              minWidth:         '100px',
            }}
          >
            {STATUSES.map(s => (
              <option key={s} value={s} style={{ background: '#111811', color: '#fff' }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          {/* Chevron */}
          <span style={{
            position:      'absolute',
            right:         '0.55rem',
            pointerEvents: 'none',
            color:         color,
            fontSize:      '0.6rem',
            lineHeight:    1,
          }}>▾</span>
        </div>

        {/* Save indicator */}
        {saveState === 'saving' && (
          <span style={{
            display:      'inline-block',
            width:        '14px',
            height:       '14px',
            border:       '2px solid rgba(255,255,255,0.15)',
            borderTopColor: '#f97316',
            borderRadius: '50%',
            animation:    'spin 0.65s linear infinite',
            flexShrink:   0,
          }} />
        )}
        {saveState === 'saved' && (
          <span style={{
            color:      '#5dcaa5',
            fontSize:   '0.95rem',
            lineHeight: 1,
            animation:  'fadeIn 0.2s ease',
          }}>✓</span>
        )}
        {saveState === 'error' && (
          <span style={{
            color:      '#f87171',
            fontSize:   '0.72rem',
            fontFamily: 'var(--font-poppins)',
            animation:  'fadeIn 0.2s ease',
          }}>Failed — retry</span>
        )}
      </div>

      {/* Deal value panel — shown when status is "converted" */}
      {showValue && (
        <div style={{
          display:       'flex',
          alignItems:    'center',
          gap:           '0.4rem',
          padding:       '0.4rem 0.65rem',
          background:    'rgba(93,202,165,0.08)',
          border:        '1px solid rgba(93,202,165,0.25)',
          borderRadius:  '8px',
          animation:     'fadeIn 0.25s ease',
        }}>
          <span style={{
            fontFamily:  'var(--font-poppins)',
            fontSize:    '0.68rem',
            color:       'rgba(255,255,255,0.45)',
            whiteSpace:  'nowrap',
            fontWeight:  600,
            letterSpacing: '0.05em',
          }}>DEAL $</span>
          <input
            type="number"
            placeholder="0"
            value={dealValue}
            onChange={e => setDealValue(e.target.value)}
            onBlur={handleValueBlur}
            disabled={valSaving}
            style={{
              width:        '80px',
              background:   'transparent',
              border:       'none',
              borderBottom: '1px solid rgba(93,202,165,0.35)',
              color:        '#5dcaa5',
              fontFamily:   'var(--font-poppins)',
              fontSize:     '0.88rem',
              fontWeight:   700,
              outline:      'none',
              padding:      '0.1rem 0.2rem',
            }}
          />
          {valSaving && (
            <span style={{
              display:      'inline-block',
              width:        '10px',
              height:       '10px',
              border:       '1.5px solid rgba(93,202,165,0.2)',
              borderTopColor: '#5dcaa5',
              borderRadius: '50%',
              animation:    'spin 0.65s linear infinite',
              flexShrink:   0,
            }} />
          )}
          {valSaved && !valSaving && (
            <span style={{ color: '#5dcaa5', fontSize: '0.8rem' }}>✓</span>
          )}
        </div>
      )}

      {/* Keyframe injector — only rendered once per page via CSS-in-JS workaround */}
      <style>{`
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes fadeIn  { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
