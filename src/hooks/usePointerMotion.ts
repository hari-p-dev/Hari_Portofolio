import { useEffect, useRef } from 'react';

export interface PointerMotion {
  /** −1..1 from screen center. */
  x: number;
  y: number;
}

/**
 * Smoothed, normalized pointer position (−1..1) in a ref, updated on its own
 * lightweight RAF. Disabled on touch / reduced-motion so it never runs where
 * it shouldn't. Read the ref inside other render loops (camera, tilt, glow).
 */
export function usePointerMotion(enabled = true, ease = 0.08) {
  const motion = useRef<PointerMotion>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const target = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const tick = () => {
      motion.current.x += (target.x - motion.current.x) * ease;
      motion.current.y += (target.y - motion.current.y) * ease;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled, ease]);

  return motion;
}
