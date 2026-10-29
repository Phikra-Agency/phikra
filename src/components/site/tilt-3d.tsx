"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, useMotionTemplate } from "framer-motion";

/**
 * Tilt3D — wrapper qui applique un effet de perspective 3D au survol.
 * L'élément pivote légèrement selon la position du curseur (tilt card).
 *
 * Props :
 *  - children
 *  - maxRotate (degrés, défaut 8)
 *  - scale (défaut 1.02)
 *  - className
 *  - glare (bool, défaut true) — reflet lumineux qui suit le curseur
 */
export function Tilt3D({
  children,
  maxRotate = 8,
  scale = 1.02,
  className = "",
  glare = true,
}: {
  children: ReactNode;
  maxRotate?: number;
  scale?: number;
  className?: string;
  glare?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5); // 0..1
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [maxRotate, -maxRotate]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxRotate, maxRotate]), {
    stiffness: 200,
    damping: 20,
  });

  // Glare position
  const glareX = useTransform(x, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(y, [0, 1], ["0%", "100%"]);

  function handleMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale }}
      transition={{ scale: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
    >
      {children}
      {glare && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
          style={{
            background: useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.15) 0%, transparent 50%)`,
            mixBlendMode: "overlay",
          }}
        />
      )}
    </motion.div>
  );
}
