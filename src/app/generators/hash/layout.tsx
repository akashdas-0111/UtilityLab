import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hash Generator - MD5, SHA-1 & SHA-256 Hasher | UtilityLab",
  description: "Securely generate cryptographic hashes for strings and files. Supports MD5, SHA-1, SHA-256, and SHA-512 algorithms. 100% client-side and private.",
  keywords: "hash generator, sha-256 generator, md5 hasher, sha-1 hash, cryptographic hash, security tools, developer tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
