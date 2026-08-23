"use client";

import { useI18n } from "./I18nProvider";

export function LanguageToggle() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-line bg-paper p-1"
      aria-label={t("language")}
    >
      <button
        type="button"
        onClick={() => setLocale("pt")}
        className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${
          locale === "pt" ? "bg-ember text-void" : "text-ink/70"
        }`}
      >
        PT
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${
          locale === "en" ? "bg-ember text-void" : "text-ink/70"
        }`}
      >
        EN
      </button>
    </div>
  );
}
