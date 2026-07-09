// PageComponents/SectionServices/SectionServices.tsx
"use client";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';

interface Service {
  icon: IconDefinition;
  title: string;
  description: string;
  link: string;
}

interface SectionServicesProps {
  services: Service[];
  title?: string;
}

export default function SectionServices({
  services,
  title = "Our Core Services for Waco & Central Texas Businesses",
}: SectionServicesProps) {
  return (
    <section className={styles.section}>
      {title && (
        <div className={styles.headerWrap}>
          <span className={styles.eyebrow}>What We Do</span>
          <h2 className={styles.sectionTitle}>{title}</h2>
        </div>
      )}

      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
            viewport={{ once: true, margin: "-40px" }}
          >
            <Link href={service.link} className={styles.serviceCard}>
              <div className={styles.iconWrapper}>
                <FontAwesomeIcon icon={service.icon} className={styles.serviceIcon} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className={styles.learnMore}>
                Learn More
                <span className={styles.arrow} aria-hidden="true">→</span>
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
