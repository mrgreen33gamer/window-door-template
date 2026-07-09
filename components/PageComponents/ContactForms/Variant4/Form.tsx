// components/PageComponents/ContactForms/Variant4/Form.tsx
// FIXED: Added useTrackEvent — fires:
//   - 'click'       when the user advances from Step 1 → Step 2 (service selected)
//   - 'form_submit' after a successful submission on Step 2
//   Both use 'spot' as section for per-placement attribution in the admin dashboard.
'use client';
import { useState, useRef } from 'react';
import styles from './styles.module.scss';
import { PulseLoader } from 'react-spinners';
import ReCAPTCHA from 'react-google-recaptcha';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faExclamationTriangle, faArrowRight, faArrowLeft,
  faFan, faFire, faWrench, faFilter, faThermometerHalf, faWind, faBolt,
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { getJourneyContext } from '&/useJourneyTracker';
import { useTrackEvent } from '&/useTrackEvent';

interface Variant4Props {
  title: string; cityName: string; slug: string; spot: string; formVariant: number;
}

const SERVICES = [
  { icon: faFan,             label: 'AC Repair',        sub: 'System not cooling, strange noises' },
  { icon: faFire,            label: 'Heating / Furnace', sub: 'Heat not working, furnace issues' },
  { icon: faWrench,          label: 'New Installation',  sub: 'Replace or add a new system' },
  { icon: faFilter,          label: 'Duct Cleaning',     sub: 'Improve airflow & air quality' },
  { icon: faThermometerHalf, label: 'Maintenance',       sub: 'Tune-up, inspection, seasonal' },
  { icon: faWind,            label: 'Air Quality',       sub: 'Filters, purifiers, humidity' },
  { icon: faBolt,            label: 'Emergency',         sub: 'System down, urgent repair needed' },
];

const BUDGET_LABELS = ['Under $500', '$500–$1,500', '$1,500–$5,000', '$5,000–$10,000', '$10,000+'];

const slideVariants = {
  enter:  (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0 }),
};

export default function Variant4({ title, cityName, slug, spot, formVariant }: Variant4Props) {
  const [step,            setStep]            = useState(1);
  const [dir,             setDir]             = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [budget,          setBudget]          = useState(1);
  const [formData,        setFormData]        = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting,    setIsSubmitting]    = useState(false);
  const [submitted,       setSubmitted]       = useState(false);
  const [error,           setError]           = useState('');
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const trackEvent   = useTrackEvent();

  const goStep2 = () => {
    if (!selectedService) { setError('Please select a service to continue.'); return; }
    setError(''); setDir(1); setStep(2);
    trackEvent({
      eventType:    'click',
      elementLabel: `Variant4 Continue — ${selectedService}`,
      section:      spot,
      serviceType:  selectedService,
    });
  };
  const goBack = () => { setDir(-1); setStep(1); setError(''); };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    const token = recaptchaRef.current?.getValue();
    if (!token) { setError('Please complete the reCAPTCHA'); return; }
    setIsSubmitting(true); setError('');
    try {
      const journeyContext = getJourneyContext();
      const res = await fetch('/api/submitContact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData, serviceType: selectedService, budget: BUDGET_LABELS[budget],
          cityName, slug, spot, formVariant, recaptchaToken: token, ...journeyContext,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        recaptchaRef.current?.reset();
        trackEvent({
          eventType:    'form_submit',
          elementLabel: 'Variant4 Form Submit',
          section:      spot,
          serviceType:  selectedService,
        });
      } else throw new Error();
    } catch { setError('Something went wrong. Please try again.'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <section className={styles.root}>
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgAccent} aria-hidden="true" />

      <div className={styles.container}>

        {/* Header */}
        {!submitted && (
          <motion.div className={styles.header}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className={styles.eyebrow}>Free Estimate · {cityName}, TX</span>
            <h2 className={styles.title}>{title}</h2>
          </motion.div>
        )}

        <div className={styles.card}>

          {/* Progress bar */}
          {!submitted && (
            <div className={styles.progressWrap} aria-hidden="true">
              <div className={styles.progressMeta}>
                <span className={styles.progressLabel}>Step {step} of 2</span>
                <span className={styles.progressPct}>{step === 1 ? '50%' : '100%'} complete</span>
              </div>
              <div className={styles.progressTrack}>
                <motion.div
                  className={styles.progressFill}
                  animate={{ width: step === 1 ? '50%' : '100%' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </div>
          )}

          <div className={styles.body}>
            <AnimatePresence mode="wait" custom={dir}>

              {submitted ? (
                <motion.div key="success" className={styles.successState}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
                  <div className={styles.successRing}>
                    <FontAwesomeIcon icon={faCircleCheck} className={styles.successIcon} />
                  </div>
                  <h3 className={styles.successTitle}>You're All Set!</h3>
                  <p className={styles.successText}>
                    A licensed Arctic Air tech will reach out about your <strong>{selectedService}</strong> service.
                  </p>
                  <div className={styles.successSummary}>
                    <div className={styles.summaryRow}><span>Service</span><span>{selectedService}</span></div>
                    <div className={styles.summaryRow}><span>Budget</span><span>{BUDGET_LABELS[budget]}</span></div>
                    <div className={styles.summaryRow}><span>Location</span><span>{cityName}, TX</span></div>
                  </div>
                </motion.div>

              ) : step === 1 ? (
                <motion.div key="step1" custom={dir} variants={slideVariants}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>

                  <p className={styles.stepLabel}>What service do you need?</p>

                  <div className={styles.serviceGrid}>
                    {SERVICES.map(({ icon, label, sub }) => (
                      <button key={label} type="button"
                        className={`${styles.serviceCard} ${selectedService === label ? styles.serviceSelected : ''}`}
                        onClick={() => { setSelectedService(label); setError(''); }}>
                        <div className={styles.serviceIcon} aria-hidden="true">
                          <FontAwesomeIcon icon={icon} />
                        </div>
                        <div className={styles.serviceText}>
                          <strong>{label}</strong>
                          <span>{sub}</span>
                        </div>
                        {selectedService === label && (
                          <div className={styles.selectedCheck} aria-hidden="true">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className={styles.budgetBlock}>
                    <div className={styles.budgetHeader}>
                      <span className={styles.budgetLabel}>Estimated Budget</span>
                      <span className={styles.budgetValue}>{BUDGET_LABELS[budget]}</span>
                    </div>
                    <input type="range" min={0} max={4} step={1} value={budget}
                      onChange={e => setBudget(Number(e.target.value))}
                      className={styles.slider} aria-label="Budget range"
                      style={{ '--pct': `${(budget / 4) * 100}%` } as React.CSSProperties} />
                    <div className={styles.sliderEnds}>
                      <span>Under $500</span><span>$10,000+</span>
                    </div>
                  </div>

                  {error && (
                    <div className={styles.errorMsg} role="alert">
                      <FontAwesomeIcon icon={faExclamationTriangle} /><span>{error}</span>
                    </div>
                  )}

                  <button type="button" className={styles.nextBtn} onClick={goStep2}>
                    Continue <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </motion.div>

              ) : (
                <motion.div key="step2" custom={dir} variants={slideVariants}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>

                  <div className={styles.stepNavRow}>
                    <button type="button" className={styles.backBtn} onClick={goBack}>
                      <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </button>
                    <div className={styles.selectionBadges}>
                      <span className={styles.selBadge}>{selectedService}</span>
                      <span className={styles.selBadge}>{BUDGET_LABELS[budget]}</span>
                    </div>
                  </div>

                  <p className={styles.stepLabel}>Your contact info</p>

                  <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label className={styles.label} htmlFor="v4r-name">Full Name *</label>
                        <input id="v4r-name" className={styles.input} name="name" type="text"
                          placeholder="Jane Smith" required value={formData.name} onChange={handleChange} />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.label} htmlFor="v4r-phone">Phone *</label>
                        <input id="v4r-phone" className={styles.input} name="phone" type="tel"
                          placeholder="(254) 555-0100" required value={formData.phone} onChange={handleChange} />
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="v4r-email">Email Address *</label>
                      <input id="v4r-email" className={styles.input} name="email" type="email"
                        placeholder="jane@example.com" required value={formData.email} onChange={handleChange} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="v4r-message">Describe the Issue</label>
                      <textarea id="v4r-message" className={`${styles.input} ${styles.textarea}`}
                        name="message" rows={3}
                        placeholder={`Tell us about your ${selectedService.toLowerCase()} issue.`}
                        value={formData.message} onChange={handleChange} />
                    </div>
                    <div className={styles.recaptchaWrap}>
                      <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} size="normal" />
                    </div>
                    {error && (
                      <div className={styles.errorMsg} role="alert">
                        <FontAwesomeIcon icon={faExclamationTriangle} /><span>{error}</span>
                      </div>
                    )}
                    <button type="submit" disabled={isSubmitting} className={styles.nextBtn}>
                      {isSubmitting
                        ? <PulseLoader size={8} color="#0d1b2a" />
                        : <><span>Get My Free Quote</span><FontAwesomeIcon icon={faArrowRight} /></>}
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