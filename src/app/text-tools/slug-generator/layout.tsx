import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slug Generator - Create SEO-Friendly URLs | UtilityLab",
  description: "Convert any text or title into a clean, SEO-friendly URL slug. Customize delimiters and remove special characters for perfect blog and web links.",
  keywords: "slug generator, url slug, seo tools, permalink generator, clean url, web development tools, blog tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
