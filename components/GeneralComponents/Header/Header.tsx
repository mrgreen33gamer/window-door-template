// _archetype-library/header-2-logo-center/Component.tsx
//
// Variant 2: no marquee. Logo sits centered; nav links split into two
// groups flanking it left/right. CTA + call button sit on the far right.
'use client';
import Link from 'next/link';
import { PhoneIcon } from './_shared/icons';
import { useScrollChrome } from './_shared/useScrollChrome';
import { useMobileDrawer } from './_shared/useMobileDrawer';
import styles from './styles.module.scss';

export default function Header() {
const logoName = 'ClearView';
const logoTagline = 'Windows · Doors · Efficiency';
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/service-areas', label: 'Service Areas' },
  { href: '/blogs', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];
const phoneDisplay = '(254) 740-3300';
const phoneHref = 'tel:+12547403300';
const ctaLabel = 'Free Estimate';
const ctaHref = '/contact';
const marqueeItems = [
  'Free In-Home Measurements',
  'Lifetime Product + 10-Yr Install Warranty',
  'Flat-Rate Pricing — No Surprises',
  '4.9★ Google Rating · 650+ Reviews',
  'Factory-Certified Installers',
  'No Contracts — Ever',
  'Serving Central Texas Since 2012',
  'Bonded & Insured · Waco, TX',
];
const footerLine = 'Bonded & Insured · Waco, TX';
const secondaryCtaLabel = 'Book Now';
const secondaryCtaHref = '/contact';
const hoursText = 'Mon–Sat · 7am–7pm';
const serviceAreaText = 'Serving Central Texas';
const ratingText = '4.9★ Local Rating';
  const { scrolled, progressRef } = useScrollChrome();
  const { menuOpen, setMenuOpen, drawerRef, triggerRef, pathname } = useMobileDrawer();

  const mid = Math.ceil(navLinks.length / 2);
  const leftLinks = navLinks.slice(0, mid);
  const rightLinks = navLinks.slice(mid);

  const renderLink = (href: string, label: string) => {
    const isActive = pathname === href;
    return (
      <Link key={href} href={href} className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`} aria-current={isActive ? 'page' : undefined}>
        {label}
      </Link>
    );
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div ref={progressRef} className={styles.progressBar}
          style={{ transform: 'scaleX(0)', transformOrigin: 'left center', willChange: 'transform' }}
          aria-hidden="true" />

        <div className={styles.navInner}>
          <nav className={styles.sideNav} aria-label="Primary navigation left">
            {leftLinks.map(({ href, label }) => renderLink(href, label))}
          </nav>

          <Link href="/" className={styles.logo} aria-label={`${logoName} home`}>
            <span className={styles.logoName}>{logoName}</span>
            <span className={styles.logoTagline}>{logoTagline}</span>
          </Link>

          <nav className={styles.sideNav} aria-label="Primary navigation right">
            {rightLinks.map(({ href, label }) => renderLink(href, label))}
          </nav>

          <div className={styles.ctaGroup}>
            <a href={phoneHref} className={styles.callBtn}><PhoneIcon size={13} /> Call Now</a>
            <Link href={ctaHref} className={styles.estimateBtn}>{ctaLabel}</Link>
          </div>

          <button ref={triggerRef} className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen} aria-controls="mobile-drawer-2">
            <span className={styles.hBar} /><span className={styles.hBar} /><span className={styles.hBar} />
          </button>
        </div>
      </header>

      <div className={`${styles.backdrop} ${menuOpen ? styles.backdropVisible : ''}`} onClick={() => setMenuOpen(false)} aria-hidden="true" />

      <nav id="mobile-drawer-2" ref={drawerRef} className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}
        aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        <div className={styles.drawerHead}>
          <span className={styles.drawerBrand}>{logoName}</span>
          <button className={styles.drawerClose} onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <ul className={styles.drawerLinks} role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={`${styles.drawerLink} ${pathname === href ? styles.drawerLinkActive : ''}`} onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.drawerActions}>
          <a href={phoneHref} className={styles.drawerCallBtn} onClick={() => setMenuOpen(false)}><PhoneIcon size={14} /> Call {phoneDisplay}</a>
          <Link href={ctaHref} className={styles.drawerEstimateBtn} onClick={() => setMenuOpen(false)}>{ctaLabel}</Link>
        </div>
        <div className={styles.drawerFoot}>{footerLine}</div>
      </nav>
    </>
  );
}
