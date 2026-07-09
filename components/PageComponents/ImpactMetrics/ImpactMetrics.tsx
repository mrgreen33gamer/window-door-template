'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';

interface Metric {
  icon:      IconDefinition;
  value:     number;
  label:     string;
  suffix?:   string;
  duration?: number;
}

interface ImpactMetricsProps {
  title?:        string;
  metrics:       Metric[];
  cityName:      string;
  cityProjects?: string;
}

const CITY_PROJECT_COUNTS: Record<string, string> = {
  'Waco':         '1,200+',
  'Hewitt':       '340+',
  'Robinson':     '280+',
  'Woodway':      '420+',
  'China Spring': '190+',
  'Valley Mills': '110+',
  'Temple':       '310+',
  'Killeen':      '260+',
};

function AnimatedNumber({ value, suffix, duration = 1800 }: { value: number; suffix?: string; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const pct = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - pct, 3);
            setDisplay(Math.round(ease * value));
            if (pct < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={styles.value}>
      {display.toLocaleString()}{suffix && <span className={styles.suffix}>{suffix}</span>}
    </span>
  );
}

const ImpactMetrics: React.FC<ImpactMetricsProps> = ({
  title = 'Results That Speak for Themselves',
  metrics,
  cityName,
  cityProjects,
}) => {
  const localCount = cityProjects ?? CITY_PROJECT_COUNTS[cityName] ?? null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>By the Numbers</span>
          <h2 className={styles.title}>{title}</h2>
        </div>

        <div className={styles.grid}>
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: 'easeOut' }}
            >
              <div className={styles.iconWrap} aria-hidden="true">
                <FontAwesomeIcon icon={metric.icon} className={styles.icon} />
              </div>
              <div className={styles.valueRow}>
                <AnimatedNumber value={metric.value} suffix={metric.suffix} duration={metric.duration} />
              </div>
              <p className={styles.label}>{metric.label}</p>
            </motion.div>
          ))}

          {localCount && (
            <motion.div
              className={`${styles.card} ${styles.cardCity}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: metrics.length * 0.1, duration: 0.55, ease: 'easeOut' }}
            >
              <div className={styles.iconWrap} aria-hidden="true">
                <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
              </div>
              <div className={styles.valueRow}>
                <span className={styles.value}>{localCount}</span>
              </div>
              <p className={styles.label}>Systems serviced in {cityName}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
