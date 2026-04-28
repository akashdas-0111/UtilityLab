import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hashtag Generator | Viral Tags for Instagram, TikTok & more | UtilityLab",
  description: "Generate optimized, platform-specific hashtags for Instagram, TikTok, LinkedIn, and Twitter. Categorized by trending, medium, and niche competition. Free and private.",
};

export default function HashtagGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
