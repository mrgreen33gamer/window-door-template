'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';

interface NearbyCity {
  name:     string;
  distance: string;
  href:     string;
}

interface NearbyAreasHeroProps {
  cityName:     string;
  headline?:    string;
  description?: string;
  nearbyCities: NearbyCity[];
  ctaText?:     string;
  ctaLink?:     string;
}

export default function NearbyAreasHero({
  cityName,
  headline,
  description,
  nearbyCities,
  ctaText  = 'Schedule Service Today',
  ctaLink  = '/contact',
}: NearbyAreasHeroProps) {
  const displayHeadline = headline ?? `HVAC Service in ${cityName}, TX`;
  const displayDesc     = description ??
    `Arctic Air HVAC provides fast, reliable heating and cooling service to ${cityName} and all surrounding communities. Licensed technicians, flat-rate pricing, 1-year warranty on every job.`;

  return (
    <section className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        {/* Location chip */}
        <div className={styles.locationChip}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {cityName}, TX
        </div>

        {/* Headline */}
        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          {displayHeadline}
        </motion.h1>

        {/* Description */}
        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
        >
          {displayDesc}
        </motion.p>

        {/* CTA */}
        <motion.div
          className={styles.ctaRow}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.55 }}
        >
          <Link href={ctaLink} className={styles.cta}>
            {ctaText}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>
          <a href="tel:+12549001234" className={styles.phoneBtn}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.17 12a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            (254) 900-1234
          </a>
        </motion.div>

        {/* Nearby cities */}
        {nearbyCities.length > 0 && (
          <motion.div
            className={styles.nearbyWrap}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.55 }}
          >
            <span className={styles.nearbyLabel}>Also serving:</span>
            <div className={styles.nearbyChips}>
              {nearbyCities.map((city, i) => (
                <Link key={i} href={city.href} className={styles.cityChip}>
                  {city.name}
                  <span className={styles.chipDistance}>{city.distance}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
