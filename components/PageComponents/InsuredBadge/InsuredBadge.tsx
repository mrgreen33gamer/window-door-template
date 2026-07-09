// components/PageComponents/InsuredBadge/InsuredBadge.tsx
// FINAL FIX: "Work With Us" CTA in bottomStrip now fires click tracking.
"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldAlt,
  faCheckCircle,
  faArrowRight,
  faBuilding,
  faBriefcase,
  faFileContract,
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';
import { useTrackEvent } from '&/useTrackEvent';

interface InsuredBadgeProps {
  variant?: 'section' | 'inline';
  ctaLink?: string;
}

const COVERAGES = [
  {
    icon: faShieldAlt,
    title: 'Professional Liability',
    detail: '$1,000,000 per claim / $2,000,000 aggregate',
  },
  {
    icon: faBuilding,
    title: 'Technology Services',
    detail: 'Web design, software, marketing & more',
  },
  {
    icon: faBriefcase,
    title: 'Cyber Insurance',
    detail: '$100,000 coverage included',
  },
  {
    icon: faFileContract,
    title: 'Insurer',
    detail: 'Next Insurance US Company — since 04/13/2026',
  },
];

const InsuredBadge: React.FC<InsuredBadgeProps> = ({
  variant = 'section',
  ctaLink = '/contact',
}) => {
  const trackEvent = useTrackEvent();

  if (variant === 'inline') {
    return (
      <div className={styles.inlineBadge}>
        <FontAwesomeIcon icon={faShieldAlt} className={styles.inlineIcon} />
        <span className={styles.inlineText}>
          Professionally Insured — $1M / $2M Professional Liability
        </span>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.shieldWrapper}>
            <div className={styles.shieldOuter}>
              <div className={styles.shieldInner}>
                <FontAwesomeIcon icon={faShieldAlt} className={styles.shieldIcon} />
              </div>
            </div>
            <div className={styles.shieldRing1} aria-hidden="true" />
            <div className={styles.shieldRing2} aria-hidden="true" />
          </div>

          <div className={styles.headerText}>
            <div className={styles.eyebrow}>
              <FontAwesomeIcon icon={faCheckCircle} />
              Verified & Active Coverage
            </div>
            <h2 className={styles.title}>We&apos;re Professionally Insured</h2>
            <p className={styles.subtitle}>
              Every project we take on is backed by professional liability insurance through
              Next Insurance US Company. You get peace of mind — and we get to work with integrity.
            </p>
          </div>
        </motion.div>

        {/* Coverage grid */}
        <div className={styles.coverageGrid}>
          {COVERAGES.map((item, i) => (
            <motion.div
              key={i}
              className={styles.coverageCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
            >
              <div className={styles.coverageIcon}>
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <div className={styles.coverageInfo}>
                <span className={styles.coverageTitle}>{item.title}</span>
                <span className={styles.coverageDetail}>{item.detail}</span>
              </div>
              <FontAwesomeIcon icon={faCheckCircle} className={styles.coverageCheck} />
            </motion.div>
          ))}
        </div>

        {/* Bottom strip */}
        <motion.div
          className={styles.bottomStrip}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className={styles.policyInfo}>
            <span className={styles.policyLabel}>Policy Number</span>
            <span className={styles.policyNum}>NXTVXJHYYL-00-PL</span>
          </div>
          <div className={styles.policyInfo}>
            <span className={styles.policyLabel}>Policy Start</span>
            <span className={styles.policyNum}>04/13/2026</span>
          </div>
          <div className={styles.policyInfo}>
            <span className={styles.policyLabel}>Insurer</span>
            <span className={styles.policyNum}>Next Insurance US Company</span>
          </div>
          <Link
            href={ctaLink}
            className={styles.ctaBtn}
            onClick={() => trackEvent({
              eventType:    'click',
              elementLabel: 'Work With Us',
              section:      'InsuredBadge',
            })}
          >
            Work With Us
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default InsuredBadge;
