"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a" | "div";
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

/**
 * Magnetic — wraps children with a subtle cursor-follow translate effect.
 * Desktop only (pointer: fine). Respects reduced motion.
 */
export function Magnetic({
  children,
  className = "",
  strength = 0.35,
  as = "div",
  href,
  onClick,
  ariaLabel,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.3 });
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.3 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(mq.matches && !reduce);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, [reduce]);

  function handleMove(e: React.MouseEvent) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    x.set(mx * strength);
    y.set(my * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const motionProps = {
    ref,
    className,
    style: { x, y },
    onMouseMove: handleMove,
    onMouseLeave: reset,
  };

  if (as === "a") {
    return (
      <motion.a
        {...motionProps}
        href={href}
        aria-label={ariaLabel}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </motion.a>
    );
  }

  if (as === "button") {
    return (
      <motion.button
        {...motionProps}
        type="button"
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.div {...motionProps} onClick={onClick}>
      {children}
    </motion.div>
  );
}
