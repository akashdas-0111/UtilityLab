import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to CSV Converter - Transform Data Instantly | UtilityLab",
  description: "Convert JSON data to CSV format easily. Our tool flattens complex JSON structures into a clean, spreadsheet-ready CSV file. Fast and 100% client-side.",
  keywords: "json to csv, json converter, data transformation, export json to excel, developer tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
