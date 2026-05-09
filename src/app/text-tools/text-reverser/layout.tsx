import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Reverser - Flip & Mirror Your Text | UtilityLab",
  description: "Instantly reverse text, words, or characters. Create mirrored messages, upside-down text, and more with our fun and professional text manipulation tool.",
  keywords: "text reverser, reverse text online, mirror text, flip text, upside down text, text manipulation, fun tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
