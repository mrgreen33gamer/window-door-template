// components/AdminComponents/Charts/LineChart.tsx
'use client';
import { useEffect, useRef } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from 'chart.js';
import { useAdminChartTheme } from './useAdminChartTheme';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler);

interface DataPoint { date: string; count: number; }

interface LineChartProps {
  data:   DataPoint[];
  label?: string;
  color?: string;
  height?: number;
}

export default function LineChart({
  data,
  label  = 'Leads',
  color,
  height = 220,
}: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef  = useRef<Chart | null>(null);
  const theme     = useAdminChartTheme();
  const lineColor = color ?? theme.accent;

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const labels = data.map(d => {
      // 24h buckets: "2026-07-09T14:00:00" (UTC) → local hour label
      // Day buckets: "2026-07-09" → mon/day
      const isHour = d.date.includes('T');
      const date = isHour
        ? new Date(d.date.endsWith('Z') ? d.date : `${d.date}Z`)
        : new Date(`${d.date}T00:00:00Z`);
      if (Number.isNaN(date.getTime())) return d.date;
      if (isHour) {
        return date.toLocaleTimeString('en-US', { hour: 'numeric' });
      }
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
    });
    const values = data.map(d => d.count);

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label,
          data:            values,
          borderColor:     lineColor,
          backgroundColor: `${lineColor}22`,
          borderWidth:     2,
          pointRadius:     3,
          pointHoverRadius: 6,
          pointBackgroundColor: lineColor,
          fill:            true,
          tension:         0.35,
        }],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: theme.tooltipBg,
            borderColor:     theme.tooltipBorder,
            borderWidth:     1,
            titleColor:      theme.tooltipTitle,
            bodyColor:       theme.tooltipBody,
            padding:         10,
            callbacks: {
              label: ctx => ` ${ctx.parsed.y} ${label.toLowerCase()}`,
            },
          },
        },
        scales: {
          x: {
            grid:  { color: theme.grid },
            ticks: {
              color: theme.tick,
              font:  { size: 11, family: 'DM Sans, sans-serif' },
              maxRotation: 0,
              maxTicksLimit: 8,
            },
          },
          y: {
            grid:  { color: theme.grid },
            ticks: {
              color: theme.tick,
              font:  { size: 11, family: 'DM Sans, sans-serif' },
            },
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [data, label, lineColor, theme]);

  return (
    <div style={{ position: 'relative', height }}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`Line chart showing ${label} over time`}
      />
    </div>
  );
}
