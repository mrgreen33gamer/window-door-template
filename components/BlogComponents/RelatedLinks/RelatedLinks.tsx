// components/BlogComponents/RelatedLinks/RelatedLinks.tsx
// FIX9: Each "related reading" link now fires 'click' tracking.
// Note: must be 'use client' to use useTrackEvent hook.
'use client';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';
import { useTrackEvent } from '&/useTrackEvent';

interface LinkItem {
  href: string;
  text: string;
}

interface RelatedLinksProps {
  title?: string;
  links:  LinkItem[];
}

export default function RelatedLinks({ title = 'Related Reading', links }: RelatedLinksProps) {
  const trackEvent = useTrackEvent();

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{title}</h2>
      <ul className={styles.list}>
        {links.map((link, i) => (
          <li key={i}>
            <Link
              href={link.href}
              target="_blank"
              className={styles.link}
              onClick={() => trackEvent({
                eventType:    'click',
                elementLabel: link.text,
                section:      'RelatedLinks',
              })}
            >
              <span>{link.text}</span>
              <FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
