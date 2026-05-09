import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Currency Converter - Real-Time Exchange Rates | UtilityLab",
  description: "Convert global currencies instantly with our real-time exchange rate calculator. Support for USD, EUR, GBP, JPY, INR, and more.",
  keywords: "currency converter, forex calculator, exchange rates, money converter, global currency, travel tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
