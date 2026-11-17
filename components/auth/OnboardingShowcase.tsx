import { FloatingCard } from "@/components/motion/FloatingCard";
import { CheckIcon } from "@/components/landing/icons";
import type { OnboardingStepId } from "@/lib/onboarding";
import { AuthPanel, panelCard, thirdCard } from "./AuthShell";
import { SetupSteps } from "./SetupSteps";

/** Right panel shared by every onboarding step: steps card, languages card, "Sans carte bancaire" pill. */
export function OnboardingShowcase({
  current,
  badge,
  title,
  text,
}: {
  current: OnboardingStepId;
  badge: string;
  title: string;
  text: string;
}) {
  return (
    <AuthPanel badge={badge} title={title} text={text}>
      <FloatingCard
        delay={0.4}
        className="start-0 top-0 w-90"
        cardClassName={`${panelCard} flex flex-col gap-3.5 rounded-[22px] p-5`}
      >
        <SetupSteps current={current} />
      </FloatingCard>

      <FloatingCard
        delay={0.75}
        phase={0.8}
        className="end-0 top-17.5 w-57.5"
        cardClassName={`${panelCard} flex flex-col gap-2 rounded-[20px] px-4.5 py-4`}
      >
        <span className="text-[13px] text-ink-muted">Langues comprises</span>
        <ul className="flex flex-wrap gap-1.5 text-[13px] text-teal-700">
          {["Derja", "Arabizi", "Français"].map((l) => (
            <li key={l} className="rounded-full bg-teal-100 px-2.5 py-1">{l}</li>
          ))}
          <li lang="ar" className="rounded-full bg-teal-100 px-2.5 py-0.5 text-sm">العربية</li>
        </ul>
      </FloatingCard>

      <FloatingCard
        delay={1.1}
        phase={1.6}
        className={`end-10 bottom-2.5 ${thirdCard}`}
        cardClassName={`${panelCard} flex items-center gap-3 rounded-full py-2.5 ps-2.5 pe-4.5`}
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-success-bg text-success">
          <CheckIcon size={17} />
        </span>
        <span className="text-sm font-semibold">Sans carte bancaire</span>
        <span className="text-[13px] text-ink-muted">gratuit au lancement</span>
      </FloatingCard>
    </AuthPanel>
  );
}
