import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SQL Generator - Visual Schema & Query Builder | UtilityLab",
  description: "Visually design database tables and generate clean SQL schemas instantly. Supports MySQL, PostgreSQL, and SQLite dialects with automatic query generation.",
  keywords: "sql generator, create table builder, database schema tool, mysql query builder, postgresql generator, developer tools, database design",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
