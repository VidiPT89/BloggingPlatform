"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { Post } from "@/lib/posts";
import { useI18n } from "./I18nProvider";
import { LocalizedCopy } from "./LocalizedCopy";

function formatDate(date: string, locale: "pt" | "en") {
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-PT" : "en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function DualPost({
  pt,
  en,
  bodyPt,
  bodyEn,
  relatedPt,
  relatedEn,
}: {
  pt: Post | null;
  en: Post | null;
  bodyPt: ReactNode;
  bodyEn: ReactNode;
  relatedPt: Post[];
  relatedEn: Post[];
}) {
  const { locale, t } = useI18n();
  const post = (locale === "pt" ? pt : en) ?? pt ?? en;
  const body = (locale === "pt" ? bodyPt : bodyEn) ?? bodyPt ?? bodyEn;
  const related = (locale === "pt" ? relatedPt : relatedEn).length
    ? locale === "pt"
      ? relatedPt
      : relatedEn
    : relatedPt.length
      ? relatedPt
      : relatedEn;

  if (!post) return null;

  return (
    <>
      <p className="mt-8 text-xs uppercase tracking-[0.24em] text-amber">{post.category}</p>
      <h1 className="mt-3 font-display text-5xl leading-[1.05] md:text-6xl">{post.title}</h1>
      <p className="mt-5 text-lg text-ink/70">{post.excerpt}</p>
      <p className="mt-4 text-sm text-ink/50">
        {t("published")} {formatDate(post.date, locale)} · {post.readingMinutes} {t("minutes")}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="text-sm text-ember">
            #{tag}
          </Link>
        ))}
      </div>
      <div className="mt-12">{body}</div>
      {related.length > 0 && (
        <section className="mt-16">
          <LocalizedCopy k="related" as="h1" className="font-display text-3xl" />
          <ul className="mt-5 space-y-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/posts/${item.slug}`} className="text-lg text-ember hover:text-amber">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
