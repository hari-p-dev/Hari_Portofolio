import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Per-chapter ambient lighting personality (RGB triplets for CSS var
 * interpolation). `a` is the dominant glow, `b` the deep base tint.
 * Palette per section (spec §23):
 *   hero     blue + violet
 *   about    violet
 *   stack    cyan + blue
 *   work     adaptive / neutral-technical
 *   exp      lavender
 *   contact  deep violet + soft white
 */
const CHAPTERS: { id: string; a: string; b: string }[] = [
  { id: 'hero',       a: '77, 120, 220',  b: '8, 10, 24' },
  { id: 'profile',    a: '124, 92, 252',  b: '10, 10, 22' },
  { id: 'stack',      a: '56, 150, 230',  b: '10, 14, 30' },
  { id: 'work',       a: '90, 96, 150',   b: '10, 11, 20' },
  { id: 'experience', a: '167, 139, 250', b: '16, 12, 26' },
  { id: 'certificates', a: '77, 163, 255', b: '12, 14, 28' },
  { id: 'contact',    a: '124, 92, 252',  b: '20, 12, 34' },
];

function parse(rgb: string): [number, number, number] {
  const [r, g, b] = rgb.split(',').map((n) => parseFloat(n));
  return [r, g, b];
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * Smoothly interpolates the two ambient light CSS vars as the user scrolls
 * through the whole page — a continuous lighting journey rather than discrete
 * per-section switches. Single scrubbed ScrollTrigger, no per-frame React.
 */
export function useChapterLighting(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const stops = CHAPTERS.map((c) => ({ a: parse(c.a), b: parse(c.b) }));
    const setA = gsap.quickSetter(document.body, '--light-a');
    const setB = gsap.quickSetter(document.body, '--light-b');

    const apply = (progress: number) => {
      // Map global progress across the chapter stops.
      const scaled = progress * (stops.length - 1);
      const i = Math.min(stops.length - 2, Math.floor(scaled));
      const t = scaled - i;
      const from = stops[i];
      const to = stops[i + 1];
      const a = from.a.map((v, k) => Math.round(lerp(v, to.a[k], t)));
      const b = from.b.map((v, k) => Math.round(lerp(v, to.b[k], t)));
      setA(`${a[0]}, ${a[1]}, ${a[2]}`);
      setB(`${b[0]}, ${b[1]}, ${b[2]}`);
    };

    apply(0);

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => apply(self.progress),
    });

    return () => trigger.kill();
  }, [enabled]);
}
