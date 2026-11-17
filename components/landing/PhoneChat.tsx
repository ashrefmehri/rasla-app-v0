"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Avatar } from "@/components/ui/Avatar";
import { ease } from "@/lib/motion";
import { DressIcon } from "./icons";

type Step =
  | { kind: "customer"; text: string }
  | { kind: "shop"; content: ReactNode; className?: string; lang?: string; dir?: string }
  | { kind: "typing" };

/** The conversation, in order. Each typing step stands before an assistant reply. */
const script: { step: Step; at: number }[] = [
  { at: 900, step: { kind: "customer", text: "3aslema, el robe hethi mawjouda M ?" } },
  { at: 1500, step: { kind: "typing" } },
  {
    at: 2500,
    step: {
      kind: "shop",
      lang: "ar",
      dir: "rtl",
      className: "text-[15px] leading-6",
      content: "عسلامة! إيه، الـ M موجودة. السوم 45 د.ت والتوصيل 7 د.ت 🚚",
    },
  },
  { at: 3200, step: { kind: "shop", content: <ProductCard />, className: "w-[85%] overflow-hidden rounded-lg! p-0!" } },
  { at: 4400, step: { kind: "customer", text: "Behi, livraison l Sousse" } },
  { at: 5000, step: { kind: "typing" } },
  { at: 6000, step: { kind: "shop", content: "Parfait. Votre nom et numéro pour confirmer ?" } },
];

/** Time at which the conversation is over (for the "Commande créée" card). */
export const CHAT_DONE_AT = 6800;

function ProductCard() {
  return (
    <>
      <div className="flex h-18 items-center justify-center bg-linear-135 from-teal-100 to-teal-200 text-teal-700 sm:h-21.5">
        <DressIcon />
      </div>
      <div className="flex justify-between px-3 py-2 text-[13px] font-semibold">
        <span>Robe bleu marine</span>
        <span className="text-teal-700">45 DT</span>
      </div>
    </>
  );
}

const bubble = "max-w-[85%] rounded-2xl px-3.25 py-2.25 text-sm leading-5";

/** Phone mockup whose conversation plays once, like a real chat. */
export function PhoneChat({ onDone }: { onDone?: () => void }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const timers = script.map((s, i) => setTimeout(() => setCount(i + 1), s.at));
    timers.push(setTimeout(() => onDone?.(), CHAT_DONE_AT));
    return () => timers.forEach(clearTimeout);
  }, [reduce, onDone]);

  // A typing step is only visible while it is the latest step.
  const visible = script
    .slice(0, reduce ? script.length : count)
    .map((s, i) => ({ ...s, i }))
    .filter((s, idx, arr) => s.step.kind !== "typing" || idx === arr.length - 1);

  const enter = reduce
    ? { initial: false as const }
    : {
        initial: { opacity: 0, y: 10, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, transition: { duration: 0.15 } },
        transition: { duration: 0.35, ease },
      };

  return (
    <div className="h-135 w-65 cursor-default select-nonerounded-t-[40px] bg-ink px-2.5 pt-2.5 shadow-phone sm:h-155 sm:w-80 sm:rounded-t-[48px] sm:px-3 sm:pt-3">
      <div className="flex h-full flex-col overflow-hidden rounded-t-[32px] bg-surface text-ink sm:rounded-t-[38px]">
        <div className="flex justify-center pt-2.5">
          <span className="h-6 w-22.5 rounded-full bg-ink" />
        </div>
        <div className="flex items-center gap-2.5 border-b border-border px-4 py-3.5">
          <Avatar initials="MB" tone="peach" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Ma Boutique</span>
            <span className="text-[11px] text-success">● Répond en quelques secondes</span>
          </div>
        </div>
        <div
          className="flex flex-1 flex-col gap-2.5 bg-surface-alt px-3 py-4 sm:px-3.5"
        >
          <AnimatePresence initial={false}>
            {visible.map(({ step, i }) => {
              if (step.kind === "typing")
                return (
                  <motion.div
                    key={`t${i}`}
                    {...enter}
                    className="self-start rounded-2xl rounded-es-sm border border-border bg-surface px-3.5 py-2 text-base leading-5 tracking-[0.2em] text-ink-muted"
                  >
                    <span aria-hidden="true">…</span>
                  </motion.div>
                );
              if (step.kind === "customer")
                return (
                  <motion.div
                    key={i}
                    {...enter}
                    className={`${bubble} self-end rounded-ee-sm bg-teal-700 text-surface`}
                  >
                    {step.text}
                  </motion.div>
                );
              return (
                <motion.div
                  key={i}
                  {...enter}
                  lang={step.lang}
                  dir={step.dir}
                  className={`${bubble} self-start border border-border bg-surface ${step.dir === "rtl" ? "rounded-ee-sm" : "rounded-es-sm"} ${step.className ?? ""}`}
                >
                  {step.content}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
