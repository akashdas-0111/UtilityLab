import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SVG to PNG Converter - Vector to Raster | UtilityLab",
  description: "Convert SVG vector files to high-resolution PNG images instantly. Perfect for designers and developers needing raster assets from vectors. 100% browser-based.",
  keywords: "svg to png, vector converter, svg to image, rasterize svg, designer tools, web developer tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
