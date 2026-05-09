import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Temperature Converter - Celsius, Fahrenheit & Kelvin | UtilityLab",
  description: "Convert temperatures instantly between Celsius, Fahrenheit, and Kelvin. Includes a handy temperature scale chart and freezing/boiling point references.",
  keywords: "temperature converter, celsius to fahrenheit, fahrenheit to celsius, kelvin converter, weather tools, science tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
