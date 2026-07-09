// _archetype-library/shared/useScrollChrome.ts
//
// Scroll-driven header chrome: a `scrolled` boolean flag (crosses at 10px)
// and a ref-driven progress bar (writes transform directly to the DOM node,
// no re-renders — see hvac-template's original Header.tsx for the reasoning).
// globals.css makes <body> the real scroll container, not window.
'use client';
import { useEffect, useRef, useState } from 'react';

export function useScrollChrome() {
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.body;
    let frame = 0;
    let prevScrolled = false;

    const update = () => {
      frame = 0;
      const y = el.scrollTop;
      const docH = el.scrollHeight - el.clientHeight;
      const ratio = docH > 0 ? Math.min(1, Math.max(0, y / docH)) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ratio})`;
      }
      const nextScrolled = y > 10;
      if (nextScrolled !== prevScrolled) {
        prevScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }
    };

    const onScroll = () => {
      if (frame !== 0) return;
      frame = requestAnimationFrame(update);
    };

    update();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, []);

  return { scrolled, progressRef };
}
