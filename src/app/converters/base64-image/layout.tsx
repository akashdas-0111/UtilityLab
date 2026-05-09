import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 to Image Converter - Decode Visual Data | UtilityLab",
  description: "Convert Base64 strings back into high-quality images instantly. Preview and download your visual data as PNG or JPEG files with our professional decoder.",
  keywords: "base64 to image, decode base64, base64 string to png, image decoder, data uri to image, web development tools, designer tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
