import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolio } from '@/data/portfolioData';
import { useEnv } from '@/hooks/useEnv';
import { useScrollLock } from '@/hooks/useScrollLock';
import type { Certificate } from '@/data/types';
import './Certificates.css';

gsap.registerPlugin(ScrollTrigger);

export default function Certificates() {
  const { certificates } = portfolio;
  const { reducedMotion } = useEnv();
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Certificate | null>(null);

  // Lock scroll while the lightbox is open (shared counter hook).
  useScrollLock(active !== null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;
      gsap.fromTo(
        '.cert-head [data-reveal]',
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.cert-head', start: 'top 82%' },
        },
      );
      gsap.fromTo(
        '.cert-card',
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: '.cert-grid', start: 'top 82%' },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  // Close the lightbox on Escape.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <section id="certificates" ref={rootRef} className="section certificates" aria-label="Certificates">
      <div className="container">
        <div className="cert-head">
          <span className="eyebrow" data-reveal><span className="num">05</span> Certificates</span>
          <h2 className="cert-title display" data-reveal>
            Verified credentials.
          </h2>
          <p className="cert-lead" data-reveal>
            A record of coursework and recognitions — from full-stack and Java tracks to
            AI fundamentals and an IEEE-sponsored paper presentation.
          </p>
        </div>

        <ul className="cert-grid">
          {certificates.map((c) => (
            <li key={c.image} className="cert-card glass">
              <button
                type="button"
                className="cert-card-btn"
                onClick={() => setActive(c)}
                data-cursor="view"
                data-cursor-label="VIEW"
                aria-label={`View certificate: ${c.title} — ${c.issuer}`}
              >
                <span className="cert-thumb">
                  <img src={c.image} alt={`${c.title} certificate from ${c.issuer}`} loading="lazy" />
                </span>
                <span className="cert-info">
                  <span className="cert-name">{c.title}</span>
                  <span className="cert-issuer mono">
                    {c.issuer}{c.date ? ` · ${c.date}` : ''}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="cert-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} — ${active.issuer}`}
          onClick={() => setActive(null)}
        >
          <div className="cert-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="cert-lightbox-close"
              onClick={() => setActive(null)}
              aria-label="Close certificate"
              data-cursor="open"
              data-cursor-label="CLOSE"
            >
              ×
            </button>
            <img src={active.image} alt={`${active.title} certificate from ${active.issuer}`} />
            <div className="cert-lightbox-meta">
              <span className="cert-name">{active.title}</span>
              <span className="cert-issuer mono">
                {active.issuer}{active.date ? ` · ${active.date}` : ''}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
