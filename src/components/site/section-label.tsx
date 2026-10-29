"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SectionLabelProps {
  number?: string;
  label: string;
  className?: string;
}

/**
 * SectionLabel — editorial marker: crimson number, fine line, mono label.
 */
export function SectionLabel({ number, label, className = "" }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {number && (
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-crimson">
          {number}
        </span>
      )}
      <DrawLine />
      <span className="label-mono">{label}</span>
    </div>
  );
}

/**
 * DrawLine — hairline that scales from 0 to 1 on in-view.
 */
export function DrawLine({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={`h-px w-6 bg-crimson ${className}`} />;
  }
  return (
    <motion.div
      className={`h-px w-6 bg-crimson ${className}`}
      style={{ originX: 0 }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
