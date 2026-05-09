import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI Calculator - Body Mass Index & Health Category | UtilityLab",
  description: "Calculate your Body Mass Index (BMI) using metric or imperial units. Understand your weight category and get personalized health recommendations.",
  keywords: "BMI calculator, body mass index, weight category, health tools, fitness calculator",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
