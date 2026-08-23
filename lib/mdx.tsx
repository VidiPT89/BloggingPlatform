import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import type { ReactNode } from "react";

const components = {
  h2: (props: { children?: ReactNode }) => (
    <h2 className="mt-12 mb-4 font-display text-3xl text-ink" {...props} />
  ),
  h3: (props: { children?: ReactNode }) => (
    <h3 className="mt-8 mb-3 font-display text-2xl text-ink" {...props} />
  ),
  p: (props: { children?: ReactNode }) => (
    <p className="mb-5 text-lg leading-8 text-ink/82" {...props} />
  ),
  ul: (props: { children?: ReactNode }) => (
    <ul className="mb-5 list-disc space-y-2 pl-6 text-lg text-ink/82" {...props} />
  ),
  ol: (props: { children?: ReactNode }) => (
    <ol className="mb-5 list-decimal space-y-2 pl-6 text-lg text-ink/82" {...props} />
  ),
  a: (props: { href?: string; children?: ReactNode }) => (
    <a className="text-ember underline decoration-amber/50 underline-offset-4" {...props} />
  ),
  blockquote: (props: { children?: ReactNode }) => (
    <blockquote
      className="my-8 border-l-2 border-ember pl-5 font-display text-2xl italic text-amber"
      {...props}
    />
  ),
  pre: (props: { children?: ReactNode }) => (
    <pre className="my-8 overflow-x-auto rounded-sm border border-line bg-void p-5 text-sm" {...props} />
  ),
  code: (props: { children?: ReactNode; className?: string }) => {
    if (props.className) return <code {...props} />;
    return (
      <code className="rounded-sm bg-paper px-1.5 py-0.5 text-[0.9em] text-amber" {...props} />
    );
  },
};

export async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: "github-dark-default",
              keepBackground: false,
            },
          ],
        ],
      },
    },
  });
  return content;
}
