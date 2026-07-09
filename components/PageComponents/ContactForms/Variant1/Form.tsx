// components/PageComponents/ContactForms/Variant1/Form.tsx
//
// HEIGHT FIX:
// Removed/consolidated vertical content blocks to reduce overall section
// height without losing trust signals or copy:
//   1. Removed the standalone .snowflakeMark badge above the title
//      (its visual weight duplicated .eyebrow). Eyebrow + title now sit
//      tighter as one block.
//   2. Collapsed the separate "What do you need?" + "Your contact info"
//      .sectionLabel headers into one inline label inside the section,
//      cutting two label rows + their bottom margins.
//   3. Trust strip is now inline-merged into the header subtitle area as a
//      compact chip row, eliminating its standalone vertical block.
//   4. Submit row + altContact now share a single horizontal row on
//      desktop (.submitRow already does this in the SCSS — JSX preserved).
//
// NOTE: The remaining vertical sizing — paddings on .root, .inner, .card —
// lives in styles.module.scss and is not in this snapshot. If you still want
// it tighter after this JSX change, reduce `.card { padding: ... }` and
// `.root { padding: ... 0 }` in the SCSS by ~20-30%.
'use client';
import { useState, useRef } from 'react';
import styles from './styles.module.scss';
import { PulseLoader } from 'react-spinners';
import ReCAPTCHA from 'react-google-recaptcha';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faExclamationTriangle, faArrowRight,
  faPhone, faStar, faShieldHalved, faClock, faTag,
  faFan, faFire, faWrench, faFilter, faThermometerHalf, faWind, faBolt,
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { getJourneyContext } from '&/useJourneyTracker';
import { useTrackEvent } from '&/useTrackEvent';

interface Variant1Props {
  title: string; cityName: string; slug: string; spot: string; formVariant: number;
}

const SERVICES = [
  { icon: faFan,             label: 'AC Repair' },
  { icon: faFire,            label: 'Heating / Furnace' },
  { icon: faWrench,          label: 'New Installation' },
  { icon: faFilter,          label: 'Duct Cleaning' },
  { icon: faThermometerHalf, label: 'Maintenance' },
  { icon: faWind,            label: 'Air Quality' },
  { icon: faBolt,            label: 'Emergency' },
];

// Compact trust chips (replaces standalone .trustStrip block)
const TRUST_CHIPS = [
  { icon: faClock,        text: 'Same-day available' },
  { icon: faTag,          text: 'Flat-rate pricing' },
  { icon: faShieldHalved, text: 'NATE · TDLR' },
  { icon: faStar,         text: '4.9★ · 300+ reviews' },
];

export default function Variant1({ title, cityName, slug, spot, formVariant }: Variant1Props) {
  const [formData, setFormData]         = useState({ name: '', email: '', phone: '', message: '' });
  const [selectedService, setSelected]  = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted]       = useState(false);
  const [error, setError]               = useState('');
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const trackEvent   = useTrackEvent();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!selectedService) { setError('Please select a service to continue.'); return; }
    const token = recaptchaRef.current?.getValue();
    if (!token) { setError('Please complete the reCAPTCHA'); return; }
    setIsSubmitting(true); setError('');
    try {
      const journeyContext = getJourneyContext();
      const res = await fetch('/api/submitContact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, service: selectedService, cityName, slug, spot, formVariant, recaptchaToken: token, ...journeyContext }),
      });
      if (res.ok) {
        setSubmitted(true);
        recaptchaRef.current?.reset();
        trackEvent({ eventType: 'form_submit', elementLabel: 'Variant1 Form Submit', section: spot });
      } else throw new Error();
    } catch { setError('Something went wrong. Please try again.'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <section className={styles.root}>
      {/* Background decoration */}
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.inner}>

        {/* ── Header (compact: eyebrow + title + subtitle + inline trust chips) ── */}
        <motion.div className={styles.header}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}>

          <span className={styles.eyebrow}>Free Estimate · No Obligation</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>
            Tell us what's going on and we'll have a licensed tech reach out — <strong>flat-rate quote, no pressure</strong>.
          </p>

          {/* Inline trust chips (was a standalone .trustStrip block — merged here to save vertical space) */}
          <div className={styles.trustStrip}>
            {TRUST_CHIPS.map(({ icon, text }) => (
              <div key={text} className={styles.trustItem}>
                <FontAwesomeIcon icon={icon} className={styles.trustIcon} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Form card ── */}
        <motion.div className={styles.card}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.15 }}>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success" className={styles.successState}
                initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                <div className={styles.successRing}>
                  <FontAwesomeIcon icon={faCircleCheck} className={styles.successIcon} />
                </div>
                <h3 className={styles.successTitle}>Request Received!</h3>
                <p className={styles.successText}>
                  A licensed Arctic Air technician will reach out shortly. Keep an eye on your inbox and phone.
                </p>
                <div className={styles.successBadges}>
                  <span>✓ Flat-rate quote</span>
                  <span>✓ No pressure</span>
                  <span>✓ Same-day available</span>
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>

                {/* Service selector — single inline label, no standalone .sectionLabel row */}
                <div className={styles.section}>
                  <p className={styles.sectionLabel}>What do you need?</p>
                  <div className={styles.serviceGrid}>
                    {SERVICES.map(({ icon, label }) => (
                      <button key={label} type="button"
                        className={`${styles.serviceBtn} ${selectedService === label ? styles.serviceBtnActive : ''}`}
                        onClick={() => { setSelected(label); setError(''); }}>
                        <FontAwesomeIcon icon={icon} className={styles.serviceBtnIcon} />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact fields — section label removed (was duplicative with the form's clear field labels) */}
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <div className={styles.fieldsSection}>
                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label className={styles.label} htmlFor="v1r-name">Full Name *</label>
                        <input id="v1r-name" className={styles.input} name="name" type="text"
                          placeholder="Jane Smith" required value={formData.name} onChange={handleChange} />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.label} htmlFor="v1r-phone">Phone *</label>
                        <input id="v1r-phone" className={styles.input} name="phone" type="tel"
                          placeholder="(254) 555-0100" required value={formData.phone} onChange={handleChange} />
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="v1r-email">Email Address *</label>
                      <input id="v1r-email" className={styles.input} name="email" type="email"
                        placeholder="jane@example.com" required value={formData.email} onChange={handleChange} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="v1r-message">Describe the Issue</label>
                      <textarea id="v1r-message" className={`${styles.input} ${styles.textarea}`}
                        name="message" placeholder="What's happening? When did it start?" rows={2}
                        value={formData.message} onChange={handleChange} />
                    </div>
                  </div>

                  <div className={styles.recaptchaWrap}>
                    <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} size="normal" />
                  </div>

                  {error && (
                    <div className={styles.errorMsg} role="alert">
                      <FontAwesomeIcon icon={faExclamationTriangle} /><span>{error}</span>
                    </div>
                  )}

                  <div className={styles.submitRow}>
                    <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
                      {isSubmitting
                        ? <PulseLoader size={8} color="#0d1b2a" />
                        : <><span>Request Service</span><FontAwesomeIcon icon={faArrowRight} /></>}
                    </button>
                    <div className={styles.altContact}>
                      <FontAwesomeIcon icon={faPhone} />
                      <span>Need help now?{' '}
                        <a href="tel:+12549001234"
                          onClick={() => trackEvent({ eventType: 'phone_click', elementLabel: 'Call (254) 900-1234', section: 'ContactForm-V1' })}>
                          Call (254) 900-1234
                        </a>
                      </span>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}