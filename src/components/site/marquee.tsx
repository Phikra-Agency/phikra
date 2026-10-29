"use client";

import { motion, useReducedMotion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  className?: string;
  separator?: string;
}

function MarqueeRow({
  items,
  separator,
  ariaHidden = false,
}: {
  items: string[];
  separator: string;
  ariaHidden?: boolean;
}) {
  return (
    <div
      className="flex shrink-0 items-center gap-8 pr-8"
      aria-hidden={ariaHidden}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-8" style={{ lineHeight: 1 }}>
          <span className="font-display text-xl font-medium uppercase tracking-[0.15em] text-bone-dim md:text-3xl" style={{ lineHeight: 1 }}>
            {item}
          </span>
          <span className="text-crimson flex items-center" style={{ lineHeight: 1 }}>{separator}</span>
        </span>
      ))}
    </div>
  );
}

/**
 * Marquee — infinite horizontal scroll. Two copies side by side for seamless loop.
 */
export function Marquee({ items, className = "", separator = "●" }: MarqueeProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={`flex items-center gap-8 overflow-hidden ${className}`}>
        <MarqueeRow items={items} separator={separator} />
      </div>
    );
  }

  return (
    <div className={`flex overflow-hidden ${className}`}>
      <motion.div
        className="flex shrink-0 items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        <MarqueeRow items={items} separator={separator} />
        <MarqueeRow items={items} separator={separator} ariaHidden />
      </motion.div>
    </div>
  );
}
