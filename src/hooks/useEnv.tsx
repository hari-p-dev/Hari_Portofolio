import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { detectPerfTier, isTouchDevice, prefersReducedMotion } from '@/utils/perf';
import type { PerfTier } from '@/utils/perf';

interface EnvValue {
  tier: PerfTier;
  reducedMotion: boolean;
  touch: boolean;
}

const EnvContext = createContext<EnvValue>({
  tier: 'high',
  reducedMotion: false,
  touch: false,
});

export function EnvProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion());

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const value = useMemo<EnvValue>(() => {
    const touch = isTouchDevice();
    const tier = reducedMotion ? 'low' : detectPerfTier();
    // Signal reduced motion to CSS globally
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('no-anim', reducedMotion);
    }
    return { tier, reducedMotion, touch };
  }, [reducedMotion]);

  return <EnvContext.Provider value={value}>{children}</EnvContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEnv() {
  return useContext(EnvContext);
}
