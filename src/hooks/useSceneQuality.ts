import { useMemo } from 'react';
import { useEnv } from './useEnv';
import { useWebGLSupport } from './useWebGLSupport';

export interface SceneQuality {
  /** Mount the WebGL canvas at all? If false, CSS background is the fallback. */
  webgl: boolean;
  /** Device-pixel-ratio cap for the renderer. */
  dpr: [number, number];
  /** Instanced star count. */
  stars: number;
  /** Ambient particle count. */
  particles: number;
  /** Allow continuous ambient motion (rotation/drift). */
  ambientMotion: boolean;
  /** Allow pointer-driven camera/parallax. */
  pointerParallax: boolean;
}

const CSS_FALLBACK: SceneQuality = {
  webgl: false,
  dpr: [1, 1],
  stars: 0,
  particles: 0,
  ambientMotion: false,
  pointerParallax: false,
};

/**
 * Single source of truth for how heavy the 3D world is allowed to be.
 * Derived from the existing perf tier + WebGL support + reduced motion + touch.
 *
 *  HIGH   → full WebGL, more particles, DPR≤2, pointer parallax
 *  MEDIUM → WebGL, fewer particles, DPR≤1.5
 *  LOW / no-WebGL / reduced-motion → CSS fallback (canvas not mounted)
 */
export function useSceneQuality(): SceneQuality {
  const { tier, reducedMotion, touch } = useEnv();
  const webgl = useWebGLSupport();

  return useMemo<SceneQuality>(() => {
    if (!webgl || reducedMotion || tier === 'low') return CSS_FALLBACK;

    if (tier === 'medium') {
      return {
        webgl: true,
        dpr: [1, 1.5],
        stars: 900,
        particles: 120,
        ambientMotion: true,
        pointerParallax: !touch,
      };
    }

    // high
    return {
      webgl: true,
      dpr: [1, 2],
      stars: 1800,
      particles: 260,
      ambientMotion: true,
      pointerParallax: !touch,
    };
  }, [tier, reducedMotion, touch, webgl]);
}
