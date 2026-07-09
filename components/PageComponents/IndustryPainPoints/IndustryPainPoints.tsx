// components/PageComponents/IndustryPainPoints/IndustryPainPoints.tsx
// FIX9: CTA button now fires 'click' tracking.
"use client";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";
import { useTrackEvent } from '&/useTrackEvent';

export interface PainPoint {
  icon:        IconDefinition;
  problem:     string;
  consequence: string;
}

interface IndustryPainPointsProps {
  industry:   string;
  painPoints: PainPoint[];
  ctaText?:   string;
  ctaLink?:   string;
}

export default function IndustryPainPoints({
  industry,
  painPoints,
  ctaText = "Let's Fix That",
  ctaLink = "/contact",
}: IndustryPainPointsProps) {
  const trackEvent = useTrackEvent();

  return (
    <section className={styles.wrapper}>
      <div className={styles.inner}>

        <div className={styles.header}>
          <span className={styles.eyebrow}>Sound familiar?</span>
          <h2 className={styles.headline}>
            The digital problems most <em>{industry}</em> businesses are stuck with
          </h2>
          <p className={styles.subline}>
            These aren&apos;t abstract problems — they&apos;re costing real jobs, real leads, and real revenue every week.
          </p>
        </div>

        <div className={styles.grid}>
          {painPoints.map((point, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <div className={styles.iconRing}>
                <FontAwesomeIcon icon={point.icon} className={styles.icon} />
              </div>
              <div className={styles.cardBody}>
                <p className={styles.problem}>{point.problem}</p>
                <p className={styles.consequence}>{point.consequence}</p>
              </div>
              <div className={styles.solved}>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>We fix this</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href={ctaLink}
            className={styles.ctaBtn}
            onClick={() => trackEvent({
              eventType:    'click',
              elementLabel: ctaText,
              section:      'IndustryPainPoints',
            })}
          >
            {ctaText} →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
