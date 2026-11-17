import type { ReactNode } from "react";
import Link from "next/link";
import { TealBackdrop } from "@/components/brand/TealBackdrop";
import { Logo } from "@/components/landing/Logo";
import { LanguageToggle } from "./LanguageToggle";

/**
 * Shared frame of the auth pages. Always exactly one screen: the page never
 * scrolls; only the form area may scroll inside, as a last resort.
 *
 * Mobile: teal header (shrink-0) + white sheet (flex-1, scrolls if needed).
 * Desktop: form column on the left, decorative `showcase` panel on the right,
 * both h-full. Vertical rhythm scales with the screen height (clamp + vh)
 * and the `short:` / `shorter:` / `shortest:` variants (globals.css).
 */
export function AuthShell({
  mobileIntro,
  showcase,
  children,
}: {
  mobileIntro: ReactNode;
  showcase: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative box-border flex h-full min-h-0 flex-col overflow-hidden lg:flex-row lg:gap-4 lg:p-4">
      <TealBackdrop circles="compact" aria-hidden className="absolute! inset-0 lg:hidden" />

      <main className="relative flex min-h-0 flex-1 flex-col lg:h-full lg:flex-[1_1_520px] lg:px-10 lg:py-[clamp(12px,2.6vh,24px)]">
        <div className="flex shrink-0 flex-col gap-4 px-5 pt-4 pb-5 lg:p-0">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" aria-label="Rasla, accueil" className="cursor-pointer">
              <Logo tone="auth" />
            </Link>
            <LanguageToggle />
          </div>
          <div className="flex flex-col gap-1.5 text-surface lg:hidden">{mobileIntro}</div>
        </div>

        <div
          data-auth-sheet
          className="scrollbar-none flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain rounded-t-[28px] bg-surface px-5 pt-6 pb-5 lg:items-center lg:rounded-none lg:px-0 lg:py-[clamp(12px,3vh,40px)]"
        >
          {/* my-auto centers vertically but stays reachable when it overflows */}
          <div className="flex w-full flex-col lg:my-auto lg:items-center">{children}</div>
        </div>

        <footer className="hidden shrink-0 justify-between gap-4 text-[13px] text-ink-muted lg:flex short:lg:hidden">
          <span>© 2026 Rasla · Fait en Tunisie</span>
          <nav aria-label="Liens utiles" className="flex gap-4.5">
            <Link href="/confidentialite" className="cursor-pointer underline hover:text-teal-700">
              Confidentialité
            </Link>
            <a href="#" className="cursor-pointer underline hover:text-teal-700">Aide</a>
          </nav>
        </footer>
      </main>

      {showcase}
    </div>
  );
}

/**
 * Desktop-only teal panel: badge, headline, text, then the floating cards
 * in the remaining height. Shrinks on short screens; cards are clipped, never the page.
 */
export function AuthPanel({
  badge,
  title,
  text,
  children,
}: {
  badge: string;
  title: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <TealBackdrop
      as="aside"
      circles="panel"
      aria-hidden
      className="hidden h-full min-h-0 flex-[1_1_560px] cursor-default flex-col gap-[clamp(20px,4vh,40px)] rounded-4xl p-[clamp(32px,6vh,64px)] select-none lg:flex"
    >
      <div className="flex max-w-125 shrink-0 flex-col gap-[clamp(10px,2vh,18px)]">
        <span className="self-start rounded-full bg-white/12 px-3.5 py-1.5 text-sm">{badge}</span>
        <p className="text-[clamp(30px,4.6vh,44px)] leading-[1.08] font-semibold tracking-[-0.035em]">
          {title}
        </p>
        <p className="text-[clamp(15px,1.9vh,17px)] leading-[1.6] text-on-teal shortest:hidden">{text}</p>
      </div>
      <div className="relative min-h-0 flex-1 origin-top-left short:scale-90 shortest:hidden">
        {children}
      </div>
    </TealBackdrop>
  );
}

export const panelCard = "bg-surface text-ink shadow-lift";

/** Add to the third floating card: hidden on screens ≤ 720px tall. */
export const thirdCard = "shorter:hidden";
