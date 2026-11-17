/**
 * Onboarding steps: single source of truth for the "Mise en route" card,
 * the "Étape X sur 5" badges and the step routes.
 *
 * TODO(data model):
 * - Step 1 (/inscription) creates the User: { email, passwordHash }.
 * - Step 2 (/bienvenue/boutique) creates the Shop: { name, ownerName, phone } owned by that User.
 * - Later steps attach the Facebook page, products/delivery, and the assistant settings to the Shop.
 */
export const onboardingSteps = [
  { id: "compte", label: "Créer votre compte", short: "Votre compte", href: "/inscription" },
  { id: "boutique", label: "Votre boutique : nom et téléphone", short: "Votre boutique", href: "/bienvenue/boutique" },
  { id: "facebook", label: "Connecter votre page Facebook", short: "Votre page Facebook", href: "/bienvenue/facebook" },
  { id: "produits", label: "Ajouter vos produits et la livraison", short: "Vos produits", href: "/bienvenue/produits" },
  { id: "assistant", label: "Tester puis activer l'assistant", short: "L'assistant", href: "/bienvenue/assistant" },
] as const;

export type OnboardingStepId = (typeof onboardingSteps)[number]["id"];

export const TOTAL_STEPS = onboardingSteps.length;

/** 1-based position of a step. */
export function stepNumber(id: OnboardingStepId): number {
  return onboardingSteps.findIndex((s) => s.id === id) + 1;
}

/** "Étape 2 sur 5 · Votre boutique" (or without the label when `short` is false). */
export function stepBadge(id: OnboardingStepId, withLabel = true): string {
  const n = stepNumber(id);
  const base = `Étape ${n} sur ${TOTAL_STEPS}`;
  return withLabel ? `${base} · ${onboardingSteps[n - 1].short}` : base;
}

export function nextStepHref(id: OnboardingStepId): string {
  return onboardingSteps[stepNumber(id)]?.href ?? "/app";
}
