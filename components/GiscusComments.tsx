"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "./I18nProvider";

export function GiscusComments({ term }: { term: string }) {
  const { locale, t } = useI18n();
  const frame = useRef<HTMLDivElement>(null);
  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  useEffect(() => {
    if (!frame.current || !repo || !repoId || !category || !categoryId) return;
    frame.current.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", "specific");
    script.setAttribute("data-term", term);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "transparent_dark");
    script.setAttribute("data-lang", locale === "pt" ? "pt" : "en");
    script.setAttribute("crossorigin", "anonymous");
    frame.current.appendChild(script);
  }, [term, locale, repo, repoId, category, categoryId]);

  return (
    <section className="mt-16 border-t border-line pt-10">
      <h2 className="font-display text-3xl">{t("comments")}</h2>
      <p className="mt-2 text-sm text-ink/60">
        {repo && repoId && category && categoryId ? t("commentsHint") : t("commentsOff")}
      </p>
      <div ref={frame} className="mt-6" />
    </section>
  );
}
