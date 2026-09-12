import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

/**
 * Sets up Lenis smooth scrolling and syncs it with GSAP's ScrollTrigger.
 * Disabled entirely when reduced motion is requested (native scroll is used).
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) {
      // Ensure ScrollTrigger still uses native scroll positions.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisInstance = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    document.documentElement.classList.add('lenis');

    // Let layout settle then refresh triggers.
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      window.clearTimeout(id);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
      document.documentElement.classList.remove('lenis');
    };
  }, [enabled]);
}

export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  // Offset so the heading clears the fixed navbar. Measure the real panel
  // (height + its distance from the top) and add breathing room; fall back
  // to a sensible constant if the navbar isn't mounted yet.
  const panel = document.querySelector('.navbar-panel') as HTMLElement | null;
  let offset = -118;
  if (panel) {
    const rect = panel.getBoundingClientRect();
    offset = -(rect.bottom + 24);
  }
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.3 });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
