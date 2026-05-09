import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roman Numerals Converter - Translate Numbers & Letters | UtilityLab",
  description: "Convert integers to Roman numerals and Roman numerals back to numbers instantly. Includes a complete reference table for standard Roman numeral symbols.",
  keywords: "roman numerals, roman converter, numbers to roman, roman to decimal, latin numbers, history tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
