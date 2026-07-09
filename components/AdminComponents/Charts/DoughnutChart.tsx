// components/AdminComponents/Charts/DoughnutChart.tsx
'use client';
import { useEffect, useRef } from 'react';
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

interface Slice { label: string; count: number; }

const PALETTE = ['#f97316', '#286a99', '#ef9f27', '#5dcaa5', '#e24b4a', '#c9dd77', '#586426'];

interface DoughnutChartProps {
  data:   Slice[];
  height?: number;
  showLegend?: boolean;
}

export default function DoughnutChart({ data, height = 200, showLegend = true }: DoughnutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef  = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels:   data.map(d => d.label),
        datasets: [{
          data:            data.map(d => d.count),
          backgroundColor: PALETTE.slice(0, data.length),
          borderColor:     '#0a0f0a',
          borderWidth:     3,
          hoverOffset:     6,
        }],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        cutout:              '68%',
        plugins: {
          legend: {
            display:  showLegend,
            position: 'right',
            labels: {
              color:      'rgba(255,255,255,0.55)',
              font:       { size: 11 },
              boxWidth:   10,
              boxHeight:  10,
              borderRadius: 2,
              padding:    12,
            },
          },
          tooltip: {
            backgroundColor: '#161e16',
            borderColor:     'rgba(255,255,255,0.1)',
            borderWidth:     1,
            titleColor:      '#ffffff',
            bodyColor:       'rgba(255,255,255,0.6)',
            padding:         10,
            callbacks: {
              label: ctx => {
                const total = (ctx.dataset.data as number[]).reduce((a, b) => a + b, 0);
                const pct   = total > 0 ? Math.round((ctx.parsed / total) * 100) : 0;
                return ` ${ctx.label}: ${ctx.parsed} (${pct}%)`;
              },
            },
          },
        },
      },
    });

    return () => { chartRef.current?.destroy(); chartRef.current = null; };
  }, [data, showLegend]);

  return (
    <div style={{ position: 'relative', height }}>
      <canvas ref={canvasRef} role="img" aria-label="Doughnut chart breakdown" />
    </div>
  );
}
