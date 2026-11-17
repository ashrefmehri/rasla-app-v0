import type { ReactNode } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";

function Row({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={`flex justify-between ${className}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Conversation({
  initials,
  tone,
  name,
  active,
  meta,
}: {
  initials: string;
  tone: "white" | "peach" | "teal";
  name: string;
  active?: boolean;
  meta: ReactNode;
}) {
  return (
    <li className={`flex items-center gap-2.5 rounded-xl p-2.5 ${active ? "bg-teal-100" : ""}`}>
      <Avatar initials={initials} tone={tone} size="sm" />
      <span className="flex-1 text-sm font-semibold">{name}</span>
      {meta}
    </li>
  );
}

/** Static, non-interactive picture of the dashboard for the landing page. */
export function DashboardPreview() {
  return (
    <>
    <p className="sr-only">
      Aperçu du tableau de bord : une conversation avec Sami B. devient une
      commande de 52 DT en attente de confirmation.
    </p>
    <div
      aria-hidden="true"
      className="flex cursor-default flex-col gap-4 select-none rounded-3xl border border-teal-200 bg-surface p-3 shadow-preview sm:p-5 md:flex-row md:flex-wrap"
    >
      <div className="flex flex-col gap-2 md:flex-[1_1_220px]">
        <span className="px-2 py-1 text-[13px] font-semibold tracking-[0.08em] text-ink-muted">
          MESSAGES
        </span>
        <ul className="flex flex-col gap-2">
          <Conversation initials="SB" tone="white" name="Sami B." active meta={<Badge tone="teal" className="px-1.75! py-px! text-[11px]">2</Badge>} />
          <Conversation initials="AH" tone="peach" name="Amira H." meta={<Badge tone="attention" className="px-1.75! py-px! text-[11px]">Vous</Badge>} />
          <Conversation initials="IK" tone="teal" name="Ines K." meta={<span className="text-xs text-ink-muted">09:58</span>} />
        </ul>
      </div>

      <div className="flex flex-col gap-2.5 rounded-2xl bg-surface-alt p-3.5 sm:p-4.5 md:flex-[2_1_380px]">
        <div className="self-start rounded-lg rounded-ss-sm border border-border bg-bubble px-3.25 py-2.25 text-sm">
          Taille M, livraison l Sousse. Esmi Sami, 20 123 456
        </div>
        <div className="flex w-70 max-w-full flex-col gap-1.5 self-end rounded-lg rounded-se-sm bg-teal-100 p-3.5 text-sm">
          <span className="font-semibold">Récapitulatif</span>
          <Row label="Robe bleu marine · M" value="45 DT" />
          <Row label="Livraison · Sousse" value="7 DT" className="text-ink-subtle" />
          <Row label="Total" value="52 DT" className="border-t border-teal-200 pt-1.5 font-semibold" />
        </div>
      </div>

      <div className="flex flex-col gap-2.5 rounded-2xl border border-border p-4.5 md:flex-[1_1_220px]">
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-semibold">Commande</span>
          <Badge tone="warning">En attente</Badge>
        </div>
        <span className="text-sm text-ink-subtle">Sami B. · Sousse</span>
        <span className="text-2xl font-semibold">52 DT</span>
        <span className="flex min-h-10 items-center justify-center rounded-md bg-teal-700 text-sm font-medium text-surface">
          Confirmer la commande
        </span>
      </div>
    </div>
    </>
  );
}
