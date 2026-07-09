// components/GeneralComponents/Analytics/Analytics.tsx
//
// FIXED: Fires /api/trackPageView on every route change (client-side navigation too).
// Also initialises GA4 via gtag if NEXT_PUBLIC_GA_ID is set.
//
// AUDIT FIX 1: getOrCreateSessionId now has a crypto.randomUUID() fallback,
// matching the implementations in libs/useJourneyTracker.ts and
// libs/useTrackEvent.ts. Without this fallback, browsers older than:
//   - Safari 15.4
//   - Firefox 95
//   - Chrome 92
// throw a TypeError when crypto.randomUUID is called and the entire
// page-view tracker silently dies.
//
// AUDIT FIX 2: Wired up /api/trackSession to fire EXACTLY ONCE per session.
//   - Guarded by a sessionStorage flag ('sa_session_tracked') so it never
//     fires twice for the same sessionId, regardless of route changes,
//     React Strict Mode double-mounts, or HMR reloads.
//   - Skips on admin/api/_next paths (consistent with the other trackers).
//   - Parses the UA client-side using ua-parser-js (same pattern as
//     CookieBanner — no new dependency).
//   - Fire-and-forget (.catch swallowed). Non-critical: a failure here
//     only means we miss one row in SessionTracking, never blocks the page.
'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { UAParser } from 'ua-parser-js';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const SESSION_ID_KEY      = 'sa_session_id';
const FIRST_TOUCH_KEY     = 'sa_first_touch';
const SESSION_TRACKED_KEY = 'sa_session_tracked';

function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return '';
  let id = sessionStorage.getItem(SESSION_ID_KEY);
  if (!id) {
    // Match the fallback used in useJourneyTracker & useTrackEvent so all
    // three tracker entry points generate the same kind of ID and never
    // crash on older Safari / iOS versions.
    id = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(SESSION_ID_KEY, id);
    sessionStorage.setItem(FIRST_TOUCH_KEY, String(Date.now()));
  }
  return id;
}

/**
 * Fire /api/trackSession exactly once per browser session.
 *
 * Why a sessionStorage flag (and not just "fire on first useEffect run")?
 *   - React Strict Mode double-invokes effects in dev → would fire twice
 *   - HMR / fast refresh re-mounts the component → would fire again
 *   - Multi-tab browsing in the same session shares sessionStorage per tab
 *     in modern browsers, but the flag still prevents same-tab duplicates
 *
 * Server-side, the route is also guarded (see route.ts) by upserting on
 * sessionId instead of plain insert — defense in depth for the rare cases
 * where two tabs race the flag check.
 */
function trackSessionOnce(sessionId: string): void {
  if (!sessionId) return;
  if (sessionStorage.getItem(SESSION_TRACKED_KEY) === sessionId) return;

  // Mark as tracked BEFORE firing the request so a slow network or a
  // double-mount can't squeeze in a duplicate while the fetch is in flight.
  sessionStorage.setItem(SESSION_TRACKED_KEY, sessionId);

  // Parse UA client-side (same pattern as CookieBanner.tsx).
  let deviceType:      string = 'desktop';
  let operatingSystem: string = 'Unknown';
  let browserType:     string = 'Unknown';
  try {
    const ua = new UAParser().getResult();
    deviceType      = ua.device.type  ?? 'desktop';
    operatingSystem = ua.os.name      ?? 'Unknown';
    browserType     = ua.browser.name ?? 'Unknown';
  } catch {
    // UA parse failure is harmless — just send the defaults.
  }

  fetch('/api/trackSession', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({
      sessionId,
      deviceType,
      operatingSystem,
      browserType,
    }),
  }).catch(() => {
    // Non-critical: clear the flag so a future navigation can retry.
    // (Without this, a failed first attempt would never be retried.)
    if (sessionStorage.getItem(SESSION_TRACKED_KEY) === sessionId) {
      sessionStorage.removeItem(SESSION_TRACKED_KEY);
    }
  });
}

export default function Analytics() {
  const pathname    = usePathname();
  const lastPath    = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Skip admin routes and internal paths
    if (
      pathname.startsWith('/admin') ||
      pathname.startsWith('/api')   ||
      pathname.startsWith('/_next')
    ) return;

    // Deduplicate consecutive same-path fires (StrictMode double-render)
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    const sessionId = getOrCreateSessionId();
    const referrer  = document.referrer ?? null;

    // ── Once-per-session: SessionTracking row ─────────────────────────────────
    // Fires on the very first non-admin page hit of the session and never
    // again until the tab is closed (sessionStorage clears on tab close).
    trackSessionOnce(sessionId);

    // ── Every navigation: PageViews row ───────────────────────────────────────
    // Fire first-party page view tracking (no consent needed — essential analytics)
    fetch('/api/trackPageView', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ sessionId, path: pathname, referrer }),
    }).catch(() => {});

    // Fire GA4 pageview if configured
    if (GA_ID && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', GA_ID, { page_path: pathname });
    }
  }, [pathname]);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}