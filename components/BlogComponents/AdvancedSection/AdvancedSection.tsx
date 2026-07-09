// components/BlogComponents/AdvancedSection/AdvancedSection.tsx

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './styles.module.scss';

interface TableData {
  headers: string[];
  rows: string[][];
}

interface AdvancedItem {
  title: string;
  content: string;
  benefits?: { icon: IconDefinition; text: string }[];
  icon?: IconDefinition;
  imageSrc?: string;
  imageAlt?: string;
  table?: TableData;
}

interface AdvancedSectionProps {
  items: AdvancedItem[];
}

export default function AdvancedSection({ items }: AdvancedSectionProps) {
  return (
    <>
      {items.map((item, index) => (
        <section key={index} className={styles.section}>
          <h2>{item.title}</h2>
          <p>{item.content}</p>
          {item.benefits && (
            <motion.ul className={styles.benefitsList} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              {item.benefits.map((benefit, bIndex) => (
                <li key={bIndex}>
                  <FontAwesomeIcon icon={benefit.icon} className={styles.benefitIcon} />
                  {benefit.text}
                </li>
              ))}
            </motion.ul>
          )}
          {item.icon && (
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon icon={item.icon} className={styles.sectionIcon} />
            </div>
          )}
          {item.table && (
            <table className={styles.seoTable}>
              <thead>
                <tr>
                  {item.table.headers.map((header, hIndex) => (
                    <th key={hIndex}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {item.table.rows.map((row, rIndex) => (
                  <tr key={rIndex}>
                    {row.map((cell, cIndex) => (
                      <td key={cIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {item.imageSrc && (
            <motion.img
              src={item.imageSrc}
              alt={item.imageAlt}
              className={styles.sectionImage}
              loading="lazy"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </section>
      ))}
    </>
  );
}