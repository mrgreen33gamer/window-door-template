// src/app/admin/AdminNav.tsx
// FINAL FIX: Full responsive — desktop sidebar + tablet/mobile hamburger drawer.
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
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

  const isActive = (href: string) =>
    href === '/admin'
      ? pathname === '/admin'
      : pathname.startsWith(href);

  const close = () => setOpen(false);

  const navContent = (
    <>
      {/* Brand */}
      <div className={styles.brand}>
        <span className={styles.eyebrow}>ARCTIC AIR HVAC</span>
        <span className={styles.siteName}>Dashboard</span>
        <span className={styles.badge}>Admin</span>
      </div>

      {/* Nav sections */}
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
              <span className={styles.icon}>{icon}</span>
              {label}
            </Link>
          ))}
        </div>
      ))}

      {/* Live indicator */}
      <div className={styles.liveIndicator}>
        <div className={styles.dot} />
        <span>Live tracking active</span>
      </div>

      {/* Sign out */}
      <button
        onClick={() => signOut({ callbackUrl: '/admin/login' })}
        className={styles.signOut}
      >
        Sign out
      </button>
    </>
  );

  return (
    <>
      {/* ── Desktop sidebar ──────────────────────────────── */}
      <nav className={styles.nav}>
        {navContent}
      </nav>

      {/* ── Mobile top bar + drawer ──────────────────────── */}
      <div className={styles.mobileBar}>
        <div className={styles.mobileBrand}>
          <span className={styles.mobileTitle}>Dashboard</span>
          <span className={styles.badge}>Admin</span>
        </div>
        <button
          className={styles.hamburger}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Overlay */}
      {open && <div className={styles.overlay} onClick={close} aria-hidden="true" />}

      {/* Drawer */}
      <nav className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}>
        {navContent}
      </nav>
    </>
  );
}
