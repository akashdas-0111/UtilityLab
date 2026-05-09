import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Statistics Calculator - Detailed Data Analysis | UtilityLab",
  description: "Calculate mean, median, mode, standard deviation, and variance for any dataset instantly. Professional statistical analysis tools for researchers and students.",
  keywords: "statistics calculator, mean median mode, standard deviation calculator, variance, math tools, data analysis, research tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
