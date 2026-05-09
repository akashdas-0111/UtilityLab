import { Metadata } from "next";

export const metadata: Metadata = {
  title: "XML to JSON Converter - Deep Data Mapping | UtilityLab",
  description: "Convert XML data structures into clean JSON objects instantly. Professional data mapping tool for developers and integration specialists.",
  keywords: "xml to json, xml converter, json tools, data mapper, api tools, web developer tools, xml parser",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
