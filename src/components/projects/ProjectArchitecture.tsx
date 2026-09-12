import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { ProjectArchitectureNode } from '@/data/types';

interface ProjectArchitectureProps {
  nodes: ProjectArchitectureNode[];
  open: boolean;
  animate: boolean;
}

/**
 * Vertical architecture diagram with an animated SVG connector spine.
 * When the project opens, the connecting line draws downward and each node
 * illuminates in sequence — a system assembling itself. Purely presentational;
 * the node text (real résumé data) is normal, readable DOM.
 */
export default function ProjectArchitecture({ nodes, open, animate }: ProjectArchitectureProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const line = lineRef.current;
    if (!root || !line) return;

    const dots = root.querySelectorAll<HTMLElement>('.project-arch-dot');
    const items = root.querySelectorAll<HTMLElement>('.project-arch-node');

    // Reset any previous timeline.
    tlRef.current?.kill();

    if (!open) {
      // Collapsed: keep it primed (dark) so opening always re-draws.
      if (animate) {
        const len = root.offsetHeight;
        line.setAttribute('y2', `${len}`);
        line.style.strokeDasharray = `${len}`;
        line.style.strokeDashoffset = `${len}`;
        gsap.set(dots, { '--dot-lit': 0 });
        gsap.set(items, { autoAlpha: 0.35 });
      }
      return;
    }

    if (!animate) {
      const h = root.offsetHeight;
      line.setAttribute('y2', `${h}`);
      line.style.strokeDashoffset = '0';
      gsap.set(dots, { '--dot-lit': 1 });
      gsap.set(items, { autoAlpha: 1 });
      return;
    }

    // Compute the spine length and prime the dash.
    const len = root.offsetHeight;
    line.setAttribute('y2', `${len}`);
    line.style.strokeDasharray = `${len}`;
    line.style.strokeDashoffset = `${len}`;

    const tl = gsap.timeline({ delay: 0.15 });
    tl.to(line, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' })
      .fromTo(
        items,
        { autoAlpha: 0.3, x: -8 },
        { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.12, ease: 'power2.out' },
        0.1,
      )
      .to(dots, { '--dot-lit': 1, duration: 0.35, stagger: 0.12, ease: 'power2.out' }, 0.15);
    tlRef.current = tl;

    return () => { tl.kill(); };
  }, [open, animate, nodes.length]);

  return (
    <div className="project-arch-wrap" ref={rootRef}>
      <svg className="project-arch-svg" aria-hidden="true" focusable="false" preserveAspectRatio="none">
        <line ref={lineRef} className="project-arch-spine" x1="7" y1="0" x2="7" y2="0" />
      </svg>
      <ol className="project-arch">
        {nodes.map((node) => (
          <li key={node.layer} className="project-arch-node">
            <span className="project-arch-dot" aria-hidden="true" />
            <span className="project-arch-layer">{node.layer}</span>
            <span className="project-arch-tech mono">{node.tech}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
