import { FloatingCard } from "@/components/motion/FloatingCard";
import { Avatar } from "@/components/ui/Avatar";
import { CheckIcon, SparkleIcon } from "@/components/landing/icons";
import { AuthPanel, panelCard, thirdCard } from "./AuthShell";

export function LoginShowcase() {
  return (
    <AuthPanel
      badge="Votre vendeur IA sur Messenger"
      title="Pendant votre absence, Rasla a continué de vendre."
      text="Chaque nuit, vos clients écrivent. L'assistant répond, prend les commandes et vous les garde au chaud."
    >
      <FloatingCard
        delay={0.4}
        className="start-0 top-0 w-82.5"
        cardClassName={`${panelCard} flex flex-col gap-2.5 rounded-[20px] p-4`}
      >
        <div className="flex items-center gap-2.5">
          <Avatar initials="SB" size="sm" />
          <span className="flex-1 text-sm font-semibold">Sami B.</span>
          <span className="text-xs text-ink-muted">02:14</span>
        </div>
        <div className="self-start rounded-lg rounded-ss-sm bg-bubble px-3 py-2 text-sm">
          b9adech el robe ? fama M ?
        </div>
        <div
          lang="ar"
          dir="rtl"
          className="self-end rounded-lg rounded-se-sm bg-teal-100 px-3 py-2 text-[15px] leading-6"
        >
          إيه موجودة، بـ 45 د.ت 👗
        </div>
      </FloatingCard>

      <FloatingCard
        delay={0.75}
        phase={0.8}
        className="end-0 top-30 w-62.5"
        cardClassName={`${panelCard} flex flex-col gap-2 rounded-[20px] px-4.5 py-4`}
      >
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-success-bg text-success">
            <CheckIcon />
          </span>
          <span className="text-sm font-semibold">Commande créée</span>
        </div>
        <span className="text-[13px] text-ink-muted">Robe bleu marine · M · Sousse</span>
        <span className="text-[22px] font-semibold text-teal-700">52 DT</span>
      </FloatingCard>

      <FloatingCard
        delay={1.1}
        phase={1.6}
        className={`start-15 bottom-0 ${thirdCard}`}
        cardClassName={`${panelCard} flex items-center gap-3 rounded-full py-2.5 ps-2.5 pe-4.5`}
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-teal-700 text-surface">
          <SparkleIcon size={17} />
        </span>
        <span className="text-sm font-semibold">Réponse en 4 s</span>
        <span className="text-[13px] text-ink-muted">même à 2 h du matin</span>
      </FloatingCard>
    </AuthPanel>
  );
}
