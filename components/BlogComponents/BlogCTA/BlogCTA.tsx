// components/BlogComponents/BlogCTA/BlogCTA.tsx
// FINAL FIX: Added useTrackEvent — fires 'click' event when the bottom-of-post CTA is clicked.
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './styles.module.scss';
import { useTrackEvent } from '&/useTrackEvent';

interface BlogCTAProps {
  title:       string;
  body:        string;
  buttonText:  string;
  buttonHref:  string;
}

export default function BlogCTA({ title, body, buttonText, buttonHref }: BlogCTAProps) {
  const trackEvent = useTrackEvent();

  return (
    <motion.section
      className={styles.cta}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Ready to grow?</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.body}>{body}</p>
        <Link
          href={buttonHref}
          className={styles.button}
          onClick={() => trackEvent({
            eventType:    'click',
            elementLabel: buttonText,
            section:      'BlogCTA',
          })}
        >
          {buttonText}
        </Link>
      </div>
    </motion.section>
  );
}
