// PageComponents/LocalCitationBlock/LocalCitationBlock.tsx
import Link from 'next/link';
import styles from './styles.module.scss';

interface HoursEntry {
  days:  string;
  hours: string;
}

interface LocalCitationBlockProps {
  businessName?:  string;
  address?:       string;
  phone?:         string;
  email?:         string;
  googleMapsUrl?: string;
  hours?:         HoursEntry[];
  cityName?:      string;
}

const DEFAULT_HOURS: HoursEntry[] = [
  { days: 'Monday – Friday', hours: '7:00 AM – 7:00 PM' },
  { days: 'Saturday',        hours: '8:00 AM – 5:00 PM' },
  { days: 'Sunday',          hours: 'Emergency Only' },
];

const LocalCitationBlock: React.FC<LocalCitationBlockProps> = ({
  businessName  = 'Arctic Air HVAC',
  address       = 'Waco, TX 76701',
  phone         = '(254) 900-1234',
  email         = 'service@arcticairhvac.com',
  googleMapsUrl = 'https://maps.google.com/?q=Arctic+Air+HVAC+Waco+TX',
  hours         = DEFAULT_HOURS,
  cityName      = 'Waco',
}) => {
  return (
    <section
      className={styles.section}
      aria-label="Business Contact Information"
      itemScope
      itemType="https://schema.org/HVACBusiness"
    >
      <div className={styles.container}>

        <div className={styles.header}>
          <span className={styles.eyebrow}>Find Us</span>
          <h2 className={styles.title} itemProp="name">{businessName}</h2>
          <p className={styles.subtitle}>
            Based in {cityName}, TX — serving all of Central Texas with licensed HVAC technicians.
          </p>
        </div>

        <div className={styles.grid}>

          {/* Address */}
          <div className={styles.card}>
            <div className={styles.cardIcon} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div className={styles.cardBody}>
              <span className={styles.cardLabel}>Address</span>
              <p
                className={styles.cardValue}
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <span itemProp="addressLocality">{cityName}</span>,{' '}
                <span itemProp="addressRegion">TX</span>
              </p>
              <Link
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardLink}
              >
                Get Directions
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Phone */}
          <div className={styles.card}>
            <div className={styles.cardIcon} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.17 12a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div className={styles.cardBody}>
              <span className={styles.cardLabel}>Phone</span>
              <Link
                href={`tel:+1${phone.replace(/\D/g, '')}`}
                className={`${styles.cardValue} ${styles.phoneValue}`}
                itemProp="telephone"
              >
                {phone}
              </Link>
              <span className={styles.cardHint}>Available 7 days a week</span>
            </div>
          </div>

          {/* Email */}
          <div className={styles.card}>
            <div className={styles.cardIcon} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div className={styles.cardBody}>
              <span className={styles.cardLabel}>Email</span>
              <Link
                href={`mailto:${email}`}
                className={`${styles.cardValue} ${styles.emailValue}`}
                itemProp="email"
              >
                {email}
              </Link>
              <span className={styles.cardHint}>Reply within 1 business day</span>
            </div>
          </div>

          {/* Hours */}
          <div className={styles.card}>
            <div className={styles.cardIcon} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div className={styles.cardBody}>
              <span className={styles.cardLabel}>Hours</span>
              <ul className={styles.hoursList} itemProp="openingHours">
                {hours.map((h, i) => (
                  <li key={i} className={styles.hoursItem}>
                    <span className={styles.hoursDays}>{h.days}</span>
                    <span className={`${styles.hoursTime} ${h.hours === 'Closed' ? styles.closed : h.hours.includes('Emergency') ? styles.emergency : ''}`}>
                      {h.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LocalCitationBlock;
