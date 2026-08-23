import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import matter from "gray-matter";

const root = path.join(process.cwd(), "content", "posts");

function slugs(locale) {
  return fs
    .readdirSync(path.join(root, locale))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function load(locale, slug) {
  const raw = fs.readFileSync(path.join(root, locale, `${slug}.mdx`), "utf8");
  return matter(raw);
}

test("each locale ships matching slugs", () => {
  assert.deepEqual(slugs("pt").sort(), slugs("en").sort());
});

test("front matter includes title, date, category and tags", () => {
  for (const locale of ["pt", "en"]) {
    for (const slug of slugs(locale)) {
      const { data, content } = load(locale, slug);
      assert.ok(data.title);
      assert.match(String(data.date), /^\d{4}-\d{2}-\d{2}$/);
      assert.ok(data.category);
      assert.ok(Array.isArray(data.tags) && data.tags.length > 0);
      assert.ok(content.trim().length > 40);
    }
  }
});

test("RSS routes exist in the app", () => {
  assert.ok(fs.existsSync(path.join(process.cwd(), "app", "rss.xml", "route.ts")));
  assert.ok(fs.existsSync(path.join(process.cwd(), "app", "rss-pt.xml", "route.ts")));
});
