import type { ReactNode } from "react";

export function StepCard({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col gap-3.5 rounded-3xl bg-surface p-6 sm:p-8">
      <span
        aria-hidden="true"
        className="flex size-10 cursor-default items-center select-none justify-center rounded-full bg-teal-700 font-semibold text-surface"
      >
        {step}
      </span>
      <h3 className="text-[21px] font-semibold">
        <span className="sr-only">Étape {step} : </span>
        {title}
      </h3>
      <p className="leading-[1.6] text-ink-subtle">{children}</p>
    </div>
  );
}
