import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grade Calculator - Calculate Final Exam Score & GPA | UtilityLab",
  description: "Find out what score you need on your final exam to reach your goal grade. Calculate your weighted average and semester GPA instantly.",
  keywords: "grade calculator, final exam calculator, GPA calculator, weighted grade, academic tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
