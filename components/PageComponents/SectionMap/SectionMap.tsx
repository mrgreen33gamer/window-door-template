"use client";
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const SERVICED_CITIES = [
  "Waco", "China Spring", "Valley Mills", "Hewitt", "Robinson", "Woodway",
  "Gatesville", "Hillsboro", "Temple", "Killeen", "Waxahachie", "Princeton",
  "Elgin", "San Marcos", "Sealy", "El Campo",
];

const CLIENT_LOCATIONS = [
  { lng: -97.3167, lat: 31.6591, name: 'China Spring' },
  { lng: -97.4722, lat: 31.6593, name: 'Valley Mills' },
  { lng: -97.1958, lat: 31.4624, name: 'Hewitt' },
  { lng: -97.12,   lat: 31.47,   name: 'Robinson' },
  { lng: -97.23,   lat: 31.50,   name: 'Woodway' },
  { lng: -97.74,   lat: 31.43,   name: 'Gatesville' },
  { lng: -97.13,   lat: 32.01,   name: 'Hillsboro' },
  { lng: -97.34,   lat: 31.10,   name: 'Temple' },
  { lng: -97.73,   lat: 31.12,   name: 'Killeen' },
  { lng: -96.8444, lat: 32.3917, name: 'Waxahachie' },
  { lng: -96.5014, lat: 33.1804, name: 'Princeton' },
  { lng: -97.3703, lat: 30.3497, name: 'Elgin' },
  { lng: -97.9414, lat: 29.8833, name: 'San Marcos' },
  { lng: -96.1572, lat: 29.7808, name: "Prasek's (Sealy)" },
  { lng: -96.2697, lat: 29.1966, name: "Prasek's (El Campo)" },
];

export default function SectionMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const animationTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isLocked, setIsLocked] = useState(true);
  // ✅ PERF FIX: Track whether map has been initialized yet.
  // We only init Mapbox once the section scrolls into view via IntersectionObserver.
  const initialized = useRef(false);

  const toggleMapLock = () => {
    if (!map.current) return;
    setIsLocked((prev) => {
      const next = !prev;
      const m = map.current!;
      if (next) {
        m.dragPan.disable();
        m.scrollZoom.disable();
        m.touchZoomRotate.disable();
        m.doubleClickZoom.disable();
        m.boxZoom.disable();
        m.keyboard.disable();
      } else {
        m.dragPan.enable();
        m.scrollZoom.enable();
        m.touchZoomRotate.enable();
        m.doubleClickZoom.enable();
        m.boxZoom.enable();
        m.keyboard.enable();
      }
      return next;
    });
  };

  // ✅ PERF FIX: Extracted map init into its own function so IntersectionObserver
  // can call it lazily. Previously this ran unconditionally on mount — meaning
  // Mapbox GL, its WebGL context, all markers, and the flyTo animation all fired
  // even when the map was far below the fold.
  const initMap = () => {
    if (!mapContainer.current || !MAPBOX_TOKEN || map.current || initialized.current) return;
    initialized.current = true;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-97.1315, 31.5548],
      zoom: 9.5,
      pitch: 50,
      bearing: -25,
      projection: { name: 'globe' },
    });

    const currentMap = map.current;

    currentMap.on('load', () => {
      // ── HQ MARKER ────────────────────────────────
      const hqEl = document.createElement('div');
      hqEl.style.cssText = 'width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;';
      const hqDot = document.createElement('div');
      hqDot.className = 'hqMarker';
      hqDot.style.cssText = 'width:32px;height:32px;background:#b1de00;border:4px solid #ffffff;border-radius:50%;box-shadow:0 0 0 8px rgba(177,222,0,0.3);';
      hqEl.appendChild(hqDot);
      new mapboxgl.Marker({ element: hqEl, anchor: 'center' })
        .setLngLat([-97.1315, 31.5548])
        .setPopup(new mapboxgl.Popup().setHTML('<strong>Scott Applications HQ</strong><br>212 Dallas St, Waco, Texas 76704'))
        .addTo(currentMap);

      // ── CLIENT MARKERS ────────────────────────────
      const labels: HTMLElement[] = [];
      CLIENT_LOCATIONS.forEach((loc) => {
        const container = document.createElement('div');
        container.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;';

        const dot = document.createElement('div');
        dot.style.cssText = 'width:18px;height:18px;background:#e63939;border:3px solid #fff;border-radius:50%;box-shadow:0 0 10px rgba(230,57,57,0.8);';

        const label = document.createElement('div');
        label.textContent = loc.name;
        label.style.cssText = `
          font-family: system-ui, sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #fff;
          text-shadow: 0 1px 3px rgba(0,0,0,0.7);
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.3s;
        `;

        container.appendChild(dot);
        container.appendChild(label);
        labels.push(label);

        new mapboxgl.Marker({ element: container })
          .setLngLat([loc.lng, loc.lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<strong>${loc.name}</strong><br>Client Serviced`))
          .addTo(currentMap);
      });

      // Label visibility by zoom
      const handleZoom = () => {
        const opacity = currentMap.getZoom() > 7.5 ? '1' : '0';
        labels.forEach(l => (l.style.opacity = opacity));
      };
      currentMap.on('zoom', handleZoom);
      handleZoom();

      // ── INITIAL LOCK ──────────────────────────────
      currentMap.dragPan.disable();
      currentMap.scrollZoom.disable();
      currentMap.touchZoomRotate.disable();
      currentMap.doubleClickZoom.disable();
      currentMap.boxZoom.disable();
      currentMap.keyboard.disable();

      // Fly-out reveal animation
      animationTimeout.current = setTimeout(() => {
        currentMap.flyTo({
          center: [-98, 31.5],
          zoom: 4.0,
          pitch: 0,
          bearing: 0,
          duration: 6500,
        });
      }, 1800);
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ✅ PERF FIX: IntersectionObserver fires initMap only when the section
    // enters the viewport. Mapbox GL (WebGL context, tile fetches, marker DOM,
    // flyTo animation) is completely deferred until the user scrolls near it.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          initMap();
          observer.disconnect(); // only need to fire once
        }
      },
      {
        // Start loading slightly before section hits the viewport
        rootMargin: '200px 0px',
        threshold: 0,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (animationTimeout.current) {
        clearTimeout(animationTimeout.current);
        animationTimeout.current = null;
      }
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} className={styles.mapSection}>
      <div className={styles.mapHeader}>
        <h2>Areas We Proudly Serve Across Texas</h2>
        <p>Based in Waco · Serving Central Texas and beyond</p>
      </div>

      <div className={styles.mapWrapper}>
        <div ref={mapContainer} className={styles.mapContainer} />

        <button
          className={styles.mapLockToggle}
          onClick={toggleMapLock}
          title={isLocked ? 'Unlock map movement' : 'Lock map movement'}
          aria-label={isLocked ? 'Unlock map movement' : 'Lock map movement'}
        >
          <FontAwesomeIcon
            icon={isLocked ? faLock : faLockOpen}
            className={styles.lockIcon}
          />
        </button>
      </div>

      <div className={styles.mapLegend}>
        <div><span className={styles.hqDot} /> Scott Applications HQ – Waco</div>
        <div><span className={styles.clientDot} /> Clients &amp; Towns Serviced</div>
      </div>

      <div className={styles.seoCitiesGrid}>
        {SERVICED_CITIES.map((city) => (
          <div key={city} className={styles.seoCard}>
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon icon={faLocationDot} className={styles.locationIcon} />
            </div>
            <div className={styles.cityName}>
              {city}, <span>TX</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}