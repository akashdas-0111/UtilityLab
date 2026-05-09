import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Morse Code Converter - Translate Text to Dots & Dashes | UtilityLab",
  description: "Translate text to Morse code and decode Morse code back to plain text instantly. Includes a handy Morse code chart and audio/visual simulation support.",
  keywords: "morse code converter, text to morse, morse to text, ham radio tools, signal conversion, telegraph converter",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
