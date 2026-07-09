// components/AdminComponents/Map/PageViewMap.tsx
// ─────────────────────────────────────────────────────────────────────────────
// FIX: marker flies to top-left on hover
//
// Mapbox positions markers via el.style.transform = translate(...).
// Scaling `el` overwrites that translate → marker collapses to (0,0).
// Scale a child `inner` instead; never write transform on the Mapbox element.
// Custom edge-aware tooltip (not Mapbox Popup).
// ─────────────────────────────────────────────────────────────────────────────
'use client';
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface CityView {
  city:  string;
  count: number;
  lng:   number;
  lat:   number;
}

interface PageViewMapProps {
  data:    CityView[];
  height?: number;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '').trim();
  if (h.length !== 3 && h.length !== 6) return `rgba(100, 116, 139,${alpha})`;
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const n = parseInt(full, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function PageViewMap({ data, height = 380 }: PageViewMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef   = useRef<HTMLDivElement>(null);
  const tooltipRef   = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<mapboxgl.Map | null>(null);
  const markersRef   = useRef<mapboxgl.Marker[]>([]);
  const rafRef       = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-98.5, 31.5],
      zoom: 5.5,
      interactive: true,
      attributionControl: false,
    });
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  const hideTooltip = () => {
    if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    const tip = tooltipRef.current;
    if (!tip) return;
    tip.style.opacity = '0';
    setTimeout(() => { if (tip.style.opacity === '0') tip.style.display = 'none'; }, 130);
  };

  const positionTooltip = (innerEl: HTMLElement, html: string) => {
    const wrap = wrapperRef.current;
    const tip  = tooltipRef.current;
    if (!wrap || !tip) return;
    if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }

    const wrapRect  = wrap.getBoundingClientRect();
    const innerRect = innerEl.getBoundingClientRect();

    tip.innerHTML     = html;
    tip.style.display = 'block';
    tip.style.opacity = '0';
    tip.style.left    = '0px';
    tip.style.top     = '0px';

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const tipRect = tip.getBoundingClientRect();
      if (tipRect.width < 4) { tip.style.display = 'none'; return; }

      const PAD    = 8;
      const MARGIN = 6;
      const markerTop  = innerRect.top  - wrapRect.top;
      const markerLeft = innerRect.left - wrapRect.left;

      let top  = markerTop  - tipRect.height - PAD;
      let left = markerLeft + (innerRect.width - tipRect.width) / 2;

      if (top < MARGIN) top = markerTop + innerRect.height + PAD;
      if (left < MARGIN) left = MARGIN;
      if (left + tipRect.width > wrapRect.width - MARGIN) left = wrapRect.width - MARGIN - tipRect.width;
      if (top + tipRect.height > wrapRect.height - MARGIN) top = wrapRect.height - MARGIN - tipRect.height;
      if (top < MARGIN) top = MARGIN;

      tip.style.left    = `${Math.round(left)}px`;
      tip.style.top     = `${Math.round(top)}px`;
      tip.style.opacity = '1';
    });
  };

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
    hideTooltip();

    if (!data.length) return;

    const maxCount = Math.max(...data.map(d => d.count), 1);
    const root = document.querySelector('.adminThemeRoot') as HTMLElement | null;
    const cs = root ? getComputedStyle(root) : null;
    const accent = (cs?.getPropertyValue('--admin-rail').trim() || '#64748b');
    const cool = (cs?.getPropertyValue('--admin-cool').trim() || '#0284c7');

    data.forEach(item => {
      const scale   = 0.4 + (item.count / maxCount) * 0.6;
      const size    = Math.round(8 + scale * 20);
      const opacity = 0.55 + scale * 0.45;

      // el → Mapbox-owned (NEVER set transform). inner → scale freely.
      const el    = document.createElement('div');
      const inner = document.createElement('div');

      el.style.cssText = `width:${size}px;height:${size}px;cursor:pointer;`;
      inner.style.cssText = `
        width:100%;height:100%;border-radius:50%;
        background:${hexToRgba(accent, opacity)};
        border:1.5px solid ${hexToRgba(accent, 0.85)};
        box-shadow:0 0 ${Math.round(size * 1.5)}px ${hexToRgba(accent, opacity * 0.45)};
        transition:transform 0.15s ease;
      `;
      el.appendChild(inner);

      const html = `
        <div class="hvac-map-tt">
          <div class="hvac-map-tt-row">
            <span class="hvac-map-tt-dot" style="background:${accent}"></span>
            <strong>${escapeHtml(item.city)}</strong>
          </div>
          <span class="hvac-map-tt-meta">${item.count} page view${item.count !== 1 ? 's' : ''}</span>
        </div>`;

      el.addEventListener('mouseenter', () => {
        inner.style.transform = 'scale(1.3)';
        positionTooltip(inner, html);
      });
      el.addEventListener('mouseleave', () => {
        inner.style.transform = 'scale(1)';
        hideTooltip();
      });
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        inner.style.transform = 'scale(1.3)';
        positionTooltip(inner, html);
      });

      markersRef.current.push(
        new mapboxgl.Marker({ element: el }).setLngLat([item.lng, item.lat]).addTo(map)
      );
    });

    if (data.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      data.forEach(d => bounds.extend([d.lng, d.lat]));
      map.fitBounds(bounds, { padding: 60, maxZoom: 9, duration: 800 });
    }

    const dismiss = () => hideTooltip();
    map.on('movestart', dismiss);
    map.on('zoomstart', dismiss);
    return () => {
      map.off('movestart', dismiss);
      map.off('zoomstart', dismiss);
    };
  }, [data]);

  return (
    <div
      ref={wrapperRef}
      style={{ position: 'relative', width: '100%', height, borderRadius: '4px', overflow: 'hidden' }}
    >
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          display: 'none',
          padding: '8px 12px',
          background: 'var(--admin-surface, #1a1512)',
          border: '1px solid var(--admin-border-2, rgba(255,255,255,0.12))',
          borderLeft: '3px solid var(--admin-rail, #64748b)',
          borderRadius: '2px',
          fontFamily: 'var(--font-header), DM Sans, sans-serif',
          fontSize: '12px',
          color: 'var(--admin-text-primary, #faf6f1)',
          pointerEvents: 'none',
          zIndex: 5,
          boxShadow: '0 10px 28px rgba(0,0,0,0.5)',
          transition: 'opacity 0.12s ease',
          maxWidth: '220px',
          whiteSpace: 'nowrap',
        }}
      />
      <style>{`
        .hvac-map-tt { display:flex; flex-direction:column; gap:3px; }
        .hvac-map-tt-row { display:flex; align-items:center; gap:6px; }
        .hvac-map-tt-dot { width:7px; height:7px; border-radius:50%; display:inline-block; flex-shrink:0; }
        .hvac-map-tt-meta { color:rgba(250,246,241,0.6); font-size:11px; letter-spacing:0.02em; }
      `}</style>
    </div>
  );
}
