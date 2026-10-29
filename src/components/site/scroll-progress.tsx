"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress — fixed top crimson bar reflecting scroll position.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, rgba(255,0,51,0.4) 0%, #ff0033 50%, rgba(255,45,77,0.9) 100%)",
        boxShadow: "0 0 12px rgba(255,0,51,0.55)",
      }}
    />
  );
}
