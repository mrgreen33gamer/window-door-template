'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './styles.module.scss';

export interface ServiceCard {
  icon:     IconDefinition;
  title:    string;
  body:     string;
  link:     string;
  tag?:     string;
}

interface ServiceCardComponentProps {
  cards:     ServiceCard[];
  heading?:  string;
  subheading?: string;
}

export default function ServiceCardComponent({
  cards,
  heading    = 'Everything Your HVAC System Needs',
  subheading = 'From emergency AC repairs to annual maintenance plans, Arctic Air handles it all — on time, on price.',
}: ServiceCardComponentProps) {
  return (
    <section className={styles.section} aria-label="Our services">
      <div className={styles.container}>

        <motion.div
          className={styles.intro}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            HVAC Services
          </span>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.subheading}>{subheading}</p>
        </motion.div>

        <div className={styles.grid}>
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className={styles.card}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              {card.tag && <span className={styles.cardTag}>{card.tag}</span>}

              <div className={styles.cardIcon}>
                <FontAwesomeIcon icon={card.icon} />
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardText}>{card.body}</p>
              </div>

              <Link href={card.link} className={styles.cardLink}>
                Learn More
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.3 }}
        >
          <Link href="/services" className={styles.ctaBtn}>
            View All Services →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
