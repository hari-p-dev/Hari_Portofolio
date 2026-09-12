import { useRef } from 'react';
import type { ReactNode } from 'react';
import './Magnetic.css';

interface MagneticProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  cursorLabel?: string;
  download?: boolean;
  ariaLabel?: string;
}

/** Magnetic wrapper for high-value CTAs. No-op on touch / reduced motion. */
export default function Magnetic({
  children,
  href,
  onClick,
  className = '',
  strength = 0.35,
  cursorLabel,
  download,
  ariaLabel,
}: MagneticProps) {
  const ref = useRef<HTMLElement>(null);

  // Magnetic positional movement is intentionally disabled — buttons stay put
  // on hover. All other hover styling (gradient, arrow slide, light sweep,
  // glow) is handled in CSS and remains active.
  void strength;

  const commonProps = {
    ref: ref as never,
    className: `magnetic ${className}`,
    'data-cursor': 'open',
    'data-cursor-label': cursorLabel,
    'aria-label': ariaLabel,
  };

  if (href) {
    const external = href.startsWith('http') || href.startsWith('mailto');
    return (
      <a
        {...commonProps}
        href={href}
        {...(download ? { download: '' } : {})}
        {...(external && !download ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <span className="magnetic-inner">{children}</span>
      </a>
    );
  }

  return (
    <button {...commonProps} onClick={onClick} type="button">
      <span className="magnetic-inner">{children}</span>
    </button>
  );
}
