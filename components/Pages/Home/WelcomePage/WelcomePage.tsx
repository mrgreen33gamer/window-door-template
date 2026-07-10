// ClearView Welcome — unique "Opening Spec Rack" (not photo materials grid).
// CSS window/door constructions with unique glazing patterns. Zero stock photos.
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PhoneIcon, ChevronIcon, CheckIcon } from './_shared/icons';
import styles from './styles.module.scss';

type OpeningKind =
  | 'double-hung'
  | 'casement'
  | 'slider'
  | 'entry'
  | 'storm'
  | 'grid';

type Opening = {
  name: string;
  detail: string;
  kind: OpeningKind;
  frame: string;
  glass: string;
  sku: string;
};

const OPENINGS: Opening[] = [
  {
    name: 'Double-Hung',
    detail: 'Low-E double pane · tilt wash',
    kind: 'double-hung',
    frame: '#6b7280',
    glass: 'rgba(120, 180, 220, 0.35)',
    sku: 'CV-DH-01',
  },
  {
    name: 'Casement',
    detail: 'Multi-point lock · crank',
    kind: 'casement',
    frame: '#4b5563',
    glass: 'rgba(100, 170, 210, 0.4)',
    sku: 'CV-CS-03',
  },
  {
    name: 'Patio Slider',
    detail: '8′ opening · tempered',
    kind: 'slider',
    frame: '#374151',
    glass: 'rgba(90, 160, 200, 0.38)',
    sku: 'CV-PS-06',
  },
  {
    name: 'Entry Door',
    detail: 'Fiberglass · sidelites ready',
    kind: 'entry',
    frame: '#1f2937',
    glass: 'rgba(200, 180, 140, 0.25)',
    sku: 'CV-ED-02',
  },
  {
    name: 'Storm / Security',
    detail: 'Full-view · ventilated',
    kind: 'storm',
    frame: '#9ca3af',
    glass: 'rgba(160, 200, 230, 0.3)',
    sku: 'CV-ST-08',
  },
  {
    name: 'Colonial Grid',
    detail: 'SDL bars · 6-lite pattern',
    kind: 'grid',
    frame: '#d1d5db',
    glass: 'rgba(140, 190, 220, 0.42)',
    sku: 'CV-GR-05',
  },
];

function OpeningFace({ o }: { o: Opening }) {
  return (
    <div
      className={styles.openingFace}
      data-kind={o.kind}
      style={
        {
          '--o-frame': o.frame,
          '--o-glass': o.glass,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <div className={styles.openingFrame}>
        {o.kind === 'double-hung' && (
          <>
            <div className={styles.sashTop} />
            <div className={styles.sashBot} />
            <span className={styles.meetRail} />
          </>
        )}
        {o.kind === 'casement' && (
          <>
            <div className={styles.caseGlass} />
            <span className={styles.caseHinge} />
            <span className={styles.caseHandle} />
          </>
        )}
        {o.kind === 'slider' && (
          <>
            <div className={styles.slideFixed} />
            <div className={styles.slideMove} />
            <span className={styles.slideTrack} />
          </>
        )}
        {o.kind === 'entry' && (
          <>
            <div className={styles.doorPanel} />
            <div className={styles.doorLite} />
            <span className={styles.doorKnob} />
          </>
        )}
        {o.kind === 'storm' && (
          <>
            <div className={styles.stormGlass} />
            <span className={styles.stormBar} />
            <span className={styles.stormLatch} />
          </>
        )}
        {o.kind === 'grid' && (
          <>
            <div className={styles.gridGlass}>
              <i /><i /><i /><i /><i /><i />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function OpeningSpecRack() {
  return (
    <div className={styles.specRack} aria-label="ClearView window and door opening styles">
      <div className={styles.rackCap} aria-hidden="true">
        <span className={styles.rackBolt} />
        <span className={styles.rackBrand}>CLEARVIEW · OPENING RACK</span>
        <span className={styles.rackBolt} />
      </div>

      <header className={styles.rackHead}>
        <div>
          <p className={styles.rackEyebrow}>In-home measure board</p>
          <h2 className={styles.rackTitle}>Opening Specs</h2>
        </div>
        <span className={styles.rackMeta}>U-factor ready</span>
      </header>

      <ul className={styles.openingList} role="list">
        {OPENINGS.map((o, i) => (
          <motion.li
            key={o.sku}
            className={styles.openingRow}
            role="listitem"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.42,
              delay: 0.28 + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <OpeningFace o={o} />
            <div className={styles.openingCopy}>
              <div className={styles.openingNameRow}>
                <span className={styles.openingName}>{o.name}</span>
                <span className={styles.openingSku}>{o.sku}</span>
              </div>
              <span className={styles.openingDetail}>{o.detail}</span>
            </div>
            <span
              className={styles.frameChip}
              style={{ background: o.frame }}
              aria-hidden="true"
            />
          </motion.li>
        ))}
      </ul>

      <footer className={styles.rackFoot} aria-hidden="true">
        <span>Free in-home measure</span>
        <span className={styles.rackRule} />
        <span>10-yr install warranty</span>
      </footer>
    </div>
  );
}

export default function WelcomePage() {
  const badgeText = "Waco's Most Trusted Window & Door Company — Since 2012";
  const headlineLines = ['Clearer Views.', 'Lower Bills.'];
  const headlineAccent = 'ClearView.';
  const subheadline =
    'Flat-rate pricing. Free in-home measurements. Lifetime Product Warranty Support + 10-Year Installation Warranty. Serving Waco and Central Texas with factory-certified installers.';
  const primaryCta = { label: 'Call (254) 740-3300', href: 'tel:+12547403300' };
  const secondaryCta = { label: 'Free Estimate', href: '/contact' };
  const chips = [
    'Free Measurements',
    'No Contracts',
    'Factory-Certified',
    '14+ Yrs Local',
    '10-Yr Install Warranty',
  ];

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
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
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
          <OpeningSpecRack />
        </motion.div>
      </div>
    </section>
  );
}
