// components/BlogComponents/ContentSection/ContentSection.tsx

import styles from './styles.module.scss';

interface ContentSectionProps {
  title: string;
  content: string;
  practicesTitle: string;
  practices: string[];
}

export default function ContentSection({ title, content, practicesTitle, practices }: ContentSectionProps) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      <p>{content}</p>
      <h3>{practicesTitle}</h3>
      <ul>
        {practices.map((practice, index) => (
          <li key={index}>{practice}</li>
        ))}
      </ul>
    </section>
  );
}