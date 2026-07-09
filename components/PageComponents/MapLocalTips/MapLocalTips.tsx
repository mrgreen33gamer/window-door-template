// PageComponents/MapLocalTips/MapLocalTips.tsx
"use client";
import { useState } from "react";
import styles from "./styles.module.scss";

interface MapLocalTipsProps {
  cityName: string;
}

const MapLocalTips: React.FC<MapLocalTipsProps> = ({ cityName }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <section
      className={styles.section}
      aria-label={`Local Map for ${cityName}, TX`}
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Local Presence</span>
          <h2 className={styles.title}>
            Find Us in <em>{cityName}</em>, TX
          </h2>
          <p className={styles.subtitle}>
            Based in Waco — serving {cityName} and all surrounding communities across Central Texas.
          </p>
        </div>

        {/* Map card */}
        <div className={`${styles.mapCard} ${loaded ? styles.mapLoaded : ""}`}>
          {/* Skeleton shimmer shown until iframe loads */}
          {!loaded && (
            <div className={styles.skeleton} aria-hidden="true">
              <div className={styles.skeletonPulse} />
              <span className={styles.skeletonLabel}>Loading map…</span>
            </div>
          )}

          <iframe
            className={styles.iframe}
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10000!2d-97.1469!3d31.5493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86454c7a6a8b7b79%3A0x7d7b8b8a8b8b8b8b!2s${encodeURIComponent(
              cityName + ", TX"
            )}!5e0!3m2!1sen!2sus!4v1693520000000!5m2!1sen!2sus`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Interactive Map of ${cityName}, TX`}
            onLoad={() => setLoaded(true)}
            tabIndex={0}
          />
        </div>
      </div>
    </section>
  );
};

export default MapLocalTips;