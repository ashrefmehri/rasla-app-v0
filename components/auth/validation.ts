export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Keeps digits only (max 8) and groups them as "20 123 456". */
export function formatTnPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 8);
  return [d.slice(0, 2), d.slice(2, 5), d.slice(5, 8)].filter(Boolean).join(" ");
}

export type Strength = { score: 0 | 1 | 2 | 3 | 4; label: string };

/**
 * 0 = empty, 1 = "Trop court" (< 8), 2 = "Moyen", 3 = "Bon mot de passe", 4 = "Excellent".
 * Points: each of lowercase / uppercase / digit / symbol, plus 1 for 12+ characters.
 */
export function passwordStrength(pw: string): Strength {
  if (!pw) return { score: 0, label: "" };
  if (pw.length < 8) return { score: 1, label: "Trop court" };
  const points =
    [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((r) => r.test(pw)).length +
    (pw.length >= 12 ? 1 : 0);
  if (points <= 2) return { score: 2, label: "Moyen" };
  if (points === 3) return { score: 3, label: "Bon mot de passe" };
  return { score: 4, label: "Excellent" };
}
