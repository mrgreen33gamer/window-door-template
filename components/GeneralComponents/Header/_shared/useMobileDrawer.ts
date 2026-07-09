// _archetype-library/shared/useMobileDrawer.ts
// Mobile nav drawer behavior shared by every header archetype: closes on
// route change, closes on outside click, locks body scroll while open.
'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export function useMobileDrawer() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.scrollTo({ top: 0, behavior: 'instant' });
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const fn = (e: MouseEvent) => {
      if (
        drawerRef.current && !drawerRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) setMenuOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return { menuOpen, setMenuOpen, drawerRef, triggerRef, pathname };
}
