"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Post } from "@/lib/posts";
import { useI18n } from "./I18nProvider";
import { EmberOrb } from "./SiteChrome";

function formatDate(date: string, locale: "pt" | "en") {
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-PT" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function JournalHome({
  postsByLocale,
}: {
  postsByLocale: { pt: Post[]; en: Post[] };
}) {
  const { locale, t } = useI18n();
  const posts = postsByLocale[locale];
  const featured = posts.filter((post) => post.featured);
  const tags = [...new Set(posts.flatMap((post) => post.tags))];
  const categories = [...new Set(posts.map((post) => post.category))];

  return (
    <div className="ember-field relative">
      <EmberOrb />
      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-8 pt-16 lg:grid-cols-[1.2fr_0.8fr] lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.32em] text-amber">{t("heroKicker")}</p>
          <h1 className="mt-4 max-w-xl font-display text-5xl leading-[1.05] text-ink md:text-7xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-ink/70">{t("heroLead")}</p>
          <a
            href="#notes"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-ember px-5 py-3 text-sm font-semibold text-void"
          >
            {t("readJournal")}
            <span aria-hidden>↓</span>
          </a>
        </motion.div>
        <motion.aside
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="self-end border border-line bg-paper/80 p-6"
        >
          <p className="text-xs uppercase tracking-[0.24em] text-ember">{t("featured")}</p>
          <ul className="mt-4 space-y-4">
            {featured.map((post) => (
              <li key={post.slug}>
                <Link href={`/posts/${post.slug}`} className="group block">
                  <p className="text-xs text-amber">{formatDate(post.date, locale)}</p>
                  <p className="font-display text-2xl group-hover:text-ember">{post.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </motion.aside>
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap gap-6 border-y border-line py-6 text-sm text-ink/70">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-amber">{t("categories")}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/categories/${encodeURIComponent(category)}`}
                  className="border border-line px-3 py-1 hover:border-ember hover:text-ember"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-amber">{t("tags")}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="text-ember hover:text-amber"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="notes" className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-xs uppercase tracking-[0.28em] text-amber">{t("latest")}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.05 }}
              className="group border border-line bg-paper/60 p-6 hover:border-ember"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-amber">{post.category}</p>
              <h2 className="mt-3 font-display text-3xl leading-tight group-hover:text-ember">
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-3 text-ink/70">{post.excerpt}</p>
              <p className="mt-5 text-xs text-ink/50">
                {formatDate(post.date, locale)} · {post.readingMinutes} {t("minutes")}
              </p>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
