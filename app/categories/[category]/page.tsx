import { Archive } from "@/components/Archive";
import { getAllCategories, postsByCategory } from "@/lib/posts";

export const revalidate = 3600;

export function generateStaticParams() {
  const cats = new Set([...getAllCategories("pt"), ...getAllCategories("en")]);
  return [...cats].map((category) => ({ category }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  return (
    <Archive
      kind="category"
      value={decoded}
      postsByLocale={{
        pt: postsByCategory("pt", decoded),
        en: postsByCategory("en", decoded),
      }}
    />
  );
}
