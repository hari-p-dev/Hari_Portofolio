import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getScrollState } from '@/hooks/useScrollProgress';

interface EnvironmentProps {
  ambientMotion: boolean;
}

/**
 * The coherent global environment shared by every section:
 *  - exponential fog for depth
 *  - a large, distant celestial object (the "planet" that the journey ends on)
 *  - a faint architectural grid plane far below
 *  - soft ambient + key lighting
 *
 * The celestial object rises subtly as the user approaches the finale, tying
 * the whole scroll journey to one destination.
 */
export default function Environment({ ambientMotion }: EnvironmentProps) {
  const planet = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const p = getScrollState().global;
    if (planet.current) {
      // Distant planet drifts up into frame toward the contact finale.
      planet.current.position.y = -18 + p * 10;
      if (ambientMotion) planet.current.rotation.y += delta * 0.01;
    }
    if (glow.current) {
      glow.current.position.y = -18 + p * 10;
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.3) * 0.01;
      glow.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      <fogExp2 attach="fog" args={['#050712', 0.011]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 4]} intensity={0.6} color="#8fb6ff" />
      <pointLight position={[-6, -2, 2]} intensity={0.5} color="#a78bfa" distance={40} />

      {/* Distant planet + atmospheric glow halo */}
      <mesh ref={glow} position={[6, -18, -46]}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial color="#7c5cfc" transparent opacity={0.12} side={THREE.BackSide} />
      </mesh>
      <mesh ref={planet} position={[6, -18, -48]}>
        <sphereGeometry args={[12, 48, 48]} />
        <meshStandardMaterial
          color="#0b0f24"
          emissive="#3a2f66"
          emissiveIntensity={0.35}
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* Faint architectural grid far below the content. */}
      <gridHelper
        args={[220, 60, '#2a2f52', '#171a30']}
        position={[0, -14, -10]}
      />
    </group>
  );
}
