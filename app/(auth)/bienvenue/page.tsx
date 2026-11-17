import { redirect } from "next/navigation";

/** /bienvenue has no screen of its own: onboarding resumes at step 2. */
export default function BienvenuePage() {
  redirect("/bienvenue/boutique");
}
