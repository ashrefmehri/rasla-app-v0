import type { Transition, Variants } from "motion/react";

/** Shared motion vocabulary for public pages. Only opacity and transform. */

export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export const riseUp: Variants = {
  hidden: { opacity: 0, y: 80 },
  show: { opacity: 1, y: 0 },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 12 },
  show: { opacity: 1, scale: 1, y: 0 },
};

/** Parent variants: only exist so children can stagger. */
export const stagger: Variants = { hidden: {}, show: {} };

export const fadeTransition: Transition = { duration: 0.6, ease };

export function staggerTransition(gap = 0.1, delay = 0): Transition {
  return { staggerChildren: gap, delayChildren: delay };
}

/** Reduced motion: everything appears at once. */
export const instant: Transition = { duration: 0 };
