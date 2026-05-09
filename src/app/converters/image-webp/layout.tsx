import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to WebP Converter - Optimize for Web | UtilityLab",
  description: "Convert JPG, PNG, and other image formats to WebP instantly. Optimize your website performance with smaller, high-quality images. 100% browser-based.",
  keywords: "image to webp, webp converter, image optimizer, png to webp, jpg to webp, web performance tools, bulk image conversion",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
