import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Whitespace Remover | Clean Extra Spaces & Line Breaks | UtilityLab",
  description: "Remove extra spaces, all spaces, or line breaks from your text instantly. Real-time preview and one-click copy. Private and free online text tool.",
};

export default function WhitespaceRemoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
