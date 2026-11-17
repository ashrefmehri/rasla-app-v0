import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Politique de confidentialité — Rasla" };

// TODO(legal): replace with the real privacy policy (also required by Meta for app review).
export default function ConfidentialitePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-180 flex-col justify-center gap-4 px-6 py-16">
      <h1 className="text-[34px] font-semibold tracking-[-0.03em]">Politique de confidentialité</h1>
      <p className="text-ink-muted">Ce texte sera publié avant l&apos;ouverture des inscriptions.</p>
      <Link href="/" className="cursor-pointer font-semibold text-teal-700 hover:underline">
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
