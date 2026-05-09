import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markdown to HTML Converter - Instant Web Publishing | UtilityLab",
  description: "Convert Markdown syntax into clean, valid HTML code instantly. Preview your results in real-time and export for your blog, website, or documentation.",
  keywords: "markdown to html, md to html, markdown editor, web developer tools, content converter, blogging tools, markdown preview",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
