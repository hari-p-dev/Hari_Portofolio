import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useEnv } from '@/hooks/useEnv';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useChapterLighting } from '@/hooks/useChapterLighting';
import { installScrollProgress, teardownScrollProgress } from '@/hooks/useScrollProgress';
import { useSceneQuality } from '@/hooks/useSceneQuality';

import Background from '@/components/layout/Background';
import Cursor from '@/components/layout/Cursor';
import Loader from '@/components/layout/Loader';
import Navigation from '@/components/navigation/Navigation';
import Footer from '@/components/layout/Footer';

import Hero from '@/components/hero/Hero';
import Profile from '@/components/profile/Profile';
import Stack from '@/components/stack/Stack';
import Projects from '@/components/projects/Projects';
import Experience from '@/components/experience/Experience';
import Certificates from '@/components/certificates/Certificates';
import Contact from '@/components/contact/Contact';

// The WebGL world is code-split so it never blocks first paint or ships to
// devices that fall back to the CSS background.
const SceneCanvas = lazy(() => import('@/three/SceneCanvas'));

export default function App() {
  const { reducedMotion } = useEnv();
  const quality = useSceneQuality();
  const [booted, setBooted] = useState(false);

  useSmoothScroll(booted && !reducedMotion);
  useChapterLighting(booted && !reducedMotion);

  // Install the shared scroll-progress model once the DOM sections exist.
  useEffect(() => {
    if (!booted) return;
    installScrollProgress();
    return () => teardownScrollProgress();
  }, [booted]);

  const onBooted = useCallback(() => setBooted(true), []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>

      {!booted && <Loader onDone={onBooted} />}

      {/* CSS atmospheric background — always present as base + fallback. */}
      <Background />

      {/* Global WebGL world — only on capable tiers, only after boot. */}
      {booted && quality.webgl && (
        <Suspense fallback={null}>
          <SceneCanvas quality={quality} />
        </Suspense>
      )}

      <Cursor />
      <Navigation />

      <div className="content-layer">
        <main id="main">
          <Hero />
          <Profile />
          <Stack />
          <Projects />
          <Experience />
          <Certificates />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
