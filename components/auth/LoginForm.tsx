"use client";

import { formHeading, formStack, formSubtitle, formTitle } from "./rhythm";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CheckIcon } from "@/components/landing/icons";
import { AuthField } from "./AuthField";
import { PasswordField } from "./PasswordField";
import { SubmitButton, textLink } from "./SubmitButton";
import { EMAIL_RE } from "./validation";

type Errors = { email?: string; password?: string };

function validate(email: string, password: string): Errors {
  const errors: Errors = {};
  if (!email.trim()) errors.email = "Entrez votre adresse e-mail.";
  else if (!EMAIL_RE.test(email.trim())) errors.email = "Entrez une adresse e-mail valide.";
  if (!password) errors.password = "Entrez votre mot de passe.";
  return errors;
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Errors appear after the first submit, then follow the user's typing.
  const errors = submitted ? validate(email, password) : {};

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    const found = validate(email, password);
    if (found.email || found.password) {
      document.getElementById(found.email ? "email" : "password")?.focus();
      return;
    }

    setLoading(true);
    // TODO(auth): replace with Auth.js, e.g.
    //   await signIn("credentials", { email, password, remember, redirectTo: "/app" })
    // and show "E-mail ou mot de passe incorrect." on failure.
    void remember;
    await new Promise((r) => setTimeout(r, 700));
    router.push("/app");
  }

  return (
    <form noValidate onSubmit={onSubmit} className="w-full max-w-100" aria-busy={loading}>
      <Stagger trigger="load" gap={0.06} delay={0.1} className={formStack}>
        <StaggerItem className={formHeading}>
          <h1 className={formTitle}>
            Bon retour parmi nous
          </h1>
          <p className={formSubtitle}>
            Connectez-vous pour voir vos messages et vos commandes.
          </p>
        </StaggerItem>

        <StaggerItem>
          <AuthField
            id="email"
            name="email"
            type="email"
            label="Adresse e-mail"
            autoComplete="email"
            inputMode="email"
            required
            value={email}
            error={errors.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </StaggerItem>

        <StaggerItem className="flex flex-col gap-1.5">
          <PasswordField
            id="password"
            name="password"
            label="Mot de passe"
            autoComplete="current-password"
            required
            value={password}
            error={errors.password}
            onChange={(e) => setPassword(e.target.value)}
            labelAside={
              <Link href="#" className={`hidden text-sm lg:inline ${textLink}`}>
                Mot de passe oublié ?
              </Link>
            }
          />
          <Link href="#" className={`self-end text-sm lg:hidden ${textLink}`}>
            Mot de passe oublié ?
          </Link>
        </StaggerItem>

        <StaggerItem>
          <label className="inline-flex min-h-11 cursor-pointer items-center gap-2.5 text-sm text-ink-subtle">
            <input
              type="checkbox"
              name="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className="flex size-5 items-center justify-center rounded-sm border border-control-border bg-surface text-transparent peer-checked:border-teal-700 peer-checked:bg-teal-700 peer-checked:text-surface peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-teal-700"
            >
              <CheckIcon size={13} strokeWidth={3} />
            </span>
            Rester connecté sur cet appareil
          </label>
        </StaggerItem>

        <StaggerItem>
          <SubmitButton loading={loading} loadingLabel="Connexion…">
            Se connecter
          </SubmitButton>
        </StaggerItem>

        <StaggerItem>
          <p className="text-center text-[15px] text-ink-muted">
            Pas encore de compte ?{" "}
            <Link href="/inscription" className="cursor-pointer font-semibold text-teal-700 hover:underline">
              Créer un compte gratuit
            </Link>
          </p>
        </StaggerItem>
      </Stagger>
    </form>
  );
}
