// components/BlogComponents/CTAComponent/CTAComponent.tsx

import { motion } from 'framer-motion';
import styles from './styles.module.scss';

interface CTAProps {
  title: string;
  content: string;
  buttonText: string;
  buttonHref: string;
}

export default function CTAComponent({ title, content, buttonText, buttonHref }: CTAProps) {
  return (
    <section className={styles.ctaSection}>
      <h2>{title}</h2>
      <p>{content}</p>
      <motion.a
        href={buttonHref}
        className={styles.ctaButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {buttonText}
      </motion.a>
    </section>
  );
}