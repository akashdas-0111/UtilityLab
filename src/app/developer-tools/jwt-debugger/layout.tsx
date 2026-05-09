import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JWT Debugger - Decode & Inspect JSON Web Tokens | UtilityLab",
  description: "Decode and inspect JSON Web Tokens (JWT) instantly. View header, payload, and claims with precise syntax highlighting and expiration analysis.",
  keywords: "jwt debugger, decode jwt, jwt inspector, json web token, security tools, developer tools, oauth2 tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
