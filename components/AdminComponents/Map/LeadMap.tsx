// components/AdminComponents/Map/LeadMap.tsx
// Lead Geography map — plots lead origins as dots on a Mapbox map.
// FIXED: Now accepts pre-enriched lat/lng from analytics API (no need for local lookup table).
// Falls back to internal TX city table if lat/lng missing.
'use client';
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

interface CityLead {
  city:   string;
  count:  number;
  lng?:   number;
  lat?:   number;
}

interface LeadMapProps {
  data:    CityLead[];
  height?: number;
}

// Static TX city coordinates — fallback if API doesn't include lat/lng
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
  // case-insensitive fallback
  const key = Object.keys(TX_COORDS).find(k => k.toLowerCase() === item.city.toLowerCase());
  return key ? TX_COORDS[key] : null;
}

export default function LeadMap({ data, height = 380 }: LeadMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<mapboxgl.Map | null>(null);
  const markersRef   = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new mapboxgl.Map({
      container:   containerRef.current,
      style:       'mapbox://styles/mapbox/dark-v11',
      center:      [-98.5, 31.5],
      zoom:        5.5,
      interactive: true,
      attributionControl: false,
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    const plotData = data
      .map(item => ({ ...item, coords: getCoords(item) }))
      .filter(item => item.coords !== null) as (CityLead & { coords: [number, number] })[];

    if (!plotData.length) return;

    const maxCount = Math.max(...plotData.map(d => d.count), 1);

    plotData.forEach(item => {
      const scale   = 0.3 + (item.count / maxCount) * 0.7;
      const size    = Math.round(10 + scale * 22);
      const opacity = 0.5 + scale * 0.5;

      const el = document.createElement('div');
      el.style.cssText = `
        width:         ${size}px;
        height:        ${size}px;
        border-radius: 50%;
        background:    rgba(40, 106, 153, ${opacity});
        border:        1.5px solid rgba(202, 151, 93, 0.7);
        box-shadow:    0 0 ${size * 1.5}px rgba(40,106,153,${opacity * 0.6});
        cursor:        pointer;
        transition:    transform 0.15s ease;
      `;
      el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.3)'; });
      el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)'; });

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset:      12,
      }).setHTML(`
        <div style="
          background: #1e1916;
          border:     1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding:    8px 12px;
          font-family: sans-serif;
          font-size:  12px;
          color:      #fff;
          white-space: nowrap;
        ">
          <strong style="color:#5dcaa5">${item.city}</strong><br/>
          <span style="color:rgba(255,255,255,0.6)">${item.count} lead${item.count !== 1 ? 's' : ''}</span>
        </div>
      `);

      el.addEventListener('mouseenter', () => popup.addTo(map));
      el.addEventListener('mouseleave', () => popup.remove());

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat(item.coords)
        .addTo(map);

      markersRef.current.push(marker);
    });

    if (plotData.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      plotData.forEach(d => bounds.extend(d.coords));
      map.fitBounds(bounds, { padding: 60, maxZoom: 9, duration: 800 });
    }
  }, [data]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height, borderRadius: '8px', overflow: 'hidden' }}
    />
  );
}
