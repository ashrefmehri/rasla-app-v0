import { TealBackdrop } from "@/components/brand/TealBackdrop";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ArrowIcon, PlayIcon } from "./icons";
import { HeroVisual } from "./HeroVisual";

const languages = ["Derja", "Arabizi", "Français"];

export function Hero() {
  return (
    <TealBackdrop
      as="section"
      circles="hero"
      className="mx-auto flex max-w-340 flex-col items-center gap-10 rounded-4xl px-6 pt-10 sm:px-12 sm:pt-16 lg:flex-row lg:px-18 lg:pt-18"
    >
      <Stagger
        trigger="load"
        gap={0.12}
        className="relative flex w-full flex-col gap-6 sm:gap-7 lg:flex-[1_1_480px] lg:pb-18"
      >
        <StaggerItem className="self-start">
          <span className="inline-flex cursor-default items-center gap-2 rounded-full select-none bg-white/12 py-1.5 ps-1.5 pe-3.5 text-sm">
            <span className="rounded-full bg-surface px-2.5 py-0.75 text-xs font-semibold text-teal-700">
              Nouveau
            </span>
            Votre vendeur IA sur Messenger
          </span>
        </StaggerItem>
        <StaggerItem>
          <h1 className="text-[40px] leading-[1.06] font-semibold tracking-[-0.035em] sm:text-[56px] lg:text-[64px] lg:leading-[1.04]">
            Ne perdez plus un client sur Messenger.
          </h1>
        </StaggerItem>
        <StaggerItem>
          <p className="max-w-130 text-[17px] leading-[1.6] text-on-teal sm:text-[19px]">
            Rasla répond à vos clients en derja, en arabizi, en français ou en
            arabe, à toute heure, et transforme chaque conversation en commande
            prête à livrer.
          </p>
        </StaggerItem>
        <StaggerItem className="flex flex-wrap gap-3">
          <ButtonLink href="/inscription" variant="light" size="lg" className="w-full sm:w-auto">
            Essayer gratuitement
            <ArrowIcon />
          </ButtonLink>
          <ButtonLink href="#comment" variant="outline-light" size="lg" className="w-full px-6! sm:w-auto">
            <PlayIcon />
            Voir comment ça marche
          </ButtonLink>
        </StaggerItem>
        <StaggerItem className="flex flex-col gap-4">
          <ul className="flex cursor-default flex-wrap gap-2.5 text-sm select-none" aria-label="Langues comprises">
            {languages.map((l) => (
              <li key={l} className="rounded-full bg-white/10 px-3.5 py-1.75">
                {l}
              </li>
            ))}
            <li lang="ar" className="rounded-full bg-white/10 px-3.5 py-1.25 text-base leading-normal">
              العربية
            </li>
          </ul>
          <span className="text-sm text-on-teal-muted">
            Connexion à votre page Facebook en 2 minutes · Sans carte bancaire
          </span>
        </StaggerItem>
      </Stagger>

      <HeroVisual />
    </TealBackdrop>
  );
}
