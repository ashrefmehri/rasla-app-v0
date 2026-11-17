"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ease, instant, popIn } from "@/lib/motion";

/**
 * Pops in when `show` is true (after `delay` seconds), then floats gently
 * (y ±6px, 4s loop). Reduced motion: visible immediately, no loop.
 */
export function FloatingCard({
  show = true,
  delay = 0,
  phase = 0,
  className,
  cardClassName = "rounded-[18px] bg-surface px-3.5 py-3 text-ink shadow-float sm:px-4 sm:py-3.5",
  children,
}: {
  show?: boolean;
  delay?: number;
  /** Offsets the float loop so several cards don't move in sync. */
  phase?: number;
  className: string;
  cardClassName?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const visible = show || !!reduce;
  return (
    <motion.div
      className={`absolute ${className}`}
      variants={popIn}
      initial="hidden"
      animate={visible ? "show" : "hidden"}
      transition={reduce ? instant : { duration: 0.5, ease, delay }}
    >
      <motion.div
        animate={reduce || !visible ? undefined : { y: [-6, 6] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: delay + 0.5 + phase,
        }}
        className={cardClassName}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
