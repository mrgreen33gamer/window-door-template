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
  color      = '#f97316',
  horizontal = false,
  height     = 260,
}: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef  = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; }

    // Truncate long labels for readability
    const truncate = (s: string, max = 32) =>
      s.length > max ? `…${s.slice(-(max - 1))}` : s;

    chartRef.current = new Chart(canvasRef.current, {
      type: horizontal ? 'bar' : 'bar',
      data: {
        labels:   data.map(d => truncate(d.label)),
        datasets: [{
          data:            data.map(d => d.count),
          backgroundColor: `${color}cc`,
          hoverBackgroundColor: color,
          borderRadius:    4,
          borderSkipped:   false,
        }],
      },
      options: {
        indexAxis:           horizontal ? 'y' : 'x',
        responsive:          true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#161e16',
            borderColor:     'rgba(255,255,255,0.1)',
            borderWidth:     1,
            titleColor:      '#ffffff',
            bodyColor:       'rgba(255,255,255,0.6)',
            padding:         10,
            callbacks: {
              title: ctx => data[ctx[0].dataIndex]?.label ?? ctx[0].label,
              label: ctx => ` ${ctx.parsed[horizontal ? 'x' : 'y']}`,
            },
          },
        },
        scales: {
          x: {
            grid:  { color: horizontal ? 'rgba(255,255,255,0.04)' : 'transparent' },
            ticks: { color: 'rgba(255,255,255,0.28)', font: { size: 11 }, maxRotation: 35 },
          },
          y: {
            grid:        { color: horizontal ? 'transparent' : 'rgba(255,255,255,0.04)' },
            ticks:       { color: 'rgba(255,255,255,0.28)', font: { size: 11 } },
            beginAtZero: true,
          },
        },
      },
    });

    return () => { chartRef.current?.destroy(); chartRef.current = null; };
  }, [data, color, horizontal]);

  return (
    <div style={{ position: 'relative', height }}>
      <canvas ref={canvasRef} role="img" aria-label="Bar chart" />
    </div>
  );
}
