// src/app/admin/AdminNav.tsx
// Desktop sidebar + tablet/mobile top bar + drawer. Theme toggle + live indicator.
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useAdminTheme } from './AdminThemeProvider';
import styles from './nav.module.scss';

const NAV = [
  {
    section: 'Analytics',
    links: [
      { href: '/admin',          label: 'Overview',  icon: '◈' },
      { href: '/admin/leads',    label: 'Leads',     icon: '◉' },
      { href: '/admin/events',   label: 'Events',    icon: '◆' },
      { href: '/admin/sessions', label: 'Sessions',  icon: '◎' },
    ],
  },
];

export default function AdminNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useAdminTheme();
  const { data: session } = useSession();
  const isDemo = Boolean((session?.user as { isDemo?: boolean } | undefined)?.isDemo);

  const isActive = (href: string) =>
    href === '/admin'
      ? pathname === '/admin'
      : pathname.startsWith(href);

  const close = () => setOpen(false);

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Escape closes drawer
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const navContent = (
    <>
      <div className={styles.brand}>
        <span className={styles.eyebrow}>window door</span>
        <span className={styles.siteName}>Ops Console</span>
        <span className={styles.badge}>{isDemo ? 'Demo' : 'Private'}</span>
        {isDemo && (
          <span className={styles.demoBanner}>Sample data only — not live traffic</span>
        )}
      </div>

      {NAV.map(({ section, links }) => (
        <div key={section} className={styles.section}>
          <span className={styles.sectionLabel}>{section}</span>
          {links.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.link} ${isActive(href) ? styles.active : ''}`}
              onClick={close}
            >
              <span className={styles.icon} aria-hidden="true">{icon}</span>
              {label}
            </Link>
          ))}
        </div>
      ))}

      <div className={styles.liveIndicator}>
        <div className={styles.dot} />
        <span>Live feed on</span>
      </div>

      <button
        type="button"
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <span className={styles.themeIcon} aria-hidden="true">
          {theme === 'dark' ? '☀' : '☾'}
        </span>
        {theme === 'dark' ? 'Light mode' : 'Dark mode'}
      </button>

      <button
        type="button"
        onClick={() => signOut({ callbackUrl: '/admin/login' })}
        className={styles.signOut}
      >
        Sign out
      </button>
    </>
  );

  return (
    <>
      <nav className={styles.nav} aria-label="Admin">
        {navContent}
      </nav>

      <div className={styles.mobileBar}>
        <div className={styles.mobileBrand}>
          <span className={styles.mobileTitle}>Ops</span>
          <span className={styles.badge}>Private</span>
        </div>
        <div className={styles.mobileActions}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button
            type="button"
            className={styles.hamburger}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {open && (
        <div
          className={styles.overlay}
          onClick={close}
          aria-hidden="true"
        />
      )}

      <nav
        className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}
        aria-label="Admin mobile"
        aria-hidden={!open}
      >
        {navContent}
      </nav>
    </>
  );
}
