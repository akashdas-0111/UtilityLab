import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keyword Density Checker - SEO Content Analysis | UtilityLab",
  description: "Analyze the keyword frequency and density of your content instantly. Optimize your writing for search engines by identifying overused or missing keywords.",
  keywords: "keyword density checker, seo tools, content analysis, word frequency, keyword optimization, digital marketing, writer tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
