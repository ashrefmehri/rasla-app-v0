import type { ReactNode } from "react";

type Circles = "hero" | "panel" | "compact";

/** Decorative rings, positioned in logical (RTL-safe) coordinates. */
const rings: Record<Circles, string[]> = {
  hero: [
    "-end-30 -top-40 size-140 border-white/10",
    "end-10 -top-10 size-85 border-white/10",
  ],
  panel: [
    "-end-35 -top-45 size-150 border-white/10",
    "end-7.5 -top-12.5 size-90 border-white/10",
    "-start-50 -bottom-65 size-140 border-white/8",
  ],
  compact: [
    "-end-30 -top-35 size-90 border-white/12",
    "-end-2.5 -top-10 size-50 border-white/12",
  ],
};

/**
 * The brand teal surface: radial gradient + decorative rings.
 * Shared by the landing hero and the auth pages so they always match.
 */
export function TealBackdrop({
  as: Tag = "div",
  circles = "hero",
  className = "",
  children,
  ...rest
}: {
  as?: "div" | "section" | "aside";
  circles?: Circles;
  className?: string;
  children?: ReactNode;
  "aria-hidden"?: boolean;
}) {
  return (
    <Tag
      className={`relative isolate overflow-hidden bg-[radial-gradient(120%_90%_at_85%_10%,var(--color-teal-600)_0%,var(--color-teal-700)_45%,var(--color-teal-900)_100%)] text-surface ${className}`}
      {...rest}
    >
      {rings[circles].map((r) => (
        <span
          key={r}
          aria-hidden="true"
          className={`pointer-events-none absolute -z-10 rounded-full border ${r}`}
        />
      ))}
      {children}
    </Tag>
  );
}
