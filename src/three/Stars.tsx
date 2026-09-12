import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarsProps {
  count: number;
  /** Allow very slow drift. */
  ambientMotion: boolean;
}

/**
 * A single instanced/points star field. One BufferGeometry, one PointsMaterial —
 * cheap and disposed automatically by R3F when unmounted.
 */
export default function Stars({ count, ambientMotion }: StarsProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#f4f4f8'),
      new THREE.Color('#4da3ff'),
      new THREE.Color('#a78bfa'),
      new THREE.Color('#38bdf8'),
    ];
    for (let i = 0; i < count; i++) {
      // Distribute in a large spherical shell around the camera path.
      const r = 40 + Math.random() * 120;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi);

      const c = palette[Math.random() < 0.72 ? 0 : 1 + Math.floor(Math.random() * 3)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [count]);

  useFrame((_, delta) => {
    if (!ambientMotion || !pointsRef.current) return;
    // Extremely slow rotation — discovered, not noticed.
    pointsRef.current.rotation.y += delta * 0.006;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.18}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
