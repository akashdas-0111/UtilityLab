import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tip Calculator - Quickly Split Bills & Tips | UtilityLab",
  description: "Calculate tips and split bills among friends easily. Perfect for dining out, bar tabs, and group activities. Fast, accurate, and works on any device.",
  keywords: "tip calculator, bill splitter, dining tools, restaurant tip, gratuity calculator",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
