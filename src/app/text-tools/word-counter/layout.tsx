import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Counter - Advanced Text Analysis Tool | UtilityLab",
  description: "Get detailed statistics on your text including word count, character count, reading time, and keyword density. Essential for SEO, writers, and students.",
  keywords: "word counter, character counter, text analysis, reading time calculator, keyword density, writing tools, seo tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
