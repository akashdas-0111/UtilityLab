import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Cropper - Professional Crop & Edit | UtilityLab",
  description: "Crop your images with precision using our interactive tool. Support for common aspect ratios, zoom, rotate, and multiple export formats.",
  keywords: "image cropper, crop photo, photo editor, aspect ratio tool, online image cropper, social media photo tool, designer tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
