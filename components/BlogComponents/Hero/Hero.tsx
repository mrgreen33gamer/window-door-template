// components/BlogComponents/Hero/Hero.tsx

import { motion } from 'framer-motion';
import styles from './styles.module.scss';

interface HeroProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export default function Hero({ title, description, imageSrc, imageAlt }: HeroProps) {
  return (
    <motion.header
      className={styles.heroSection}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>{title}</h1>
      <p>{description}</p>
      <img
        src={imageSrc}
        alt={imageAlt}
        className={styles.heroImage}
        loading="eager"
      />
    </motion.header>
  );
}