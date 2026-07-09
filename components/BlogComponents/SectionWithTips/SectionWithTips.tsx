// components/BlogComponents/SectionWithTips/SectionWithTips.tsx

import styles from './styles.module.scss';

interface SectionWithTipsProps {
  title: string;
  content: string;
  tipsTitle: string;
  tips: string[];
}

export default function SectionWithTips({ title, content, tipsTitle, tips }: SectionWithTipsProps) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      <p>{content}</p>
      <h3>{tipsTitle}</h3>
      <ul>
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </section>
  );
}