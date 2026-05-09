import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inflation Calculator - Purchasing Power over Time | UtilityLab",
  description: "Calculate how inflation affects the purchasing power of your money. See how much your money will be worth in the future or was worth in the past.",
  keywords: "inflation calculator, purchasing power, future value, money value, financial tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
