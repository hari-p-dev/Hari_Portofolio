import { portfolio } from '@/data/portfolioData';
import { scrollToSection } from '@/hooks/useSmoothScroll';
import './Footer.css';

const NAV = [
  { id: 'profile', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Footer() {
  const { personal, links } = portfolio;
  const year = new Date().getFullYear();

  const social = [
    { label: 'GitHub', href: links.github, external: true },
    { label: 'LinkedIn', href: links.linkedin, external: true },
    { label: 'Email', href: links.email, external: false },
    { label: 'Résumé', href: personal.resume, external: false, download: true },
  ];

  const toTop = () => scrollToSection('hero');

  return (
    <footer className="footer" aria-label="Footer">
      <div className="container footer-inner">
        <div className="footer-cols">
          {/* Brand */}
          <div className="footer-brand">
            <span className="footer-logo" aria-hidden="true">
              <img src="/logo.png" alt="" width="40" height="40" />
            </span>
            <span className="footer-brand-text">
              <span className="footer-name display">{personal.name}</span>
              <span className="footer-role mono">Full-Stack Developer</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="footer-nav" aria-label="Footer navigation">
            <span className="footer-col-label mono">Navigation</span>
            {NAV.map((n) => (
              <button key={n.id} className="footer-link" onClick={() => scrollToSection(n.id)} data-cursor="open">
                {n.label}
              </button>
            ))}
          </nav>

          {/* Connect */}
          <div className="footer-social">
            <span className="footer-col-label mono">Connect</span>
            {social.map((s) => (
              <a
                key={s.label}
                className="footer-link"
                href={s.href}
                {...(s.download ? { download: '' } : {})}
                {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                data-cursor="open"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-base">
          <span className="footer-copy mono">© {year} {personal.name}</span>
          <span className="footer-built mono">Built with React · TypeScript · GSAP</span>
          <button className="footer-top" onClick={toTop} data-cursor="open" aria-label="Back to top">
            Back to top <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
