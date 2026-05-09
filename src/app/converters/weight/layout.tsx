import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weight & Mass Converter - LBS, KG & Grams | UtilityLab",
  description: "Convert weights and mass measurements between kilograms, pounds, grams, ounces, stones, and tons. Fast, accurate, and easy to use.",
  keywords: "weight converter, lbs to kg, kg to lbs, grams to ounces, stone to kg, mass converter, fitness tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
