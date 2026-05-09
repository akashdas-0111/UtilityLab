import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equation Solver - Solve Linear & Quadratic Equations | UtilityLab",
  description: "Solve algebraic equations instantly with our professional math tool. Support for linear (ax + b = c) and quadratic (ax² + bx + c = 0) equations with detailed roots.",
  keywords: "equation solver, solve quadratic, linear equation solver, algebra tools, quadratic formula, math solver, education tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
