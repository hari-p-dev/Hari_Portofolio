import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolio } from '@/data/portfolioData';
import { useEnv } from '@/hooks/useEnv';
import Magnetic from '@/components/common/Magnetic';
import './Profile.css';

gsap.registerPlugin(ScrollTrigger);

const IconCap = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3 2 8l10 5 10-5-10-5Z" fill="currentColor" />
    <path d="M6 10.5V15c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const IconCert = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="1.6" />
    <path d="m9 13-1.5 7L12 18l4.5 2L15 13" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);
const IconTrophy = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" stroke="currentColor" strokeWidth="1.6" />
    <path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M10 15h4M9 20h6M12 15v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export default function Profile() {
  const { personal, education, certifications, achievements, projects, experience } = portfolio;
  const { reducedMotion, touch } = useEnv();
  const rootRef = useRef<HTMLElement>(null);

  // Metric strip — every value derived from existing data so it never drifts.
  const cgpa = education.find((e) => e.detail.includes('CGPA'))?.detail.match(/[\d.]+/)?.[0] ?? '';
  const stats: { value: number; decimals?: number; label: string }[] = [
    { value: projects.length, label: 'Projects shipped' },
    { value: experience.length, label: 'Roles' },
    { value: cgpa ? parseFloat(cgpa) : 0, decimals: 2, label: 'B.Tech CGPA' },
    { value: 3, label: 'Domains' }, // SaaS · Government · Enterprise
  ];

  // "What I do" — capabilities summarised from the real skill groups.
  const capabilities = [
    { num: '01', title: 'Frontend Engineering', detail: 'React · TypeScript · Modern UI systems' },
    { num: '02', title: 'Backend & APIs', detail: 'Node.js · REST APIs · Authentication' },
    { num: '03', title: 'Data & Architecture', detail: 'PostgreSQL · Multi-tenant SaaS · RBAC' },
    { num: '04', title: 'Security & Reliability', detail: 'JWT · Refresh Tokens · Rate Limiting' },
  ];
  // Qualitative highlights (no invented numbers — reflect real skills/domains).
  const highlights = [
    { tag: 'FULL STACK', note: 'End-to-end development' },
    { tag: 'SECURITY FIRST', note: 'Secure-by-design systems' },
    { tag: 'ENTERPRISE', note: 'Scalable architecture' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;
      gsap.fromTo(
        '.profile-head [data-reveal]',
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.profile-head', start: 'top 82%' },
        },
      );
      // Capability rows reveal sequentially.
      gsap.fromTo(
        '.cap-row',
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.profile-do', start: 'top 80%' },
        },
      );
      gsap.fromTo(
        '.profile-highlight',
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.profile-highlights', start: 'top 88%' },
        },
      );
      gsap.fromTo(
        '.profile-card',
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.profile-cards', start: 'top 80%' },
        },
      );

      // Sequential timeline-node illumination: each card's nodes light up in
      // order as the card enters view.
      gsap.utils.toArray<HTMLElement>('.profile-card').forEach((card) => {
        const nodes = card.querySelectorAll('.profile-tl-node');
        gsap.fromTo(
          nodes,
          { '--node-lit': 0 },
          {
            '--node-lit': 1,
            duration: 0.5,
            stagger: 0.14,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 76%' },
          },
        );
      });

      // Metric strip count-up (final values already in the DOM; animate from 0).
      gsap.utils.toArray<HTMLElement>('.profile-stat-num').forEach((el) => {
        const target = parseFloat(el.dataset.value ?? '0');
        const decimals = parseInt(el.dataset.decimals ?? '0', 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.profile-stats', start: 'top 85%' },
          onUpdate: () => { el.textContent = obj.v.toFixed(decimals); },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  // Subtle pointer-responsive panel depth (desktop only).
  useEffect(() => {
    if (touch || reducedMotion) return;
    const cards = gsap.utils.toArray<HTMLElement>('.profile-card');
    const setters = cards.map((c) => ({
      rx: gsap.quickTo(c, 'rotationX', { duration: 0.6, ease: 'power3' }),
      ry: gsap.quickTo(c, 'rotationY', { duration: 0.6, ease: 'power3' }),
    }));
    const onMove = (e: PointerEvent) => {
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const cx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const cy = (e.clientY - (r.top + r.height / 2)) / r.height;
        // Only react when the pointer is reasonably near the card.
        if (Math.abs(cx) > 1.4 || Math.abs(cy) > 1.4) {
          setters[i].rx(0);
          setters[i].ry(0);
          return;
        }
        setters[i].ry(cx * 4);
        setters[i].rx(-cy * 4);
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [touch, reducedMotion]);

  return (
    <section id="profile" ref={rootRef} className="section profile" aria-label="About">
      <div className="profile-art" aria-hidden="true" />

      <div className="container">
        <div className="profile-head">
          {/* LEFT — personal introduction */}
          <div className="profile-intro">
            <span className="eyebrow" data-reveal><span className="num">01</span> About</span>
            <h2 className="profile-headline display" data-reveal>
              I build <span className="accent">scalable</span> digital products from interface to infrastructure.
            </h2>
            <p className="profile-lead" data-reveal>
              <span className="accent">Full-stack</span> developer focused on building{' '}
              <span className="accent">secure</span>, scalable and user-friendly web applications
              using React, TypeScript, Node.js and PostgreSQL.
            </p>
            <div className="profile-cta" data-reveal>
              <Magnetic href="#work" className="btn-gradient" cursorLabel="VIEW WORK">
                View My Work
                <span className="btn-arrow" aria-hidden="true">→</span>
              </Magnetic>
              <Magnetic href={personal.resume} className="btn-outline" cursorLabel="resume" download>
                Download Resume
              </Magnetic>
            </div>
          </div>

          {/* RIGHT — professional summary */}
          <div className="profile-do glass" data-reveal>
            <span className="card-head-label profile-do-title">What I Do</span>
            <ul className="cap-list">
              {capabilities.map((c) => (
                <li key={c.num} className="cap-row">
                  <span className="cap-num mono" aria-hidden="true">{c.num}</span>
                  <span className="cap-body">
                    <span className="cap-title">{c.title}</span>
                    <span className="cap-detail mono">{c.detail}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="profile-highlights">
              {highlights.map((h) => (
                <div key={h.tag} className="profile-highlight">
                  <span className="profile-highlight-tag mono">{h.tag}</span>
                  <span className="profile-highlight-note">{h.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="profile-stats" aria-label="Career at a glance">
          {stats.map((s) => (
            <div key={s.label} className="profile-stat">
              <span
                className="profile-stat-num"
                data-value={s.value}
                data-decimals={s.decimals ?? 0}
              >
                {s.value.toFixed(s.decimals ?? 0)}
              </span>
              <span className="profile-stat-label mono">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="profile-cards">
          {/* EDUCATION */}
          <article className="profile-card glass">
            <div className="card-head">
              <span className="icon-chip"><IconCap /></span>
              <span className="card-head-label">Education</span>
              <span className="profile-card-tag mono" aria-hidden="true">EDUCATION.01</span>
            </div>
            <ul className="profile-timeline">
              {education.map((e) => (
                <li key={e.degree + e.period} className="profile-tl-item">
                  <span className="profile-tl-node" aria-hidden="true" />
                  <div className="profile-tl-top">
                    <span className="profile-tl-title">{e.degree}</span>
                    <span className="profile-tl-meta mono">{e.period}</span>
                  </div>
                  <span className="profile-tl-sub">{e.institution}</span>
                  <span className="profile-tl-detail mono">{e.detail}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* CERTIFICATIONS */}
          <article className="profile-card glass">
            <div className="card-head">
              <span className="icon-chip"><IconCert /></span>
              <span className="card-head-label">Certifications</span>
              <span className="profile-card-tag mono" aria-hidden="true">CERTIFICATION.02</span>
            </div>
            <ul className="profile-timeline profile-timeline--dotted">
              {certifications.map((c) => (
                <li key={c.title} className="profile-tl-item">
                  <span className="profile-tl-node" aria-hidden="true" />
                  <span className="profile-tl-title">{c.title}</span>
                  <span className="profile-tl-sub mono">{c.issuer}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* ACHIEVEMENTS */}
          <article className="profile-card glass">
            <div className="card-head">
              <span className="icon-chip"><IconTrophy /></span>
              <span className="card-head-label">Achievements</span>
              <span className="profile-card-tag mono" aria-hidden="true">ACHIEVEMENT.03</span>
            </div>
            <ul className="profile-timeline profile-timeline--dotted">
              {achievements.map((a) => {
                const hasLink = !!a.url && /^https?:\/\//.test(a.url);
                return (
                  <li key={a.title} className="profile-tl-item">
                    <span className="profile-tl-node" aria-hidden="true" />
                    <div className="profile-tl-top">
                      {hasLink ? (
                        <a
                          className="profile-tl-title profile-tl-link"
                          href={a.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="open"
                          data-cursor-label="open"
                        >
                          {a.title}
                          <span className="profile-tl-paper mono" aria-hidden="true">PAPER ↗</span>
                        </a>
                      ) : (
                        <span className="profile-tl-title">{a.title}</span>
                      )}
                      <span className="profile-tl-meta mono">{a.year}</span>
                    </div>
                    <span className="profile-tl-sub">{a.detail}</span>
                  </li>
                );
              })}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
