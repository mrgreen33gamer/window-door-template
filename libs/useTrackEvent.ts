// libs/useTrackEvent.ts
// FIXED:
//  - Creates sessionId inline if not yet set (handles case where
//    useJourneyTracker hasn't fired yet on first page load).
//  - Correctly skips admin paths.
//  - Added 'form_submit' to valid event types (aligns with API + admin queries).
'use client';

import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

export type TrackEventPayload = {
  eventType:    'click' | 'phone_click' | 'email_click' | 'view' | 'form_submit';
  elementLabel: string;
  section:      string;
  serviceType?: string;
  cityName?:    string;
};

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let id = sessionStorage.getItem('sa_session_id');
  if (!id) {
    id = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem('sa_session_id', id);
    sessionStorage.setItem('sa_first_touch', String(Date.now()));
  }
  return id;
}

export function useTrackEvent() {
  const pathname = usePathname();

  const trackEvent = useCallback(async (payload: TrackEventPayload) => {
    if (typeof window === 'undefined') return;
    if (pathname?.startsWith('/admin')) return;

    const sessionId = getSessionId();

    try {
      fetch('/api/trackEvent', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...payload, sessionId, page: pathname }),
      });
      // fire-and-forget — don't await, don't block UI
    } catch {
      // non-critical
    }
  }, [pathname]);

  return trackEvent;
}