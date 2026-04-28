import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Text Generator | Placeholder Text & Lorem Ipsum | UtilityLab",
  description: "Generate random words, sentences, and paragraphs for your design mockups and testing. Customizable length and one-click copy. Fast and free online tool.",
};

export default function RandomTextGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
