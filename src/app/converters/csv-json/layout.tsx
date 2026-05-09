import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to JSON Converter - Import Data Quickly | UtilityLab",
  description: "Convert CSV files and spreadsheet data into JSON format instantly. Supports custom delimiters, header mapping, and nested data parsing. 100% client-side.",
  keywords: "csv to json, csv converter, spreadsheet to json, data import tools, developer tools, excel to json",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
