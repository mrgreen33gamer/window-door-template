// components/GeneralComponents/JourneyTracker/JourneyTrackerProvider.tsx
// FIXED: Skips tracking on admin paths at provider level (double guard).
'use client';

import { usePathname } from 'next/navigation';
import { useJourneyTracker } from '&/useJourneyTracker';

export default function JourneyTrackerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Only mount tracker hook on non-admin, non-api paths
  const isTracked =
    !pathname?.startsWith('/admin') &&
    !pathname?.startsWith('/api')   &&
    !pathname?.startsWith('/_next');

  // Always call the hook (Rules of Hooks) — it guards internally too
  useJourneyTracker();

  return <>{children}</>;
}
