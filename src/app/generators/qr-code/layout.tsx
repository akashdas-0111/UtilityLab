import { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Generator - Create Custom QR Codes | UtilityLab",
  description: "Generate high-quality, custom QR codes for URLs, text, and contact info. Personalize with colors, logos, and multiple export formats including PNG and SVG.",
  keywords: "qr code generator, custom qr code, create qr code, wifi qr code, qr scanner tool, designer tools, branding tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
