import type { MetadataRoute } from "next";
import { getSlugs, siteUrl } from "@/lib/posts";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteUrl();
  const slugs = new Set([...getSlugs("pt"), ...getSlugs("en")]);
  return [
    { url: origin, lastModified: new Date() },
    ...[...slugs].map((slug) => ({
      url: `${origin}/posts/${slug}`,
      lastModified: new Date(),
    })),
  ];
}
