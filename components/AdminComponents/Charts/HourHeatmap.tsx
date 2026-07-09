// components/AdminComponents/Charts/HourHeatmap.tsx
// FIX9: Fixed "closest(...) is null" crash — use useRef on the wrapper div
// instead of DOM traversal. Tooltip position is now calculated correctly.
'use client';
import { useState, useRef } from 'react';

interface HourData { hour: number; count: number; }

const LABEL = (h: number) => {
  if (h === 0)  return '12am';
  if (h === 12) return '12pm';
  return h < 12 ? `${h}am` : `${h - 12}pm`;
};

export default function HourHeatmap({ data }: { data: HourData[] }) {
  const [tooltip, setTooltip] = useState<{ hour: number; count: number; x: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const maxCount = Math.max(...data.map(d => d.count), 1);

  const hours = Array.from({ length: 24 }, (_, h) => {
    const found = data.find(d => d.hour === h);
    return { hour: h, count: found?.count ?? 0 };
  });

  return (
    <div ref={containerRef} style={{ width: '100%', position: 'relative', userSelect: 'none' }}>
      {/* Bars */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '100px' }}>
        {hours.map(({ hour, count }) => {
          const pct      = count / maxCount;
          const heightPx = Math.max(6, Math.round(pct * 96));
          const opacity  = count === 0 ? 0.12 : (0.2 + pct * 0.8);
          const isActive = tooltip?.hour === hour;

          return (
            <div
              key={hour}
              onMouseEnter={e => {
                if (!containerRef.current) return;
                const containerRect = containerRef.current.getBoundingClientRect();
                const barRect       = (e.currentTarget as HTMLElement).getBoundingClientRect();
                setTooltip({
                  hour,
                  count,
                  x: barRect.left - containerRect.left + barRect.width / 2,
                });
              }}
              onMouseLeave={() => setTooltip(null)}
              style={{
                flex:         1,
                height:       `${heightPx}px`,
                background:   isActive
                  ? `rgba(177,222,0,${Math.min(opacity + 0.25, 1)})`
                  : `rgba(177,222,0,${opacity})`,
                borderRadius: '3px 3px 0 0',
                cursor:       'pointer',
                transition:   'height 0.4s ease, background 0.15s ease',
                minWidth:     0,
                outline:      isActive ? '1px solid rgba(222, 107, 0, 0.5)' : 'none',
              }}
            />
          );
        })}
      </div>

      {/* Hour labels — every 6 hours */}
      <div style={{
        display:    'flex',
        marginTop:  '6px',
        fontSize:   '10px',
        color:      'rgba(255,255,255,0.28)',
        fontFamily: 'var(--font-poppins)',
      }}>
        {hours.map(({ hour }) => (
          <div key={hour} style={{ flex: 1, textAlign: 'center', minWidth: 0 }}>
            {hour % 6 === 0 ? LABEL(hour) : ''}
          </div>
        ))}
      </div>

      {/* Floating tooltip */}
      {tooltip && (
        <div style={{
          position:      'absolute',
          bottom:        '116px',
          left:          `${tooltip.x}px`,
          transform:     'translateX(-50%)',
          background:    '#161e16',
          border:        '1px solid rgba(177,222,0,0.25)',
          borderRadius:  '8px',
          padding:       '6px 12px',
          pointerEvents: 'none',
          zIndex:        10,
          whiteSpace:    'nowrap',
          boxShadow:     '0 4px 16px rgba(0,0,0,0.45)',
        }}>
          <div style={{
            fontFamily:   'var(--font-poppins)',
            fontSize:     '0.7rem',
            color:        'rgba(255,255,255,0.45)',
            marginBottom: '2px',
          }}>
            {LABEL(tooltip.hour)}
          </div>
          <div style={{
            fontFamily: 'var(--font-poppins)',
            fontSize:   '0.9rem',
            fontWeight: 700,
            color:      '#f97316',
          }}>
            {tooltip.count} click{tooltip.count !== 1 ? 's' : ''}
          </div>
          {/* Arrow */}
          <div style={{
            position:    'absolute',
            bottom:      '-5px',
            left:        '50%',
            transform:   'translateX(-50%)',
            width:       0,
            height:      0,
            borderLeft:  '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop:   '5px solid rgba(222, 118, 0, 0.25)',
          }} />
        </div>
      )}
    </div>
  );
}
