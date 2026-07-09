'use client';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';

interface ComparisonRow {
  feature:  string;
  us:       boolean | string;
  others:   boolean | string;
}

interface ValueComparisonProps {
  rows?:  ComparisonRow[];
  title?: string;
}

const DEFAULT_ROWS: ComparisonRow[] = [
  { feature: 'Flat-rate pricing (no hourly billing)',  us: true,  others: false },
  { feature: '1-Year parts & labor warranty',          us: true,  others: false },
  { feature: 'Same-day emergency service',             us: true,  others: 'Sometimes' },
  { feature: 'No service contracts required',          us: true,  others: false },
  { feature: 'Licensed & insured technicians',         us: true,  others: true },
  { feature: 'Upfront quote before work begins',       us: true,  others: false },
  { feature: 'All major brands serviced',              us: true,  others: 'Sometimes' },
  { feature: 'Satisfaction guarantee',                 us: true,  others: false },
];

function StatusIcon({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className={`${styles.icon} ${styles.iconYes}`} aria-label="Yes">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className={`${styles.icon} ${styles.iconNo}`} aria-label="No">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </span>
    );
  }
  return <span className={styles.iconMaybe}>{value}</span>;
}

export default function ValueComparison({ rows = DEFAULT_ROWS, title = 'Arctic Air vs. The Other Guys' }: ValueComparisonProps) {
  return (
    <section className={styles.section} aria-label="Value comparison">
      <div className={styles.container}>

        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className={styles.eyebrow}>Side by Side</span>
          <h2 className={styles.title}>{title}</h2>
        </motion.div>

        <div className={styles.colHeaders}>
          <div className={styles.colHeaderFeature} />
          <div className={styles.colHeaderUs}>
            <span className={styles.colLogoMark}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="2" x2="12" y2="22"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <polyline points="8 6 12 2 16 6"/>
                <polyline points="8 18 12 22 16 18"/>
                <polyline points="6 8 2 12 6 16"/>
                <polyline points="18 8 22 12 18 16"/>
              </svg>
            </span>
            Arctic Air
          </div>
          <div className={styles.colHeaderOthers}>Competitors</div>
        </div>

        <div className={styles.rowList}>
          {rows.map((row, i) => (
            <motion.div
              key={i}
              className={styles.compRow}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <span className={styles.featureLabel}>{row.feature}</span>
              <div className={styles.cellUs}><StatusIcon value={row.us} /></div>
              <div className={styles.cellOthers}><StatusIcon value={row.others} /></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.bottomStrip}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <span className={styles.stripText}>8 for 8. No fine print.</span>
          <a href="/contact" className={styles.stripCta}>Get Your Free Estimate →</a>
        </motion.div>

      </div>
    </section>
  );
}
