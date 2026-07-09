'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';
import { useTrackEvent } from '&/useTrackEvent';

interface Area {
  town:    string;
  benefit: string;
  badge?:  string;
}

interface LocalServiceAreasProps {
  title?:       string;
  cityName:     string;
  areas:        Area[];
  servicePath?: string;
}

const LocalServiceAreas: React.FC<LocalServiceAreasProps> = ({
  title       = 'Serving All of Central Texas',
  cityName,
  areas,
  servicePath,
}) => {
  const trackEvent = useTrackEvent();

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className={styles.eyebrow}>Service Coverage</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>
            From {cityName} to every surrounding community — we're your local HVAC team.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {areas.map((area, i) => {
            // ── FIX: point to /service-areas/[city]-tx ──────────────────────
            const citySlug = area.town.toLowerCase().replace(/[\s.]+/g, '-');
            const href = servicePath?.includes('services/')
              ? `/${servicePath}/${citySlug}-tx`
              : '/service-areas';
            const isHub = area.badge === 'Home Base' || area.badge === 'Main Hub';

            return (
              <motion.div
                key={i}
                className={`${styles.card} ${isHub ? styles.cardHub : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
              >
                {area.badge && (
                  <span className={`${styles.badge} ${isHub ? styles.badgeHub : styles.badgeNearby}`}>
                    {area.badge}
                  </span>
                )}

                <div className={styles.pinWrap} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>

                <h3 className={styles.townName}>{area.town}</h3>
                <p className={styles.benefit}>{area.benefit}</p>

                <Link
                  href={href}
                  className={styles.cta}
                  onClick={() => trackEvent({
                    eventType:    'click',
                    elementLabel: `Service Area – ${area.town}`,
                    section:      'LocalServiceAreas',
                  })}
                >
                  Our Service Areas
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default LocalServiceAreas;
