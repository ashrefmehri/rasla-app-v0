import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-sm font-semibold tracking-[0.08em] text-teal-700 uppercase">
      {children}
    </span>
  );
}

export function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-[32px] leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[44px] ${className}`}
    >
      {children}
    </h2>
  );
}
