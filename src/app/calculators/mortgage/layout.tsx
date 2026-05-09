import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Calculator - Estimate Monthly Payments | UtilityLab",
  description: "Calculate your monthly mortgage payments including taxes, insurance, and interest. Plan your home purchase with our detailed amortization schedules.",
  keywords: "mortgage calculator, home loan, property tax, escrow, amortization, home buying tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
