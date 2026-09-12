import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { getScrollState } from '@/hooks/useScrollProgress';
import type { PointerMotion } from '@/hooks/usePointerMotion';

interface CameraRigProps {
  pointer?: React.MutableRefObject<PointerMotion> | null;
  pointerParallax: boolean;
}

/**
 * Choreographed virtual camera. Reads global scroll progress (0→1) every frame
 * from the shared store (no React state) and eases the camera along a calm
 * journey: slow dolly + subtle lateral drift + gentle look-target shift.
 *
 *   0.00–0.15  Hero framing
 *   0.15–0.45  push deeper, constellation becomes visible
 *   0.45–0.70  lateral move through project environments
 *   0.70–0.85  timeline depth
 *   0.85–1.00  pull back toward the planetary horizon
 */
const KEYS = [
  { at: 0.0,  pos: [0, 0, 14],    look: [0, 0, 0] },
  { at: 0.15, pos: [0, 0.4, 11],  look: [0, 0.2, 0] },
  { at: 0.45, pos: [2.2, 0.2, 8], look: [1, 0, -2] },
  { at: 0.7,  pos: [-2, -0.4, 7], look: [-1, -0.3, -3] },
  { at: 0.85, pos: [0, 0.3, 9],   look: [0, 0.2, -2] },
  { at: 1.0,  pos: [0, 1.2, 15],  look: [0, 0.6, -4] },
];

function sample(progress: number, key: 'pos' | 'look'): THREE.Vector3 {
  let i = 0;
  while (i < KEYS.length - 2 && progress > KEYS[i + 1].at) i++;
  const a = KEYS[i];
  const b = KEYS[i + 1];
  const span = b.at - a.at || 1;
  const t = THREE.MathUtils.clamp((progress - a.at) / span, 0, 1);
  const va = a[key];
  const vb = b[key];
  return new THREE.Vector3(
    THREE.MathUtils.lerp(va[0], vb[0], t),
    THREE.MathUtils.lerp(va[1], vb[1], t),
    THREE.MathUtils.lerp(va[2], vb[2], t),
  );
}

export default function CameraRig({ pointer, pointerParallax }: CameraRigProps) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    const p = getScrollState().global;
    const pos = sample(p, 'pos');
    const look = sample(p, 'look');

    // Subtle pointer parallax layered on top of the scroll journey.
    if (pointerParallax && pointer) {
      pos.x += pointer.current.x * 0.5;
      pos.y += -pointer.current.y * 0.35;
    }

    // Critically-damped ease toward the target for smoothness.
    camera.position.lerp(pos, 0.06);
    target.current.lerp(look, 0.06);
    camera.lookAt(target.current);
  });

  return null;
}
