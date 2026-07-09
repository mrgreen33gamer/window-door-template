// components/AdminComponents/Map/LeadMap.tsx
// Lead geography — inner-element scale so Mapbox translate is never overwritten.
'use client';
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface CityLead {
  city:  string;
  count: number;
  lng?:  number;
  lat?:  number;
}

interface LeadMapProps {
  data:    CityLead[];
  height?: number;
}

const TX_COORDS: Record<string, [number, number]> = {
  'Waco':           [-97.1467, 31.5493],
  'Hewitt':         [-97.1958, 31.4604],
  'Robinson':       [-97.1197, 31.4638],
  'Woodway':        [-97.2197, 31.5110],
  'China Spring':   [-97.3128, 31.6613],
  'Valley Mills':   [-97.4718, 31.6571],
  'Hillsboro':      [-97.1272, 32.0098],
  'Temple':         [-97.3427, 31.0982],
  'Killeen':        [-97.7278, 31.1171],
  'Belton':         [-97.4641, 31.0560],
  'Georgetown':     [-97.6772, 30.6327],
  'Round Rock':     [-97.6789, 30.5083],
  'Austin':         [-97.7431, 30.2672],
  'Dallas':         [-96.7970, 32.7767],
  'Fort Worth':     [-97.3208, 32.7555],
  'Houston':        [-95.3698, 29.7604],
  'San Antonio':    [-98.4936, 29.4241],
  'Midland':        [-102.0779, 31.9973],
  'Odessa':         [-102.3677, 31.8457],
  'Lubbock':        [-101.8552, 33.5779],
  'Amarillo':       [-101.8313, 35.2220],
  'Abilene':        [-99.7331, 32.4487],
  'Wichita Falls':  [-98.4934, 33.9137],
  'Tyler':          [-95.3010, 32.3513],
  'Denton':         [-97.1331, 33.2148],
  'Plano':          [-96.6989, 33.0198],
  'Arlington':      [-97.1081, 32.7357],
  'El Paso':        [-106.4850, 31.7619],
  'Corpus Christi': [-97.3964, 27.8006],
  'Laredo':         [-99.5075, 27.5306],
  'McAllen':        [-98.2300, 26.2034],
  'Brownsville':    [-97.4975, 25.9017],
  'Waxahachie':     [-96.8467, 32.3868],
  'Corsicana':      [-96.4689, 32.0954],
  'Gatesville':     [-97.7445, 31.4351],
  'Ross':           [-97.2933, 31.7115],
  'Lacy Lakeview':  [-97.1175, 31.6049],
  'Meridian':       [-97.6567, 31.9235],
  'Clifton':        [-97.5784, 31.7818],
};

function getCoords(item: CityLead): [number, number] | null {
  if (item.lng && item.lat) return [item.lng, item.lat];
  const coords = TX_COORDS[item.city];
  if (coords) return coords;
  const key = Object.keys(TX_COORDS).find(k => k.toLowerCase() === item.city.toLowerCase());
  return key ? TX_COORDS[key] : null;
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
  if (h.length !== 3 && h.length !== 6) return `rgba(2,132,199,${alpha})`;
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const n = parseInt(full, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function LeadMap({ data, height = 380 }: LeadMapProps) {
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

      const PAD = 8;
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

    const plotData = data
      .map(item => ({ ...item, coords: getCoords(item) }))
      .filter(item => item.coords !== null) as (CityLead & { coords: [number, number] })[];

    if (!plotData.length) return;

    const maxCount = Math.max(...plotData.map(d => d.count), 1);
    const root = document.querySelector('.adminThemeRoot') as HTMLElement | null;
    const cs = root ? getComputedStyle(root) : null;
    const accent = cs?.getPropertyValue('--admin-rail').trim() || '#64748b';
    const cool = cs?.getPropertyValue('--admin-cool').trim() || '#0284c7';

    plotData.forEach(item => {
      const scale   = 0.3 + (item.count / maxCount) * 0.7;
      const size    = Math.round(10 + scale * 22);
      const opacity = 0.5 + scale * 0.5;

      const el    = document.createElement('div');
      const inner = document.createElement('div');

      el.style.cssText = `width:${size}px;height:${size}px;cursor:pointer;`;
      inner.style.cssText = `
        width:100%;height:100%;border-radius:50%;
        background:${hexToRgba(cool, opacity)};
        border:1.5px solid ${hexToRgba(accent, 0.8)};
        box-shadow:0 0 ${Math.round(size * 1.5)}px ${hexToRgba(cool, opacity * 0.5)};
        transition:transform 0.15s ease;
      `;
      el.appendChild(inner);

      const html = `
        <div class="hvac-map-tt">
          <div class="hvac-map-tt-row">
            <span class="hvac-map-tt-dot" style="background:${cool}"></span>
            <strong>${escapeHtml(item.city)}</strong>
          </div>
          <span class="hvac-map-tt-meta">${item.count} lead${item.count !== 1 ? 's' : ''}</span>
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
        new mapboxgl.Marker({ element: el }).setLngLat(item.coords).addTo(map)
      );
    });

    if (plotData.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      plotData.forEach(d => bounds.extend(d.coords));
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
          borderLeft: '3px solid var(--admin-cool, #0284c7)',
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
