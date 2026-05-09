import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder - String & File Converter | UtilityLab",
  description: "Quickly encode or decode strings and files to/from Base64 format. Perfect for web developers and data handling. Secure and client-side processing.",
  keywords: "base64 encoder, base64 decoder, string to base64, file to base64, developer tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
