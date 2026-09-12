import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolio } from '@/data/portfolioData';
import { useEnv } from '@/hooks/useEnv';
import { techIcons, iconKeyFor } from './techIcons';
import StackConstellation from './StackConstellation';
import './Stack.css';

gsap.registerPlugin(ScrollTrigger);

// Monogram fallback for concept items with no brand logo (e.g. "Rate Limiting").
function techGlyph(name: string): string {
  const words = name.replace(/[()/]/g, ' ').split(/[\s.&]+/).filter(Boolean);
  return ((words[0]?.[0] ?? '') + (words[1]?.[0] ?? '')).toUpperCase();
}

// Per-category accent hue (H, S%, L% for hsl) — selection changes the light.
const CATEGORY_HUE: Record<string, string> = {
  languages: '210 100% 66%',
  frontend: '265 90% 70%',
  backend: '160 80% 62%',
  database: '190 90% 62%',
  security: '280 85% 70%',
  payments: '150 75% 60%',
  testing: '35 90% 65%',
  devtools: '220 20% 70%',
};

export default function Stack() {
  const { skills } = portfolio;
  const { reducedMotion } = useEnv();
  const rootRef = useRef<HTMLElement>(null);
  const tilesRef = useRef<HTMLUListElement>(null);
  const [activeKey, setActiveKey] = useState(skills[0].key);

  const active = skills.find((s) => s.key === activeKey) ?? skills[0];
  const accent = CATEGORY_HUE[activeKey] ?? CATEGORY_HUE.frontend;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;
      gsap.fromTo(
        '.stack-head [data-reveal]',
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.stack-head', start: 'top 82%' },
        },
      );
      gsap.fromTo(
        '.stack-cat',
        { autoAlpha: 0, x: -20 },
        {
          autoAlpha: 1, x: 0, duration: 0.7, stagger: 0.05, ease: 'power3.out',
          scrollTrigger: { trigger: '.stack-layout', start: 'top 80%' },
        },
      );
      gsap.fromTo(
        '.stack-panel',
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.stack-layout', start: 'top 80%' },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  // Animate tech tiles when the active category changes.
  useEffect(() => {
    if (reducedMotion) return;
    gsap.fromTo(
      '.stack-tile',
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.03, ease: 'power2.out' },
    );
  }, [activeKey, reducedMotion]);

  // Keyboard: up/down arrows move between categories.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = skills.findIndex((s) => s.key === activeKey);
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveKey(skills[(idx + 1) % skills.length].key);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveKey(skills[(idx - 1 + skills.length) % skills.length].key);
    }
  };

  return (
    <section id="stack" ref={rootRef} className="section stack" aria-label="Technology stack">
      <div className="container">
        <div className="stack-head">
          <span className="eyebrow" data-reveal><span className="num">02</span> Stack</span>
          <h2 className="stack-title display" data-reveal>
            A connected<br />technology ecosystem.
          </h2>
          <p className="stack-lead" data-reveal>
            Not a checklist of logos — a working system. Select a layer to see the
            tools Hari reaches for, and how they fit together across the stack.
          </p>
        </div>

        <div className="stack-layout">
          <div
            className="stack-cats"
            role="tablist"
            aria-label="Skill categories"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
          >
            {skills.map((group) => {
              const isActive = group.key === activeKey;
              return (
                <button
                  key={group.key}
                  id={`stack-tab-${group.key}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="stack-panel"
                  tabIndex={isActive ? 0 : -1}
                  className={`stack-cat${isActive ? ' is-active' : ''}`}
                  onClick={() => setActiveKey(group.key)}
                  data-cursor="explore"
                  data-cursor-label="EXPLORE"
                >
                  <span className="stack-cat-label">{group.label}</span>
                  <span className="stack-cat-count mono">
                    {String(group.items.length).padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className="stack-panel glass"
            id="stack-panel"
            role="tabpanel"
            aria-labelledby={`stack-tab-${active.key}`}
            style={{ ['--cat-accent' as string]: accent }}
          >
            <div className="card-head">
              <span className="icon-chip">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m9 8-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="card-head-label">{active.label}</span>
            </div>

            <p className="stack-panel-desc">{active.description}</p>

            <div className="stack-tiles-wrap">
              <StackConstellation tilesRef={tilesRef} activeKey={activeKey} animate={!reducedMotion} />
              <ul className="stack-tiles" ref={tilesRef}>
                {active.items.map((item) => {
                  const key = iconKeyFor(item);
                  const icon = key ? techIcons[key] : null;
                  return (
                    <li key={item} className="stack-tile">
                      <span className={`stack-tile-icon${icon ? '' : ' is-mono'}`} aria-hidden="true">
                        {icon ?? <span className="mono">{techGlyph(item)}</span>}
                      </span>
                      <span className="stack-tile-name">{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
