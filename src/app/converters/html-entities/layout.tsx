import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML Entities Encoder & Decoder - Secure Your Code | UtilityLab",
  description: "Quickly encode or decode HTML entities in your strings. Prevent XSS and ensure proper character rendering in web applications. Instant and client-side.",
  keywords: "html entities, html encoder, html decoder, entity converter, web security tools, character encoding",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
