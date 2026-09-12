import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useEnv } from '@/hooks/useEnv';
import { useScrollLock } from '@/hooks/useScrollLock';
import './Loader.css';

const STEPS = [0, 12, 36, 64, 82, 100];

export default function Loader({ onDone }: { onDone: () => void }) {
  const { reducedMotion } = useEnv();
  const rootRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [locked, setLocked] = useState(true);

  // Body scroll stays locked (counter-based) until the curtain lifts.
  useScrollLock(locked);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          // Reveal name, then open the curtain.
          gsap
            .timeline({
              onComplete: () => {
                setLocked(false);
                onDone();
              },
            })
            .to('.loader-name .word-inner', {
              yPercent: 0,
              duration: 0.9,
              ease: 'power4.out',
              stagger: 0.08,
            })
            .to('.loader-meta', { autoAlpha: 1, duration: 0.5 }, '-=0.5')
            .to('.loader-bar-fill', { scaleX: 1, duration: 0.6, ease: 'power2.inOut' })
            .to(
              rootRef.current,
              {
                yPercent: -100,
                duration: 1.1,
                ease: 'power4.inOut',
                delay: 0.25,
              },
            );
        },
      });

      if (reducedMotion) {
        setCount(100);
        tl.to({}, { duration: 0.2 });
        return;
      }

      STEPS.forEach((step, i) => {
        tl.to(counter, {
          v: step,
          duration: i === 0 ? 0.3 : 0.34,
          ease: 'power1.inOut',
          onUpdate: () => setCount(Math.round(counter.v)),
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [onDone, reducedMotion]);

  return (
    <div ref={rootRef} className="loader" role="status" aria-label="Loading portfolio">
      <div className="loader-inner">
        <div className="loader-name display">
          <span className="word-mask"><span className="word-inner">HARI</span></span>{' '}
          <span className="word-mask"><span className="word-inner">P</span></span>
        </div>
        <div className="loader-meta mono">
          <span>INITIALIZING PORTFOLIO</span>
          <span className="loader-count">{String(count).padStart(3, '0')}</span>
        </div>
        <div className="loader-bar">
          <div className="loader-bar-fill" style={{ transform: `scaleX(${count / 100})` }} />
        </div>
      </div>
    </div>
  );
}
