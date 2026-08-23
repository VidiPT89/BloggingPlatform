import { Archive } from "@/components/Archive";
import { getAllTags, postsByTag } from "@/lib/posts";

export const revalidate = 3600;

export function generateStaticParams() {
  const tags = new Set([...getAllTags("pt"), ...getAllTags("en")]);
  return [...tags].map((tag) => ({ tag }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return (
    <Archive
      kind="tag"
      value={decoded}
      postsByLocale={{
        pt: postsByTag("pt", decoded),
        en: postsByTag("en", decoded),
      }}
    />
  );
}
