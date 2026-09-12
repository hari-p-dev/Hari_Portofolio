import { useEffect, useRef, useState } from 'react';
import { useEnv } from '@/hooks/useEnv';
import './Cursor.css';

/**
 * Minimal custom cursor. Desktop / fine-pointer only.
 * States are declared on elements via `data-cursor="view|explore|drag|open"`.
 */
export default function Cursor() {
  const { touch, reducedMotion } = useEnv();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (touch) return;

    document.documentElement.classList.add('custom-cursor');

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...mouse };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;

      const el = (e.target as HTMLElement)?.closest<HTMLElement>('[data-cursor]');
      if (el) {
        setActive(true);
        setLabel(el.dataset.cursorLabel ?? el.dataset.cursor ?? '');
      } else {
        setActive(false);
        setLabel('');
      }
    };

    let downScale = 1;
    const tick = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.16;
      ringPos.y += (mouse.y - ringPos.y) * 0.16;
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) scale(${downScale})`;
      raf = requestAnimationFrame(tick);
    };

    const onDown = () => { downScale = 0.82; ring.classList.add('is-down'); };
    const onUp = () => { downScale = 1; ring.classList.remove('is-down'); };
    const onLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };
    const onEnter = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove('custom-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
      cancelAnimationFrame(raf);
    };
  }, [touch, reducedMotion]);

  if (touch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot${active ? ' is-active' : ''}${label ? ' has-label' : ''}`}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`cursor-ring${active ? ' is-active' : ''}${label ? ' has-label' : ''}`}
        aria-hidden="true"
      >
        <span className="cursor-spark" aria-hidden="true" />
        {label && <span className="cursor-label">{label}</span>}
      </div>
    </>
  );
}
