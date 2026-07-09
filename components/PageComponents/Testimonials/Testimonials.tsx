'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles.module.scss';

interface Testimonial {
  name:     string;
  location: string;
  rating:   number;
  text:     string;
  service?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  title?:       string;
}

function Stars({ count }: { count: number }) {
  return (
    <div className={styles.stars} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i < count ? 'currentColor' : 'none'}
          stroke="currentColor" strokeWidth="1.5"
          className={i < count ? styles.starFilled : styles.starEmpty}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({ testimonials, title = 'What Our Customers Say' }: TestimonialsProps) {
  const [active, setActive] = useState(0);
  const shown = testimonials.slice(0, 6);

  return (
    <section className={styles.section} aria-label="Customer testimonials">
      <div className={styles.container}>

        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className={styles.eyebrow}>Real Reviews</span>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.aggregate}>
            <Stars count={5} />
            <span className={styles.aggText}>4.9 average · 300+ Google reviews</span>
          </div>
        </motion.div>

        {/* Featured testimonial */}
        <div className={styles.featured}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className={styles.featuredCard}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.38 }}
            >
              <svg className={styles.quoteIcon} width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
              </svg>
              <p className={styles.featuredText}>{shown[active].text}</p>
              <div className={styles.featuredMeta}>
                <Stars count={shown[active].rating} />
                <div className={styles.reviewer}>
                  <span className={styles.reviewerName}>{shown[active].name}</span>
                  <span className={styles.reviewerLoc}>{shown[active].location}</span>
                </div>
                {shown[active].service && (
                  <span className={styles.serviceBadge}>{shown[active].service}</span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail nav */}
        <div className={styles.thumbs}>
          {shown.map((t, i) => (
            <button
              key={i}
              className={`${styles.thumb} ${active === i ? styles.thumbActive : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Review by ${t.name}`}
            >
              <span className={styles.thumbInitial}>{t.name.charAt(0)}</span>
              <span className={styles.thumbName}>{t.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
