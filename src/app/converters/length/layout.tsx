import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Length & Distance Converter - Metric & Imperial | UtilityLab",
  description: "Convert lengths and distances between meters, feet, inches, kilometers, miles, and more. Precise unit conversion for construction, travel, and science.",
  keywords: "length converter, meters to feet, inches to cm, km to miles, distance converter, unit conversion, construction tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
