"use client";

import { formHeading, formStack, formSubtitle, formTitle } from "./rhythm";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { nextStepHref, stepBadge } from "@/lib/onboarding";
import { AuthField } from "./AuthField";
import { SubmitButton } from "./SubmitButton";
import { formatTnPhone } from "./validation";

type Field = "ownerName" | "shopName" | "phone";
type Values = Record<Field, string>;

const ORDER: Field[] = ["ownerName", "shopName", "phone"];

function validate(v: Values): Partial<Record<Field, string>> {
  const e: Partial<Record<Field, string>> = {};
  if (!v.ownerName.trim()) e.ownerName = "Entrez votre nom.";
  if (!v.shopName.trim()) e.shopName = "Entrez le nom de votre boutique.";
  const digits = v.phone.replace(/\D/g, "");
  if (!digits) e.phone = "Entrez votre numéro de téléphone.";
  else if (digits.length !== 8) e.phone = "Le numéro doit contenir 8 chiffres.";
  return e;
}

/** Onboarding step 2: owner name, shop name, phone. */
export function ShopForm() {
  const router = useRouter();
  const [values, setValues] = useState<Values>({ ownerName: "", shopName: "", phone: "" });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const all = validate(values);
  const bind = (f: Field) => ({
    id: f,
    name: f,
    value: values[f],
    required: true,
    error: submitted || touched[f] ? all[f] : undefined,
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      setValues((v) => ({ ...v, [f]: f === "phone" ? formatTnPhone(e.target.value) : e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [f]: true })),
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    const first = ORDER.find((f) => all[f]);
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }

    setLoading(true);
    // TODO(data): create the Shop { name, ownerName, phone: "+216" + digits } for the
    // signed-in User (Prisma, server action). See lib/onboarding.ts.
    await new Promise((r) => setTimeout(r, 700));
    router.push(nextStepHref("boutique"));
  }

  return (
    <form noValidate onSubmit={onSubmit} className="w-full max-w-105" aria-busy={loading}>
      <Stagger trigger="load" gap={0.06} delay={0.1} className={formStack}>
        <StaggerItem className={formHeading}>
          <span className="cursor-default self-start rounded-full bg-teal-100 px-3 py-1 text-[13px] font-semibold text-teal-700 select-none">
            {stepBadge("boutique")}
          </span>
          <h1 className={formTitle}>
            Parlez-nous de votre boutique
          </h1>
          <p className={formSubtitle}>
            L&apos;assistant utilise le nom de votre boutique quand il répond à vos clients.
          </p>
        </StaggerItem>

        <StaggerItem>
          <AuthField {...bind("ownerName")} label="Votre nom" autoComplete="name" />
        </StaggerItem>

        <StaggerItem>
          <AuthField {...bind("shopName")} label="Nom de la boutique" autoComplete="organization" />
        </StaggerItem>

        <StaggerItem>
          <AuthField
            {...bind("phone")}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            label="Téléphone"
            prefix="+216"
            placeholder="20 123 456"
            maxLength={10}
            hint={
              <span className="text-ink-muted">
                Pour vous prévenir quand un client a besoin de vous. Jamais montré aux clients.
              </span>
            }
          />
        </StaggerItem>

        <StaggerItem>
          <SubmitButton loading={loading} loadingLabel="Enregistrement…">
            Continuer
          </SubmitButton>
        </StaggerItem>

        <StaggerItem>
          <p className="text-center text-sm text-ink-muted">
            Vous pourrez modifier ces informations plus tard dans Paramètres.
          </p>
        </StaggerItem>
      </Stagger>
    </form>
  );
}
