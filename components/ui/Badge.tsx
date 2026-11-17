import type { ReactNode } from "react";

type Tone = "success" | "warning" | "teal" | "attention";

const tones: Record<Tone, string> = {
  success: "bg-success-bg text-success",
  warning: "bg-warning-bg text-warning",
  teal: "bg-teal-700 text-surface",
  attention: "bg-clay-600 text-surface",
};

export function Badge({
  tone,
  children,
  className = "",
}: {
  tone: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex cursor-default items-center rounded-full select-none px-2.5 py-0.5 text-xs font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
