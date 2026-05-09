import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hashtag Generator - Grow Your Social Media Reach | UtilityLab",
  description: "Boost your social media visibility with our intelligent hashtag generator. Discover popular, trending, and niche hashtags for Instagram, TikTok, and Twitter.",
  keywords: "hashtag generator, instagram hashtags, tiktok hashtags, social media tools, marketing tools, grow followers",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
