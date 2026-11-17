"use client";

import { useState } from "react";

const languages = [
  { code: "fr", label: "FR" },
  { code: "ar", label: "العربية" },
] as const;

/**
 * FR / العربية switch. UI only for now.
 * TODO(i18n): switch the locale (and dir="rtl") when Arabic copy exists.
 * Light on teal below lg, outlined on white from lg up.
 */
export function LanguageToggle() {
  const [lang, setLang] = useState<"fr" | "ar">("fr");
  return (
    <div
      role="group"
      aria-label="Langue"
      className="flex gap-1 rounded-full border border-white/35 p-1 text-[13px] lg:border-border"
    >
      {languages.map((l) => {
        const active = lang === l.code;
        return (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            aria-pressed={active}
            onClick={() => setLang(l.code)}
            className={`min-h-8 cursor-pointer rounded-full px-3 ${l.code === "ar" ? "text-[15px] leading-none" : "font-semibold"} ${
              active
                ? "bg-white/15 text-surface lg:bg-teal-100 lg:text-teal-700"
                : "text-on-teal hover:bg-white/10 lg:text-ink-subtle lg:hover:bg-surface-alt"
            }`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
