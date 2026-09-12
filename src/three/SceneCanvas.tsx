import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from '@react-three/drei';
import CameraRig from './CameraRig';
import Environment from './Environment';
import Stars from './Stars';
import AmbientParticles from './AmbientParticles';
import { usePointerMotion } from '@/hooks/usePointerMotion';
import type { SceneQuality } from '@/hooks/useSceneQuality';
import './SceneCanvas.css';

interface SceneCanvasProps {
  quality: SceneQuality;
}

/**
 * The global WebGL world. Mounted only when useSceneQuality().webgl is true;
 * otherwise the CSS Background is the (already premium) fallback.
 *
 * Performance guards:
 *  - frameloop pauses when the tab is hidden (no wasted GPU/battery)
 *  - AdaptiveDpr + PerformanceMonitor auto-downgrade DPR under load
 *  - dpr capped by quality tier
 *  - no per-frame React state (camera/particles read a shared store / clock)
 *  - R3F disposes geometry/materials on unmount
 */
export default function SceneCanvas({ quality }: SceneCanvasProps) {
  const pointer = usePointerMotion(quality.pointerParallax);
  const [dprMax, setDprMax] = useState(quality.dpr[1]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Let CSS know the WebGL world is present so it can drop redundant layers
  // (e.g. the CSS particle field) and avoid doubled ambient motion.
  useEffect(() => {
    document.documentElement.classList.add('webgl-active');
    return () => document.documentElement.classList.remove('webgl-active');
  }, []);

  return (
    <div className="scene-canvas" aria-hidden="true">
      <Canvas
        frameloop={paused ? 'never' : 'always'}
        dpr={[quality.dpr[0], dprMax]}
        camera={{ position: [0, 0, 14], fov: 50, near: 0.1, far: 300 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <PerformanceMonitor
          onDecline={() => setDprMax((d) => Math.max(quality.dpr[0], d - 0.5))}
        />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <CameraRig pointer={pointer} pointerParallax={quality.pointerParallax} />
        <Environment ambientMotion={quality.ambientMotion} />
        <Stars count={quality.stars} ambientMotion={quality.ambientMotion} />
        <AmbientParticles count={quality.particles} ambientMotion={quality.ambientMotion} />
      </Canvas>
    </div>
  );
}
