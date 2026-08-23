"use client";

import Link from "next/link";
import type { Post } from "@/lib/posts";
import { useI18n } from "./I18nProvider";

export function Archive({
  kind,
  value,
  postsByLocale,
}: {
  kind: "tag" | "category";
  value: string;
  postsByLocale: { pt: Post[]; en: Post[] };
}) {
  const { locale, t } = useI18n();
  const posts = postsByLocale[locale];
  const empty = kind === "tag" ? t("emptyTag") : t("emptyCategory");

  return (
    <div className="ember-field mx-auto max-w-4xl px-5 py-16">
      <p className="text-xs uppercase tracking-[0.28em] text-amber">
        {kind === "tag" ? t("tags") : t("categories")}
      </p>
      <h1 className="mt-3 font-display text-5xl">{kind === "tag" ? `#${value}` : value}</h1>
      <div className="mt-10 space-y-5">
        {posts.length === 0 && <p className="text-ink/60">{empty}</p>}
        {posts.map((post) => (
          <article key={post.slug} className="border border-line bg-paper/60 p-5">
            <Link href={`/posts/${post.slug}`} className="font-display text-3xl hover:text-ember">
              {post.title}
            </Link>
            <p className="mt-2 text-ink/70">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
