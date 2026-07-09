// components/AdminComponents/Charts/BarChart.tsx
'use client';
import { useEffect, useRef } from 'react';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { useAdminChartTheme } from './useAdminChartTheme';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

interface DataItem { label: string; count: number; }

interface BarChartProps {
  data:         DataItem[];
  color?:       string;
  horizontal?:  boolean;
  height?:      number;
}

export default function BarChart({
  data,
  color,
  horizontal = false,
  height     = 260,
}: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef  = useRef<Chart | null>(null);
  const theme     = useAdminChartTheme();
  const barColor  = color ?? theme.accent;

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; }

    const truncate = (s: string, max = 32) =>
      s.length > max ? `…${s.slice(-(max - 1))}` : s;

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels:   data.map(d => truncate(d.label)),
        datasets: [{
          data:                 data.map(d => d.count),
          backgroundColor:      `${barColor}cc`,
          hoverBackgroundColor: barColor,
          borderRadius:         4,
          borderSkipped:        false,
        }],
      },
      options: {
        indexAxis:           horizontal ? 'y' : 'x',
        responsive:          true,
        maintainAspectRatio: false,
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
              title: ctx => data[ctx[0].dataIndex]?.label ?? ctx[0].label,
              label: ctx => ` ${ctx.parsed[horizontal ? 'x' : 'y']}`,
            },
          },
        },
        scales: {
          x: {
            grid:  { color: horizontal ? theme.grid : 'transparent' },
            ticks: {
              color: theme.tick,
              font:  { size: 11, family: 'DM Sans, sans-serif' },
              maxRotation: 35,
            },
          },
          y: {
            grid:  { color: horizontal ? 'transparent' : theme.grid },
            ticks: {
              color: theme.tick,
              font:  { size: 11, family: 'DM Sans, sans-serif' },
            },
            beginAtZero: true,
          },
        },
      },
    });

    return () => { chartRef.current?.destroy(); chartRef.current = null; };
  }, [data, barColor, horizontal, theme]);

  return (
    <div style={{ position: 'relative', height }}>
      <canvas ref={canvasRef} role="img" aria-label="Bar chart" />
    </div>
  );
}
