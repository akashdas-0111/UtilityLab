import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI Calculator - Health & Fitness Tracker | UtilityLab",
  description: "Calculate your Body Mass Index (BMI) instantly. Track your health category and ideal weight range with our professional fitness tool.",
  keywords: "bmi calculator, body mass index, health tracker, fitness tools, weight category, ideal weight, health tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
