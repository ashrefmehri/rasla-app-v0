import { mobileBadge, mobileText, mobileTitle } from "@/components/auth/rhythm";
import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { OnboardingShowcase } from "@/components/auth/OnboardingShowcase";
import { SignupForm } from "@/components/auth/SignupForm";
import { stepBadge } from "@/lib/onboarding";

export const metadata: Metadata = {
  title: "Créer un compte — Rasla",
};

export default function InscriptionPage() {
  return (
    <AuthShell
      showcase={
        <OnboardingShowcase
          current="compte"
          badge="Prêt en quelques minutes"
          title="Dès ce soir, votre boutique répond toute seule."
          text="Cinq étapes simples. Vous pouvez tester l'assistant avant de l'activer pour vos clients."
        />
      }
      mobileIntro={
        <>
          <span className={mobileBadge}>
            {stepBadge("compte", false)}
          </span>
          <h1 className={mobileTitle}>
            Créez votre compte Rasla
          </h1>
          <p className={mobileText}>
            Juste un e-mail et un mot de passe. Le reste, on le fait ensemble à
            l&apos;étape suivante.
          </p>
        </>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}
