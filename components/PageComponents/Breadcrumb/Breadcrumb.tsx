// PageComponents/Breadcrumb/Breadcrumb.tsx
import Link from 'next/link';
import styles from './styles.module.scss';

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  crumbs: Crumb[];
}

export default function Breadcrumb({ crumbs }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {/* Home icon always first */}
        <li className={styles.item}>
          <Link href="/" className={styles.homeLink} aria-label="Home">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </Link>
        </li>

        {crumbs.map((crumb, i) => (
          <li key={i} className={styles.item}>
            <span className={styles.sep} aria-hidden="true">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </span>

            {crumb.href && i < crumbs.length - 1 ? (
              <Link href={crumb.href} className={styles.link}>
                {crumb.label}
              </Link>
            ) : (
              <span className={styles.current} aria-current="page">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
