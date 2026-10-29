"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

/**
 * CrimsonCrystal — cristal 3D WebGL cramoisi flottant.
 *
 * Géométrie icosaèdre déformée avec material distort (effet organique),
 * flottant lentement, rotation continue, réflections environnementales.
 * Rendu WebGL réel (pas CSS 3D) — touche exceptionnelle premium.
 *
 * Variantes :
 *  - "hero" : grand cristal central derrière le titre (transparent, subtil)
 *  - "signature" : cristal moyen pour section signature
 *  - "accent" : petit cristal décoratif
 */

type Variant = "hero" | "signature" | "accent";

const variantConfig: Record<Variant, { scale: number; distort: number; speed: number; opacity: number; position: [number, number, number] }> = {
  hero: { scale: 2.6, distort: 0.35, speed: 1.2, opacity: 0.18, position: [0, 0, 0] },
  signature: { scale: 1.8, distort: 0.4, speed: 1.5, opacity: 0.55, position: [0, 0, 0] },
  accent: { scale: 0.9, distort: 0.3, speed: 2, opacity: 0.7, position: [0, 0, 0] },
};

function CrystalMesh({ variant }: { variant: Variant }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const config = variantConfig[variant];

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.15;
    meshRef.current.rotation.y = t * 0.2;
  });

  return (
    <Float speed={config.speed} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={config.scale}>
        <icosahedronGeometry args={[1, 12]} />
        <MeshDistortMaterial
          color="#e50740"
          emissive="#e50740"
          emissiveIntensity={0.3}
          roughness={0.15}
          metalness={0.85}
          distort={config.distort}
          speed={1.5}
          transparent
          opacity={config.opacity}
        />
      </mesh>
    </Float>
  );
}

/** Particules 3D flottantes autour du cristal (points lumineux WebGL). */
function CrystalParticles({ count = 60 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#ffd8e0"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function CrimsonCrystal({ variant = "signature", className = "" }: { variant?: Variant; className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.8]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#ff0033" />
          <pointLight position={[-5, -3, 2]} intensity={1.2} color="#ffffff" />
          <spotLight position={[0, 8, 0]} intensity={1.5} angle={0.4} penumbra={1} color="#ff6688" />
          <CrystalMesh variant={variant} />
          <CrystalParticles count={variant === "hero" ? 80 : 40} />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}

/** Ligne 3D cramoisie — fil lumineux qui ondule (pour séparateurs de sections). */
function WavyLine3D({ position = [0, 0, 0] as [number, number, number] }: { position?: [number, number, number] }) {
  const lineRef = useRef<THREE.Line>(null);
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 50; i++) {
      const x = (i / 50 - 0.5) * 6;
      pts.push(new THREE.Vector3(x, 0, 0));
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (!lineRef.current) return;
    const t = state.clock.getElapsedTime();
    const geom = lineRef.current.geometry;
    const pos = geom.attributes.position;
    for (let i = 0; i <= 50; i++) {
      const x = (i / 50 - 0.5) * 6;
      pos.setY(i, Math.sin(x * 2 + t * 2) * 0.3);
      pos.setZ(i, Math.cos(x * 1.5 + t * 1.5) * 0.2);
    }
    pos.needsUpdate = true;
  });

  return (
    <line ref={lineRef} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[Float32Array.from(points.flatMap((p) => [p.x, p.y, p.z])), 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#e50740" transparent opacity={0.6} />
    </line>
  );
}

export function WavySeparator({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 h-24 ${className}`} aria-hidden>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ alpha: true }} dpr={[1, 1.8]}>
        <Suspense fallback={null}>
          <WavyLine3D />
        </Suspense>
      </Canvas>
    </div>
  );
}
