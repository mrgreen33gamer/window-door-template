// components/PageComponents/ContactForms/Variant2/Form.tsx
// FIXED: Added useTrackEvent — fires 'form_submit' event on successful submission.
//        'spot' prop is used as section so the admin dashboard can attribute
//        conversions to the exact page/placement (e.g. 'services-page-form').
'use client';
import { useState, useRef } from 'react';
import styles from './styles.module.scss';
import { PulseLoader } from 'react-spinners';
import ReCAPTCHA from 'react-google-recaptcha';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faExclamationTriangle, faArrowRight,
  faFan, faFire, faWrench, faFilter, faThermometerHalf,
  faWind, faBolt,
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { getJourneyContext } from '&/useJourneyTracker';
import { useTrackEvent } from '&/useTrackEvent';

interface Variant2Props {
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

export default function Variant2({ title, cityName, slug, spot, formVariant }: Variant2Props) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [urgent, setUrgent]                     = useState(false);
  const [formData, setFormData]                 = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting]         = useState(false);
  const [submitted, setSubmitted]               = useState(false);
  const [error, setError]                       = useState('');
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const trackEvent   = useTrackEvent();

  const toggle = (label: string) =>
    setSelectedServices(prev => prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (selectedServices.length === 0) { setError('Please select at least one service.'); return; }
    const token = recaptchaRef.current?.getValue();
    if (!token) { setError('Please complete the reCAPTCHA'); return; }
    setIsSubmitting(true); setError('');
    try {
      const journeyContext = getJourneyContext();
      const res = await fetch('/api/submitContact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData, services: selectedServices.join(', '), urgent,
          cityName, slug, spot, formVariant, recaptchaToken: token, ...journeyContext,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        recaptchaRef.current?.reset();
        trackEvent({
          eventType:    'form_submit',
          elementLabel: 'Variant2 Form Submit',
          section:      spot,
        });
      } else throw new Error();
    } catch { setError('Something went wrong. Please try again.'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <section className={styles.root}>
      <div className={styles.bgGrid} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.card}>

          {/* ── Left panel ── */}
          <div className={styles.leftPanel}>
            <div className={styles.panelInner}>
              <div className={styles.quoteIcon} aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
                </svg>
              </div>
              <p className={styles.quoteText}>
                "Flat price. Show up on time. Fix it right. That's all anyone ever wants — and that's exactly what we do."
              </p>
              <span className={styles.quoteAttrib}>— Arctic Air HVAC, Waco TX</span>

              <div className={styles.panelStats}>
                {[
                  { val: '2,400+', lbl: 'Systems Served' },
                  { val: '4.9★',   lbl: 'Google Rating' },
                  { val: '15+',    lbl: 'Years Local' },
                ].map(s => (
                  <div key={s.lbl} className={styles.statBlock}>
                    <span className={styles.statVal}>{s.val}</span>
                    <span className={styles.statLbl}>{s.lbl}</span>
                  </div>
                ))}
              </div>

              <div className={styles.panelBadges}>
                {['Same-Day Available', '1-Year Warranty', 'No Contracts', 'NATE Certified'].map(b => (
                  <span key={b} className={styles.panelBadge}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Form side ── */}
          <div className={styles.formSide}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" className={styles.successState}
                  initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                  <div className={styles.successRing}>
                    <FontAwesomeIcon icon={faCircleCheck} className={styles.successIcon} />
                  </div>
                  <h3 className={styles.successTitle}>We've Got It!</h3>
                  <p className={styles.successText}>
                    A licensed tech will contact you shortly about your{' '}
                    <strong>{selectedServices.join(' & ')}</strong> service.
                    {urgent && " We saw you marked this urgent — we're on it."}
                  </p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <div className={styles.formHead}>
                    <span className={styles.eyebrow}>Schedule Service · Free Estimate</span>
                    <h3 className={styles.formTitle}>{title}</h3>
                  </div>

                  <div className={styles.serviceSection}>
                    <p className={styles.serviceHeading}>What do you need? <span>(select all that apply)</span></p>
                    <div className={styles.chips}>
                      {SERVICES.map(({ icon, label }) => (
                        <button key={label} type="button"
                          className={`${styles.chip} ${selectedServices.includes(label) ? styles.chipActive : ''}`}
                          onClick={() => toggle(label)}>
                          <FontAwesomeIcon icon={icon} className={styles.chipIcon} />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.urgencyRow}>
                    <button type="button"
                      className={`${styles.urgencyBtn} ${urgent ? styles.urgencyActive : ''}`}
                      onClick={() => setUrgent(!urgent)}>
                      <span className={styles.urgencyDot} />
                      {urgent ? "🔴 Marked urgent — we'll prioritize your call" : 'Mark as urgent / emergency'}
                    </button>
                  </div>

                  <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label className={styles.label} htmlFor="v2r-name">Name *</label>
                        <input id="v2r-name" className={styles.input} name="name" type="text"
                          placeholder="Jane Smith" required value={formData.name} onChange={handleChange} />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.label} htmlFor="v2r-phone">Phone *</label>
                        <input id="v2r-phone" className={styles.input} name="phone" type="tel"
                          placeholder="(254) 555-0100" required value={formData.phone} onChange={handleChange} />
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="v2r-email">Email *</label>
                      <input id="v2r-email" className={styles.input} name="email" type="email"
                        placeholder="jane@example.com" required value={formData.email} onChange={handleChange} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="v2r-message">Describe the issue</label>
                      <textarea id="v2r-message" className={`${styles.input} ${styles.textarea}`}
                        name="message" placeholder="What's happening with your system?" rows={3}
                        value={formData.message} onChange={handleChange} />
                    </div>
                    <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} size="normal" />
                    {error && (
                      <div className={styles.errorMsg} role="alert">
                        <FontAwesomeIcon icon={faExclamationTriangle} /><span>{error}</span>
                      </div>
                    )}
                    <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
                      {isSubmitting
                        ? <PulseLoader size={8} color="#0d1b2a" />
                        : <><span>Book Free Estimate</span><FontAwesomeIcon icon={faArrowRight} /></>}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}