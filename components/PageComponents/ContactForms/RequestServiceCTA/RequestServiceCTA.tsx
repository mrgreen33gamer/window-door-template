// components/PageComponents/ContactForms/RequestServiceCTA/RequestServiceCTA.tsx
// FINAL FIX: Added useTrackEvent — "Get My Free Quote" CTA fires 'click' with selected services.
"use client";
import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobe, faCodeBranch, faImagePortrait, faBullhorn,
  faRobot, faCubesStacked, faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';
import { useTrackEvent } from '&/useTrackEvent';

interface Service {
  icon:  any;
  label: string;
}

interface RequestServiceCTAProps {
  headline?: string;
  subline?:  string;
  ctaLabel?: string;
}

const SERVICES: Service[] = [
  { icon: faGlobe,         label: 'Web Design' },
  { icon: faCodeBranch,    label: 'Custom Software' },
  { icon: faImagePortrait, label: 'Graphic Design' },
  { icon: faBullhorn,      label: 'Marketing / SEO' },
  { icon: faRobot,         label: 'AI Automations' },
  { icon: faCubesStacked,  label: '3D Modeling' },
];

export default function RequestServiceCTA({
  headline = "Let's Build Something That Actually Works.",
  subline  = "Pick the services you're interested in — we'll put together a custom proposal tailored to your business.",
  ctaLabel = "Get My Free Quote",
}: RequestServiceCTAProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const trackEvent = useTrackEvent();

  const toggle = (label: string) => {
    setSelected(prev =>
      prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
    );
  };

  const href = selected.length > 0
    ? `/contact?services=${encodeURIComponent(selected.join(','))}`
    : '/contact';

  const handleCtaClick = () => {
    trackEvent({
      eventType:    'click',
      elementLabel: selected.length > 0
        ? `${ctaLabel} (${selected.join(', ')})`
        : ctaLabel,
      section:      'RequestServiceCTA',
    });
  };

  return (
    <section className={styles.section} aria-label="Request a Service">
      {/* Ambient orb */}
      <div className={styles.orb} aria-hidden="true" />

      <div className={styles.container}>

        {/* Text block */}
        <motion.div
          className={styles.textBlock}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h2 className={styles.headline}>{headline}</h2>
          <p className={styles.subline}>{subline}</p>
        </motion.div>

        {/* Service picker */}
        <motion.div
          className={styles.pickerBlock}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.1, duration: 0.55, ease: "easeOut" }}
        >
          <p className={styles.pickerLabel}>
            {selected.length === 0
              ? "What are you looking for?"
              : `${selected.length} service${selected.length > 1 ? 's' : ''} selected`}
          </p>

          <div className={styles.chips}>
            {SERVICES.map(({ icon, label }, i) => (
              <motion.button
                key={label}
                type="button"
                className={`${styles.chip} ${selected.includes(label) ? styles.chipActive : ''}`}
                onClick={() => toggle(label)}
                aria-pressed={selected.includes(label)}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 + 0.15, duration: 0.35, ease: "easeOut" }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className={styles.chipIconWrap} aria-hidden="true">
                  <FontAwesomeIcon icon={icon} />
                </span>
                <span className={styles.chipLabel}>{label}</span>
                {selected.includes(label) && (
                  <motion.span
                    className={styles.checkDot}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    aria-hidden="true"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            className={styles.ctaWrap}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Link
              href={href}
              className={`${styles.ctaBtn} ${selected.length > 0 ? styles.ctaBtnActive : ''}`}
              onClick={handleCtaClick}
            >
              <span>{ctaLabel}</span>
              <FontAwesomeIcon icon={faArrowRight} className={styles.ctaArrow} />
            </Link>

            {selected.length === 0 && (
              <p className={styles.ctaHint}>Select services above for a faster quote</p>
            )}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
