import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compound Interest Calculator - Power of Compounding | UtilityLab",
  description: "Calculate how your money grows over time with compound interest. Visualize the impact of compounding frequency and regular contributions on your wealth.",
  keywords: "compound interest calculator, wealth growth, compounding, financial planning, investment tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
