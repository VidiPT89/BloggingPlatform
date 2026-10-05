import assert from "node:assert/strict";
import { test } from "node:test";
import { getAllPosts, getAllTags, readingMinutesFromContent, relatedPosts, type Post } from "../lib/posts";
import { buildRss } from "../lib/rss";

const post = (over: Partial<Post>): Post => ({
  slug: "a",
  locale: "en",
  title: "A",
  excerpt: "",
  date: "2026-01-01",
  category: "Light",
  tags: [],
  featured: false,
  readingMinutes: 1,
  content: "",
  ...over,
});

test("reading time is words / 200, never below one minute", () => {
  assert.equal(readingMinutesFromContent(""), 1);
  assert.equal(readingMinutesFromContent("word ".repeat(150)), 1);
  assert.equal(readingMinutesFromContent("word ".repeat(500)), 3);
  assert.equal(readingMinutesFromContent("  spaced\n\nout   words  "), 1);
});

test("posts are listed newest first", () => {
  for (const locale of ["pt", "en"] as const) {
    const dates = getAllPosts(locale).map((item) => item.date);
    assert.ok(dates.length > 0);
    assert.deepEqual(dates, [...dates].sort().reverse());
  }
});

test("tags are listed once each, in alphabetical order", () => {
  const tags = getAllTags("en");
  assert.equal(new Set(tags).size, tags.length);
  assert.deepEqual(tags, [...tags].sort((a, b) => a.localeCompare(b)));
});

test("related posts never include the post itself and prefer shared tags", () => {
  const [first] = getAllPosts("en");
  const related = relatedPosts(first, 5);
  assert.ok(related.every((item) => item.slug !== first.slug));
  const score = (item: Post) =>
    Number(item.category === first.category) + item.tags.filter((tag) => first.tags.includes(tag)).length;
  const scores = related.map(score);
  assert.deepEqual(scores, [...scores].sort((a, b) => b - a));
});

test("the RSS feed escapes categories and keeps CDATA intact", () => {
  const xml = buildRss(
    [post({ slug: "x", title: "Before ]]> after", excerpt: "Fish & chips", category: "Code & Craft" })],
    "en",
  );
  assert.ok(xml.includes("<category>Code &amp; Craft</category>"));
  assert.equal(xml.includes("<category>Code & Craft</category>"), false);
  // "]]>" inside a title would close the CDATA section early; it must be split.
  assert.equal((xml.match(/<title><!\[CDATA\[/g) ?? []).length, 1);
  assert.ok(xml.includes("Before ]]]]><![CDATA[> after"));
});

test("the RSS feed carries the language and RFC 822 dates", () => {
  const xml = buildRss([post({ date: "2026-03-05" })], "pt");
  assert.ok(xml.includes("<language>pt-PT</language>"));
  assert.ok(xml.includes("<pubDate>Thu, 05 Mar 2026 00:00:00 GMT</pubDate>"));
});
