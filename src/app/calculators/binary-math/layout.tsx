import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Binary Calculator - Perform Arithmetic on Binary Numbers | UtilityLab",
  description: "Calculate binary addition, subtraction, multiplication, and division. Perform bitwise operations like AND, OR, and XOR instantly.",
  keywords: "binary calculator, binary math, bitwise operations, computer science tools, binary adder",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
