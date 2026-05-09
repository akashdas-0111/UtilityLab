import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Angle Converter - Degrees, Radians & Gradians | UtilityLab",
  description: "Convert angular measurements instantly between degrees, radians, gradians, and more. Essential for trigonometry, geometry, and engineering.",
  keywords: "angle converter, degrees to radians, radians to degrees, gradians converter, math tools, geometry calculator",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
