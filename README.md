# 📰 Blogging Platform

> A bilingual MDX journal with Incremental Static Regeneration, tags, categories, dynamic Open Graph images, RSS and Giscus comments, painted in the ividi.dev palette (black, burnt orange, amber).

[![CI](https://github.com/VidiPT89/BloggingPlatform/actions/workflows/ci.yml/badge.svg)](https://github.com/VidiPT89/BloggingPlatform/actions/workflows/ci.yml)

Vidi Notes is a Next.js App Router press desk. Each note lives as an MDX file, ships with syntax highlighting, and is rebuilt on a one-hour ISR window. The UI is European Portuguese / English, with a language toggle remembered in `localStorage`.

## ✨ Main Features

- 📝 **MDX posts** — Markdown plus JSX, with Shiki syntax highlighting
- 🏷️ **Tags and categories** — archive pages generated from front matter
- 🔍 **SEO** — per-note meta tags, sitemap, robots and a dynamic OG poster
- 📡 **RSS** — `/rss.xml` (English) and `/rss-pt.xml` (Portuguese)
- 💬 **Comments** — Giscus (GitHub Discussions), optional via environment
- 🌍 **PT / EN toggle** — remembered in `localStorage`
- ♻️ **ISR** — `revalidate = 3600` on journal routes

## 🛠️ Technologies

![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat&logo=nextdotjs&logoColor=white)
![MDX](https://img.shields.io/badge/MDX-3-1B1F24?style=flat&logo=mdx&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38BDF8?style=flat&logo=tailwindcss&logoColor=white)

| Category | Technology | Purpose |
|----------|-----------|---------|
| **App** | Next.js 15 App Router | Pages, ISR, metadata, OG images |
| **Content** | MDX + gray-matter | Notes on disk, one file per locale |
| **Highlight** | rehype-pretty-code + Shiki | Code fences |
| **Motion** | Framer Motion | Hero and card reveals |
| **Comments** | Giscus | Optional GitHub Discussions |

## 🧱 Project Structure

```text
BloggingPlatform/
├── app/
│   ├── page.tsx
│   ├── posts/[slug]/page.tsx
│   ├── tags/[tag]/page.tsx
│   ├── categories/[category]/page.tsx
│   ├── og/[slug]/route.tsx
│   ├── rss.xml/route.ts
│   └── sitemap.ts
├── components/
├── content/posts/{pt,en}/
├── lib/
├── tests/
├── LICENSE
└── README.md
```

## ▶️ How to Run

### Prerequisites

- **Node.js** 18+

### Installation

```bash
git clone https://github.com/VidiPT89/BloggingPlatform.git
cd BloggingPlatform
npm install
cp .env.example .env.local
```

Giscus is optional. Leave the `NEXT_PUBLIC_GISCUS_*` keys empty to hide the widget, or fill them from [giscus.app](https://giscus.app) after enabling Discussions on this repository.

```bash
npm test
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📖 Usage

Add a note as `content/posts/en/<slug>.mdx` and the Portuguese twin as `content/posts/pt/<slug>.mdx`:

```md
---
title: Title
excerpt: One line for cards and SEO
date: "2026-08-20"
category: Engineering
tags: ["nextjs", "mdx"]
featured: true
---

Prose and fenced code go here.
```

Matching slugs keep the language toggle on the same note.

## 🧩 Project Highlights

ISR keeps the journal static between edits. Open Graph posters are painted at `/og/<slug>` on a black field with an ember rule. RSS items come from English notes by default; Portuguese subscribers can use `/rss-pt.xml`.

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more information.

---

Developed by **David Arsénio Martins**  
🌐 [ividi.dev](https://ividi.dev/) · 💻 [github.com/VidiPT89](https://github.com/VidiPT89/)
