import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CategoryMarquee } from "@/components/landing/CategoryMarquee";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { FaqItem } from "@/components/landing/FaqItem";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { Hero } from "@/components/landing/Hero";
import { Logo } from "@/components/landing/Logo";
import { Eyebrow, SectionTitle } from "@/components/landing/SectionHeading";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { StepCard } from "@/components/landing/StepCard";
import { ArrowIcon, CartIcon, ChatIcon, PersonIcon } from "@/components/landing/icons";

const included = [
  "Réponses illimitées sur Messenger",
  "Réponses aux commentaires",
  "Commandes et produits",
  "Jusqu'à 5 membres d'équipe",
];

const cardGrid = "grid grid-cols-1 gap-5 md:grid-cols-3";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <div className="overflow-x-clip bg-surface px-4 pt-2 text-ink sm:px-6">
        <main>
          <Hero />

          <Reveal>
            <CategoryMarquee />
          </Reveal>

          <section id="fonctionnalites" className="mx-auto flex max-w-7xl scroll-mt-24 flex-col gap-10 px-2 py-14 sm:gap-12">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <div className="flex max-w-160 flex-col gap-3.5">
                <Eyebrow>Pourquoi Rasla</Eyebrow>
                <SectionTitle>Chaque message sans réponse est une vente perdue.</SectionTitle>
              </div>
              <p className="max-w-105 text-[17px] leading-[1.6] text-ink-subtle">
                Vos clients écrivent le soir, le week-end, pendant que vous
                emballez des colis. Rasla répond pour vous, avec vos prix et vos
                produits.
              </p>
            </Reveal>
            <Stagger className={cardGrid}>
              <StaggerItem>
                <FeatureCard icon={<ChatIcon />} title="Répond comme vous">
                  Derja, arabizi, français ou arabe : Rasla comprend « b9adech »
                  et répond dans la langue du client, avec le ton de votre
                  boutique.
                </FeatureCard>
              </StaggerItem>
              <StaggerItem>
                <FeatureCard icon={<CartIcon />} title="Transforme le chat en commande">
                  Produit, taille, adresse, téléphone : tout est récupéré dans
                  la conversation. La commande arrive prête, vous n&apos;avez
                  plus qu&apos;à confirmer.
                </FeatureCard>
              </StaggerItem>
              <StaggerItem>
                <FeatureCard icon={<PersonIcon />} title="Vous gardez la main">
                  Une réclamation ou une question délicate ? Rasla vous prévient
                  et se met en pause. Vous reprenez la conversation en un clic.
                </FeatureCard>
              </StaggerItem>
            </Stagger>
          </section>

          <section id="comment" className="mx-auto flex max-w-340 scroll-mt-24 flex-col gap-10 rounded-4xl bg-teal-100 px-4 py-12 sm:gap-12 sm:p-12 lg:p-18">
            <Reveal className="flex flex-col items-center gap-3.5 text-center">
              <Eyebrow>Comment ça marche</Eyebrow>
              <SectionTitle className="max-w-180">Prêt à vendre en trois étapes.</SectionTitle>
            </Reveal>
            <Stagger as="ol" className={cardGrid}>
              <StaggerItem as="li">
                <StepCard step={1} title="Connectez votre page Facebook">
                  Un clic avec votre compte Facebook. Rasla lit vos messages
                  Messenger et les commentaires de vos publications.
                </StepCard>
              </StaggerItem>
              <StaggerItem as="li">
                <StepCard step={2} title="Ajoutez vos produits">
                  Prix, tailles, couleurs, stock et frais de livraison par
                  ville. Rasla s&apos;en sert pour répondre juste.
                </StepCard>
              </StaggerItem>
              <StaggerItem as="li">
                <StepCard step={3} title="Laissez l'assistant répondre">
                  Suivez tout depuis votre tableau de bord : messages, commandes
                  en attente et ventes de la semaine.
                </StepCard>
              </StaggerItem>
            </Stagger>
            <Reveal>
              <DashboardPreview />
            </Reveal>
          </section>

          <section id="tarifs" className="mx-auto grid max-w-7xl scroll-mt-24 grid-cols-1 items-center gap-10 px-2 pt-16 pb-14 sm:pt-22 lg:grid-cols-2 lg:gap-12">
            <Reveal className="flex flex-col gap-4">
              <Eyebrow>Tarifs</Eyebrow>
              <SectionTitle>Gratuit pendant le lancement.</SectionTitle>
              <p className="text-[17px] leading-[1.6] text-ink-subtle">
                Les premières boutiques utilisent Rasla sans frais et nous
                aident à le construire. Les prix en dinars seront annoncés avant
                la fin de l&apos;essai, sans engagement.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col gap-3.5 rounded-3xl border border-border-strong p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold">Boutique</h3>
                <Badge tone="success">Accès anticipé</Badge>
              </div>
              <ul className="flex flex-col gap-3.5">
                {included.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[15px]">
                    <span aria-hidden="true" className="text-teal-700">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <ButtonLink href="/inscription" className="mt-2 min-h-12">
                Rejoindre l&apos;accès anticipé
              </ButtonLink>
            </Reveal>
          </section>

          <section id="faq" className="mx-auto max-w-220 scroll-mt-24 px-2 pt-10 pb-18">
            <Reveal>
              <h2 className="mb-7 text-center text-[28px] font-semibold tracking-[-0.03em] sm:text-[36px]">
                Questions fréquentes
              </h2>
            </Reveal>
            <Stagger className="flex flex-col gap-3">
              <StaggerItem>
                <FaqItem open question="L'assistant peut-il dire des bêtises à mes clients ?">
                  Il ne répond qu&apos;avec vos produits, vos prix et vos
                  règles. Quand il n&apos;est pas sûr, il vous passe la
                  conversation au lieu d&apos;inventer.
                </FaqItem>
              </StaggerItem>
              <StaggerItem>
                <FaqItem question="Comment sait-il de quel produit parle le client ?">
                  Il relie la publication ou la pub d&apos;où vient le client à
                  vos produits. S&apos;il hésite, il envoie les photos pour que
                  le client choisisse.
                </FaqItem>
              </StaggerItem>
              <StaggerItem>
                <FaqItem question="Et WhatsApp ?">
                  WhatsApp arrive bientôt. On commence par Messenger et les
                  commentaires Facebook.
                </FaqItem>
              </StaggerItem>
            </Stagger>
          </section>

          <Reveal>
            <section className="mx-auto flex max-w-340 flex-wrap items-center justify-between gap-8 rounded-4xl bg-teal-900 px-6 py-12 text-surface sm:p-12 lg:p-18">
              <div className="flex max-w-160 flex-col gap-3.5">
                <SectionTitle>Ce soir, laissez Rasla répondre à votre place.</SectionTitle>
                <p className="text-[17px] text-on-teal-muted">
                  Connectez votre page en 2 minutes. Sans carte bancaire.
                </p>
              </div>
              <ButtonLink href="/inscription" variant="light" size="xl" className="w-full sm:w-auto">
                Essayer gratuitement
                <ArrowIcon />
              </ButtonLink>
            </section>
          </Reveal>
        </main>

        <footer className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-2 py-10 text-sm text-ink-muted">
          <span className="flex items-center gap-2">
            <Logo size="sm" /> · Fait en Tunisie
          </span>
          <nav aria-label="Liens légaux" className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/confidentialite" className="cursor-pointer underline hover:text-teal-700">Confidentialité</Link>
            <Link href="/conditions" className="cursor-pointer underline hover:text-teal-700">Conditions</Link>
            <a href="#" className="cursor-pointer underline hover:text-teal-700">Contact</a>
          </nav>
        </footer>
      </div>
    </>
  );
}
