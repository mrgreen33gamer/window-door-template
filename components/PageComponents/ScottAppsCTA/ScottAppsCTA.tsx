// components/PageComponents/ScottAppsCTA/ScottAppsCTA.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faFileInvoiceDollar,
  faCheckCircle,
  faRocket,
  faBolt,
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';

interface ScottAppsCTAProps {
  /** Override the headline */
  headline?: string;
  /** Override the subline */
  subline?: string;
  /** Whether to show compact (inline) or full hero layout */
  variant?: 'full' | 'compact';
}

const FEATURES = [
  'Send invoices in under 60 seconds',
  'Built for small businesses & freelancers',
  'Automated payment reminders',
  'Professional PDF exports',
];

const ScottAppsCTA: React.FC<ScottAppsCTAProps> = ({
  headline = 'Invoicing Software Built for Your Business',
  subline = 'We didn\'t just build websites — we built tools. Scott Apps is our own invoicing platform designed for small businesses, freelancers, and contractors who need professional invoicing without the complexity.',
  variant = 'full',
}) => {
  return (
    <section className={`${styles.section} ${variant === 'compact' ? styles.compact : ''}`}>
      <div className={styles.container}>

        {/* Left — text side */}
        <div className={styles.textSide}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <div className={styles.eyebrow}>
              <FontAwesomeIcon icon={faFileInvoiceDollar} />
              <span>Scott Apps — Our Own Product</span>
            </div>

            <h2 className={styles.headline}>{headline}</h2>
            <p className={styles.subline}>{subline}</p>

            <ul className={styles.featureList}>
              {FEATURES.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                >
                  <FontAwesomeIcon icon={faCheckCircle} className={styles.checkIcon} />
                  {f}
                </motion.li>
              ))}
            </ul>

            <div className={styles.ctaRow}>
              <Link
                href="https://scottapps.com/invoicing"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                Try It Free
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <Link href="/projects" className={styles.btnGhost}>
                See All Our Work
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right — product visual */}
        <motion.div
          className={styles.visualSide}
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <div className={styles.productCard}>
            {/* Mock invoice UI */}
            <div className={styles.cardHeader}>
              <div className={styles.cardBrand}>
                <FontAwesomeIcon icon={faFileInvoiceDollar} />
                <span>scottapps.com</span>
              </div>
              <div className={styles.cardBadge}>
                <FontAwesomeIcon icon={faBolt} />
                Live
              </div>
            </div>

            <div className={styles.invoicePreview}>
              <div className={styles.invoiceTop}>
                <div>
                  <div className={styles.invoiceLabel}>INVOICE</div>
                  <div className={styles.invoiceNum}>#INV-2024-001</div>
                </div>
                <div className={styles.invoiceStatusPaid}>PAID</div>
              </div>

              <div className={styles.invoiceLine}>
                <div className={styles.lineItem}>
                  <span className={styles.itemName}>Website Design</span>
                  <span className={styles.itemAmt}>$2,400.00</span>
                </div>
                <div className={styles.lineItem}>
                  <span className={styles.itemName}>SEO Setup (3 mo.)</span>
                  <span className={styles.itemAmt}>$900.00</span>
                </div>
                <div className={styles.lineItem}>
                  <span className={styles.itemName}>Graphic Design Package</span>
                  <span className={styles.itemAmt}>$650.00</span>
                </div>
              </div>

              <div className={styles.invoiceTotal}>
                <span>Total</span>
                <span>$3,950.00</span>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.footerStat}>
                <span className={styles.statNum}>2m</span>
                <span className={styles.statLabel}>avg send time</span>
              </div>
              <div className={styles.footerDivider} />
              <div className={styles.footerStat}>
                <span className={styles.statNum}>100%</span>
                <span className={styles.statLabel}>professional</span>
              </div>
              <div className={styles.footerDivider} />
              <div className={styles.footerStat}>
                <span className={styles.statNum}>Free</span>
                <span className={styles.statLabel}>to start</span>
              </div>
            </div>
          </div>

          {/* Decorative glow */}
          <div className={styles.glow} aria-hidden="true" />
        </motion.div>

      </div>
    </section>
  );
};

export default ScottAppsCTA;