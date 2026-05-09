import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RegEx Generator - Visual Regular Expression Builder | UtilityLab",
  description: "Build complex regular expressions visually without writing code. Use presets for emails, dates, and URLs, or create custom patterns with our intuitive rule builder.",
  keywords: "regex generator, regular expression builder, regex tester, visual regex, developer tools, pattern matching, coding tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
