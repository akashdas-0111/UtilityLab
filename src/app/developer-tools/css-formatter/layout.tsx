import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSS Formatter & Minifier - Clean Your Stylesheets | UtilityLab",
  description: "Beautify or minify your CSS code instantly. Improve stylesheet readability or compress your files for faster production loading with our professional formatter.",
  keywords: "css formatter, beautify css, minify css, css cleaner, web developer tools, front-end tools, style formatter",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
