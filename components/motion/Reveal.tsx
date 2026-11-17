"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  fadeTransition,
  fadeUp,
  instant,
  stagger,
  staggerTransition,
} from "@/lib/motion";

type Trigger = "view" | "load";

function triggerProps(trigger: Trigger) {
  return trigger === "load"
    ? { initial: "hidden", animate: "show" }
    : {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.2 },
      };
}

/** Fades its content up once, on load or when scrolled into view. */
export function Reveal({
  children,
  className,
  trigger = "view",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  trigger?: Trigger;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      transition={reduce ? instant : { ...fadeTransition, delay }}
      {...triggerProps(trigger)}
    >
      {children}
    </motion.div>
  );
}

/** Staggers its StaggerItem children. `as="ul"`/`"ol"` keeps list semantics. */
export function Stagger({
  children,
  className,
  trigger = "view",
  gap = 0.1,
  delay = 0,
  as = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  trigger?: Trigger;
  gap?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
  "aria-label"?: string;
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={stagger}
      transition={reduce ? instant : staggerTransition(gap, delay)}
      {...triggerProps(trigger)}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
  lang,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "span";
  lang?: string;
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      lang={lang}
      variants={fadeUp}
      transition={reduce ? instant : fadeTransition}
    >
      {children}
    </Comp>
  );
}
