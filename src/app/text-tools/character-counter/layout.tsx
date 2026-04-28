import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Character Counter | Online Text Analysis Tool | UtilityLab",
  description: "Calculate character counts with and without spaces instantly. Perfect for SEO metadata, social media bios, and academic writing. Private, fast, and free.",
};

export default function CharacterCounterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
