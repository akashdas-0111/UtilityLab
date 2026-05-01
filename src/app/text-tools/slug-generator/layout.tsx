import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slug Generator | Create SEO-Friendly URL Slugs | UtilityLabs",
  description: "Instantly convert text, titles, and headlines into clean, URL-friendly slugs. Support for hyphens and underscores. Free, private, and fast online tool.",
};

export default function SlugGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
