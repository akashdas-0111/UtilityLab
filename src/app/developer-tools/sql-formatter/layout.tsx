import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SQL Formatter - Beautify & Clean Your Queries | UtilityLab",
  description: "Beautify or minify your SQL queries instantly. Supports MySQL, PostgreSQL, SQL Server, and more. Improve database query readability with professional formatting.",
  keywords: "sql formatter, beautify sql, clean sql query, minify sql, database tools, developer tools, mysql formatter, postgresql formatter",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
