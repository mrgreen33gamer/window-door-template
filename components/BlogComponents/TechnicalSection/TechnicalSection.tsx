// components/BlogComponents/TechnicalSection/TechnicalSection.tsx

import styles from './styles.module.scss';

interface IssueFix {
  issue: string;
  fix: string;
}

interface TechnicalSectionProps {
  title: string;
  content: string;
  issuesTitle: string;
  issues: IssueFix[];
  imageSrc?: string;
  imageAlt?: string;
}

export default function TechnicalSection({ title, content, issuesTitle, issues, imageSrc, imageAlt }: TechnicalSectionProps) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      <p>{content}</p>
      <h3>{issuesTitle}</h3>
      <table className={styles.seoTable}>
        <thead>
          <tr>
            <th>Issue</th>
            <th>Fix</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((item, index) => (
            <tr key={index}>
              <td>{item.issue}</td>
              <td>{item.fix}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {imageSrc && (
        <img src={imageSrc} alt={imageAlt} className={styles.sectionImage} loading="lazy" />
      )}
    </section>
  );
}