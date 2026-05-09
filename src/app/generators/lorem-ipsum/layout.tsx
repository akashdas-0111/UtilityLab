import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator - Placeholder Text Tool | UtilityLab",
  description: "Generate professional placeholder text for your design and web projects. Customizable paragraphs, words, and lists with optional HTML formatting.",
  keywords: "lorem ipsum generator, placeholder text, filler text, dummy text, design tools, web development tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
