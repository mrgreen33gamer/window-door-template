// src/app/contact/page.tsx
// Arctic Air HVAC — Contact Page (unique build, not just a form import)
// FIXED: Added useTrackEvent for:
//   - phone_click  on the Phone & Text info card link
//   - email_click  on the Email info card link
//   - click        on the urgency toggle (so we can see how often it's used)
//   - form_submit  after a successful form submission
'use client';

import { useState, useRef } from 'react';
import styles from './page.module.scss';
import { PulseLoader } from 'react-spinners';
import ReCAPTCHA from 'react-google-recaptcha';
import { motion, AnimatePresence } from 'framer-motion';
import { getJourneyContext } from '&/useJourneyTracker';
import { useTrackEvent } from '&/useTrackEvent';
import FAQ from '#/PageComponents/FAQ/FAQ';
import CTABanner from '#/PageComponents/CTABanner/CTABanner';

// ── Service options ────────────────────────────────────────────────────────────
const SERVICES = [
  'AC Repair', 'Heating / Furnace Repair', 'New System Installation',
  'Seasonal Maintenance / Tune-Up', 'Duct Cleaning', 'Indoor Air Quality',
  'Emergency Service', 'Other / Not Sure',
];

// ── FAQ data ──────────────────────────────────────────────────────────────────
const faq = [
  {
    question: "What's the fastest way to reach you for an emergency?",
    answer: "Call us directly at (254) 900-1234. We answer 7 days a week including evenings. For a genuine HVAC emergency in Central Texas heat or cold, call — don't wait on a form response.",
  },
  {
    question: 'How quickly can someone come out?',
    answer: "Same-day service is available most days during business hours. Evening and weekend emergency calls are dispatched within 1–2 hours. We'll give you an honest ETA when you call — not a 4-hour window.",
  },
  {
    question: 'Do you charge for the diagnostic visit?',
    answer: 'We charge a standard diagnostic fee for non-emergency visits, which is waived when you proceed with the repair. Emergency dispatch calls have a separate fee. We\'ll confirm the amount when you schedule.',
  },
  {
    question: 'Do you work on commercial HVAC systems?',
    answer: 'Yes — light commercial HVAC for restaurants, offices, retail spaces, and small warehouses is within our scope. Call to discuss your specific system and location.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'Waco, Hewitt, Woodway, Robinson, China Spring, Temple, Killeen, Hillsboro, Valley Mills, and most of Central Texas within about 60 miles of Waco. Call us — we probably cover your area.',
  },
  {
    question: 'How do I know if I need a repair or a full replacement?',
    answer: "Our tech will tell you honestly after the diagnosis. If the repair cost exceeds 50% of a new system's cost and your unit is over 10 years old, we'll recommend replacement — but we'll always show you the numbers and let you decide.",
  },
];

// ── Main component ────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', address: '', message: '',
  });
  const [urgent, setUrgent]           = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const [error, setError]             = useState('');
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const trackEvent   = useTrackEvent();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    const token = recaptchaRef.current?.getValue();
    if (!token) { setError('Please complete the reCAPTCHA.'); return; }
    setSubmitting(true); setError('');
    try {
      const journeyContext = getJourneyContext();
      const res = await fetch('/api/submitContact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData, urgent, cityName: 'Waco', slug: 'contact',
          spot: 'contact-page', formVariant: 'contact-unique',
          recaptchaToken: token, ...journeyContext,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        recaptchaRef.current?.reset();
        trackEvent({
          eventType:    'form_submit',
          elementLabel: 'Contact Page Form Submit',
          section:      'contact-page',
        });
      } else throw new Error();
    } catch { setError('Something went wrong. Please try again or call us directly.'); }
    finally { setSubmitting(false); }
  };

  return (
    <main className={styles.page}>

      {/* ── Hero banner ──────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroInner}>
          <motion.div className={styles.heroBadge}
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <span className={styles.badgeDot} />
            Available 7 Days — Evenings &amp; Emergencies Included
          </motion.div>
          <motion.h1 className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}>
            Let&apos;s Get Your<br />
            <span className={styles.heroAccent}>HVAC Fixed</span>
          </motion.h1>
          <motion.p className={styles.heroSub}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}>
            Call, text, or fill out the form below. We respond fast — and we always answer the phone when it matters.
          </motion.p>
        </div>
      </section>

      {/* ── Contact info cards + form ─────────────────────────────────────── */}
      <section className={styles.mainSection}>
        <div className={styles.mainInner}>

          {/* Left: info + trust */}
          <div className={styles.leftCol}>

            {/* Info cards */}
            <div className={styles.infoCards}>
              {[
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.17 12a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  ),
                  label:     'Phone & Text',
                  value:     '(254) 900-1234',
                  href:      'tel:+12549001234',
                  eventType: 'phone_click' as const,
                  eventLabel: 'Contact Page Phone',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  ),
                  label:     'Email',
                  value:     'contact@arcticairhvac.com',
                  href:      'mailto:contact@arcticairhvac.com',
                  eventType: 'email_click' as const,
                  eventLabel: 'Contact Page Email',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  ),
                  label:     'Address',
                  value:     '4521 Bosque Blvd, Waco TX 76710',
                  href:      'https://maps.google.com/?q=4521+Bosque+Blvd+Waco+TX+76710',
                  eventType: 'click' as const,
                  eventLabel: 'Contact Page Address',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  ),
                  label:     'Hours',
                  value:     'Mon–Fri 7am–6pm · Sat 8am–2pm · Emergency 24/7',
                  href:      null,
                  eventType: null,
                  eventLabel: null,
                },
              ].map(({ icon, label, value, href, eventType: evtType, eventLabel }) => (
                <motion.div key={label} className={styles.infoCard}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.45 }}>
                  <div className={styles.infoIcon}>{icon}</div>
                  <div className={styles.infoText}>
                    <span className={styles.infoLabel}>{label}</span>
                    {href ? (
                      <a
                        href={href}
                        className={styles.infoValue}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        onClick={() => evtType && eventLabel && trackEvent({
                          eventType:    evtType,
                          elementLabel: eventLabel,
                          section:      'contact-page-info',
                        })}
                      >
                        {value}
                      </a>
                    ) : (
                      <span className={styles.infoValue}>{value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust callouts */}
            <div className={styles.trustBlock}>
              <p className={styles.trustHeading}>Why homeowners choose Arctic Air</p>
              {[
                'Flat-rate pricing — written quote before we start',
                '1-year parts & labor warranty on every repair',
                'NATE-certified, TDLR-licensed technicians only',
                'Same-day service, 7 days a week',
                'No contracts, no lock-in — ever',
              ].map(t => (
                <div key={t} className={styles.trustItem}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className={styles.rightCol}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" className={styles.successCard}
                  initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}>
                  <div className={styles.successIconWrap}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h2 className={styles.successTitle}>Request Received!</h2>
                  <p className={styles.successText}>
                    A licensed Arctic Air technician will reach out shortly — usually within one business day. For urgent needs, call us at{' '}
                    <a href="tel:+12549001234">(254) 900-1234</a>.
                  </p>
                  <div className={styles.successMeta}>
                    <span>✓ Flat-rate quote</span>
                    <span>✓ No obligation</span>
                    <span>✓ We come to you</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="form" className={styles.formCard}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}>

                  <div className={styles.formCardHeader}>
                    <div className={styles.formCardIcon} aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/>
                        <polyline points="8 6 12 2 16 6"/><polyline points="8 18 12 22 16 18"/>
                        <polyline points="6 8 2 12 6 16"/><polyline points="18 8 22 12 18 16"/>
                      </svg>
                    </div>
                    <div>
                      <h2 className={styles.formTitle}>Request Service or a Free Estimate</h2>
                      <p className={styles.formSubtitle}>We'll respond within one business day — usually much sooner.</p>
                    </div>
                  </div>

                  {/* Urgency toggle */}
                  <button
                    type="button"
                    className={`${styles.urgencyToggle} ${urgent ? styles.urgencyActive : ''}`}
                    onClick={() => {
                      const next = !urgent;
                      setUrgent(next);
                      trackEvent({
                        eventType:    'click',
                        elementLabel: next ? 'Urgent Toggle — On' : 'Urgent Toggle — Off',
                        section:      'contact-page-form',
                      });
                    }}
                  >
                    <span className={styles.urgencyDot} />
                    {urgent
                      ? '🔴 Marked as urgent — we\'ll prioritize your request'
                      : 'Mark as urgent or emergency'}
                  </button>

                  <form className={styles.form} onSubmit={handleSubmit} noValidate>

                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label className={styles.label} htmlFor="c-name">Full Name *</label>
                        <input id="c-name" className={styles.input} name="name" type="text"
                          placeholder="Jane Smith" required value={formData.name} onChange={handleChange} />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.label} htmlFor="c-phone">Phone *</label>
                        <input id="c-phone" className={styles.input} name="phone" type="tel"
                          placeholder="(254) 555-0100" required value={formData.phone} onChange={handleChange} />
                      </div>
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="c-email">Email Address *</label>
                      <input id="c-email" className={styles.input} name="email" type="email"
                        placeholder="jane@example.com" required value={formData.email} onChange={handleChange} />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="c-service">Service Needed *</label>
                      <select id="c-service" className={styles.input} name="service" required
                        value={formData.service} onChange={handleChange}>
                        <option value="">Select a service...</option>
                        {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="c-address">
                        Service Address <span className={styles.optional}>(optional)</span>
                      </label>
                      <input id="c-address" className={styles.input} name="address" type="text"
                        placeholder="123 Main St, Waco TX" value={formData.address} onChange={handleChange} />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="c-message">Describe the Issue *</label>
                      <textarea id="c-message" className={`${styles.input} ${styles.textarea}`}
                        name="message" required rows={4}
                        placeholder="What's happening? When did it start? Any error codes or noises?"
                        value={formData.message} onChange={handleChange} />
                    </div>

                    <div className={styles.recaptchaWrap}>
                      <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} size='normal' />
                    </div>

                    {error && (
                      <div className={styles.errorMsg} role="alert">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        {error}
                      </div>
                    )}

                    <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
                      {isSubmitting
                        ? <PulseLoader size={8} color="#0d1b2a" />
                        : (
                          <>
                            <span>Send Request</span>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                              <polyline points="9 18 15 12 9 6"/>
                            </svg>
                          </>
                        )}
                    </button>

                    <p className={styles.formNote}>
                      Or call/text us directly:{' '}
                      <a
                        href="tel:+12549001234"
                        onClick={() => trackEvent({
                          eventType:    'phone_click',
                          elementLabel: 'Contact Page Form Note Phone',
                          section:      'contact-page-form',
                        })}
                      >
                        (254) 900-1234
                      </a>{' '}
                      — we answer 7 days a week.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <div className={styles.faqWrap}>
        <FAQ cityName="Waco" faq={faq} title="Common Questions Before You Call" />
      </div>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <CTABanner
        headline="Need Us Right Now?"
        subline="Call (254) 900-1234 — we answer 7 days a week, evenings included. Emergency service available across Central Texas."
        primaryText="Call (254) 900-1234"
        primaryLink="tel:+12549001234"
        secondaryText="Send a Text"
        secondaryLink="sms:+12549001234"
      />

    </main>
  );
}