// components/AdminComponents/Map/PageViewMap.tsx
// Overview map — plots page view locations (not leads) as live session dots.
// Shows where visitors are browsing from — updated on each analytics poll.
// Supports time range: 30min / 7d / 30d / 49d (7 weeks)
'use client';
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string || process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

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

export default function PageViewMap({ data, height = 380 }: PageViewMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<mapboxgl.Map | null>(null);
  const markersRef   = useRef<mapboxgl.Marker[]>([]);

  // Initialise map once
  useEffect(() => {
    if (!containerRef.current) return;

    const map = new mapboxgl.Map({
      container:   containerRef.current,
      style:       'mapbox://styles/mapbox/dark-v11',
      center:      [-98.5, 31.5], // Central Texas default
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

  // Update markers whenever data changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    if (!data.length) return;

    const maxCount = Math.max(...data.map(d => d.count), 1);

    data.forEach(item => {
      const scale   = 0.4 + (item.count / maxCount) * 0.6;
      const size    = Math.round(8 + scale * 20);
      const opacity = 0.55 + scale * 0.45;

      const el = document.createElement('div');
      el.style.cssText = `
        width:         ${size}px;
        height:        ${size}px;
        border-radius: 50%;
        background:    rgba(177, 222, 0, ${opacity});
        border:        1.5px solid rgba(222, 126, 0, 0.7);
        box-shadow:    0 0 ${size * 1.5}px rgba(177, 222, 0, ${opacity * 0.5});
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
          background: #1e1a16;
          border:     1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding:    8px 12px;
          font-family: sans-serif;
          font-size:  12px;
          color:      #fff;
          white-space: nowrap;
        ">
          <strong style="color:#b1de00">${item.city}</strong><br/>
          <span style="color:rgba(255,255,255,0.6)">${item.count} page view${item.count !== 1 ? 's' : ''}</span>
        </div>
      `);

      el.addEventListener('mouseenter', () => popup.addTo(map));
      el.addEventListener('mouseleave', () => popup.remove());

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([item.lng, item.lat])
        .addTo(map);

      markersRef.current.push(marker);
    });

    // Fit bounds to all markers if we have data
    if (data.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      data.forEach(d => bounds.extend([d.lng, d.lat]));
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
