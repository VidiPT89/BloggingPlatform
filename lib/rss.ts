import type { Post } from "./posts";
import { siteUrl } from "./posts";

function escapeXml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// A "]]>" inside the text would end the CDATA section early, so it is split across two sections.
function cdata(text: string) {
  return `<![CDATA[${text.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

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
      <title>${cdata(post.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${cdata(post.excerpt)}</description>
      <category>${escapeXml(post.category)}</category>
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
