// components/AdminComponents/Charts/HourHeatmap.tsx
'use client';
import { useState, useRef } from 'react';
import { useAdminChartTheme } from './useAdminChartTheme';
import styles from './HourHeatmap.module.scss';

interface HourData { hour: number; count: number; }

const LABEL = (h: number) => {
  if (h === 0)  return '12am';
  if (h === 12) return '12pm';
  return h < 12 ? `${h}am` : `${h - 12}pm`;
};

export default function HourHeatmap({ data }: { data: HourData[] }) {
  const [tooltip, setTooltip] = useState<{ hour: number; count: number; x: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useAdminChartTheme();

  const maxCount = Math.max(...data.map(d => d.count), 1);

  const hours = Array.from({ length: 24 }, (_, h) => {
    const found = data.find(d => d.hour === h);
    return { hour: h, count: found?.count ?? 0 };
  });

  return (
    <div ref={containerRef} className={styles.wrap}>
      <div className={styles.bars}>
        {hours.map(({ hour, count }) => {
          const pct      = count / maxCount;
          const heightPx = Math.max(6, Math.round(pct * 96));
          const opacity  = count === 0 ? 0.14 : (0.22 + pct * 0.78);
          const isActive = tooltip?.hour === hour;

          return (
            <div
              key={hour}
              className={`${styles.bar} ${isActive ? styles.barActive : ''}`}
              style={{
                height:     `${heightPx}px`,
                background: `rgba(100, 116, 139, ${isActive ? Math.min(opacity + 0.2, 1) : opacity})`,
              }}
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
              onFocus={e => {
                if (!containerRef.current) return;
                const containerRect = containerRef.current.getBoundingClientRect();
                const barRect       = (e.currentTarget as HTMLElement).getBoundingClientRect();
                setTooltip({
                  hour,
                  count,
                  x: barRect.left - containerRect.left + barRect.width / 2,
                });
              }}
              onBlur={() => setTooltip(null)}
              tabIndex={0}
              role="img"
              aria-label={`${LABEL(hour)}: ${count} clicks`}
            />
          );
        })}
      </div>

      <div className={styles.labels}>
        {hours.map(({ hour }) => (
          <div key={hour} className={styles.labelCell}>
            {hour % 6 === 0 ? LABEL(hour) : ''}
          </div>
        ))}
      </div>

      {tooltip && (
        <div
          className={styles.tooltip}
          style={{
            left:            `${tooltip.x}px`,
            background:      theme.tooltipBg,
            borderColor:     'rgba(100, 116, 139, 0.3)',
            color:           theme.tooltipTitle,
          }}
        >
          <div className={styles.tooltipHour}>{LABEL(tooltip.hour)}</div>
          <div className={styles.tooltipCount}>
            {tooltip.count} click{tooltip.count !== 1 ? 's' : ''}
          </div>
        </div>
      )}
    </div>
  );
}
