// components/BlogComponents/StrategyGrid/StrategyGrid.tsx

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './styles.module.scss';

interface Strategy {
  icon: IconDefinition;
  title: string;
  content: string;
}

interface StrategyGridProps {
  title: string;
  content: string;
  strategies: Strategy[];
}

export default function StrategyGrid({ title, content, strategies }: StrategyGridProps) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      <p>{content}</p>
      <div className={styles.strategyGrid}>
        {strategies.map((strategy, index) => (
          <motion.div
            key={index}
            className={styles.strategyCard}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
          >
            <FontAwesomeIcon icon={strategy.icon} className={styles.strategyIcon} />
            <h3>{strategy.title}</h3>
            <p>{strategy.content}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}