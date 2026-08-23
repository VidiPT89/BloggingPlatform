import type { Post } from "./posts";
import { siteUrl } from "./posts";

export function buildRss(posts: Post[], locale: "pt" | "en") {
  const origin = siteUrl();
  const title = locale === "pt" ? "Vidi Notes" : "Vidi Notes";
  const description =
    locale === "pt"
      ? "Notas de código, fotografia e ofício."
      : "Notes on code, photography and craft.";

  const items = posts
    .map((post) => {
      const link = `${origin}/posts/${post.slug}`;
      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <category>${post.category}</category>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${title}</title>
    <link>${origin}</link>
    <description>${description}</description>
    <language>${locale === "pt" ? "pt-PT" : "en"}</language>
${items}
  </channel>
</rss>
`;
}
