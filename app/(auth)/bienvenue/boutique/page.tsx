import { mobileBadge, mobileText, mobileTitle } from "@/components/auth/rhythm";
import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { OnboardingShowcase } from "@/components/auth/OnboardingShowcase";
import { ShopForm } from "@/components/auth/ShopForm";
import { stepBadge } from "@/lib/onboarding";

export const metadata: Metadata = {
  title: "Votre boutique — Rasla",
};

export default function BoutiquePage() {
  return (
    <AuthShell
      showcase={
        <OnboardingShowcase
          current="boutique"
          badge="Compte créé"
          title="Bienvenue sur Rasla."
          text="Encore quelques informations, puis on connecte votre page Facebook."
        />
      }
      mobileIntro={
        <>
          <span className={mobileBadge}>
            {stepBadge("boutique", false)}
          </span>
          <h1 className={mobileTitle}>
            Parlez-nous de votre boutique
          </h1>
          <p className={mobileText}>
            L&apos;assistant utilise le nom de votre boutique quand il répond à vos clients.
          </p>
        </>
      }
    >
      <ShopForm />
    </AuthShell>
  );
}
