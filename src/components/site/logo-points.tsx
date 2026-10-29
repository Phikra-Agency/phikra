"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import * as THREE from "three";

/**
 * LogoPoints — petits points qui construisent le logo PHIKRA au défilement.
 *
 * Les points reproduisent fidèlement les couleurs du logo officiel :
 *  - Lettres latines "Phikra" : beige (#e8ddd8)
 *  - Calligraphie arabe "فكرة" : cramoisi (#e50740)
 *
 * Au scroll, les points convergent vers leurs positions logo.
 */

// Lettres latines (cls-1 beige #e8ddd8 + cls-2 blanc)
const LETTER_PATHS = [
  "M76.66,66.42v9.43h8.46v-9.64c-2.84.14-5.5.21-7.97.21h-.49Z",
  "M80.95,28.49c-1.49,0-2.73.48-3.71,1.42-.99.95-1.48,2.13-1.48,3.53s.49,2.59,1.48,3.53c.99.95,2.22,1.42,3.71,1.42s2.73-.48,3.72-1.42c.99-.94,1.48-2.12,1.48-3.53s-.5-2.59-1.48-3.53c-.99-.94-2.23-1.42-3.72-1.42Z",
  "M128.73,67.13v8.72s8.46,0,8.46,0v-10.11c-2.08.34-4.27.7-6.58,1.08-.63.1-1.25.21-1.88.31Z",
  "M0,52.83v23.02s8.46,0,8.46,0v-16.2c0-3.77-4.23-6.82-8.46-6.82h0Z",
  "M85.12,42.39v21.33c-2.85.13-5.48.19-7.91.19h-.55v-21.52s8.46,0,8.46,0Z",
  "M147.46,41.9v8.88h-2.24c-2.66,0-4.66.63-6.01,1.88-1.18,1.1-1.85,2.9-1.99,5.42-2.26.32-4.65.66-7.18,1.01-.44.06-.87.12-1.31.18v-16.89h8.46v5.19c1.09-1.77,2.51-3.16,4.26-4.16,1.04-.6,2.17-1.02,3.38-1.26h.01c.83-.17,1.7-.25,2.62-.25Z",
  "M182.7,51.13c-1.18-.99-1.8-2.85-1.88-5.58-.02-1.1.06-2.16.26-3.16h-3.78v4.77c-1.05-1.43-2.42-2.63-4.13-3.6-.13-.08-.25-.14-.38-.21-1.87-1-4.06-1.51-6.55-1.51-2.73,0-5.21.64-7.44,1.93-.11.06-.21.12-.32.18-2.32,1.41-4.15,3.42-5.5,6.04-.96,1.85-1.57,3.89-1.85,6.13-.12.93-.17,1.88-.17,2.88,0,1.55.14,3.03.42,4.42.33,1.67.87,3.23,1.61,4.67,1.35,2.64,3.18,4.68,5.5,6.13,2.31,1.45,4.88,2.18,7.7,2.18,2.5,0,4.7-.51,6.62-1.54,1.36-.73,2.5-1.59,3.44-2.59.39-.41.74-.85,1.06-1.3v4.89h8.52v-23.67c-1.38-.15-2.42-.5-3.12-1.06ZM176.39,63.82c-.09.2-.19.4-.29.59-.81,1.47-1.89,2.6-3.26,3.38-.52.3-1.06.54-1.62.73-.89.3-1.83.45-2.8.45-1.53,0-2.97-.4-4.32-1.21-1.35-.81-2.44-1.96-3.26-3.47-.38-.7-.68-1.45-.87-2.25-.25-.94-.37-1.95-.37-3.04,0-1.55.25-2.94.74-4.17.14-.37.31-.72.5-1.06.82-1.47,1.9-2.59,3.23-3.35,1.17-.67,2.43-1.05,3.78-1.13.19-.01.37-.02.56-.02,1.57,0,3.04.39,4.41,1.18,1.16.67,2.12,1.58,2.87,2.74.14.21.27.42.39.64.81,1.47,1.21,3.23,1.21,5.28,0,1.79-.3,3.36-.91,4.7Z",
  "M66.97,48.46c-1.11-2.15-2.65-3.79-4.63-4.89-1.97-1.11-4.23-1.66-6.76-1.66-2.22,0-4.23.41-6.04,1.24-1.81.83-3.26,1.96-4.35,3.41v-15.4h-8.46v44.7h8.46v-18.49c0-2.66.67-4.7,2.02-6.13,1.35-1.43,3.19-2.14,5.53-2.14s4.11.71,5.43,2.14c1.33,1.43,2,3.47,2,6.13v18.49h8.46v-19.64c0-3.02-.55-5.61-1.66-7.76Z",
  "M117.96,68.78h0l-6.5-7.3-2.05-2.3,13.24-15.09h0l1.5-1.71h-11l-2.35,2.97-8.88,11.23v-25.43h-8.46v44.7h8.46v-14.26l.66.83,6.07,7.62,4.63,5.81h11l-6.3-7.07Z",
  "M185.27,43.79c.04-.55.16-1.02.38-1.4h-4.57c-.2,1-.28,2.06-.26,3.16.08,2.73.7,4.59,1.88,5.58.69.56,1.73.91,3.12,1.06v-7.89c-.24-.14-.42-.31-.55-.51Z",
];

// Calligraphie arabe (cls-5 cramoisi + cls-6/7/4/8 dégradés cramoisi)
const CALLIGRAPHY_PATHS = [
  "M14.75,16.15c-.34,0-.93,1.03-1.76,3.08-.76,1.9-1.14,2.96-1.14,3.19,0,.61,1.03,1.5,3.08,2.68,1.52.83,3.03,1.67,4.55,2.5.68-.84,1.33-2.13,1.94-3.87.49-1.52.74-2.58.74-3.19,0-.75-2.47-2.22-7.4-4.38ZM8.26,21.05c-2.54-1.44-4.37-2.71-5.47-3.82C.94,21.41,0,23.74,0,24.24c0,.64,1.33,1.73,3.99,3.25,2.43,1.44,3.82,2.16,4.16,2.16.68,0,1.33-.8,1.93-2.39.46-1.33.68-2.45.68-3.36s-.83-1.9-2.5-2.85Z",
  "M137.23,58.08c-2.26.32-4.65.66-7.18,1.01-.44.06-.87.12-1.31.18v7.86c.63-.1,1.25-.21,1.88-.31,2.3-.38,4.5-.74,6.58-1.08v-6.56c0-.38,0-.75.03-1.1Z",
  "M29.03,40.03c-1.14-1.98-2.87-3.53-5.16-4.66-1.69-.82-3.62-1.34-5.83-1.57-.8-.08-1.64-.12-2.51-.12H0v23.1c0,1.59,1.29,2.87,2.88,2.87h12.65c3.46,0,6.33-.6,8.61-1.81,2.27-1.2,3.94-2.8,5.01-4.77,1.07-1.96,1.6-4.08,1.6-6.33,0-2.5-.57-4.74-1.72-6.71ZM20.36,51.23c-1.13,1.07-2.86,1.6-5.19,1.6h-6.71v-12.26h6.71c.62,0,1.2.04,1.73.12,3.43.47,5.15,2.49,5.15,6.04,0,1.94-.56,3.44-1.69,4.5Z",
  "M128.74,59.28v7.86c-3.73.6-7.32,1.15-10.77,1.65h0c-3.23.46-6.33.88-9.32,1.26-2.31.29-4.55.55-6.73.79-2.95.33-5.77.6-8.46.82-2.94.25-5.72.43-8.34.56-2.84.14-5.5.21-7.97.21h-.49s-16.7,0-16.7,0c-1.21.03-2.49-.13-3.31-.51.34,1.67.51,3.26.51,4.78,0,.61,0,1.22-.02,1.86-.14,4.07-1.82,7.92-4.61,10.88-.8.85-1.75,1.8-2.83,2.75-4.02,3.61-8.24,6.56-12.64,8.88-5.88,3.08-11.46,4.61-16.74,4.61-8.58,0-12.87-5.54-12.87-16.62,0-8.05,1.48-14.99,4.44-20.84.79-1.59,1.46-2.39,1.99-2.39.23,0,.34.23.34.68,0,.57-.23,1.38-.68,2.45-2.2,5.09-3.3,10.08-3.3,14.98,0,9.18,3.53,13.76,10.59,13.72,7.32-.04,14.93-2.64,22.83-7.8,6.52-4.29,10.13-7.61,10.82-9.96.07-.3.11-.63.11-.97,0-2.12-1.93-6.09-5.81-11.9-.11-.15-.17-.41-.17-.79,0-.61.17-1.8.51-3.57.35-1.76.38-2.93.51-3.44.1-.38.5-.43.8-.12,1.05,1.11,2.13,2.88,3.75,4.9.26.3,2.46-.08,5.76-.1h16.7s.55,0,.55,0c2.43,0,5.06-.06,7.91-.19,2.6-.12,5.38-.28,8.34-.5,2.67-.2,5.5-.44,8.46-.73.22-.02.44-.04.66-.06,2.83-.27,5.79-.59,8.88-.94,5.37-.62,11.13-1.35,17.28-2.2Z",
  "M174.23,62.99c-1.02-.89-1.53-1.81-1.53-2.77s-.04-1.53-.12-1.73c1.51-1.76,2.55-3.53,3.12-5.3.35-1.08.52-2.15.52-3.23,0-.64-.1-1.19-.28-1.64-.82-1.78-1.74-3.37-2.76-4.76-2.14-2.9-4.76-4.96-7.83-6.2-3.83-1.54-10.17-2.31-19.02-2.31-4.22,0-13.78.81-28.7,2.43-6.26.67-11.5,1.21-15.72,1.62-3.53.34-6.35.57-8.46.72-1.44.1-2.55.15-3.32.16-7.28.04-12.96-.52-17.02-1.7-3.34-1.01-4.99-2.17-4.95-3.47.08-3.04,5.77-8.75,17.08-17.1,3.23-2.39,7.21-4.81,11.96-7.25,4.1-2.09,6.72-3.24,7.88-3.45.07-.01.13-.02.2-.02,1.91-.05,3.09.7,3.54,2.25.41,1.42.83,2.13,1.25,2.13.19,0,.59-.65,1.2-1.95,1.33-2.88,1.99-4.91,1.99-6.09C113.25,1.08,111.66-.04,108.47,0c-5.77.04-14.71,4.64-26.82,13.81-5.2,3.94-9,7.41-11.39,10.41-3,3.77-5.2,8.36-6.6,13.76-.15.53-.23,1.05-.23,1.58,0,4.15,4.41,6.64,13.23,7.47v-4.64s8.46,0,8.46,0v4.95c2.17-.03,4.95-.16,8.34-.41,2.49-.17,5.31-.41,8.46-.7,2.72-.25,5.68-.54,8.88-.88,1.88-.19,3.83-.4,5.87-.63,2.1-.23,4.09-.44,5.98-.64h0c2.17-.23,4.2-.44,6.09-.63v-1.08h8.46v.28c3.28-.28,5.83-.46,7.64-.52h.01c.83-.17,1.7-.25,2.62-.25v.23c4.34.08,8.12.63,11.34,1.65,3.78,1.19,6.81,3.03,9.05,5.51,1.18,1.29,2.14,2.75,2.9,4.39-1.29.24-3.02.14-5.13.42-1.4.19-1.82.24-5.29.73-2.31.33-5.38.75-9.2,1.29-3.87.54-8.5,1.2-13.91,1.96-.02.36-.03.72-.03,1.1v6.56c5.51-.91,10.23-1.68,14.19-2.32,3.45-.56,6.31-1.02,8.59-1.38,4.15-.66,6.34-.97,6.58-1,1.84-.21,2.9-.38,4.27-1.03-.42,1.58-.53,3.51-.34,5.78.09,1.01.33,1.92.75,2.73.55-.19,1.09-.43,1.62-.73,1.54-.88,2.73-2.21,3.56-3.97-.93-.12-1.65-.4-2.16-.83Z",
  "M197.4,38.6c-2.85-3.57-5.32-5.35-7.4-5.35-2.2,0-4.25,1.12-6.15,3.36-1.42,1.71-2.34,3.63-2.76,5.77-.2,1-.28,2.06-.26,3.16.08,2.73.7,4.59,1.88,5.58.69.56,1.73.91,3.12,1.06.46.05.95.07,1.48.08h0c.09,0,1.62-.05,4.57-.11,3.77-.09,6.18.59,7.25,2.06.37.5.3,1.2-.16,1.62-3.29,3.02-6.44,5.17-9.43,6.45-1.16.5-2.4.92-3.72,1.25v7.13c.82-.32,1.66-.68,2.52-1.09,2.07-.97,3.98-2.07,5.73-3.28,4.97-3.45,8.08-9.06,8.11-15.11,0-.04,0-.08,0-.11,0-4.33-1.59-8.48-4.78-12.47ZM194.18,45.09c-1.4-.24-2.82-.32-4.24-.29-.57.01-1.14.02-1.71.02-1.07-.03-1.88-.2-2.41-.51,0,0,0,0,0,0-.37-.22-.56-.66-.47-1.08.07-.31.17-.58.31-.82.47-.81,1.37-1.22,2.69-1.22,1.25,0,2.35.4,3.3,1.2.15.11,1.01,1.02,2.56,2.73,0,0-.02,0-.03,0Z",
  "M188.62,16.53c-2.85-1.33-4.75-2.35-5.69-3.07-1.4,5.2-2.11,7.01-2.11,7.01-.12.34.57,1.33,1.71,1.93,2.2,1.14,4.42,2.28,6.66,3.42,1.59-1.86,2.39-4.1,2.39-6.72,0-.79-.99-1.65-2.96-2.56Z",
];

const LETTER_COLOR = new THREE.Color("#e8ddd8"); // beige
const CALLIGRAPHY_COLOR = new THREE.Color("#e50740"); // cramoisi

// Échantillonne les positions des points depuis les paths SVG via canvas offscreen
function sampleLogoPoints(count: number): {
  positions: Float32Array;
  colors: Float32Array;
} {
  if (typeof document === "undefined") {
    return {
      positions: new Float32Array(count * 3),
      colors: new Float32Array(count * 3),
    };
  }

  const W = 800, H = 420;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return {
      positions: new Float32Array(count * 3),
      colors: new Float32Array(count * 3),
    };
  }

  const scaleX = W / 202.17;
  const scaleY = H / 105.67;

  // Échantillonne les points pour un groupe de paths donné + couleur
  function sampleGroup(paths: string[], color: THREE.Color, targetCount: number) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.scale(scaleX, scaleY);
    paths.forEach((d) => {
      const p = new Path2D(d);
      ctx.fill(p);
      ctx.stroke(p);
    });

    const imgData = ctx.getImageData(0, 0, W, H).data;
    const filledPoints: [number, number][] = [];
    for (let y = 0; y < H; y += 1) {
      for (let x = 0; x < W; x += 1) {
        const idx = (y * W + x) * 4;
        if (imgData[idx + 3] > 128) {
          filledPoints.push([x, y]);
        }
      }
    }

    const pts: { pos: [number, number, number]; color: THREE.Color }[] = [];
    for (let i = 0; i < targetCount && filledPoints.length > 0; i++) {
      const pt = filledPoints[Math.floor(Math.random() * filledPoints.length)];
      const nx = (pt[0] / W - 0.5) * 6;
      const ny = -(pt[1] / H - 0.5) * 3.2;
      pts.push({ pos: [nx, ny, 0], color });
    }
    return pts;
  }

  // Répartit les points : 55% lettres, 45% calligraphie
  const letterPts = sampleGroup(LETTER_PATHS, LETTER_COLOR, Math.floor(count * 0.55));
  const calligraphyPts = sampleGroup(CALLIGRAPHY_PATHS, CALLIGRAPHY_COLOR, Math.floor(count * 0.45));
  const allPts = [...letterPts, ...calligraphyPts];

  const positions = new Float32Array(allPts.length * 3);
  const colors = new Float32Array(allPts.length * 3);
  allPts.forEach((p, i) => {
    positions[i * 3] = p.pos[0];
    positions[i * 3 + 1] = p.pos[1];
    positions[i * 3 + 2] = p.pos[2];
    colors[i * 3] = p.color.r;
    colors[i * 3 + 1] = p.color.g;
    colors[i * 3 + 2] = p.color.b;
  });

  return { positions, colors };
}

function LogoPointsMesh({ progress }: { progress: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const COUNT = 8000;

  const { logoPositions, scatterPositions, colors, randoms } = useMemo(() => {
    const { positions: logo, colors: cols } = sampleLogoPoints(COUNT);
    const scatter = new Float32Array(logo.length / 3 * 3);
    const rnd = new Float32Array(logo.length / 3);
    for (let i = 0; i < logo.length / 3; i++) {
      const r = 3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      scatter[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      scatter[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      scatter[i * 3 + 2] = r * Math.cos(phi);
      rnd[i] = Math.random();
    }
    return { logoPositions: logo, scatterPositions: scatter, colors: cols, randoms: rnd };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const current = new Float32Array(logoPositions.length);
    geo.setAttribute("position", new THREE.BufferAttribute(current, 3));
    geo.setAttribute("aLogoPos", new THREE.BufferAttribute(logoPositions, 3));
    geo.setAttribute("aScatterPos", new THREE.BufferAttribute(scatterPositions, 3));
    geo.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
    geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [logoPositions, scatterPositions, randoms, colors]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uProgress: { value: 0 },
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute vec3 aLogoPos;
        attribute vec3 aScatterPos;
        attribute float aRandom;
        attribute vec3 aColor;
        uniform float uProgress;
        uniform float uTime;
        varying vec3 vColor;
        varying float vProg;
        
        void main() {
          float p = clamp(uProgress + (aRandom - 0.5) * 0.2, 0.0, 1.0);
          p = smoothstep(0.0, 1.0, p);
          
          vec3 pos = mix(aScatterPos, aLogoPos, p);
          
          // Wobble minimal pour netteté maximale quand formé
          float wobble = (1.0 - abs(p - 0.5) * 2.0) * 0.06;
          pos.x += sin(uTime + aRandom * 6.28) * wobble;
          pos.y += cos(uTime * 1.3 + aRandom * 6.28) * wobble;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          // Points plus petits et denses pour netteté maximale
          gl_PointSize = (2.0 + aRandom * 1.5) * (10.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          
          vColor = aColor;
          vProg = p;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vProg;
        
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if (d > 0.5) discard;
          // Bord dur pour netteté maximale
          float edge = smoothstep(0.5, 0.35, d);
          
          // Couleur officielle pleine quand formé
          vec3 col = mix(vColor * 0.4, vColor, vProg);
          // Alpha maximal quand formé (1.0)
          float alpha = edge * mix(0.35, 1.0, vProg);
          
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const mat = pointsRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = t;
    const current = mat.uniforms.uProgress.value;
    mat.uniforms.uProgress.value = current + (progress.current - current) * 0.1;
    pointsRef.current.rotation.y = Math.sin(t * 0.1) * 0.05;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

export function LogoPoints({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const progressRef = useRef(scrollProgress);
  const isClient = typeof window !== "undefined";

  useEffect(() => {
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  if (!isClient) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <LogoPointsMesh progress={progressRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
