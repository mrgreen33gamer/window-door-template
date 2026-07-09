'use client';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './styles.module.scss';

interface Feature {
  icon:        IconDefinition;
  title:       string;
  description: string;
}

interface WhyChooseUsProps {
  cityName:  string;
  features:  Feature[];
  title?:    string;
}

export default function WhyChooseUs({
  cityName,
  features,
  title = 'Why Central Texas Chooses Arctic Air',
}: WhyChooseUsProps) {
  return (
    <section className={styles.section} aria-label="Why choose us">
      <div className={styles.container}>

        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className={styles.eyebrow}>The Arctic Air Difference</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>
            There's no shortage of HVAC companies in {cityName}. Here's why thousands of homeowners call us first.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {features.map((feat, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
            >
              <div className={styles.iconRow}>
                <div className={styles.iconWrap} aria-hidden="true">
                  <FontAwesomeIcon icon={feat.icon} className={styles.iconSvg} />
                </div>
                <div className={styles.check} aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              </div>
              <h3 className={styles.cardTitle}>{feat.title}</h3>
              <p className={styles.cardDesc}>{feat.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
