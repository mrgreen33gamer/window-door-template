import styles from './styles.module.scss';

interface BlogTagProps {
  label: string;
  variant?: 'green' | 'grey' | 'outline';
}

export default function BlogTag({ label, variant = 'green' }: BlogTagProps) {
  return (
    <span className={`${styles.tag} ${styles[variant]}`}>
      {label}
    </span>
  );
}
