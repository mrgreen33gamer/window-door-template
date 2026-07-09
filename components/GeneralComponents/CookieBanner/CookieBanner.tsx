// components/GeneralComponents/CookieBanner/CookieBanner.tsx
// ✅ v10: Updated essential cookie description to accurately reflect first-party
//          page view and event tracking (stored on our own servers, never shared).
'use client';

import { useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield, faXmark, faCheck, faCookieBite } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';

type ConsentLevel = 'full' | 'essential' | 'declined';

function setCookieConsent(level: ConsentLevel) {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `sa_consent=${level};max-age=${maxAge};path=/;samesite=lax`;
}

const CookieBanner: React.FC = () => {
  const [show, setShow]         = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('cookieConsent');
    if (stored === null) setShow(true);
  }, []);

  const trackConsent = async (level: ConsentLevel) => {
    const parser = new UAParser();
    const ua     = parser.getResult();
    try {
      await fetch('/api/trackConsent', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          consent:         level !== 'declined',
          consentLevel:    level,
          deviceType:      ua.device.type  ?? 'desktop',
          operatingSystem: ua.os.name      ?? 'Unknown',
          browserType:     ua.browser.name ?? 'Unknown',
          referrer:        document.referrer || null,
          timestamp:       new Date().toISOString(),
          url:             window.location.pathname,
        }),
      });
    } catch { /* non-critical */ }
  };

  const applyConsent = (level: ConsentLevel) => {
    localStorage.setItem('cookieConsent', level === 'full' ? 'true' : 'false');
    setCookieConsent(level);
    window.dispatchEvent(new Event('storage'));
    trackConsent(level);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          aria-live="polite"
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-desc"
        >
          <motion.div
            className={styles.card}
            initial={{ y: 28, opacity: 0, scale: 0.97 }}
            animate={{ y: 0,  opacity: 1, scale: 1    }}
            exit={{    y: 16, opacity: 0, scale: 0.98  }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.iconWrap} aria-hidden="true">
                <FontAwesomeIcon icon={faCookieBite} />
              </div>
              <div>
                <p className={styles.title} id="cookie-banner-title">
                  Cookie Preferences
                </p>
                <p className={styles.sub}>Arctic Air Template</p>
              </div>
            </div>

            {/* Body */}
            <p className={styles.body} id="cookie-banner-desc">
              We use essential cookies to keep the site running and optional analytics cookies
              to understand how visitors use our site. No data is sold or shared with advertisers.
            </p>

            {/* Expandable details */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  className={styles.details}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                >
                  <div className={styles.cookieRow}>
                    <span className={styles.cookieName}>Essential cookies</span>
                    <span className={styles.cookieBadgeOn}>Always on</span>
                    {/* ✅ v10: Updated description to mention first-party analytics */}
                    <p className={styles.cookieDesc}>
                      Session management, security tokens, cookie consent record, and anonymous
                      first-party page-view analytics stored on our own servers only — never
                      shared with third parties.
                    </p>
                  </div>
                  <div className={styles.cookieRow}>
                    <span className={styles.cookieName}>Analytics (Google Analytics 4)</span>
                    <span className={styles.cookieBadgeOpt}>Optional</span>
                    <p className={styles.cookieDesc}>
                      Anonymous page-view data sent to Google to improve content. Never used
                      for ad targeting. Only active if you choose "Accept all."
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              className={styles.toggleDetails}
              onClick={() => setExpanded(v => !v)}
              aria-expanded={expanded}
            >
              {expanded ? 'Hide details' : 'View cookie details'}
            </button>

            {/* Actions */}
            <div className={styles.actions}>
              <button
                className={styles.btnDecline}
                onClick={() => applyConsent('declined')}
                aria-label="Decline optional cookies"
              >
                <FontAwesomeIcon icon={faXmark} />
                Decline
              </button>
              <button
                className={styles.btnEssential}
                onClick={() => applyConsent('essential')}
                aria-label="Accept essential cookies only"
              >
                <FontAwesomeIcon icon={faShield} />
                Essential only
              </button>
              <button
                className={styles.btnAccept}
                onClick={() => applyConsent('full')}
                aria-label="Accept all cookies"
              >
                <FontAwesomeIcon icon={faCheck} />
                Accept all
              </button>
            </div>

            <p className={styles.legal}>
              By continuing to use our site you agree to our{' '}
              <a href="/privacy-policy" className={styles.legalLink}>Privacy Policy</a>.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
