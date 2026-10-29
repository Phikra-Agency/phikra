"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/** Custom desktop cursor: dot + ring that follows with lag.
 *  On portfolio cards: ring expands and shows "VOIR" text.
 *  On links/buttons: ring expands and fills crimson. */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [viewMode, setViewMode] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 200, damping: 22, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 200, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduce) return;
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;

    function onMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor='hover']"
      );
      const isView = !!t?.closest("[data-cursor='view'], .group.block");
      setHovering(interactive);
      setViewMode(isView);
    }

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Center dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] h-2 w-2 rounded-full bg-crimson"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: hovering || viewMode ? 0.4 : 1 }}
        transition={{ duration: 0.18 }}
      />
      {/* Outer ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] flex items-center justify-center rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: viewMode ? 80 : hovering ? 48 : 32,
          height: viewMode ? 80 : hovering ? 48 : 32,
          borderColor: hovering || viewMode
            ? "rgba(229,13,74,0.9)"
            : "rgba(255,255,255,0.4)",
          backgroundColor: viewMode ? "rgba(229,13,74,0.9)" : "transparent",
        }}
        transition={{ duration: 0.22 }}
      >
        {viewMode && (
          <span className="font-mono text-[0.6rem] font-bold uppercase tracking-wider text-white">
            Voir
          </span>
        )}
      </motion.div>
    </>
  );
}
