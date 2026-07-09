// components/PageComponents/ContactForms/Variant3/Form.tsx
// FIXED: Added useTrackEvent — fires 'form_submit' event on successful submission.
//        'spot' prop is used as section so the admin dashboard can attribute
//        conversions to the exact page/placement.
'use client';
import { useState, useRef } from 'react';
import styles from './styles.module.scss';
import { PulseLoader } from 'react-spinners';
import ReCAPTCHA from 'react-google-recaptcha';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faExclamationTriangle, faPaperPlane,
  faUser, faEnvelope, faPhone, faLocationDot, faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { getJourneyContext } from '&/useJourneyTracker';
import { useTrackEvent } from '&/useTrackEvent';

interface Variant3Props {
  title: string; cityName: string; slug: string; spot: string; formVariant: number;
}

const TIME_PREFS = ['Morning (7am–12pm)', 'Afternoon (12pm–5pm)', 'Evening (5pm–7pm)', 'Emergency – ASAP'];

const FIELDS = [
  { num: '01', id: 'v3-name',    name: 'name',    type: 'text',  label: 'Full Name',     icon: faUser,        placeholder: 'Jane Smith',           required: true  },
  { num: '02', id: 'v3-phone',   name: 'phone',   type: 'tel',   label: 'Phone Number',  icon: faPhone,       placeholder: '(254) 555-0100',        required: true  },
  { num: '03', id: 'v3-email',   name: 'email',   type: 'email', label: 'Email Address', icon: faEnvelope,    placeholder: 'jane@example.com',       required: true  },
  { num: '04', id: 'v3-address', name: 'address', type: 'text',  label: 'Service Address',icon: faLocationDot, placeholder: '123 Main St, Waco TX',   required: false },
];

export default function Variant3({ title, cityName, slug, spot, formVariant }: Variant3Props) {
  const [formData, setFormData]         = useState({ name: '', phone: '', email: '', address: '', message: '' });
  const [timePref, setTimePref]         = useState('');
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
    const token = recaptchaRef.current?.getValue();
    if (!token) { setError('Please complete the reCAPTCHA'); return; }
    setIsSubmitting(true); setError('');
    try {
      const journeyContext = getJourneyContext();
      const res = await fetch('/api/submitContact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, timePref, cityName, slug, spot, formVariant, recaptchaToken: token, ...journeyContext }),
      });
      if (res.ok) {
        setSubmitted(true);
        recaptchaRef.current?.reset();
        trackEvent({
          eventType:    'form_submit',
          elementLabel: 'Variant3 Form Submit',
          section:      spot,
        });
      } else throw new Error();
    } catch { setError('Something went wrong. Please try again.'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className={styles.root}>
      <div className={styles.card}>

        <div className={styles.topRail}>
          <span className={styles.railBrand}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/>
              <polyline points="8 6 12 2 16 6"/><polyline points="8 18 12 22 16 18"/>
              <polyline points="6 8 2 12 6 16"/><polyline points="18 8 22 12 18 16"/>
            </svg>
            Arctic Air HVAC
          </span>
          <span className={styles.railDivider} aria-hidden="true" />
          <span className={styles.railLabel}>{cityName}, TX · Free Estimate</span>
        </div>

        <div className={styles.body}>
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.subtitle}>Fill in the fields below and we'll build a custom service quote for you.</p>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success" className={styles.successState}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                <div className={styles.successRing}>
                  <FontAwesomeIcon icon={faCircleCheck} className={styles.successIcon} />
                </div>
                <h3 className={styles.successTitle}>Request submitted!</h3>
                <p className={styles.successText}>
                  We'll reach out to {formData.name || 'you'} shortly.
                  {timePref && ` We'll aim for your preferred time: ${timePref}.`}
                </p>
              </motion.div>
            ) : (
              <motion.form key="form" className={styles.form} onSubmit={handleSubmit} noValidate
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>

                {FIELDS.map((f, i) => (
                  <motion.div key={f.id} className={styles.numberedField}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}>
                    <span className={styles.fieldNum}>{f.num}</span>
                    <div className={styles.fieldInner}>
                      <label htmlFor={f.id} className={styles.fieldLabel}>
                        <FontAwesomeIcon icon={f.icon} className={styles.fieldIcon} />
                        {f.label}
                      </label>
                      <input id={f.id} name={f.name} type={f.type} className={styles.input}
                        placeholder={f.placeholder} required={f.required}
                        value={(formData as any)[f.name]} onChange={handleChange} />
                    </div>
                  </motion.div>
                ))}

                {/* Time preference */}
                <motion.div className={styles.numberedField}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.28, duration: 0.4 }}>
                  <span className={styles.fieldNum}>05</span>
                  <div className={styles.fieldInner}>
                    <label className={styles.fieldLabel}>
                      <FontAwesomeIcon icon={faCalendarDays} className={styles.fieldIcon} />
                      Preferred Time
                    </label>
                    <div className={styles.timeGrid}>
                      {TIME_PREFS.map(t => (
                        <button key={t} type="button"
                          className={`${styles.timeChip} ${timePref === t ? styles.timeChipActive : ''}`}
                          onClick={() => setTimePref(t === timePref ? '' : t)}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Message */}
                <motion.div className={styles.numberedField}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}>
                  <span className={styles.fieldNum}>06</span>
                  <div className={styles.fieldInner}>
                    <label htmlFor="v3-message" className={styles.fieldLabel}>
                      Describe the Problem
                    </label>
                    <textarea id="v3-message" name="message" className={`${styles.input} ${styles.textarea}`}
                      placeholder="What's happening? AC won't cool? Furnace won't start? Any sounds or smells?" rows={3}
                      value={formData.message} onChange={handleChange} />
                  </div>
                </motion.div>

                <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} size="normal" />

                <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
                  {isSubmitting
                    ? <PulseLoader size={8} color="#0d1b2a" />
                    : <><FontAwesomeIcon icon={faPaperPlane} /><span>Submit Service Request</span></>}
                </button>

                {error && (
                  <div className={styles.errorMsg} role="alert">
                    <FontAwesomeIcon icon={faExclamationTriangle} /><span>{error}</span>
                  </div>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}