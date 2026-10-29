"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

/**
 * DissolvePoints — nuage de points 3D avec effet de dissolution.
 * Inspiré d'escolhadigital.com : un objet 3D rendu en points/stippling
 * qui se désintègre vers le bas (digital sand / pixel dust).
 *
 * Application PHIKRA : sphère cramoisie en points qui se dissout,
 * adaptée à la charte (Noisy Graphite + Neon Crimson edge).
 */

type Variant = "hero" | "signature" | "accent";

const variantConfig: Record<Variant, { count: number; radius: number; spread: number; size: number; opacity: number }> = {
  hero: { count: 5000, radius: 1.8, spread: 1.6, size: 0.04, opacity: 0.9 },
  signature: { count: 4000, radius: 1.4, spread: 1.4, size: 0.045, opacity: 0.95 },
  accent: { count: 2000, radius: 0.9, spread: 1.0, size: 0.05, opacity: 1.0 },
};

function PointsCloud({ variant }: { variant: Variant }) {
  const pointsRef = useRef<THREE.Points>(null);
  const config = variantConfig[variant];

  // Génère les positions des points sur une sphère + déplacement de dissolution
  const { positions, randoms, dissolveProgress } = useMemo(() => {
    const pos = new Float32Array(config.count * 3);
    const rnd = new Float32Array(config.count);
    for (let i = 0; i < config.count; i++) {
      // Distribution sur sphère (icosaèdre approximé via fibonacci)
      const phi = Math.acos(1 - 2 * (i + 0.5) / config.count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = config.radius * (0.85 + Math.random() * 0.15);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      rnd[i] = Math.random();
    }
    return { positions: pos, randoms: rnd, dissolveProgress: 0 };
  }, [config.count, config.radius]);

  // Material avec shader custom pour la dissolution
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uDissolve: { value: 0 },
        uColor: { value: new THREE.Color("#e50740") },
        uSize: { value: config.size * 100 },
        uOpacity: { value: config.opacity },
        uSpread: { value: config.spread },
      },
      vertexShader: `
        attribute float aRandom;
        uniform float uTime;
        uniform float uDissolve;
        uniform float uSize;
        uniform float uSpread;
        varying float vAlpha;
        varying float vDissolve;
        
        void main() {
          vec3 pos = position;
          // Dissolution : les points du bas se dispersent vers le bas
          float distFromBottom = (pos.y + 1.0) * 0.5; // 0 en bas, 1 en haut
          float dissolveMask = smoothstep(0.0, 1.0, distFromBottom + uDissolve * (aRandom - 0.5));
          
          // Déplacement de dissolution (vers le bas + dispersion)
          float dissolveAmt = (1.0 - dissolveMask) * uSpread;
          pos.y -= dissolveAmt * (0.5 + aRandom * 0.5);
          pos.x += sin(uTime + aRandom * 6.28) * dissolveAmt * 0.3;
          pos.z += cos(uTime + aRandom * 6.28) * dissolveAmt * 0.3;
          
          // Fluctuation organique
          pos += normalize(pos) * sin(uTime * 0.5 + aRandom * 10.0) * 0.02;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = uSize * (1.0 / -mvPosition.z) * (0.5 + aRandom * 0.5);
          gl_Position = projectionMatrix * mvPosition;
          
          vAlpha = dissolveMask;
          vDissolve = dissolveAmt / uSpread;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOpacity;
        varying float vAlpha;
        varying float vDissolve;
        
        void main() {
          // Point circulaire (pas carré)
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if (d > 0.5) discard;
          float softEdge = smoothstep(0.5, 0.3, d);
          
          // Couleur : cramoisi vif sur la sphère, rose pâle en dissolution
          vec3 col = mix(vec3(1.0, 0.4, 0.55), uColor, vAlpha);
          float alpha = softEdge * uOpacity * mix(0.4, 1.0, vAlpha);
          
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, [config.size, config.opacity, config.spread]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const mat = pointsRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = t;
    // Dissolution cyclique (0 → 0.6 → 0) toutes les 8s
    const cycle = (Math.sin(t * 0.4) + 1) * 0.5;
    mat.uniforms.uDissolve.value = cycle * 0.6;
    // Rotation lente
    pointsRef.current.rotation.y = t * 0.1;
    pointsRef.current.rotation.x = Math.sin(t * 0.15) * 0.15;
  });

  return (
    <points ref={pointsRef} material={material}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
      </bufferGeometry>
    </points>
  );
}

export function DissolvePoints({ variant = "signature", className = "" }: { variant?: Variant; className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.8]}
      >
        <Suspense fallback={null}>
          <PointsCloud variant={variant} />
        </Suspense>
      </Canvas>
    </div>
  );
}
