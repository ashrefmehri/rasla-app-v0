import type { Metadata } from "next";
import { stepBadge } from "@/lib/onboarding";

export const metadata: Metadata = {
  title: "Connecter votre page Facebook — Rasla",
};

// TODO(onboarding): step 3, connect the Facebook page (Facebook Login for Business).
export default function FacebookStepPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
      <h1 className="text-[28px] font-semibold tracking-[-0.03em]">
        {stepBadge("facebook", false)} · Connecter votre page Facebook
      </h1>
      <p className="text-ink-muted">Cette étape arrive bientôt.</p>
    </main>
  );
}
