/**
 * Vertical rhythm of the auth forms. Mobile: fixed compact values.
 * Desktop: scales with the screen height so every page fits one screen.
 */
export const formStack = "flex flex-col gap-3.5 lg:gap-[clamp(10px,1.8vh,20px)]";

/** Desktop heading block (badge + title + subtitle). */
export const formHeading = "hidden flex-col gap-[clamp(4px,1vh,8px)] lg:flex";
export const formTitle =
  "text-[clamp(26px,3.6vh,34px)] leading-[1.15] font-semibold tracking-[-0.03em]";
export const formSubtitle = "leading-[1.6] text-ink-muted shorter:hidden";

/** Mobile intro on teal (compact: optional badge, title, one short paragraph). */
export const mobileTitle = "text-[26px] leading-[1.15] font-semibold tracking-[-0.03em]";
export const mobileText = "text-[14px] leading-snug text-on-teal";
export const mobileBadge =
  "cursor-default self-start rounded-full bg-white/14 px-2.5 py-0.5 text-xs font-semibold select-none";

/** Inputs and buttons: 48px on mobile, 42–52px with the screen height on desktop. */
export const controlHeight = "min-h-12 lg:min-h-[clamp(42px,5.2vh,52px)]";
