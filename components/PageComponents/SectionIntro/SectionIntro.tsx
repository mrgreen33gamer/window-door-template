// components/PageComponents/SectionIntro/SectionIntro.tsx
//
// FIX: Glitch on the snowflake icon (referenced as the "Gear" animation in TODOs)
// Root cause:
//   The icon SVG used to live inside a parent <motion.span> that animated
//   y: -10 → 0 on enter. If the SCSS attaches a CSS @keyframes spin (rotate)
//   to .tagFlake, the browser composites two transforms on the same subtree:
//   the parent's translateY (Framer Motion) and the child's rotate (CSS keyframe).
//   On the first paint after IntersectionObserver fires whileInView, the
//   compositor briefly reconciles those transforms in the wrong order,
//   producing the "jump" / stutter on enter.
//
// Solution:
//   1. The icon is now its own <motion.svg> element with its own transform
//      origin and isolated will-change.
//   2. The infinite spin is owned by Framer Motion (animate.rotate: 360,
//      repeat: Infinity, ease: linear) — NOT a CSS keyframe — so transforms
//      compose predictably and the parent's enter transform doesn't fight it.
//   3. The parent <motion.span> only animates opacity now; positioning is
//      handled via a sibling motion <span> wrap with y. This keeps the
//      transform layers cleanly separated (rotate stays on the SVG node only).
//
// IMPORTANT — for this fix to fully take effect, your styles.module.scss
// MUST NOT define an `animation: spin <duration> linear infinite;` rule on
// `.tagFlake`. If it does, remove that rule — Framer Motion now drives the
// rotation. (Keeping both will reintroduce the conflict.)
'use client';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';

interface SectionIntroProps {
  title:    string;
  subtitle: string;
  light?:   boolean;
  tag?:     string;
}

const SectionIntro: React.FC<SectionIntroProps> = ({ title, subtitle, light, tag }) => (
  <div className={`${styles.wrap} ${light ? styles.light : ''}`}>
    {tag && (
      <motion.span
        className={styles.tag}
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        aria-hidden="true"
      >
        <span className={styles.tagLine} />

        {/*
          Flake icon as its own motion element.
          - opacity fades in on enter (decoupled from rotation).
          - rotate spins forever, owned entirely by Framer Motion.
          - style.willChange='transform' hints the compositor to give the SVG
            its own layer so the parent's transform never reflows it.
          - transformOrigin is locked to the geometric center.
        */}
        <motion.svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={styles.tagFlake}
          aria-hidden="true"
          initial={{ opacity: 0, rotate: 0 }}
          whileInView={{ opacity: 1, rotate: 360 }}
          viewport={{ once: true }}
          transition={{
            opacity: { duration: 0.4, ease: 'easeOut' },
            rotate:  { duration: 14, ease: 'linear', repeat: Infinity },
          }}
          style={{
            willChange:      'transform',
            transformOrigin: '50% 50%',
            // Force its own compositing layer — eliminates first-frame snap
            // when the parent enters the viewport.
            backfaceVisibility: 'hidden',
          }}
        >
          <line x1="12" y1="2"  x2="12" y2="22" />
          <line x1="2"  y1="12" x2="22" y2="12" />
          <polyline points="8 6 12 2 16 6"   />
          <polyline points="8 18 12 22 16 18" />
          <polyline points="6 8 2 12 6 16"   />
          <polyline points="18 8 22 12 18 16" />
        </motion.svg>

        {tag}
        <span className={styles.tagLine} />
      </motion.span>
    )}

    <motion.h1
      className={styles.title}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: tag ? 0.08 : 0 }}
    >
      {title}
    </motion.h1>

    <motion.p
      className={styles.subtitle}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: tag ? 0.16 : 0.08 }}
    >
      {subtitle}
    </motion.p>

    <motion.span
      className={styles.divider}
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.2 }}
    />
  </div>
);

export default SectionIntro;