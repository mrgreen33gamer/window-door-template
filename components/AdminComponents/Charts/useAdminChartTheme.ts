// components/AdminComponents/Charts/useAdminChartTheme.ts
// Reads admin CSS custom properties so Chart.js matches dark/light mode.
'use client';
import { useEffect, useState } from 'react';

export interface AdminChartTheme {
  grid: string;
  tick: string;
  tooltipBg: string;
  tooltipBorder: string;
  tooltipTitle: string;
  tooltipBody: string;
  doughnutBorder: string;
  accent: string;
  cool: string;
}

const FALLBACK: AdminChartTheme = {
  grid: 'rgba(255,255,255,0.05)',
  tick: 'rgba(250,246,241,0.32)',
  tooltipBg: '#1e1a16',
  tooltipBorder: 'rgba(255,255,255,0.12)',
  tooltipTitle: '#faf6f1',
  tooltipBody: 'rgba(250,246,241,0.65)',
  doughnutBorder: '#0f0c0a',
  accent: '#64748b',
  cool: '#0284c7',
};

function readTheme(): AdminChartTheme {
  if (typeof window === 'undefined') return FALLBACK;
  const root = document.querySelector('.adminThemeRoot') as HTMLElement | null;
  if (!root) return FALLBACK;
  const s = getComputedStyle(root);
  return {
    grid:            s.getPropertyValue('--admin-chart-grid').trim() || FALLBACK.grid,
    tick:            s.getPropertyValue('--admin-chart-tick').trim() || FALLBACK.tick,
    tooltipBg:       s.getPropertyValue('--admin-chart-tooltip-bg').trim() || FALLBACK.tooltipBg,
    tooltipBorder:   s.getPropertyValue('--admin-border').trim() || FALLBACK.tooltipBorder,
    tooltipTitle:    s.getPropertyValue('--admin-text-primary').trim() || FALLBACK.tooltipTitle,
    tooltipBody:     s.getPropertyValue('--admin-text-secondary').trim() || FALLBACK.tooltipBody,
    doughnutBorder:  s.getPropertyValue('--admin-chart-border').trim() || FALLBACK.doughnutBorder,
    // Prefer theme rail/accent tokens so each trade template keeps its brand color
    accent:          s.getPropertyValue('--admin-rail').trim()
                     || s.getPropertyValue('--admin-accent').trim()
                     || FALLBACK.accent,
    cool:            s.getPropertyValue('--admin-cool').trim() || FALLBACK.cool,
  };
}

/** Re-reads CSS vars when theme attribute changes. */
export function useAdminChartTheme(): AdminChartTheme {
  const [theme, setTheme] = useState<AdminChartTheme>(FALLBACK);

  useEffect(() => {
    const update = () => setTheme(readTheme());
    update();

    const root = document.querySelector('.adminThemeRoot');
    if (!root) return;

    const obs = new MutationObserver(update);
    obs.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  return theme;
}

export const CHART_PALETTE = [
  '#64748b',
  '#0284c7',
  '#d97706',
  '#0d9488',
  '#dc2626',
  '#7c3aed',
  '#64748b',
];
