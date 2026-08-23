import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DualPost } from "@/components/DualPost";
import { GiscusComments } from "@/components/GiscusComments";
import { LocalizedCopy } from "@/components/LocalizedCopy";
import { getPost, getSlugs, relatedPosts, siteUrl } from "@/lib/posts";
import { renderMdx } from "@/lib/mdx";

export const revalidate = 3600;

export function generateStaticParams() {
  const slugs = new Set([...getSlugs("pt"), ...getSlugs("en")]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("en", slug) ?? getPost("pt", slug);
  if (!post) return {};
  const url = `${siteUrl()}/posts/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      images: [`/og/${slug}`],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`/og/${slug}`],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const en = getPost("en", slug);
  const pt = getPost("pt", slug);
  if (!en && !pt) notFound();

  const bodyPt = pt ? await renderMdx(pt.content) : null;
  const bodyEn = en ? await renderMdx(en.content) : null;

  return (
    <article className="ember-field mx-auto max-w-3xl px-5 py-16">
      <Link href="/" className="text-sm text-ember hover:text-amber">
        <LocalizedCopy k="back" />
      </Link>
      <DualPost
        pt={pt}
        en={en}
        bodyPt={bodyPt}
        bodyEn={bodyEn}
        relatedPt={pt ? relatedPosts(pt) : []}
        relatedEn={en ? relatedPosts(en) : []}
      />
      <GiscusComments term={slug} />
    </article>
  );
}
