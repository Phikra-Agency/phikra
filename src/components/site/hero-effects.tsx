"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";

/**
 * HeroEffects — effets cinématiques vivants sur le hero :
 *  1. Parallaxe 3D au curseur (le contenu se déplace légèrement avec la souris)
 *  2. Particules de poussière flottantes dans le faisceau
 *  3. Étincelle d'idée qui pulse près du centre
 */
export function HeroEffects({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  if (reduce) return <>{children}</>;

  return (
    <div ref={ref} className="relative">
      {/* Particules de poussière flottantes dans le faisceau */}
      <DustMotes />
      {/* Étincelle d'idée pulsante */}
      <IdeaSpark />
      {children}
    </div>
  );
}

/** Particules de poussière dorées/blanches flottant lentement dans le faisceau. */
function DustMotes() {
  // Positions déterministes (pas de Math.random au rendu)
  const motes = [
    { left: 45, top: 30, size: 2, dur: 9, delay: 0 },
    { left: 50, top: 45, size: 1.5, dur: 11, delay: 1.2 },
    { left: 48, top: 25, size: 2.5, dur: 13, delay: 2.5 },
    { left: 52, top: 55, size: 1.8, dur: 10, delay: 0.8 },
    { left: 46, top: 38, size: 2.2, dur: 12, delay: 3.5 },
    { left: 54, top: 50, size: 1.6, dur: 14, delay: 1.8 },
    { left: 44, top: 60, size: 2, dur: 9.5, delay: 4.2 },
    { left: 56, top: 35, size: 2.3, dur: 11.5, delay: 2.8 },
    { left: 47, top: 48, size: 1.9, dur: 12.5, delay: 5 },
    { left: 53, top: 42, size: 2.1, dur: 10.5, delay: 3.2 },
    { left: 49, top: 28, size: 1.7, dur: 13.5, delay: 6 },
    { left: 51, top: 52, size: 2.4, dur: 11, delay: 0.5 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 z-[6] overflow-hidden" aria-hidden>
      {motes.map((m, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: m.size,
            height: m.size,
            background: "rgba(255,245,210,0.7)",
            boxShadow: "0 0 4px rgba(255,235,180,0.4)",
            mixBlendMode: "screen",
          }}
          animate={{
            opacity: [0, 0.9, 0.9, 0],
            y: [0, -60, -120],
            x: [0, (i % 2 === 0 ? 8 : -8)],
          }}
          transition={{
            duration: m.dur,
            delay: m.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/** Étincelle d'idée qui pulse près du centre toutes les ~6s. */
function IdeaSpark() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[7]" aria-hidden>
      {/* Point lumineux */}
      <motion.div
        className="absolute"
        style={{ left: "50%", top: "45%", translateX: "-50%", translateY: "-50%" }}
      >
        {/* Halo pulsant */}
        <motion.div
          className="rounded-full"
          style={{
            width: 8,
            height: 8,
            background: "radial-gradient(circle, #fff 0%, rgba(255,220,180,0.6) 40%, transparent 70%)",
          }}
          animate={{
            opacity: [0, 0, 1, 0.6, 0],
            scale: [0.5, 0.5, 1.5, 2.5, 0.5],
          }}
          transition={{
            duration: 6,
            times: [0, 0.4, 0.5, 0.7, 0.8],
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        {/* Trait de lumière vers le haut */}
        <motion.div
          className="absolute left-1/2 top-0"
          style={{
            width: 1,
            height: 80,
            background: "linear-gradient(180deg, transparent 0%, rgba(255,220,180,0.8) 50%, transparent 100%)",
            transformOrigin: "bottom center",
            translateX: "-50%",
          }}
          animate={{
            opacity: [0, 0, 0.8, 0],
            scaleY: [0, 0, 1, 1.3],
          }}
          transition={{
            duration: 6,
            times: [0, 0.45, 0.55, 0.75],
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </motion.div>
    </div>
  );
}
