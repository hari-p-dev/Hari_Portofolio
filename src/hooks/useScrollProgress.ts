import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Shared scroll-progress model.
 *
 * A single ScrollTrigger writes normalized values into a plain mutable store.
 * - The WebGL render loop reads `progress.current` inside useFrame (no React
 *   re-render, no extra RAF).
 * - DOM components that need reactive values can subscribe.
 *
 * This keeps ONE scroll authority (Lenis → ScrollTrigger) driving everything.
 */

export const SECTIONS = ['hero', 'profile', 'stack', 'work', 'experience', 'certificates', 'contact'] as const;
export type SectionId = (typeof SECTIONS)[number];

export interface ScrollState {
  /** Global page progress 0→1. */
  global: number;
  /** Per-section normalized progress 0→1 (0 before entering, 1 after leaving). */
  sections: Record<SectionId, number>;
}

const state: ScrollState = {
  global: 0,
  sections: Object.fromEntries(SECTIONS.map((id) => [id, 0])) as Record<SectionId, number>,
};

type Listener = (s: ScrollState) => void;
const listeners = new Set<Listener>();
let installed = false;
const triggers: ScrollTrigger[] = [];

/** Live, mutable snapshot — safe to read every frame. */
export function getScrollState(): ScrollState {
  return state;
}

export function subscribeScroll(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit() {
  listeners.forEach((fn) => fn(state));
}

/** Installs the global + per-section ScrollTriggers exactly once. */
export function installScrollProgress() {
  if (installed || typeof window === 'undefined') return;
  installed = true;

  triggers.push(
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        state.global = self.progress;
        emit();
      },
    }),
  );

  SECTIONS.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    triggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          state.sections[id] = self.progress;
          emit();
        },
      }),
    );
  });
}

export function teardownScrollProgress() {
  triggers.forEach((t) => t.kill());
  triggers.length = 0;
  installed = false;
}
