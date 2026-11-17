import type { ReactNode } from "react";

export function FaqItem({
  question,
  children,
  open,
}: {
  question: string;
  children: ReactNode;
  open?: boolean;
}) {
  return (
    <details open={open} className="rounded-2xl border border-border px-5.5 py-4.5">
      <summary className="cursor-pointer text-[17px] font-medium">{question}</summary>
      <p className="mt-3 text-[15px] leading-[1.6] text-ink-subtle">{children}</p>
    </details>
  );
}
