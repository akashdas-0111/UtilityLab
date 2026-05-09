import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EMI Calculator - Home, Car & Personal Loan EMI | UtilityLab",
  description: "Calculate your monthly loan EMI (Equated Monthly Installments) for home loans, car loans, or personal loans. View detailed amortization schedules and interest breakdowns.",
  keywords: "EMI calculator, loan calculator, home loan EMI, car loan EMI, amortization schedule",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
