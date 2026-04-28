import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Counter | Free Online Writing Tool | UtilityLab",
  description: "Count words, characters, sentences, and paragraphs in real-time. Estimate reading time and improve your writing productivity with our free, private online word counter.",
};

export default function WordCounterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
