"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * useScrollSkew — applique un skew horizontal subtil au scroll rapide.
 * Le contenu se cisaill légèrement pendant le scroll, revient à 0 à l'arrêt.
 * Signature motion du site.
 */
export function useScrollSkew() {
  const reduce = useReducedMotion();
  const [skew, setSkew] = useState(0);
  const lastScrollY = useRef(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (reduce) return;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const delta = currentY - lastScrollY.current;
          // Skew proportionnel au delta, clampé
          const newSkew = Math.max(-2, Math.min(2, delta * 0.15));
          setSkew(newSkew);
          lastScrollY.current = currentY;
          ticking = false;
          // Revient à 0 après un court délai
          setTimeout(() => setSkew(0), 100);
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduce]);

  return reduce ? 0 : skew;
}
