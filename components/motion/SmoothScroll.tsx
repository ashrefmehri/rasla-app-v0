"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import "lenis/dist/lenis.css";

/**
 * Public pages only. The dashboard must not use Lenis.
 * Anchor jumps clear the sticky header through each section's `scroll-mt-24`
 * (Lenis honours scroll-margin), so no extra offset here.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: true }}>
      {children}
    </ReactLenis>
  );
}
