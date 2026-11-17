import type { ReactNode } from "react";

export function FeatureCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-border bg-surface-alt p-6 sm:p-8">
      <span aria-hidden="true" className="pointer-events-none flex size-13 items-center select-none justify-center rounded-lg bg-teal-100 text-teal-700">
        {icon}
      </span>
      <h3 className="text-[22px] font-semibold">{title}</h3>
      <p className="leading-[1.6] text-ink-subtle">{children}</p>
    </article>
  );
}
