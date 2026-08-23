import { JournalHome } from "@/components/JournalHome";
import { getAllPosts } from "@/lib/posts";

export const revalidate = 3600;

export default function HomePage() {
  return (
    <JournalHome
      postsByLocale={{
        pt: getAllPosts("pt"),
        en: getAllPosts("en"),
      }}
    />
  );
}
