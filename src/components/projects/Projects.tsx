import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolio } from '@/data/portfolioData';
import { useEnv } from '@/hooks/useEnv';
import ProjectArchitecture from './ProjectArchitecture';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

// Per-project accent hue (H S% L%) — each case study its own environment light.
const PROJECT_HUE: Record<string, string> = {
  '01': '210 100% 66%', // Learn2Drive — electric blue
  '02': '160 80% 60%',  // Tourist Exit Survey — green/teal
  '03': '265 90% 70%',  // Tax Portal — violet
  '04': '35 90% 64%',   // SSCIVIL — amber
};

export default function Projects() {
  const { projects } = portfolio;
  const { reducedMotion } = useEnv();
  const rootRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;
      gsap.fromTo(
        '.projects-head [data-reveal]',
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.projects-head', start: 'top 82%' },
        },
      );
      gsap.utils.toArray<HTMLElement>('.project').forEach((row) => {
        gsap.fromTo(
          row,
          { autoAlpha: 0, y: 48 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 84%' },
          },
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  const toggle = (idx: string) => setOpen((cur) => (cur === idx ? null : idx));

  return (
    <section id="work" ref={rootRef} className="section projects" aria-label="Selected work">
      <div className="container">
        <div className="projects-head">
          <span className="eyebrow"><span className="num">03</span> Selected Work</span>
          <h2 className="projects-title display" data-reveal>
            Evidence, not<br />adjectives.
          </h2>
          <p className="projects-lead" data-reveal>
            Four systems built across SaaS, government, and enterprise domains —
            each one full-stack, each one shipped end to end.
          </p>
        </div>

        <div className="projects-list">
          {projects.map((p) => {
            const isOpen = open === p.index;
            const accent = PROJECT_HUE[p.index] ?? '265 90% 70%';
            return (
              <article
                key={p.index}
                className={`project${isOpen ? ' is-open' : ''}`}
                style={{ ['--proj-accent' as string]: accent }}
              >
                <button
                  className="project-bar"
                  onClick={() => toggle(p.index)}
                  aria-expanded={isOpen}
                  data-cursor={isOpen ? 'open' : 'view'}
                  data-cursor-label={isOpen ? 'CLOSE' : 'VIEW CASE'}
                >
                  <span className="project-index mono">{p.index}</span>
                  <h3 className="project-name display">{p.name}</h3>
                  <span className="project-kind mono">{p.kind}</span>
                  <span className="project-toggle" aria-hidden="true">{isOpen ? '–' : '+'}</span>
                </button>

                <div className="project-preview" aria-hidden="true">
                  {p.tech.slice(0, 6).map((t) => (
                    <span key={t} className="project-preview-tech mono">{t}</span>
                  ))}
                </div>

                <div className="project-detail" data-open={isOpen}>
                  <div className="project-detail-inner">
                    <div className="project-cols">
                      <div className="project-block">
                        <h4 className="project-block-title mono">CHALLENGE</h4>
                        <p>{p.challenge}</p>
                      </div>
                      <div className="project-block">
                        <h4 className="project-block-title mono">APPROACH</h4>
                        <p>{p.approach}</p>
                      </div>
                      <div className="project-block">
                        <h4 className="project-block-title mono">ROLE</h4>
                        <p>{p.role}</p>
                      </div>
                    </div>

                    <div className="project-cols project-cols--two">
                      <div className="project-block">
                        <h4 className="project-block-title mono">KEY FEATURES</h4>
                        <ul className="project-features">
                          {p.features.map((f) => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="project-block">
                        <h4 className="project-block-title mono">ARCHITECTURE</h4>
                        <ProjectArchitecture
                          nodes={p.architecture}
                          open={isOpen}
                          animate={!reducedMotion}
                        />
                      </div>
                    </div>

                    {p.result && (
                      <div className="project-block project-result">
                        <h4 className="project-block-title mono">RESULT</h4>
                        <p>{p.result}</p>
                      </div>
                    )}

                    <ul className="project-tech-all">
                      {p.tech.map((t) => (
                        <li key={t} className="mono">{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
