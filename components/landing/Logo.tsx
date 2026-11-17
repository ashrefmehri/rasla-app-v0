import Image from "next/image";

/**
 * tone="ink": dark wordmark (default).
 * tone="auth": white wordmark on a white mark tile below lg, ink from lg up
 * (the auth pages put the logo on teal on mobile, on white on desktop).
 */
export function Logo({
  size = "md",
  tone = "ink",
}: {
  size?: "sm" | "md";
  tone?: "ink" | "auth";
}) {
  const sm = size === "sm";
  const auth = tone === "auth";
  return (
    <span className={`flex items-center ${sm ? "gap-2" : "gap-2.5"}`}>
      <Image
        src="/brand/mark-teal.png"
        alt=""
        width={sm ? 22 : auth ? 32 : 34}
        height={sm ? 22 : auth ? 32 : 34}
        draggable={false}
        className={`pointer-events-none select-none ${auth ? "size-7 rounded-lg bg-surface p-0.75 lg:size-8 lg:rounded-none lg:bg-transparent lg:p-0" : ""}`}
      />
      <span
        className={`font-bold ${auth ? "text-[21px] text-surface lg:text-[23px] lg:text-ink" : "text-ink"} ${sm ? "" : "tracking-[-0.03em]"} ${!sm && !auth ? "text-2xl" : ""}`}
      >
        rasla
      </span>
    </span>
  );
}
