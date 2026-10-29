"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

/**
 * ScrollIndicator — flèche animée qui invite au défilement.
 * À placer en bas d'une section hero ou d'une page longue.
 */
export function ScrollIndicator({ label = "Défiler" }: { label?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="flex flex-col items-center gap-2"
      aria-hidden
    >
      <span className="label-mono text-bone-dim">{label}</span>
      <motion.div
        animate={reduce ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-4 w-4 text-crimson" />
      </motion.div>
    </motion.div>
  );
}
