"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useApp } from "@/stores/use-app";

/**
 * PageTransition — transition cinématique exceptionnelle entre rubriques.
 *
 * Séquence :
 *  1. La page sortante glisse vers le haut + blur + fade
 *  2. Un voile cramoisi plein balaie de gauche à droite (wipe solide)
 *  3. La nouvelle page entre par le bas + blur → net (révélation cinématique)
 *
 * Effet : passage fluide et théâtral entre rubriques.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const view = useApp((s) => s.view);
  const param = useApp((s) => s.param);
  const reduce = useReducedMotion();

  const key = param ? `${view}/${param}` : view;

  if (reduce) {
    return <div key={key}>{children}</div>;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            filter: { duration: 0.5 },
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Voile cramoisi plein qui balaie (wipe solide direction-aware) */}
      <AnimatePresence>
        <motion.div
          key={`wipe-${key}`}
          className="pointer-events-none fixed inset-0 z-[80]"
          style={{ background: "var(--crimson)" }}
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: [0, 1, 1, 0], transformOrigin: ["left", "left", "right", "right"] }}
          transition={{
            duration: 0.8,
            times: [0, 0.4, 0.5, 1],
            ease: [0.83, 0, 0.17, 1],
          }}
        />
      </AnimatePresence>
    </>
  );
}
