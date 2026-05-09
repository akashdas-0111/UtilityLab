import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GST Calculator - CGST, SGST & IGST Calculation | UtilityLab",
  description: "Calculate Goods and Services Tax (GST) for any amount. Supports adding or removing GST with standard Indian tax slabs (5%, 12%, 18%, 28%).",
  keywords: "GST calculator, CGST, SGST, IGST, Indian tax calculator, business tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
