import { buildRss } from "@/lib/rss";
import { getAllPosts } from "@/lib/posts";

export const revalidate = 3600;

export function GET() {
  const posts = getAllPosts("en");
  return new Response(buildRss(posts, "en"), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
