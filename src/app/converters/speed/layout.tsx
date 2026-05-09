import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speed Converter - KM/H, MPH, Knots & Mach | UtilityLab",
  description: "Convert speeds between kilometers per hour, miles per hour, knots, meters per second, and Mach. Essential for travel, aviation, and physics.",
  keywords: "speed converter, kmh to mph, knots to kmh, meters per second to mph, aviation tools, velocity calculator",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
