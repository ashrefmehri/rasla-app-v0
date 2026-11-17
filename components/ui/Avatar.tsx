type Tone = "teal" | "peach" | "white";

const tones: Record<Tone, string> = {
  teal: "bg-teal-100 text-teal-700",
  peach: "bg-peach-100 text-peach-800",
  white: "bg-surface text-teal-700",
};

export function Avatar({
  initials,
  tone = "teal",
  size = "md",
}: {
  initials: string;
  tone?: Tone;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "size-8 text-xs" : "size-9 text-[13px]";
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${dim} ${tones[tone]}`}
    >
      {initials}
    </span>
  );
}
