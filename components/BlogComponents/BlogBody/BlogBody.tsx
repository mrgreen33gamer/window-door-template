'use client';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './styles.module.scss';

export interface BlogSection {
  type: 'prose' | 'list' | 'tips' | 'cards' | 'table' | 'callout';
  heading?: string;
  subheading?: string;
  body?: string;
  // list / tips
  items?: string[];
  // cards (replaces StrategyGrid)
  cards?: { icon?: IconDefinition; title: string; body: string }[];
  // table
  tableHeaders?: string[];
  tableRows?: string[][];
  // callout
  calloutText?: string;
  calloutAccent?: boolean;
}

interface BlogBodyProps {
  sections: BlogSection[];
}

export default function BlogBody({ sections }: BlogBodyProps) {
  return (
    <div className={styles.body}>
      {sections.map((section, i) => (
        <motion.section
          key={i}
          className={styles.section}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ delay: i * 0.06, duration: 0.45, ease: 'easeOut' }}
        >
          {section.heading && <h2 className={styles.heading}>{section.heading}</h2>}
          {section.subheading && <h3 className={styles.subheading}>{section.subheading}</h3>}

          {/* PROSE */}
          {section.type === 'prose' && section.body && (
            <p className={styles.body_text}>{section.body}</p>
          )}

          {/* LIST */}
          {section.type === 'list' && section.items && (
            <ul className={styles.list}>
              {section.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          )}

          {/* TIPS */}
          {section.type === 'tips' && section.items && (
            <>
              {section.body && <p className={styles.body_text}>{section.body}</p>}
              <ul className={styles.tips}>
                {section.items.map((tip, j) => (
                  <li key={j}>
                    <span className={styles.tipBullet} aria-hidden="true">—</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* CARDS (replaces StrategyGrid / AISection) */}
          {section.type === 'cards' && section.cards && (
            <>
              {section.body && <p className={styles.body_text}>{section.body}</p>}
              <div className={styles.cardGrid}>
                {section.cards.map((card, j) => (
                  <div key={j} className={styles.card}>
                    {card.icon && (
                      <span className={styles.cardIcon}>
                        <FontAwesomeIcon icon={card.icon} />
                      </span>
                    )}
                    <h4 className={styles.cardTitle}>{card.title}</h4>
                    <p className={styles.cardBody}>{card.body}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* TABLE */}
          {section.type === 'table' && section.tableHeaders && section.tableRows && (
            <>
              {section.body && <p className={styles.body_text}>{section.body}</p>}
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {section.tableHeaders.map((h, j) => <th key={j}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {section.tableRows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => <td key={k}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* CALLOUT */}
          {section.type === 'callout' && (
            <div className={`${styles.callout} ${section.calloutAccent ? styles.calloutAccent : ''}`}>
              {section.calloutText && <p>{section.calloutText}</p>}
              {section.body && <p>{section.body}</p>}
            </div>
          )}
        </motion.section>
      ))}
    </div>
  );
}
