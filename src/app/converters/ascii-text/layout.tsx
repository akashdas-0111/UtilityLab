import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ASCII to Text Converter - Decode Character Encodings | UtilityLab",
  description: "Convert ASCII codes to text and vice versa instantly. Supports decimal, hexadecimal, binary, and octal formats for comprehensive character decoding.",
  keywords: "ascii to text, text to ascii, binary to text, hex to text, character encoding, developer tools, ascii table",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
