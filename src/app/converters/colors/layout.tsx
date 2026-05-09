import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Converter - HEX, RGB, HSL & CMYK | UtilityLab",
  description: "Convert color codes between different formats instantly. Design beautiful palettes and check contrast ratios for accessibility. Perfect for web designers.",
  keywords: "color converter, rgb to hex, hex to hsl, cmyk converter, color palette generator, design tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
