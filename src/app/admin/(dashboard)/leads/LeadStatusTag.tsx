// src/app/admin/(dashboard)/leads/LeadStatusTag.tsx
// Replaces LeadStatusSelect on the list view.
// Pure display component — just a colored pill showing the current status.
// Editing happens via the settings modal (LeadSettingsModal).
'use client';

const STATUS_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  new:       { text: '#f97316', bg: 'rgba(222, 133, 0, 0.1)',       border: 'rgba(222, 100, 0, 0.28)'      },
  contacted: { text: '#378add', bg: 'rgba(55,138,221,0.10)',      border: 'rgba(55,138,221,0.28)'     },
  qualified: { text: '#27ef27', bg: 'rgba(72, 239, 39, 0.1)',      border: 'rgba(62, 239, 39, 0.28)'     },
  converted: { text: '#5dcaa5', bg: 'rgba(93,202,165,0.10)',      border: 'rgba(93,202,165,0.28)'     },
  lost:      { text: 'rgba(255,255,255,0.45)', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.12)' },
};

interface Props {
  status: string;
}

export default function LeadStatusTag({ status }: Props) {
  const s = status ?? 'new';
  const c = STATUS_COLORS[s] ?? STATUS_COLORS.new;

  return (
    <span style={{
      display:        'inline-block',
      padding:        '0.28rem 0.72rem',
      borderRadius:   '999px',
      fontSize:       '0.72rem',
      fontWeight:     700,
      fontFamily:     'var(--font-poppins)',
      letterSpacing:  '0.05em',
      textTransform:  'capitalize',
      color:          c.text,
      background:     c.bg,
      border:         `1px solid ${c.border}`,
      whiteSpace:     'nowrap',
    }}>
      {s}
    </span>
  );
}
