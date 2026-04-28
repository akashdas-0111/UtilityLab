import { MetadataRoute } from "next";
import { tools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://utilitylab.com";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/privacy",
    "/contact",
    "/search",
    "/calculators",
    "/pdf",
    "/image-tools",
    "/text-tools",
    "/developer-tools",
    "/micro-tools",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Tool routes
  const toolRoutes = tools.map((tool) => ({
    url: `${baseUrl}${tool.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: tool.popular ? 0.7 : 0.5,
  }));

  return [...staticRoutes, ...toolRoutes];
}
