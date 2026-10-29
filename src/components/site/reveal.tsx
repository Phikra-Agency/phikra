"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  once?: boolean;
  immediate?: boolean;
  id?: string;
  /** Effet de profondeur 3D à l'entrée (translateZ + scale). */
  depth?: boolean;
}

/**
 * Reveal — fades & slides its children into view on scroll.
 * Honors prefers-reduced-motion (renders children plainly).
 * Option `depth` : ajoute un effet de profondeur 3D (translateZ + scale) à l'entrée.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
  once = true,
  immediate = false,
  id,
  depth = false,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as "div"];

  if (reduce) {
    const Tag = as as "div";
    return <Tag id={id} className={className}>{children}</Tag>;
  }

  const variants: Variants = depth
    ? {
        hidden: { opacity: 0, y, z: -60, scale: 0.94 },
        visible: { opacity: 1, y: 0, z: 0, scale: 1 },
      }
    : {
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0 },
      };

  const style = depth ? { transformStyle: "preserve-3d" as const, perspective: 1000 } : undefined;

  if (immediate) {
    return (
      <MotionTag
        id={id}
        className={className}
        style={style}
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

interface RevealWordsProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}

/**
 * RevealWords — splits text into words, each revealed from a masked container.
 */
export function RevealWords({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: RevealWordsProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ").filter(Boolean);

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} style={{ display: "inline-block" }}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
            marginRight: "0.25em",
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", filter: "blur(8px)" }}
            {...(immediate
              ? { animate: { y: 0, filter: "blur(0px)" } }
              : { whileInView: { y: 0, filter: "blur(0px)" }, viewport: { once: true, margin: "-80px" } })}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
