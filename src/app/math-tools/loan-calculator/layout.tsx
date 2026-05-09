import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan & Mortgage Calculator - Plan Your Finances | UtilityLab",
  description: "Calculate monthly payments, total interest, and payoff schedules for any loan or mortgage. Professional financial planning tools for homebuyers and investors.",
  keywords: "loan calculator, mortgage calculator, monthly payment, interest rate, financial planning, house loan, car loan, debt payoff",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
