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
  color  = '#b1de00',
  height = 220,
}: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef  = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy previous instance
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const labels = data.map(d => {
      const date = new Date(d.date + 'T00:00:00');
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    const values = data.map(d => d.count);

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label,
          data:            values,
          borderColor:     color,
          backgroundColor: `${color}18`,
          borderWidth:     2,
          pointRadius:     3,
          pointHoverRadius: 6,
          pointBackgroundColor: color,
          fill:            true,
          tension:         0.35,
        }],
      },
      options: {
        responsive:         true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
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
              label: ctx => ` ${ctx.parsed.y} ${label.toLowerCase()}`,
            },
          },
        },
        scales: {
          x: {
            grid:  { color: 'rgba(255,255,255,0.04)' },
            ticks: {
              color:   'rgba(255,255,255,0.28)',
              font:    { size: 11 },
              maxRotation: 0,
              maxTicksLimit: 8,
            },
          },
          y: {
            grid:      { color: 'rgba(255,255,255,0.04)' },
            ticks:     { color: 'rgba(255,255,255,0.28)', font: { size: 11 } },
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [data, label, color]);

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
