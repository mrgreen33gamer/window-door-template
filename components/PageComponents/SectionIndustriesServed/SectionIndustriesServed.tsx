// components\PageComponents\SectionIndustriesServed\SectionIndustriesServed.tsx
// components/PageComponents/SectionIndustriesServed/SectionIndustriesServed.tsx
"use client";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCar,
  faPlane,
  faHardHat,
  faBolt,
  faLandmark,
  faFan,
  faIndustry,
  faOilWell,
  faWrench,
  faHouse,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';

// ── INDUSTRY DATA ────────────────────────────────────────────────────────────
// Each entry maps to an existing /industries/* route.
// Add / remove entries here as new industry pages are created.
const INDUSTRIES = [
  { slug: 'automotive',    label: 'Automotive',    icon: faCar },
  { slug: 'aviation',      label: 'Aviation',      icon: faPlane },
  { slug: 'construction',  label: 'Construction',  icon: faHardHat },
  { slug: 'electrical',    label: 'Electrical',    icon: faBolt },
  { slug: 'finance',       label: 'Finance',       icon: faLandmark },
  { slug: 'hvac',          label: 'HVAC',          icon: faFan },
  { slug: 'manufacturing', label: 'Manufacturing', icon: faIndustry },
  { slug: 'oil-gas',       label: 'Oil & Gas',     icon: faOilWell },
  { slug: 'plumbing',      label: 'Plumbing',      icon: faWrench },
  { slug: 'roofing',       label: 'Roofing',       icon: faHouse },
];

interface SectionIndustriesServedProps {
  /** Optional override headline */
  title?: string;
  /** Optional override subheadline */
  subtitle?: string;
  /**
   * When true the cards are NOT wrapped in <Link> tags.
   * Useful if you embed this component inside an industry page itself
   * and don't want the active industry linking to itself.
   * Default: false (links enabled).
   */
  disableLinks?: boolean;
}

export default function SectionIndustriesServed({
  title = 'Industries We Serve Across Texas',
  subtitle = 'Specialised digital solutions — built for how your industry actually works.',
  disableLinks = false,
}: SectionIndustriesServedProps) {
  return (
    <section className={styles.section}>

      {/* ── HEADER ── */}
      <div className={styles.header}>
        <h2 className={styles.heading}>{title}</h2>
        <p className={styles.sub}>{subtitle}</p>
      </div>

      {/* ── INDUSTRY CARDS GRID ── */}
      <div className={styles.grid}>
        {INDUSTRIES.map(({ slug, label, icon }) => {
          const card = (
            <div className={styles.card} key={slug}>
              <div className={styles.iconWrapper}>
                <FontAwesomeIcon icon={icon} className={styles.industryIcon} />
              </div>
              <span className={styles.industryLabel}>{label}</span>
              {!disableLinks && (
                <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
              )}
            </div>
          );

          return disableLinks ? (
            card
          ) : (
            <Link
              key={slug}
              href={`/industries/${slug}`}
              className={styles.cardLink}
              aria-label={`Learn about our ${label} industry services`}
            >
              {card}
            </Link>
          );
        })}
      </div>

    </section>
  );
}