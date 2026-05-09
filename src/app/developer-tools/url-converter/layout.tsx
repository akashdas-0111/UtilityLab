import { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Encoder & Decoder - Clean Your Links | UtilityLab",
  description: "Quickly encode or decode URLs to ensure they are web-safe. Convert special characters into percent-encoded format and back. Essential for web developers.",
  keywords: "url encoder, url decoder, percent encoding, uri converter, web developer tools, secure links",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
