import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolio } from '@/data/portfolioData';
import { useEnv } from '@/hooks/useEnv';
import Magnetic from '@/components/common/Magnetic';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { personal, positioning, links } = portfolio;
  const { touch, reducedMotion } = useEnv();
  const rootRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rimRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  // Entrance timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set('[data-hero-reveal], .hero-portrait-stage, .hero-code, .hero-hud', {
          autoAlpha: 1, y: 0, x: 0, scale: 1,
        });
        gsap.set('.hero-name .word-inner', { yPercent: 0 });
        return;
      }

      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo('.hero-eyebrow', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo(
          '.hero-name .word-inner',
          { yPercent: 120 },
          { yPercent: 0, duration: 1.2, ease: 'power4.out' },
          '-=0.4',
        )
        // Cinematic light sweep across the name once it has arrived.
        .fromTo(
          '.hero-name .word-inner',
          { '--sweep': '-120%' },
          { '--sweep': '120%', duration: 1.1, ease: 'power2.inOut' },
          '-=0.5',
        )
        .fromTo('.hero-role', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=1.1')
        .fromTo('.hero-statement', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .fromTo('.hero-cta', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .fromTo('.hero-connect', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .fromTo(
          '.hero-portrait-stage',
          { autoAlpha: 0, scale: 0.9, filter: 'blur(14px)' },
          { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out' },
          '-=1.4',
        )
        .fromTo('.hero-hud-item', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' }, '-=0.9')
        .fromTo('.hero-code', { autoAlpha: 0, x: 20 }, { autoAlpha: 1, x: 0, duration: 0.9, ease: 'power3.out' }, '-=0.7')
        .fromTo('.hero-note', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, '-=0.5');
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  // Layered cursor-driven depth: ring (back), portrait (mid), rim-light + HUD
  // (front) all move from ONE smoothed pointer loop for a cohesive 3D feel.
  useEffect(() => {
    if (touch || reducedMotion) return;
    const portrait = portraitRef.current;
    if (!portrait) return;

    const rotY = gsap.quickTo(portrait, 'rotationY', { duration: 0.9, ease: 'power3' });
    const rotX = gsap.quickTo(portrait, 'rotationX', { duration: 0.9, ease: 'power3' });
    const hudX = gsap.quickTo(hudRef.current, 'x', { duration: 0.7, ease: 'power3' });
    const hudY = gsap.quickTo(hudRef.current, 'y', { duration: 0.7, ease: 'power3' });

    const onMove = (e: PointerEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      rotY(cx * 5);
      rotX(-cy * 5);
      hudX(cx * 22);
      hudY(cy * 22);
      // Cursor-driven rim light: move the highlight toward the pointer.
      if (rimRef.current) {
        rimRef.current.style.setProperty('--rx', `${50 + cx * 30}%`);
        rimRef.current.style.setProperty('--ry', `${45 + cy * 30}%`);
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [touch, reducedMotion]);

  return (
    <section id="hero" ref={rootRef} className="hero" aria-label="Introduction">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-bg-fade" aria-hidden="true" />

      <div className="container hero-grid">
        {/* LEFT — copy */}
        <div className="hero-copy">
          <p className="hero-eyebrow">
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            HELLO, I&rsquo;M
          </p>

          <h1 className="hero-name display">
            <span className="word-mask">
              <span className="word-inner" data-word="HARI">HARI</span>
            </span>
            <span className="hero-role">Full-Stack Developer</span>
          </h1>

          <p className="hero-statement">{positioning.statement}</p>

          <div className="hero-cta">
            <Magnetic href="#work" className="btn-gradient" cursorLabel="VIEW WORK">
              View My Work
              <span className="btn-arrow" aria-hidden="true">↗</span>
            </Magnetic>
            <Magnetic href="#profile" className="btn-outline" cursorLabel="ABOUT">
              About Me
            </Magnetic>
          </div>

          <div className="hero-connect">
            <span className="hero-connect-label mono">CONNECT</span>
            <div className="hero-connect-icons">
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-cursor="open">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>
              </a>
              <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" data-cursor="open">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z"/></svg>
              </a>
              <a href={links.email} aria-label="Email" data-cursor="open">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M22 4H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-.4 4.25-9.6 6-9.6-6V6l9.6 6 9.6-6v2.25z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT — portrait in glowing ring + code snippet */}
        <div className="hero-visual">
          <div className="hero-portrait-stage" ref={portraitRef}>
            <div className="hero-ring" ref={ringRef} aria-hidden="true" />
            <div className="hero-portrait">
              <img
                src={personal.portrait}
                alt="Portrait of Hari P, full-stack developer"
                fetchPriority="high"
                width={720}
                height={960}
              />
              {/* Cursor-driven holographic rim light (decorative). */}
              <div className="hero-rim" ref={rimRef} aria-hidden="true" />
            </div>

            {/* Floating technical HUD annotations (decorative). */}
            <div className="hero-hud" ref={hudRef} aria-hidden="true">
              <span className="hero-hud-item hero-hud--tl mono">SYS.ONLINE</span>
              <span className="hero-hud-item hero-hud--tr mono">STACK // FULL</span>
              <span className="hero-hud-item hero-hud--bl mono">13.08°N · 80.27°E</span>
              <span className="hero-hud-item hero-hud--br mono">RENDER.OK</span>
            </div>
          </div>

          <pre className="hero-code mono" aria-hidden="true">
            <code>
              <span className="c-key">const</span> <span className="c-var">hari</span> = {'{'}
              {'\n'}  <span className="c-prop">stack</span>: [<span className="c-str">"React"</span>, <span className="c-str">"Node"</span>, <span className="c-str">"Postgres"</span>],
              {'\n'}  <span className="c-prop">builds</span>: <span className="c-str">"end-to-end systems"</span>,
              {'\n'}  <span className="c-prop">status</span>: <span className="c-str">"available"</span>
              {'\n'}{'}'};
            </code>
          </pre>

          <p className="hero-note mono" aria-hidden="true">
            // CRAFTING SOLUTIONS<br />THAT MAKE AN IMPACT
          </p>
        </div>
      </div>
    </section>
  );
}
