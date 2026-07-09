// components/Pages/Contact/Step3/Step3.tsx
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from './Step3.module.scss';

interface Step3Props {
  formData: { additionalInfo: string; budget: string };
  handleInputChange: (name: string, value: string) => void;
  recaptchaRef: React.RefObject<ReCAPTCHA | null>;
  /** Called when the user completes (or resets) the reCAPTCHA checkbox */
  onTokenChange: (token: string | null) => void;
  /** Show the budget selector section (step 3) */
  showBudget?: boolean;
  /** Show the textarea section (step 4) */
  showTextarea?: boolean;
  /** Show reCAPTCHA (step 4 only) */
  showRecaptcha?: boolean;
}

const BUDGET_OPTIONS = [
  { label: 'Under $1k',    value: 'Under $1,000',         desc: 'Small fix or single asset'      },
  { label: '$1k – $3k',   value: '$1,000 – $3,000',      desc: 'Landing page or starter brand'  },
  { label: '$3k – $7k',   value: '$3,000 – $7,000',      desc: 'Full website or brand kit'      },
  { label: '$7k – $15k',  value: '$7,000 – $15,000',     desc: 'Custom software or full launch' },
  { label: '$15k – $30k', value: '$15,000 – $30,000',    desc: 'Complex platform or campaign'   },
  { label: '$30k+',       value: '$30,000+',              desc: 'Enterprise or long-term partner' },
];

const PROMPTS = [
  'What\'s your general ETAs?',
  'Do you have existing work?',
  'Where are you guys located?',
  'Do you offer other services?',
];

const MAX = 600;

const Step3: React.FC<Step3Props> = ({
  formData,
  handleInputChange,
  recaptchaRef,
  onTokenChange,
  showBudget    = false,
  showTextarea  = true,
  showRecaptcha = true,
}) => {
  const [focused, setFocused] = useState(false);
  const count = formData.additionalInfo.length;
  const pct   = Math.min(count / MAX, 1);

  return (
    <div className={styles.step}>

      {/* ── BUDGET SELECTOR ── */}
      {showBudget && (
        <div className={styles.budgetSection}>
          <p className={styles.budgetHint}>
            No budget yet? No problem — just pick the closest range and we&apos;ll work with you.
          </p>
          <div className={styles.budgetGrid}>
            {BUDGET_OPTIONS.map((opt) => {
              const selected = formData.budget === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  className={`${styles.budgetCard} ${selected ? styles.budgetSelected : ''}`}
                  onClick={() =>
                    handleInputChange('budget', selected ? '' : opt.value)
                  }
                  aria-pressed={selected}
                >
                  <span className={styles.budgetLabel}>{opt.label}</span>
                  <span className={styles.budgetDesc}>{opt.desc}</span>
                  <div className={styles.budgetCheck} aria-hidden="true">
                    {selected && <span className={styles.budgetCheckMark}>✓</span>}
                  </div>
                </button>
              );
            })}
          </div>
          {formData.budget && (
            <p className={styles.budgetSelected_text}>
              Selected: <strong>{formData.budget}</strong> — great, that helps us a lot!
            </p>
          )}
        </div>
      )}

      {/* ── TEXTAREA ── */}
      {showTextarea && (
        <>
          {/* Prompt chips */}
          <div className={styles.prompts}>
            <span className={styles.promptsLabel}>Quick prompts:</span>
            <div className={styles.chips}>
              {PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={styles.chip}
                  onClick={() => {
                    const current = formData.additionalInfo;
                    const sep     = current.length > 0 && !current.endsWith(' ') ? ' ' : '';
                    handleInputChange('additionalInfo', current + sep + p + ' ');
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className={`${styles.textareaWrap} ${focused ? styles.focused : ''}`}>
            <textarea
              className={styles.textarea}
              value={formData.additionalInfo}
              onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Tell us anything that helps — timeline, budget details, goals, existing brand…"
              maxLength={MAX}
              rows={5}
              spellCheck
            />
            <div className={styles.progressRow}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${pct * 100}%` }} />
              </div>
              <span className={styles.charCount}>{count}/{MAX}</span>
            </div>
          </div>

          <div className={styles.nudge}>
            <span className={styles.nudgeIcon}>💬</span>
            <p className={styles.nudgeText}>
              Projects with more context get a response <strong>2× faster</strong> — the more you share, the better we can help.
            </p>
          </div>
        </>
      )}

      {/* ── RECAPTCHA ── */}
      {showRecaptcha && (
        <div className={styles.recaptcha}>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
            size="normal"
            theme="dark"
            onChange={onTokenChange}
            onExpired={() => onTokenChange(null)}
          />
        </div>
      )}

    </div>
  );
};

export default Step3;