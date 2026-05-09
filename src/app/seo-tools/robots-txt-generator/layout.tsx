import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Robots.txt Generator - Control Search Engine Crawling | UtilityLab",
  description: "Create a custom robots.txt file for your website. Control which parts of your site search engines can crawl and index for better SEO and security.",
  keywords: "robots.txt generator, seo tools, crawl control, sitemap tool, web developer tools, digital marketing, website security",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
