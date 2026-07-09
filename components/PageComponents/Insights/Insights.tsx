// PageComponents/Insights/Insights.tsx
"use client";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import styles from './styles.module.scss';

interface InsightStat {
  icon: IconProp;
  value: number;
  label: string;
  duration?: number;
  countUpProps?: { suffix?: string; separator?: string };
}

interface InsightsProps {
  cityName: string;
  insights: InsightStat[];
  ctaText?: string;
  ctaLink?: string;
}

const formatNumber = (value: number): string => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}k`;
  }
  return value.toString();
};

export default function Insights({
  cityName,
  insights,
  ctaText = "Get Your Free Quote Today",
  ctaLink = "/contact",
}: InsightsProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Proven Impact</span>
          <h2 className={styles.sectionTitle}>Some Numbers</h2>
          <p className={styles.subtitle}>
            Real metrics from real work across Central Texas. Our services were made to satisfy your digital projects.
          </p>
        </div>

        {/* Stats grid */}
        <div className={styles.statsGrid}>
          {insights.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
              viewport={{ once: true }}
              className={styles.card}
            >
              <div className={styles.iconCircle} aria-hidden="true">
                <FontAwesomeIcon icon={stat.icon} className={styles.icon} />
              </div>
              <CountUp
                className={styles.number}
                end={stat.value}
                duration={stat.duration || 2.5}
                formattingFn={stat.value >= 1000 ? formatNumber : undefined}
                enableScrollSpy
                scrollSpyOnce
                {...stat.countUpProps}
              />
              <p className={styles.label}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.ctaWrap}>
          <Link href={ctaLink} className={styles.ctaButton}>
            {ctaText}
          </Link>
        </div>

      </div>
    </section>
  );
}