import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Resizer - Precise Image Scaling | UtilityLab",
  description: "Resize your images with professional precision. Lock aspect ratio, choose custom dimensions, and export in multiple formats including PNG, JPG, and WebP.",
  keywords: "image resizer, scale image, resize photo, photo dimension tool, bulk image resizer, web development tools, designer tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
