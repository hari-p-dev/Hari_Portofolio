import { useEffect, useState } from 'react';

let cached: boolean | null = null;

/** One-time, cached WebGL capability probe (no context left open). */
export function detectWebGLSupport(): boolean {
  if (cached !== null) return cached;
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    cached = !!gl;
    // Release the probe context immediately.
    const lose = gl && (gl as WebGLRenderingContext).getExtension('WEBGL_lose_context');
    lose?.loseContext?.();
  } catch {
    cached = false;
  }
  return cached;
}

/** React wrapper around the cached WebGL probe. */
export function useWebGLSupport(): boolean {
  const [supported, setSupported] = useState<boolean>(() => cached ?? false);
  useEffect(() => {
    setSupported(detectWebGLSupport());
  }, []);
  return supported;
}
