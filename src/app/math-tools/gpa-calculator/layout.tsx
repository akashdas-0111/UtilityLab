import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GPA Calculator - Calculate Semester Grades Fast | UtilityLab",
  description: "Track your academic progress with our professional GPA calculator. Easily add courses, credits, and grades to calculate your semester or cumulative GPA instantly.",
  keywords: "gpa calculator, grade point average, semester gpa, college tools, student tools, academic progress tracker, grades calculator",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
