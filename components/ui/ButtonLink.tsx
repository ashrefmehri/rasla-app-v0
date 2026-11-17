import type { ComponentProps } from "react";
import Link from "next/link";

type Variant = "primary" | "light" | "outline" | "outline-light" | "ghost";
type Size = "md" | "lg" | "xl";

const variants: Record<Variant, string> = {
  primary: "bg-teal-700 text-surface hover:bg-teal-800",
  light: "bg-surface text-teal-900 font-semibold hover:bg-teal-100",
  outline: "border border-border-strong text-ink hover:border-teal-700 hover:text-teal-700",
  "outline-light": "border border-white/40 text-surface hover:bg-white/10",
  ghost: "text-ink hover:text-teal-700",
};

const sizes: Record<Size, string> = {
  md: "min-h-control px-5 text-[15px]",
  lg: "min-h-13 px-6.5 text-base",
  xl: "min-h-14 px-7.5 text-[17px]",
};

type Props = ComponentProps<"a"> & { href: string; variant?: Variant; size?: Size };

/**
 * Pill link-button. Internal paths ("/…") use next/link.
 * Hover lifts by 2px (transform only); color swaps instantly.
 */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  href,
  ...props
}: Props) {
  const cls = `inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full font-medium transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${variants[variant]} ${sizes[size]} ${className}`;
  return href.startsWith("/") ? (
    <Link href={href} className={cls} {...props} />
  ) : (
    <a href={href} className={cls} {...props} />
  );
}
