import { useEffect, useRef } from 'react';
import { useEnv } from '@/hooks/useEnv';
import './Background.css';

/**
 * Layered atmospheric background:
 *  - base darkness
 *  - a soft radial light that drifts with chapter lighting
 *  - a very subtle architectural grid
 *  - film grain
 *  - sparse particles (high tier only)
 * All layers are fixed and non-interactive.
 */
export default function Background() {
  const { tier, reducedMotion } = useEnv();
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || tier === 'low') return;
    // Gentle pointer-follow on the ambient glow (very subtle).
    let raf = 0;
    const target = { x: 50, y: 40 };
    const cur = { x: 50, y: 40 };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 100;
      target.y = (e.clientY / window.innerHeight) * 100;
    };
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.04;
      cur.y += (target.y - cur.y) * 0.04;
      if (glowRef.current) {
        glowRef.current.style.setProperty('--gx', `${cur.x}%`);
        glowRef.current.style.setProperty('--gy', `${cur.y}%`);
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [tier, reducedMotion]);

  return (
    <div className="bg-env" aria-hidden="true">
      <div className="bg-base" />
      <div className="bg-cosmic" />
      <div ref={glowRef} className="bg-glow" />
      <div className="bg-grid" />
      {tier === 'high' && !reducedMotion && <div className="bg-particles" />}
      <div className="bg-grain" />
      <div className="bg-vignette" />
    </div>
  );
}
