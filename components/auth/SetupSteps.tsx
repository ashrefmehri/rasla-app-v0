import { CheckIcon } from "@/components/landing/icons";
import { onboardingSteps, stepNumber, TOTAL_STEPS, type OnboardingStepId } from "@/lib/onboarding";

/** "Mise en route" card body: done steps ticked, current highlighted. Built from lib/onboarding.ts. */
export function SetupSteps({ current }: { current: OnboardingStepId }) {
  const now = stepNumber(current);
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-semibold">Mise en route</span>
        <span className="text-[13px] text-ink-muted">
          {now} / {TOTAL_STEPS}
        </span>
      </div>
      <div className="flex gap-1">
        {onboardingSteps.map((s, i) => (
          <span key={s.id} className={`h-1.5 flex-1 rounded-full ${i < now ? "bg-teal-700" : "bg-border"}`} />
        ))}
      </div>
      <ol className="flex flex-col">
        {onboardingSteps.map((s, i) => {
          const n = i + 1;
          const done = n < now;
          const active = n === now;
          return (
            <li
              key={s.id}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${active ? "bg-teal-100 font-semibold text-teal-700" : "text-ink-subtle"}`}
            >
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold ${
                  done
                    ? "bg-success-bg text-success"
                    : active
                      ? "bg-teal-700 text-surface"
                      : "border border-border-strong text-ink-muted"
                }`}
              >
                {done ? <CheckIcon size={14} strokeWidth={3} /> : n}
              </span>
              <span className={done ? "line-through" : ""}>
                {s.label}
                {done && <span className="sr-only"> (terminé)</span>}
              </span>
            </li>
          );
        })}
      </ol>
    </>
  );
}
