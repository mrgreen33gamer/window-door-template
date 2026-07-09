// components/Pages/Contact/Step1/Step1.tsx
import React from 'react';
import styles from './Step1.module.scss';

interface Step1Props {
  formData: {
    name: string;
    businessName: string;
    email: string;
  };
  handleInputChange: (name: string, value: string) => void;
}

const fields = [
  {
    id: 'name',
    name: 'name',
    label: 'Your Name',
    type: 'text',
    placeholder: 'John Doe',
    required: true,
    autoComplete: 'name',
  },
  {
    id: 'businessName',
    name: 'businessName',
    label: 'Business Name',
    type: 'text',
    placeholder: 'Acme Co.',
    required: false,
    autoComplete: 'organization',
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@yourbusiness.com',
    required: true,
    autoComplete: 'email',
  },
] as const;

const Step1: React.FC<Step1Props> = ({ formData, handleInputChange }) => {
  return (
    <div className={styles.step}>
      {fields.map((field, i) => {
        const value = formData[field.name];
        const filled = value.length > 0;

        return (
          <div
            key={field.id}
            className={styles.fieldRow}
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <div className={`${styles.inputWrap} ${filled ? styles.filled : ''}`}>
              <input
                id={field.id}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                value={value}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className={styles.input}
                placeholder=" "
                spellCheck={false}
              />
              <label htmlFor={field.id} className={styles.label}>
                {field.label}
                {field.required && <span className={styles.req}> *</span>}
              </label>
              <div className={styles.underline} />
              {filled && (
                <span className={styles.tick} aria-hidden="true">✓</span>
              )}
            </div>

            {/* Friendly hint under email */}
            {field.name === 'email' && (
              <p className={styles.hint}>
                We&apos;ll use this to send your project details — zero spam, ever.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Step1;