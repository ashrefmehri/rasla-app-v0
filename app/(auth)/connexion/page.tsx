import { mobileText, mobileTitle } from "@/components/auth/rhythm";
import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginShowcase } from "@/components/auth/LoginShowcase";

export const metadata: Metadata = {
  title: "Connexion — Rasla",
};

export default function ConnexionPage() {
  return (
    <AuthShell
      showcase={<LoginShowcase />}
      mobileIntro={
        <>
          <h1 className={mobileTitle}>
            Bon retour parmi nous
          </h1>
          <p className={mobileText}>
            Pendant votre absence, Rasla a continué de vendre.
          </p>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
