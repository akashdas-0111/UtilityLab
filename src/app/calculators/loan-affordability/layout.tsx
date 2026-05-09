import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Affordability Calculator - How Much Can You Borrow? | UtilityLab",
  description: "Determine how much you can afford to borrow based on your income, debts, and desired monthly payment. Calculate your maximum loan amount instantly.",
  keywords: "loan affordability, how much can i borrow, mortgage affordability, car loan calculator, DTI ratio",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
