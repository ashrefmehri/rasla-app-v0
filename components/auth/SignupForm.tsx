"use client";

import { formHeading, formStack, formSubtitle, formTitle } from "./rhythm";
import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CheckIcon } from "@/components/landing/icons";
import { nextStepHref, stepBadge } from "@/lib/onboarding";
import { AuthField } from "./AuthField";
import { PasswordField } from "./PasswordField";
import { SubmitButton, textLink } from "./SubmitButton";
import { EMAIL_RE, passwordStrength } from "./validation";

type Field = "email" | "password" | "confirm";
type Values = Record<Field, string>;

const ORDER: Field[] = ["email", "password", "confirm"];

function validate(v: Values): Partial<Record<Field, string>> {
  const e: Partial<Record<Field, string>> = {};
  if (!v.email.trim()) e.email = "Entrez votre adresse e-mail.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Entrez une adresse e-mail valide.";
  if (!v.password) e.password = "Entrez un mot de passe.";
  else if (v.password.length < 8) e.password = "8 caractères minimum.";
  if (!v.confirm) e.confirm = "Confirmez votre mot de passe.";
  else if (v.confirm !== v.password) e.confirm = "Les mots de passe ne correspondent pas.";
  return e;
}

/** Bar colors back up the word; the word is always shown. */
const barColor = ["", "bg-error", "bg-warning", "bg-success", "bg-success"];
const hintColor = ["text-ink-muted", "text-error", "text-warning", "text-success", "text-success"];

const linkCls = "cursor-pointer text-teal-700 underline underline-offset-2";

export function SignupForm() {
  const router = useRouter();
  const [values, setValues] = useState<Values>({ email: "", password: "", confirm: "" });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const all = validate(values);
  const err = (f: Field) => (submitted || touched[f] ? all[f] : undefined);

  const bind = (f: Field) => ({
    id: f,
    name: f,
    value: values[f],
    required: true,
    onChange: (e: ChangeEvent<HTMLInputElement>) => setValues((v) => ({ ...v, [f]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [f]: true })),
  });

  const strength = passwordStrength(values.password);

  // Confirm: live match check as soon as something is typed in it.
  const confirmTyped = values.confirm.length > 0;
  const matches = confirmTyped && values.confirm === values.password;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    const first = ORDER.find((f) => all[f]);
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }

    setLoading(true);
    // TODO(auth): create the User { email, passwordHash } with Auth.js + Prisma
    // (server action: hash the password, prisma.user.create, then sign in).
    // Show "Cette adresse e-mail est déjà utilisée." on conflict.
    // The Shop is created at step 2 (/bienvenue/boutique). See lib/onboarding.ts.
    await new Promise((r) => setTimeout(r, 800));
    router.push(nextStepHref("compte"));
  }

  return (
    <form noValidate onSubmit={onSubmit} className="w-full max-w-105" aria-busy={loading}>
      <Stagger trigger="load" gap={0.05} delay={0.1} className={formStack}>
        <StaggerItem className={formHeading}>
          <span className="cursor-default self-start rounded-full bg-teal-100 px-3 py-1 text-[13px] font-semibold text-teal-700 select-none">
            {stepBadge("compte")}
          </span>
          <h1 className={formTitle}>
            Créez votre compte Rasla
          </h1>
          <p className={formSubtitle}>
            Juste un e-mail et un mot de passe. Le reste, on le fait ensemble à
            l&apos;étape suivante.
          </p>
        </StaggerItem>


        <StaggerItem>
          <AuthField
            {...bind("email")}
            error={err("email")}
            type="email"
            inputMode="email"
            label="Adresse e-mail"
            autoComplete="email"
          />
        </StaggerItem>

        <StaggerItem>
          <PasswordField
            {...bind("password")}
            error={err("password")}
            label="Mot de passe"
            autoComplete="new-password"
            hintLive
            below={
              <div aria-hidden="true" className="mt-0.5 flex gap-1">
                {[1, 2, 3, 4].map((n) => (
                  <span
                    key={n}
                    className={`h-1 flex-1 rounded-full ${n <= strength.score ? barColor[strength.score] : "bg-border"}`}
                  />
                ))}
              </div>
            }
            hint={
              err("password") ? undefined : (
                <span className={hintColor[strength.score]}>
                  {strength.label ? `${strength.label} · ` : ""}8 caractères minimum
                </span>
              )
            }
          />
        </StaggerItem>

        <StaggerItem>
          <PasswordField
            {...bind("confirm")}
            label="Confirmer le mot de passe"
            autoComplete="new-password"
            hintLive
            invalid={confirmTyped && !matches}
            // Empty on submit: regular error. Once typed: the live hint below says match / no match.
            error={!confirmTyped ? err("confirm") : undefined}
            hint={
              confirmTyped ? (
                matches ? (
                  <span className="inline-flex items-center gap-1.5 text-success">
                    <CheckIcon size={14} strokeWidth={3} />
                    Les mots de passe correspondent
                  </span>
                ) : (
                  <span className="text-sm text-error">Les mots de passe ne correspondent pas.</span>
                )
              ) : undefined
            }
          />
        </StaggerItem>

        <StaggerItem>
          <SubmitButton loading={loading} loadingLabel="Création du compte…">
            Créer mon compte
          </SubmitButton>
        </StaggerItem>

        <StaggerItem className="flex flex-col gap-4">
          <p className="text-center text-[13px] leading-normal text-ink-muted">
            En créant un compte, vous acceptez les{" "}
            <Link href="/conditions" className={linkCls}>Conditions</Link> et la{" "}
            <Link href="/confidentialite" className={linkCls}>Politique de confidentialité</Link>.
          </p>
          <p className="text-center text-[15px] text-ink-muted">
            Déjà un compte ?{" "}
            <Link href="/connexion" className={`${textLink} font-semibold`}>
              Se connecter
            </Link>
          </p>
        </StaggerItem>
      </Stagger>
    </form>
  );
}
