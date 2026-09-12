import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { scrollToSection } from '@/hooks/useSmoothScroll';
import { subscribeScroll } from '@/hooks/useScrollProgress';
import { useScrollLock } from '@/hooks/useScrollLock';
import { portfolio } from '@/data/portfolioData';
import './Navigation.css';

/* Inline outline icons (Lucide-style) — the project has no icon library. */
const IconUser = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="3.2" /><path d="M5 20a7 7 0 0 1 14 0" />
  </svg>
);
const IconLayers = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" />
  </svg>
);
const IconCode = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12" />
  </svg>
);
const IconRocket = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5A2.1 2.1 0 0 0 5 15Z" /><path d="M9 12a12 12 0 0 1 8-8 12 12 0 0 1-8 8Z" /><path d="M15 9a2 2 0 1 0-2-2M9 12l3 3" />
  </svg>
);
const IconMail = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);
const IconAward = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="9" r="5" /><path d="m9 13-1.6 7L12 18l4.6 2L15 13" />
  </svg>
);

interface NavItem { id: string; label: string; icon: ReactNode }
const NAV: NavItem[] = [
  { id: 'profile', label: 'About', icon: IconUser },
  { id: 'stack', label: 'Stack', icon: IconLayers },
  { id: 'work', label: 'Work', icon: IconCode },
  { id: 'experience', label: 'Experience', icon: IconRocket },
  { id: 'certificates', label: 'Certificates', icon: IconAward },
  { id: 'contact', label: 'Contact', icon: IconMail },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Scroll-progress light travelling around the navbar perimeter + a
  // pointer-following glass highlight — the "command interface" feel.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const unsub = subscribeScroll((s) => {
      panel.style.setProperty('--nav-progress', `${Math.round(s.global * 100)}%`);
    });
    const onMove = (e: PointerEvent) => {
      const r = panel.getBoundingClientRect();
      panel.style.setProperty('--hl-x', `${((e.clientX - r.left) / r.width) * 100}%`);
      panel.style.setProperty('--hl-y', `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    const onLeave = () => panel.style.setProperty('--hl-o', '0');
    const onEnter = () => panel.style.setProperty('--hl-o', '1');
    panel.addEventListener('pointermove', onMove, { passive: true });
    panel.addEventListener('pointerleave', onLeave);
    panel.addEventListener('pointerenter', onEnter);
    return () => {
      unsub();
      panel.removeEventListener('pointermove', onMove);
      panel.removeEventListener('pointerleave', onLeave);
      panel.removeEventListener('pointerenter', onEnter);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['hero', ...NAV.map((n) => n.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile drawer is open (counter-based).
  useScrollLock(menuOpen);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="navbar-panel" ref={panelRef}>
          {/* Orbiting lavender border light (decorative) */}
          <span className="navbar-orbit" aria-hidden="true" />
          {/* Pointer-following glass highlight (decorative) */}
          <span className="navbar-highlight" aria-hidden="true" />
          {/* Scroll-progress line along the bottom edge (decorative) */}
          <span className="navbar-progress" aria-hidden="true" />

          {/* LEFT — identity */}
          <button
            className="navbar-identity"
            onClick={() => go('hero')}
            aria-label={scrolled ? 'Back to top' : `${portfolio.personal.name} — home`}
          >
            <span className="navbar-avatar" aria-hidden="true">
              <img src="/logo.png" alt="" width="42" height="42" />
            </span>
            <span className="navbar-identity-text">
              <span className="navbar-name">{portfolio.personal.name}</span>
              <span className="navbar-subtitle">{portfolio.personal.role}</span>
            </span>
          </button>

          <span className="navbar-divider" aria-hidden="true" />

          {/* CENTER — navigation */}
          <nav className="navbar-nav" aria-label="Primary">
            {NAV.map((item) => (
              <button
                key={item.id}
                className={`navbar-link${active === item.id ? ' is-active' : ''}`}
                onClick={() => go(item.id)}
                aria-current={active === item.id ? 'true' : undefined}
              >
                <span className="navbar-link-icon">{item.icon}</span>
                <span className="navbar-link-label">{item.label}</span>
                <span className="navbar-link-dot" aria-hidden="true" />
              </button>
            ))}
          </nav>

          <span className="navbar-divider navbar-divider--right" aria-hidden="true" />

          {/* RIGHT — availability */}
          <div className="navbar-status mono">
            <span className="navbar-status-dot" aria-hidden="true" />
            <span className="navbar-status-text">AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          {/* Mobile menu button */}
          <button
            className={`navbar-burger${menuOpen ? ' is-open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`navbar-mobile${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="navbar-mobile-nav" aria-label="Mobile">
          {NAV.map((item) => (
            <button
              key={item.id}
              className={`navbar-mobile-link${active === item.id ? ' is-active' : ''}`}
              onClick={() => go(item.id)}
              aria-current={active === item.id ? 'true' : undefined}
            >
              <span className="navbar-link-icon">{item.icon}</span>
              <span className="navbar-mobile-label display">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="navbar-mobile-foot mono">
          <span className="navbar-status-dot" /> AVAILABLE FOR OPPORTUNITIES
        </div>
      </div>
    </>
  );
}
