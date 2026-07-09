// components/BlogComponents/Introduction/Introduction.tsx

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './styles.module.scss';

interface Benefit {
  icon: IconDefinition;
  text: string;
}

interface IntroductionProps {
  title: string;
  content: string;
  benefits: Benefit[];
}

export default function Introduction({ title, content, benefits }: IntroductionProps) {
  return (
    <section className={styles.introSection}>
      <h2>{title}</h2>
      <p>{content}</p>
      <motion.ul
        className={styles.benefitsList}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {benefits.map((benefit, index) => (
          <li key={index}>
            <FontAwesomeIcon icon={benefit.icon} className={styles.icon} />
            {benefit.text}
          </li>
        ))}
      </motion.ul>
    </section>
  );
}