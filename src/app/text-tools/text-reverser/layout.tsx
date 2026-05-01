import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Reverser | Reverse Characters & Words Online | UtilityLabs",
  description: "Reverse any text instantly. Choose between reversing entire character strings or flipping the word order. Fast, free, and private online tool.",
};

export default function TextReverserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
