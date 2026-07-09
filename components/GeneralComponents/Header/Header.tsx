// components/GeneralComponents/Header/Header.tsx
//
// PROGRESS BAR FIX (choppy / inconsistent scroll):
//
// What was wrong:
//   The old onScroll handler called setProgress(...) on every single scroll
//   event. That triggers a full React re-render of the entire <Header /> tree
//   (which is huge — marquee, nav, drawer, all of it) on every tick.
//   On iOS Safari scroll fires up to 120 Hz; React can't keep up at that
//   rate, so the scheduler batches/drops updates and the bar visibly lags
//   the actual scroll position.
//   On top of that, animating `width: x%` triggers layout on every change
//   instead of just GPU compositing, multiplying the cost.
//
// What's fixed (three things, in order of impact):
//
//   1. The progress bar is now driven by a *DOM ref*, not React state.
//      We write directly to progressRef.current.style.transform on every
//      animation frame. Zero re-renders, zero React reconciliation, zero
//      virtual DOM diffing for the most-frequently-updated value.
//
//   2. We use transform: scaleX(0..1) with transform-origin: left, instead
//      of width: 0..100%. scaleX is GPU-composited only — no layout, no
//      paint, just compositing. Buttery smooth even at 240 Hz.
//
//   3. The handler is throttled with requestAnimationFrame so it runs at
//      most once per paint frame (60–120 fps depending on the display),
//      regardless of how fast the OS dispatches scroll events. The boolean
//      flags (scrolled / compact / marqueeOn) are diff-checked before
//      calling setState so React only re-renders 3x per scroll session
//      instead of 60+/sec.
//
// Net result: the bar tracks the scrollbar 1:1 with no perceptible lag,
// and the rest of the header re-renders only when the chrome state
// actually changes.
'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './styles.module.scss';

const NAV_LINKS = [
  { href: '/',              label: 'Home' },
  { href: '/services',      label: 'Services' },
  { href: '/service-areas', label: 'Service Areas' },
  { href: '/blogs',         label: 'Blog' },
  { href: '/about',         label: 'About' },
  { href: '/contact',       label: 'Contact' },
];

const MARQUEE_ITEMS = [
  'Same-Day Emergency Service Available',
  '1-Year Parts & Labor Warranty',
  'Flat-Rate Pricing — No Surprises',
  '4.9★ Google Rating · 300+ Reviews',
  'NATE Certified Technicians',
  'No Contracts — Ever',
  'Serving Central Texas Since 2010',
  'Licensed & Insured · Waco, TX',
];

export default function Header() {
  const pathname  = usePathname();
  const [scrolled,  setScrolled]  = useState(false);
  const [compact,   setCompact]   = useState(false);
  const [marqueeOn, setMarqueeOn] = useState(true);
  const [menuOpen,  setMenuOpen]  = useState(false);

  // ── Refs ────────────────────────────────────────────────────────────────
  const drawerRef   = useRef<HTMLDivElement>(null);
  const triggerRef  = useRef<HTMLButtonElement>(null);
  // Progress bar ref — written to imperatively on every scroll frame.
  // No state = no re-renders.
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // globals.css sets html { overflow: hidden; height: 100dvh } and
    // body { overflow-y: auto }, making <body> the real scroll container —
    // NOT window. window.scrollY is always 0 and window's 'scroll' event
    // never fires. We must listen on document.body and read scrollTop.
    const el = document.body;

    // rAF handle so we can cancel cleanly on unmount and avoid double-queueing
    // multiple frames if scroll events arrive faster than the browser paints.
    let frame = 0;

    // Keep a closure-local copy of the booleans so we can diff before
    // calling setState. setState does its own bailout when the new value
    // is === the old, but a closure-local diff also lets us skip the call
    // entirely (saves the function-call overhead and any internal work
    // React does even on a no-op setState).
    let prevScrolled  = false;
    let prevCompact   = false;
    let prevMarqueeOn = true;

    const update = () => {
      frame = 0; // mark as "no frame currently queued"

      const y    = el.scrollTop;
      const docH = el.scrollHeight - el.clientHeight;

      // ── 1. Progress bar — direct DOM write, GPU-composited transform ───
      // scaleX(0) → empty bar; scaleX(1) → full bar.
      // transform-origin must be `left` in the SCSS for this to grow from
      // the left edge instead of from the center.
      const ratio = docH > 0 ? Math.min(1, Math.max(0, y / docH)) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ratio})`;
      }

      // ── 2. Boolean chrome state — only setState if value actually flipped ─
      const nextScrolled  = y > 10;
      const nextCompact   = y > 60;
      const nextMarqueeOn = y < 30;

      if (nextScrolled  !== prevScrolled)  { prevScrolled  = nextScrolled;  setScrolled(nextScrolled);   }
      if (nextCompact   !== prevCompact)   { prevCompact   = nextCompact;   setCompact(nextCompact);     }
      if (nextMarqueeOn !== prevMarqueeOn) { prevMarqueeOn = nextMarqueeOn; setMarqueeOn(nextMarqueeOn); }
    };

    const onScroll = () => {
      // rAF-throttle: at most one update per paint frame, no matter how
      // fast the OS dispatches scroll events. If a frame is already queued,
      // we don't queue another — the queued one will read the latest
      // scrollTop when it runs.
      if (frame !== 0) return;
      frame = requestAnimationFrame(update);
    };

    update();                // sync state immediately on mount
    el.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      el.removeEventListener('scroll', onScroll);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    // Reset scroll on the actual scroll container, not window
    document.body.scrollTo({ top: 0, behavior: 'instant' });
    setMenuOpen(false);
  }, [pathname]);

  // Close drawer on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const fn = (e: MouseEvent) => {
      if (
        drawerRef.current  && !drawerRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) setMenuOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [menuOpen]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  // Build className strings — no child-selector magic needed
  const headerClass = [
    styles.header,
    scrolled ? styles.scrolled : '',
    compact  ? styles.compact  : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <header className={headerClass}>
        <div
          ref={progressRef}
          className={styles.progressBar}
          style={{ transform: 'scaleX(0)', transformOrigin: 'left center', willChange: 'transform' }}
          aria-hidden="true"
        />

        {/* ── Marquee bar — slides away on scroll ── */}
        <div
          className={styles.topBar}
          aria-hidden="true"
          style={{
            maxHeight: marqueeOn ? '34px' : '0px',
            opacity:   marqueeOn ? 1 : 0,
          }}
        >
          <div className={styles.marqueeTrack}>
            <ul className={styles.marquee} role="list">
              {doubled.map((text, i) => (
                <li key={i} className={styles.marqueeItem}>
                  <svg className={styles.marqueeFlake} width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="12" y1="2" x2="12" y2="22"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <polyline points="8 6 12 2 16 6"/>
                    <polyline points="6 8 2 12 6 16"/>
                  </svg>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Main nav ── */}
        <div className={styles.navRow}>
          <div className={styles.navInner}>

            {/* Logo */}
            <Link href="/" className={styles.logo} aria-label="Arctic Air HVAC home">
              <span className={styles.logoMark} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="12" y1="2" x2="12" y2="22"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <polyline points="8 6 12 2 16 6"/>
                  <polyline points="8 18 12 22 16 18"/>
                  <polyline points="6 8 2 12 6 16"/>
                  <polyline points="18 8 22 12 18 16"/>
                </svg>
              </span>
              <span className={styles.logoText}>
                <span className={styles.logoName}>Arctic Air HVAC</span>
                <span className={styles.logoTagline}>Heating · Cooling · Comfort</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <nav className={styles.desktopNav} aria-label="Main navigation">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href} href={href}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                    {isActive && <span className={styles.activeBar} aria-hidden="true" />}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className={styles.ctaGroup}>
              <a href="tel:+12549001234" className={styles.callBtn}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.17 12a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Call Now
              </a>
              <Link href="/contact" className={styles.estimateBtn}>
                Free Estimate
              </Link>
            </div>

            {/* Hamburger */}
            <button
              ref={triggerRef}
              className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
            >
              <span className={styles.hBar} />
              <span className={styles.hBar} />
              <span className={styles.hBar} />
            </button>

          </div>
        </div>
      </header>

      {/* Drawer backdrop */}
      <div
        className={`${styles.backdrop} ${menuOpen ? styles.backdropVisible : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <nav
        id="mobile-drawer"
        ref={drawerRef}
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <div className={styles.drawerHead}>
          <span className={styles.drawerBrand}>
            <span className={styles.drawerIcon} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="2" x2="12" y2="22"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <polyline points="8 6 12 2 16 6"/>
                <polyline points="8 18 12 22 16 18"/>
                <polyline points="6 8 2 12 6 16"/>
                <polyline points="18 8 22 12 18 16"/>
              </svg>
            </span>
            Arctic Air HVAC
          </span>
          <button
            className={styles.drawerClose}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className={styles.drawerDivider} />

        <ul className={styles.drawerLinks} role="list">
          {NAV_LINKS.map(({ href, label }, i) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.drawerLink} ${isActive ? styles.drawerLinkActive : ''}`}
                  style={{ animationDelay: menuOpen ? `${i * 40}ms` : '0ms' }}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{label}</span>
                  {isActive
                    ? <span className={styles.drawerPip} aria-hidden="true" />
                    : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
                  }
                </Link>
              </li>
            );
          })}
        </ul>

        <div className={styles.drawerActions}>
          <a href="tel:+12549001234" className={styles.drawerCallBtn} onClick={() => setMenuOpen(false)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.17 12a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Call (254) 900-1234
          </a>
          <Link href="/contact" className={styles.drawerEstimateBtn} onClick={() => setMenuOpen(false)}>
            Free Estimate
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </Link>
        </div>

        <div className={styles.drawerFoot}>
          <span className={styles.drawerDot} aria-hidden="true" />
          Licensed &amp; Insured · Waco, TX
        </div>
      </nav>
    </>
  );
}