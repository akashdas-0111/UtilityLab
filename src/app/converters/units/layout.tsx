import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unit Converter - Length, Weight, Area & More | UtilityLab",
  description: "Convert between hundreds of different units across length, mass, volume, area, temperature, speed, and data size. Accurate and easy to use.",
  keywords: "unit converter, metric to imperial, length converter, weight converter, volume converter, area converter",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
