"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LanguageToggle } from "./LanguageToggle";
import { useI18n } from "./I18nProvider";

export function SiteHeader() {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-void/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="group">
          <p className="text-[11px] uppercase tracking-[0.28em] text-amber">{t("masthead")}</p>
          <p className="font-display text-2xl text-ink group-hover:text-ember">{t("brand")}</p>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/#notes" className="text-ink/70 hover:text-ember">
            {t("allPosts")}
          </Link>
          <Link href="/rss.xml" className="text-ink/70 hover:text-ember">
            {t("rss")}
          </Link>
          <LanguageToggle />
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-xl">{t("footerCredit")}</p>
          <p className="mt-2 text-sm text-ink/60">{t("tagline")}</p>
        </div>
        <div className="flex gap-5 text-sm">
          <a className="text-ember hover:text-amber" href="https://ividi.dev/">
            ividi.dev
          </a>
          <a className="text-ember hover:text-amber" href="https://github.com/VidiPT89/">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export function EmberOrb() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute right-[8%] top-24 hidden h-40 w-40 rounded-full bg-ember/30 blur-3xl md:block"
      animate={{ y: [0, -18, 0], opacity: [0.35, 0.6, 0.35] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
