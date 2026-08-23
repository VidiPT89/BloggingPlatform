import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "./i18n";

export type PostMeta = {
  slug: string;
  locale: Locale;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  featured?: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & {
  content: string;
};

const ROOT = path.join(process.cwd(), "content", "posts");

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function readingMinutesFromContent(content: string) {
  return Math.max(1, Math.round(countWords(content) / 200));
}

export function contentDir(locale: Locale) {
  return path.join(ROOT, locale);
}

export function getSlugs(locale: Locale): string[] {
  const dir = contentDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPost(locale: Locale, slug: string): Post | null {
  const file = path.join(contentDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
  return {
    slug,
    locale,
    title: String(data.title ?? slug),
    excerpt: String(data.excerpt ?? ""),
    date: String(data.date ?? "2026-01-01"),
    category: String(data.category ?? "Notes"),
    tags,
    featured: Boolean(data.featured),
    readingMinutes: readingMinutesFromContent(content),
    content,
  };
}

export function getAllPosts(locale: Locale): Post[] {
  return getSlugs(locale)
    .map((slug) => getPost(locale, slug))
    .filter((post): post is Post => Boolean(post))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllTags(locale: Locale): string[] {
  const set = new Set<string>();
  for (const post of getAllPosts(locale)) {
    for (const tag of post.tags) set.add(tag);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}

export function getAllCategories(locale: Locale): string[] {
  const set = new Set<string>();
  for (const post of getAllPosts(locale)) set.add(post.category);
  return [...set].sort((a, b) => a.localeCompare(b));
}

export function postsByTag(locale: Locale, tag: string): Post[] {
  return getAllPosts(locale).filter((post) =>
    post.tags.some((item) => item.toLowerCase() === tag.toLowerCase()),
  );
}

export function postsByCategory(locale: Locale, category: string): Post[] {
  return getAllPosts(locale).filter(
    (post) => post.category.toLowerCase() === category.toLowerCase(),
  );
}

export function relatedPosts(post: Post, limit = 2): Post[] {
  return getAllPosts(post.locale)
    .filter((item) => item.slug !== post.slug)
    .sort((a, b) => {
      const aScore =
        Number(a.category === post.category) +
        a.tags.filter((tag) => post.tags.includes(tag)).length;
      const bScore =
        Number(b.category === post.category) +
        b.tags.filter((tag) => post.tags.includes(tag)).length;
      return bScore - aScore;
    })
    .slice(0, limit);
}

export function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
