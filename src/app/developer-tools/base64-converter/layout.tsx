import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder | Convert Text & Files Online | UtilityLab",
  description: "Professional Base64 converter with support for UTF-8, URL-safe mode, file-to-Base64 conversion, and live image previews. Fast, secure, and private.",
};

export default function Base64ConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
