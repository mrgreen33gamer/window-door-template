'use client';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './styles.module.scss';

interface Expectation {
  icon:        IconDefinition;
  title:       string;
  description: string;
}

interface WhatToExpectProps {
  sectionTitle?: string;
  expectations:  Expectation[];
}

export default function WhatToExpect({
  sectionTitle = 'How Every Service Call Works',
  expectations,
}: WhatToExpectProps) {
  return (
    <section className={styles.section} aria-label="What to expect">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>No Surprises</span>
          <h2 className={styles.title}>{sectionTitle}</h2>
          <p className={styles.subtitle}>
            From the moment you call to the moment we pack up, here's exactly what to expect.
          </p>
        </div>

        <div className={styles.steps}>
          {expectations.map((exp, i) => (
            <motion.div
              key={i}
              className={styles.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
            >
              <div className={styles.stepLeft}>
                <div className={styles.stepNum}>{String(i + 1).padStart(2, '0')}</div>
                {i < expectations.length - 1 && <div className={styles.connector} aria-hidden="true" />}
              </div>
              <div className={styles.stepRight}>
                <div className={styles.iconWrap} aria-hidden="true">
                  <FontAwesomeIcon icon={exp.icon} className={styles.iconSvg} />
                </div>
                <div className={styles.stepText}>
                  <h3 className={styles.stepTitle}>{exp.title}</h3>
                  <p className={styles.stepDesc}>{exp.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
