'use client';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './styles.module.scss';

interface Step {
  icon:  IconDefinition;
  number: string | number;
  title: string;
  description:  string;
}

interface ProcessTimelineProps {
  steps: Step[];
  cityName?: string;
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <section className={styles.section} aria-label="Our process">
      <div className={styles.container}>

        <motion.div
          className={styles.introBlock}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.tag}>
            <span className={styles.tagDot} />
            How It Works
          </span>
          <h2 className={styles.title}>
            Fixed in <span className={styles.accent}>4 Simple Steps</span>
          </h2>
          <p className={styles.sub}>
            No runaround. No hidden charges. Just fast, professional HVAC service from call to completion.
          </p>
        </motion.div>

        <div className={styles.steps}>
          {/* Connector line */}
          <div className={styles.connectorLine} aria-hidden="true" />

          {steps.map((s, i) => (
            <motion.div
              key={s.number}
              className={styles.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -28 : 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={styles.stepLeft}>
                <div className={styles.iconWrap}>
                  <FontAwesomeIcon icon={s.icon} className={styles.icon} />
                  <span className={styles.stepNum}>{s.number}</span>
                </div>
              </div>
              <div className={styles.stepCard}>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepBody}>{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
