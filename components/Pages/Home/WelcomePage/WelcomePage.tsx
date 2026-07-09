// _archetype-library/hero-d-materials-grid/Component.tsx
//
// Hero D: Materials Grid — left copy, right mosaic of material swatches.
// Color tiles from materials[].swatch + name; optional imageSrc; staggered reveal.
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PhoneIcon, ChevronIcon, CheckIcon } from './_shared/icons';
import styles from './styles.module.scss';

function MaterialsMosaic({
  materials,
}: {
  materials: Array<{ name: string; swatch: string; imageSrc?: string }>;
}) {
  // Window frame mockups with glass panes
  return (
    <div className={styles.windowGrid} role="list" aria-label="Window & door styles">
      <div className={styles.windowGridHeader} aria-hidden="true">
        <span className={styles.windowGridTitle}>Opening Styles</span>
        <span className={styles.windowGridMeta}>Measured & sealed</span>
      </div>
      <div className={styles.windowGridInner}>
        {materials.map((m, i) => {
          const isDoor = i === 3 || i === 4; // Entry / Storm
          return (
            <motion.div
              key={`${m.name}-${i}`}
              className={`${styles.windowCard} ${isDoor ? styles.doorStyle : ''}`}
              role="listitem"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.45,
                delay: 0.32 + i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className={styles.windowFrame} style={{ borderColor: m.swatch }}>
                <div className={styles.windowMullion} aria-hidden="true">
                  <span className={styles.mullionV} />
                  {!isDoor ? <span className={styles.mullionH} /> : null}
                </div>
                <div
                  className={styles.glassPane}
                  style={{ backgroundColor: m.swatch }}
                >
                  {m.imageSrc ? (
                    <img
                      src={m.imageSrc}
                      alt=""
                      className={styles.glassImage}
                      draggable={false}
                    />
                  ) : null}
                  <div className={styles.glassShine} aria-hidden="true" />
                </div>
              </div>
              <div className={styles.windowMeta}>
                <span className={styles.windowName}>{m.name}</span>
                <span className={styles.windowSku}>CV-{String(i + 1).padStart(2, '0')}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function WelcomePage() {
const badgeText = 'Waco\'s Most Trusted Window & Door Company — Since 2012';
const headlineLines = [
  'Clearer Views.',
  'Lower Bills.',
];
const headlineAccent = 'ClearView.';
const subheadline = 'Flat-rate pricing. Free in-home measurements. Lifetime Product Warranty Support + 10-Year Installation Warranty. Serving Waco and Central Texas with factory-certified installers.';
const primaryCta = { label: 'Call (254) 740-3300', href: 'tel:+12547403300' };
const secondaryCta = { label: 'Free Estimate', href: '/contact' };
const chips = [
  'Free Measurements',
  'No Contracts',
  'Factory-Certified',
  '14+ Yrs Local',
  '10-Yr Install Warranty',
];
const stats = [
  {
    "value": "3,500+",
    "label": "Installs Completed"
  },
  {
    "value": "4.9 ★",
    "label": "Google Rating"
  },
  {
    "value": "10-Year",
    "label": "Install Warranty"
  },
  {
    "value": "Same-Day",
    "label": "Service Available"
  }
];
const meterTarget = 72;
const meterTopLabel = "Featured";
const meterMidLabel = "Popular";
const meterBotLabel = "Classic";
const particleColor = '#64748b';
const beforeImageSrc = '/pages/home/welcome/before.jpg';
const afterImageSrc = '/pages/home/welcome/after.jpg';
const beforeLabel = "Drafty single";
const afterLabel = "Quiet & tight";
const mapCenterLabel = 'Service HQ';
const mapPins = [
  { label: 'Waco', x: 42, y: 48 },
  { label: 'Temple', x: 68, y: 62 },
  { label: 'Killeen', x: 58, y: 72 },
];
const coverageLabel = 'Central Texas coverage';
const materials = [
  { name: "Double Pane", swatch: "#64748b", imageSrc: "/pages/home/welcome/mat-1.jpg" },
  { name: "Triple*", swatch: "#94a3b8", imageSrc: "/pages/home/welcome/mat-2.jpg" },
  { name: "Patio", swatch: "#475569", imageSrc: "/pages/home/welcome/mat-3.jpg" },
  { name: "Entry", swatch: "#cbd5e1", imageSrc: "/pages/home/welcome/mat-1.jpg" },
  { name: "Storm", swatch: "#334155", imageSrc: "/pages/home/welcome/mat-2.jpg" },
  { name: "Custom Grid", swatch: "#1e293b", imageSrc: "/pages/home/welcome/mat-3.jpg" }
];
const quote = "Street noise dropped and the kitchen stays warmer. Install crew was meticulous on trim.";
const authorName = "Alicia F.";
const authorMeta = "Window replace · Hewitt";
const rating = 5;
const schematicLabel = "ClearView schematic";
const gauges = [
  { label: "Openings", value: "5,600+" },
  { label: "Rating", value: "4.9 ★" },
  { label: "Measure", value: "Free" },
  { label: "Warranty", value: "Mfr + labor" }
];
const toggles = [
  { label: "Showroom open", on: true },
  { label: "Samples ready", on: true },
  { label: "Install crews", on: true }
];
const textureSrc = '/pages/home/welcome/hero-main.jpg';
const textureAlt = 'Texture';
const accentWord = "ClearView";

  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.shard} aria-hidden="true" />

      <div className={styles.layout}>
        <div className={styles.content}>
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.badgeDot} />
            {badgeText}
          </motion.div>

          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {headlineLines.map((line, i) => (
              <React.Fragment key={i}>{line}<br /></React.Fragment>
            ))}
            <span className={styles.accentLine}>{headlineAccent}</span>
          </motion.h1>

          <motion.p
            className={styles.sub}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
          >
            {subheadline}
          </motion.p>

          <motion.div
            className={styles.ctaRow}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.34 }}
          >
            <a href={primaryCta.href} className={styles.ctaPrimary}>
              <PhoneIcon size={15} /> {primaryCta.label}
            </a>
            <Link href={secondaryCta.href} className={styles.ctaSecondary}>
              {secondaryCta.label} <ChevronIcon size={12} />
            </Link>
          </motion.div>

          <motion.div
            className={styles.chips}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.48 }}
          >
            {chips.map((c) => (
              <span key={c} className={styles.chip}>
                <CheckIcon size={9} /> {c}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
        >
          <MaterialsMosaic materials={materials} />
        </motion.div>
      </div>
    </section>
  );
}
