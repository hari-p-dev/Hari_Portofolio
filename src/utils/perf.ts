// Device capability detection → performance tier.
// Used to scale ambient effects (particles, blur) without a user-facing toggle.

export type PerfTier = 'high' | 'medium' | 'low';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: none), (pointer: coarse)').matches;
}

export function detectPerfTier(): PerfTier {
  if (typeof window === 'undefined') return 'high';

  if (prefersReducedMotion()) return 'low';

  const cores = navigator.hardwareConcurrency ?? 4;
  // deviceMemory is non-standard but available in Chromium
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const coarse = isTouchDevice();
  const narrow = window.innerWidth < 768;

  if (coarse || narrow) {
    if (cores <= 4 || memory <= 4) return 'low';
    return 'medium';
  }

  if (cores <= 4 || memory <= 4) return 'medium';
  return 'high';
}
