import { buildRss } from "@/lib/rss";
import { getAllPosts } from "@/lib/posts";

export const revalidate = 3600;

export function GET() {
  return new Response(buildRss(getAllPosts("pt"), "pt"), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
