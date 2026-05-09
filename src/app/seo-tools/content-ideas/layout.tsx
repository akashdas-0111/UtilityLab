import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Idea Generator - Spark Your Creativity | UtilityLab",
  description: "Generate viral-ready blog titles and content ideas for any keyword. Break writer's block and optimize your content strategy with our professional generator.",
  keywords: "content idea generator, blog title generator, marketing tools, seo tools, creative writing, social media ideas, digital marketing",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
