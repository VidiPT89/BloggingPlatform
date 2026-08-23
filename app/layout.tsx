import type { Metadata } from "next";
import { Barlow_Condensed, Karla } from "next/font/google";
import { I18nProvider } from "@/components/I18nProvider";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const sans = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Vidi Notes",
    template: "%s · Vidi Notes",
  },
  description: "MDX journal with tags, categories, ISR, RSS and Giscus comments.",
  openGraph: {
    title: "Vidi Notes",
    siteName: "Vidi Notes",
    type: "website",
  },
  authors: [{ name: "David Arsénio Martins", url: "https://ividi.dev/" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen antialiased" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
        <div className="grain" />
        <I18nProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </I18nProvider>
      </body>
    </html>
  );
}
