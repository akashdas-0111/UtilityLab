import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Extractor - Get Palettes from Images | UtilityLab",
  description: "Extract beautiful color palettes and dominant hex codes from any image instantly. Perfect for designers, artists, and web developers.",
  keywords: "color extractor, image palette generator, hex code finder, design tools, color picker from image, brand colors",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
