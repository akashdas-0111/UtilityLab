import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paragraph Generator | Semi-Realistic Placeholder Text | UtilityLabs",
  description: "Generate structured, professional-looking placeholder paragraphs with custom topics. Perfect for web design, mockups, and testing. Fast and free online tool.",
};

export default function ParagraphGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
