import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sitemap Generator - Build Professional XML Sitemaps | UtilityLab",
  description: "Create an SEO-optimized XML sitemap for your website instantly. Help search engines index your pages more efficiently with our professional generator.",
  keywords: "sitemap generator, xml sitemap, seo tools, website crawler, google sitemap, web developer tools, digital marketing",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
