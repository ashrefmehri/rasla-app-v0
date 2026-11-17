"use client";

import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FloatingCard } from "@/components/motion/FloatingCard";
import { ease, instant, riseUp } from "@/lib/motion";
import { CheckIcon, SparkleIcon } from "./icons";
import { PhoneChat } from "./PhoneChat";

export function HeroVisual() {
  const reduce = useReducedMotion();
  const [phoneIn, setPhoneIn] = useState(false);
  const [orderIn, setOrderIn] = useState(false);
  const onDone = useCallback(() => setOrderIn(true), []);

  return (
    <div className="relative flex min-h-135 w-full justify-center self-end sm:min-h-150 lg:flex-[1_1_460px]">
      <p className="sr-only">
        Illustration : un client demande une robe en taille M sur Messenger,
        l&apos;assistant répond en derja avec le prix et la livraison, puis une
        commande de 52 DT est créée.
      </p>
      <div aria-hidden="true" className="contents cursor-default select-none">
      <motion.div
        variants={riseUp}
        initial="hidden"
        animate="show"
        transition={reduce ? instant : { duration: 0.9, ease, delay: 0.3 }}
        onAnimationComplete={() => setPhoneIn(true)}
      >
        <PhoneChat onDone={onDone} />
      </motion.div>

      <FloatingCard
        show={orderIn}
        className="start-0 top-16 w-40 sm:top-30 sm:w-55"
      >
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-lg bg-success-bg text-success sm:size-7">
              <CheckIcon />
            </span>
            <span className="text-[13px] font-semibold sm:text-sm">Commande créée</span>
          </div>
          <span className="text-xs text-ink-muted sm:text-[13px]">Robe bleu marine · M · Sousse</span>
          <span className="text-lg font-semibold text-teal-700 sm:text-xl">52 DT</span>
        </div>
      </FloatingCard>

      <FloatingCard
        show={phoneIn}
        phase={1}
        className="end-0 top-70 w-40 sm:top-82.5 sm:w-52.5"
      >
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-700 text-surface sm:size-9.5">
            <SparkleIcon />
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-semibold sm:text-sm">Réponse en 4 s</span>
            <span className="text-xs text-ink-muted">même à 2 h du matin</span>
          </div>
        </div>
      </FloatingCard>
      </div>
    </div>
  );
}
