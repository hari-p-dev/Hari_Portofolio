import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  len: number;
}

interface StackConstellationProps {
  /** Ref to the .stack-tiles list whose children we connect. */
  tilesRef: React.RefObject<HTMLElement>;
  /** Changes whenever the active category changes → recompute + redraw. */
  activeKey: string;
  animate: boolean;
}

/**
 * Decorative constellation: an SVG overlay sized to the tiles container that
 * draws faint connecting lines from a central "core" node out to each tech
 * tile. Redraws on category change and on resize. Purely visual (aria-hidden);
 * the real, accessible tiles sit above it untouched.
 */
export default function StackConstellation({ tilesRef, activeKey, animate }: StackConstellationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [lines, setLines] = useState<Line[]>([]);
  const [core, setCore] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = tilesRef.current;
    if (!container) return;

    const measure = () => {
      const cRect = container.getBoundingClientRect();
      const w = cRect.width;
      const h = cRect.height;
      // Core anchor: upper-left region, like a system hub.
      const cx = w * 0.06;
      const cy = -18; // slightly above the grid
      const tiles = Array.from(container.children) as HTMLElement[];
      const next: Line[] = tiles.map((t) => {
        const r = t.getBoundingClientRect();
        const x2 = r.left - cRect.left + r.width / 2;
        const y2 = r.top - cRect.top + 14;
        const dx = x2 - cx;
        const dy = y2 - cy;
        return { x1: cx, y1: cy, x2, y2, len: Math.hypot(dx, dy) };
      });
      setBox({ w, h });
      setCore({ x: cx, y: cy });
      setLines(next);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [tilesRef, activeKey]);

  // Draw-on lines when the set changes (category switch).
  useEffect(() => {
    if (!svgRef.current || lines.length === 0) return;
    const paths = svgRef.current.querySelectorAll<SVGLineElement>('.stack-conn');
    const nodes = svgRef.current.querySelectorAll<SVGCircleElement>('.stack-conn-node');
    // Prime each line's dash to its own length so it can "draw" in.
    paths.forEach((p, i) => {
      const len = lines[i]?.len ?? 0;
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = animate ? `${len}` : '0';
    });
    if (!animate) {
      gsap.set(nodes, { opacity: 1 });
      return;
    }
    const tl = gsap.timeline();
    tl.to(paths, {
      strokeDashoffset: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: 'power2.out',
    }).fromTo(
      nodes,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.35, stagger: 0.03, ease: 'back.out(2)', transformOrigin: 'center' },
      '-=0.4',
    );
    return () => { tl.kill(); };
  }, [lines, animate, activeKey]);

  return (
    <svg
      ref={svgRef}
      className="stack-constellation"
      viewBox={`0 0 ${box.w || 1} ${box.h || 1}`}
      width={box.w}
      height={box.h}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      {lines.map((l, i) => (
        <line
          key={i}
          className="stack-conn"
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
        />
      ))}
      {/* Central core node */}
      <circle className="stack-core" cx={core.x} cy={core.y} r={4} />
      {lines.map((l, i) => (
        <circle key={`n${i}`} className="stack-conn-node" cx={l.x2} cy={l.y2} r={2.2} />
      ))}
    </svg>
  );
}
