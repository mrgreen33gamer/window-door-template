'use client';
// components/BlogComponents/NewsletterSignup/NewsletterSignup.tsx
//
// USAGE:
//   <NewsletterSignup />                          → Variant 1 (natural inline, default)
//   <NewsletterSignup variant={1} />              → Variant 1 (natural inline)
//   <NewsletterSignup variant={2} spot="data-center-blog" /> → Variant 2 (dark banner)
//
// Props:
//   variant   1 | 2          — which visual style to render (default: 1)
//   spot      string         — identifier saved to MongoDB for segmentation
//   title     string         — override headline
//   body      string         — override body text
//   tag       string         — badge label (e.g. "Blog Updates" | "Newsletter")

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faArrowRight, faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';

interface NewsletterSignupProps {
  variant?: 1 | 2;
  spot?: string;
  title?: string;
  body?: string;
  tag?: string;
}

export default function NewsletterSignup({
  variant = 1,
  spot = 'blog-newsletter',
  title,
  body,
  tag,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const defaultTitle1 = 'Stay in the loop.';
  const defaultBody1  = 'Get fresh Central Texas business insights, web tips, and local updates — delivered straight to your inbox. No fluff, no spam.';
  const defaultTag1   = 'Blog Updates';

  const defaultTitle2 = 'Don\'t miss the next one.';
  const defaultBody2  = 'Join other Central Texas business owners getting practical web, marketing, and tech insights every month.';
  const defaultTag2   = 'Newsletter';

  const resolvedTitle = title ?? (variant === 2 ? defaultTitle2 : defaultTitle1);
  const resolvedBody  = body  ?? (variant === 2 ? defaultBody2  : defaultBody1);
  const resolvedTag   = tag   ?? (variant === 2 ? defaultTag2   : defaultTag1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), spot, variant }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message ?? 'Something went wrong.');
      }

      setStatus('success');
      setEmail('');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  // ── VARIANT 1 — natural inline ─────────────────────────────────────────────
  if (variant === 1) {
    return (
      <motion.section
        className={styles.v1Root}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        aria-label="Newsletter signup"
      >
        <div className={styles.v1Inner}>
          <span className={styles.eyebrow}>
            <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
            {resolvedTag}
          </span>
          <h2 className={styles.v1Title}>{resolvedTitle}</h2>
          <p className={styles.v1Body}>{resolvedBody}</p>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                className={styles.v1Success}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>You&apos;re in! Check your inbox for a confirmation.</span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className={styles.v1Form}
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <input
                  type="email"
                  className={styles.v1Input}
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  className={styles.v1Btn}
                  disabled={status === 'loading'}
                  aria-label="Subscribe"
                >
                  {status === 'loading'
                    ? <FontAwesomeIcon icon={faSpinner} spin />
                    : <><span>Subscribe</span><FontAwesomeIcon icon={faArrowRight} /></>
                  }
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {status === 'error' && (
            <p className={styles.v1Error} role="alert">{errorMsg}</p>
          )}

          <p className={styles.v1Fine}>No spam. Unsubscribe anytime.</p>
        </div>
      </motion.section>
    );
  }

  // ── VARIANT 2 — dark banner ────────────────────────────────────────────────
  return (
    <motion.section
      className={styles.v2Root}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      aria-label="Newsletter signup"
    >
      <div className={styles.v2Inner}>
        <div className={styles.v2Left}>
          <span className={styles.v2Tag}>{resolvedTag}</span>
          <h2 className={styles.v2Title}>{resolvedTitle}</h2>
          <p className={styles.v2Body}>{resolvedBody}</p>
        </div>

        <div className={styles.v2Right}>
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                className={styles.v2Success}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>You&apos;re subscribed!</span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className={styles.v2Form}
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <input
                  type="email"
                  className={styles.v2Input}
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  className={styles.v2Btn}
                  disabled={status === 'loading'}
                >
                  {status === 'loading'
                    ? <FontAwesomeIcon icon={faSpinner} spin />
                    : 'Get Updates'
                  }
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {status === 'error' && (
            <p className={styles.v2Error} role="alert">{errorMsg}</p>
          )}
          <p className={styles.v2Fine}>No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </motion.section>
  );
}