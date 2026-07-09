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
import { useAdminChartTheme, CHART_PALETTE } from './useAdminChartTheme';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

interface Slice { label: string; count: number; }

interface DoughnutChartProps {
  data:   Slice[];
  height?: number;
  showLegend?: boolean;
}

export default function DoughnutChart({ data, height = 200, showLegend = true }: DoughnutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef  = useRef<Chart | null>(null);
  const theme     = useAdminChartTheme();

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
          backgroundColor: CHART_PALETTE.slice(0, Math.max(data.length, 1)),
          borderColor:     theme.doughnutBorder,
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
              color:        theme.tick,
              font:         { size: 11, family: 'DM Sans, sans-serif' },
              boxWidth:     10,
              boxHeight:    10,
              borderRadius: 2,
              padding:      12,
            },
          },
          tooltip: {
            backgroundColor: theme.tooltipBg,
            borderColor:     theme.tooltipBorder,
            borderWidth:     1,
            titleColor:      theme.tooltipTitle,
            bodyColor:       theme.tooltipBody,
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
  }, [data, showLegend, theme]);

  return (
    <div style={{ position: 'relative', height }}>
      <canvas ref={canvasRef} role="img" aria-label="Doughnut chart breakdown" />
    </div>
  );
}
