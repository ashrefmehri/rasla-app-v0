"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ease } from "@/lib/motion";
import { Logo } from "./Logo";

const links = [
  { href: "#fonctionnalites", label: "Fonctionnalités" },
  { href: "#comment", label: "Comment ça marche" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#faq", label: "FAQ" },
];

/* Panel: drops in from under the header; children stagger in, exit is the reverse, faster. */
const panelVariants: Variants = {
  hidden: { opacity: 0, y: -12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease, staggerChildren: 0.05, delayChildren: 0.05 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease, staggerChildren: 0.03, staggerDirection: -1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.15 } },
};
const noMotion: Variants = { hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } };

/** Three lines that morph into an X. */
function MenuGlyph({ open, reduce }: { open: boolean; reduce: boolean }) {
  const t = reduce ? { duration: 0 } : { duration: 0.25, ease };
  const line = "absolute start-0 h-0.5 w-5 rounded-full bg-current";
  return (
    <span aria-hidden="true" className="relative block h-3.5 w-5">
      <motion.span className={`${line} top-0`} animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }} transition={t} />
      <motion.span className={`${line} top-1.5`} animate={{ opacity: open ? 0 : 1 }} transition={t} />
      <motion.span className={`${line} top-3`} animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }} transition={t} />
    </span>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = !!useReducedMotion();
  const lenis = useLenis();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const wasOpen = useRef(false);
  const pendingHash = useRef<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While open: lock page scroll (and Lenis), close on Escape and on resize to md+.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    lenis?.stop();

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const md = window.matchMedia("(min-width: 768px)");
    const onMd = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    md.addEventListener("change", onMd);
    return () => {
      html.style.overflow = prev;
      lenis?.start();
      window.removeEventListener("keydown", onKey);
      md.removeEventListener("change", onMd);
      // A link was tapped: scroll now that the page is unlocked.
      const hash = pendingHash.current;
      pendingHash.current = null;
      const target = hash ? document.querySelector<HTMLElement>(hash) : null;
      if (!hash || !target) return;
      // Sections carry scroll-mt-24, which both Lenis and the browser honour.
      if (lenis) lenis.scrollTo(target);
      else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      history.replaceState(null, "", hash);
    };
  }, [open, lenis, reduce]);

  // Focus: into the panel on open, back to the menu button on close.
  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    else if (wasOpen.current) buttonRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  // Link tap: close (the lock effect's cleanup unlocks, then smooth-scrolls to the section).
  const goTo = (e: MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    pendingHash.current = hash;
    setOpen(false);
  };

  const solid = scrolled || open;
  const v = reduce ? noMotion : panelVariants;
  const iv = reduce ? noMotion : itemVariants;
  const instant = reduce ? { duration: 0 } : undefined;

  return (
    <header className="sticky top-0 z-50">
      {/* Background fades in (opacity only) once the page is scrolled or the menu is open */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 border-b border-border bg-surface/85 backdrop-blur-md transition-opacity duration-300 motion-reduce:transition-none ${solid ? "opacity-100" : "opacity-0"}`}
      />
      <div className="relative mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
        <Link href="/" aria-label="Rasla, accueil">
          <Logo />
        </Link>
        <nav aria-label="Navigation principale" className="hidden gap-8 text-[15px] md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="cursor-pointer text-ink-subtle hover:text-teal-700">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {/* max-md:hidden (a media query) beats ButtonLink's own inline-flex */}
          <ButtonLink href="/connexion" variant="ghost" className="px-3! max-md:hidden">
            Se connecter
          </ButtonLink>
          <ButtonLink href="/inscription" className="max-md:hidden">
            Essai gratuit
          </ButtonLink>
          <button
            ref={buttonRef}
            type="button"
            className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink hover:bg-teal-100 md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <MenuGlyph open={open} reduce={reduce} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              aria-hidden="true"
              onClick={close}
              className="fixed inset-x-0 top-18 bottom-0 bg-ink/30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: instant ?? { duration: 0.3 } }}
              exit={{ opacity: 0, transition: instant ?? { duration: 0.2 } }}
            />
            <motion.nav
              key="panel"
              ref={panelRef}
              id="menu-mobile"
              aria-label="Navigation mobile"
              className="absolute inset-x-0 top-full rounded-b-[24px] bg-surface px-4 pt-2 pb-6 shadow-popover md:hidden"
              variants={v}
              initial="hidden"
              animate="show"
              exit="exit"
              transition={instant}
            >
              <ul className="flex flex-col">
                {links.map((l) => (
                  <motion.li key={l.href} variants={iv} transition={instant}>
                    <a
                      href={l.href}
                      onClick={(e) => goTo(e, l.href)}
                      className="flex min-h-12 cursor-pointer items-center border-b border-border text-base text-ink hover:text-teal-700"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div variants={iv} transition={instant} className="mt-5 flex flex-col gap-2.5">
                <ButtonLink href="/inscription" onClick={close} className="w-full">
                  Essai gratuit
                </ButtonLink>
                <ButtonLink href="/connexion" variant="outline" onClick={close} className="w-full">
                  Se connecter
                </ButtonLink>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
