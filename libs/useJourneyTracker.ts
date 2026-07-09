// libs/useJourneyTracker.ts
// FIXED: Proper admin skip, SSR guard, dedup on consecutive same path,
// and correct sessionStorage initialization.
'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const SESSION_ID_KEY  = 'sa_session_id';
const JOURNEY_KEY     = 'sa_journey';
const FIRST_TOUCH_KEY = 'sa_first_touch';

function getOrCreateSessionId(): string {
  let id = sessionStorage.getItem(SESSION_ID_KEY);
  if (!id) {
    // Use crypto.randomUUID() if available (modern browsers), else fallback
    id = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(SESSION_ID_KEY, id);
    sessionStorage.setItem(FIRST_TOUCH_KEY, String(Date.now()));
  }
  return id;
}

function getJourney(): string[] {
  try {
    return JSON.parse(sessionStorage.getItem(JOURNEY_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function appendToJourney(path: string): string[] {
  const journey = getJourney();
  // Don't add duplicate consecutive paths (back/forward nav)
  if (journey[journey.length - 1] === path) return journey;
  const updated = [...journey, path];
  sessionStorage.setItem(JOURNEY_KEY, JSON.stringify(updated));
  return updated;
}

async function fireJourneyUpdate(sessionId: string, path: string) {
  try {
    await fetch('/api/trackJourney', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ sessionId, path }),
    });
  } catch {
    // Non-critical — never surface errors
  }
}

export function useJourneyTracker() {
  const pathname  = usePathname();
  const initiated = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Skip admin and internal paths
    if (
      pathname?.startsWith('/admin') ||
      pathname?.startsWith('/api')   ||
      pathname?.startsWith('/_next')
    ) return;

    const sessionId = getOrCreateSessionId();

    if (!initiated.current) {
      // First mount — initialize journey with current page
      sessionStorage.setItem(JOURNEY_KEY, JSON.stringify([pathname]));
      initiated.current = true;
      fireJourneyUpdate(sessionId, pathname);
      return;
    }

    // Subsequent navigations — append and fire
    appendToJourney(pathname);
    fireJourneyUpdate(sessionId, pathname);
  }, [pathname]);
}

// ── Helpers exported for use in form onSubmit handlers ────────────────────────

export function getJourneyContext(): {
  sessionId:         string;
  journeyPath:       string[];
  firstTouchSource:  string | null;
  timeOnSiteSeconds: number;
} {
  if (typeof window === 'undefined') {
    return { sessionId: '', journeyPath: [], firstTouchSource: null, timeOnSiteSeconds: 0 };
  }

  const sessionId         = sessionStorage.getItem(SESSION_ID_KEY) ?? '';
  const journeyPath       = getJourney();
  const firstTouchSource  = journeyPath[0] ?? null;
  const firstTouchAt      = Number(sessionStorage.getItem(FIRST_TOUCH_KEY) ?? Date.now());
  const timeOnSiteSeconds = Math.round((Date.now() - firstTouchAt) / 1000);

  return { sessionId, journeyPath, firstTouchSource, timeOnSiteSeconds };
}
