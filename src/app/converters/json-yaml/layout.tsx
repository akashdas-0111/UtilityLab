import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to YAML Converter - Bi-directional Data Mapping | UtilityLab",
  description: "Convert JSON to YAML and YAML to JSON instantly with our professional data tool. Preserve structure, validate syntax, and format for readability.",
  keywords: "json to yaml, yaml to json, data converter, devops tools, config converter, developer tools, json formatter",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
