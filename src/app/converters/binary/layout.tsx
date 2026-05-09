import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Binary Converter - Decimal, Hex & Octal | UtilityLab",
  description: "Convert numbers between binary, decimal, hexadecimal, and octal bases instantly. Perfect for programmers and computer science students.",
  keywords: "binary converter, decimal to binary, hex to binary, binary to decimal, base converter, number systems",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
