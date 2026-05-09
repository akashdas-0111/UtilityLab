import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unit Converter - Professional Universal Scaling | UtilityLab",
  description: "Convert between hundreds of units including length, mass, temperature, and data instantly. The ultimate professional tool for scientific and everyday scaling.",
  keywords: "unit converter, measurement converter, length conversion, weight converter, temperature conversion, data units, scientific tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
