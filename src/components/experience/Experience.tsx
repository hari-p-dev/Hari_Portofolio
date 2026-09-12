import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolio } from '@/data/portfolioData';
import { useEnv } from '@/hooks/useEnv';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const { experience } = portfolio;
  const { reducedMotion } = useEnv();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      gsap.fromTo(
        '.exp-head [data-reveal]',
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.exp-head', start: 'top 82%' },
        },
      );

      // Timeline progress line draws as you scroll.
      gsap.fromTo(
        '.exp-line-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.exp-timeline',
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: true,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>('.exp-item').forEach((item) => {
        const dot = item.querySelector('.exp-dot');
        const content = item.querySelector('.exp-content');
        // Card arrives from slight depth as the role enters view.
        gsap.fromTo(
          content,
          { autoAlpha: 0, y: 40, z: -80 },
          {
            autoAlpha: 1,
            y: 0,
            z: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 82%' },
          },
        );
        // Node activates (dim → bright) as it reaches the reading line.
        gsap.fromTo(
          dot,
          { '--dot-lit': 0.12 },
          {
            '--dot-lit': item.classList.contains('is-current') ? 1 : 0.7,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: { trigger: item, start: 'top 72%' },
          },
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="experience" ref={rootRef} className="section exp" aria-label="Experience">
      <div className="container">
        <div className="exp-head">
          <span className="eyebrow"><span className="num">04</span> Experience</span>
          <h2 className="exp-title display" data-reveal>
            A track record<br />across the stack.
          </h2>
        </div>

        <div className="exp-timeline">
          <div className="exp-line" aria-hidden="true">
            <div className="exp-line-fill" />
          </div>

          <ol className="exp-list">
            {experience.map((e, i) => (
              <li
                key={e.company + e.period}
                className={`exp-item${i === 0 ? ' is-current' : ''}`}
              >
                <div className="exp-year mono">{e.year}</div>
                <div className="exp-dot" aria-hidden="true" />
                <div className="exp-content">
                  <div className="exp-content-head">
                    <h3 className="exp-role">{e.role}</h3>
                    <span className="exp-company">{e.company}</span>
                    <span className="exp-period mono">{e.period}</span>
                    {i === 0 && <span className="exp-current-tag mono" aria-hidden="true">CURRENT</span>}
                  </div>
                  <p className="exp-summary">{e.summary}</p>
                  <ul className="exp-points">
                    {e.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <ul className="exp-tech">
                    {e.tech.map((t) => (
                      <li key={t} className="mono">{t}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
