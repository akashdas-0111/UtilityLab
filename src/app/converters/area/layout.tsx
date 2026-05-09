import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Area Converter - Acres, Hectares & Sq Meters | UtilityLab",
  description: "Convert land and floor area measurements between acres, hectares, square meters, square feet, and more. Perfect for real estate and gardening.",
  keywords: "area converter, sq meters to sq feet, acres to hectares, land measurement, floor area calculator, unit converter",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
