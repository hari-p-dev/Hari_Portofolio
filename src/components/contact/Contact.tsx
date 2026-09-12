import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolio } from '@/data/portfolioData';
import { useEnv } from '@/hooks/useEnv';
import Magnetic from '@/components/common/Magnetic';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

/* Inline line icons (Lucide-style) — consistent with the project's icon set. */
const IconMail = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);
const IconGithub = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 19c-4 1.2-4-2-6-2m12 4v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6 .7 5 1 5 1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.5 7.4c0 4.6 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.2V21" />
  </svg>
);
const IconLinkedin = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-11h4v1.5" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const IconResume = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" /><path d="M14 3v6h6M9 13h6M9 17h4" />
  </svg>
);
const IconMapPin = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconPhone = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);

export default function Contact() {
  const { personal, links } = portfolio;
  const { reducedMotion } = useEnv();
  const rootRef = useRef<HTMLElement>(null);

  // Primary CTA opens Gmail's web compose directly, so it works even when the
  // visitor has no default mail app registered for mailto: links.
  const subject = encodeURIComponent('Let’s build something together');
  const body = encodeURIComponent(
    'Hi Hari,\n\nI came across your portfolio and I’d like to discuss a project or opportunity.\n\n',
  );
  const gmailCompose =
    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personal.email)}&su=${subject}&body=${body}`;

  const options = [
    { key: 'email', icon: IconMail, label: 'Email', note: 'Send message', href: links.email, cta: 'Send message', external: false, download: false },
    { key: 'github', icon: IconGithub, label: 'GitHub', note: 'Explore my code', href: links.github, cta: 'View GitHub', external: true, download: false },
    { key: 'linkedin', icon: IconLinkedin, label: 'LinkedIn', note: 'Connect professionally', href: links.linkedin, cta: 'Open LinkedIn', external: true, download: false },
    { key: 'resume', icon: IconResume, label: 'Résumé', note: 'Download my résumé', href: personal.resume, cta: 'Download', external: false, download: true },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return;
      gsap.fromTo(
        '.contact-title-line',
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power4.out',
          scrollTrigger: { trigger: '.contact-title', start: 'top 88%' },
        },
      );
      gsap.fromTo(
        '.contact-sub, .contact-panel',
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-sub', start: 'top 88%' },
        },
      );
      gsap.fromTo(
        '.contact-option',
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-options', start: 'top 88%' },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="contact" ref={rootRef} className="section contact" aria-label="Contact">
      {/* Decorative finale composition */}
      <div className="contact-orb" aria-hidden="true" />
      <div className="contact-rings" aria-hidden="true" />

      <div className="container contact-inner">
        <span className="eyebrow"><span className="num">06</span> Contact</span>

        <h2 className="contact-title display">
          <span className="contact-title-line">Let’s build</span>
          <span className="contact-title-line contact-title-line--accent">something remarkable.</span>
        </h2>

        <p className="contact-sub">
          Have a project, opportunity, or idea in mind? I’m always open to discussing
          meaningful products and challenging problems.
        </p>

        {/* Premium CTA panel */}
        <div className="contact-panel glass">
          <span className="contact-avail mono" aria-label="Available for opportunities">
            <span className="contact-avail-dot" aria-hidden="true" />
            Available for opportunities
          </span>
          <p className="contact-panel-title">Have a project in mind?</p>
          <p className="contact-panel-note">Let’s talk about how we can build it.</p>
          <Magnetic
            href={gmailCompose}
            className="btn-gradient contact-cta"
            cursorLabel="LET'S TALK"
            ariaLabel="Start a conversation — email Hari"
          >
            <span className="contact-cta-sweep" aria-hidden="true" />
            Start a Conversation
            <span className="btn-arrow" aria-hidden="true">→</span>
          </Magnetic>
          <span className="contact-panel-sla mono">Usually responds within 24 hours</span>
        </div>

        {/* Contact option cards */}
        <div className="contact-options">
          {options.map((o) => (
            <a
              key={o.key}
              className="contact-option glass"
              href={o.href}
              {...(o.download ? { download: '' } : {})}
              {...(o.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              data-cursor="open"
              data-cursor-label="open"
            >
              <span className="contact-option-icon" aria-hidden="true">{o.icon}</span>
              <span className="contact-option-label mono">{o.label}</span>
              <span className="contact-option-note">{o.note}</span>
              <span className="contact-option-cta">{o.cta} <span className="contact-option-arrow" aria-hidden="true">→</span></span>
            </a>
          ))}
        </div>

        {/* Secondary details */}
        <div className="contact-detail">
          <span className="contact-detail-item">
            <span className="contact-detail-ico" aria-hidden="true">{IconMapPin}</span>
            {personal.location}
          </span>
          <a className="contact-detail-item" href={`tel:${personal.phone.replace(/\s/g, '')}`} data-cursor="open">
            <span className="contact-detail-ico" aria-hidden="true">{IconPhone}</span>
            {personal.phone}
          </a>
          <a className="contact-detail-item" href={links.email} data-cursor="open">
            <span className="contact-detail-ico" aria-hidden="true">{IconMail}</span>
            {personal.email}
          </a>
        </div>
      </div>

      {/* Finale horizon glow (decorative) — seats the planet-rise composition. */}
      <div className="contact-horizon" aria-hidden="true" />
    </section>
  );
}
