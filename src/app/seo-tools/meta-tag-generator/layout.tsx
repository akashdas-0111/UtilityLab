import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meta Tag Generator - Optimize Your Social SEO | UtilityLab",
  description: "Generate professional meta tags for your website. Optimize your site for search engines and social media platforms like Facebook and Twitter with ease.",
  keywords: "meta tag generator, seo tools, open graph generator, twitter card generator, website metadata, social media seo, web developer tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
