'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles.module.scss';

interface FAQItem {
  question: string;
  answer:   string;
}

interface FAQProps {
  cityName: string;
  faq:      FAQItem[];
  title?:   string;
}

export default function FAQ({ cityName, faq, title = 'HVAC Service FAQs' }: FAQProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className={styles.section} aria-label="Frequently Asked Questions">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Got Questions?</span>
          <h2 className={styles.title}>{title}</h2>
          {cityName && (
            <p className={styles.subtitle}>Common questions from {cityName} homeowners and businesses.</p>
          )}
        </div>

        <div className={styles.list} role="list">
          {faq.map((item, i) => (
            <motion.div
              key={i}
              className={`${styles.item} ${open === i ? styles.itemOpen : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              role="listitem"
            >
              <button
                className={styles.trigger}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className={styles.question}>{item.question}</span>
                <span className={`${styles.icon} ${open === i ? styles.iconOpen : ''}`} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    className={styles.answer}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: 'easeInOut' }}
                  >
                    <p className={styles.answerText}>{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
