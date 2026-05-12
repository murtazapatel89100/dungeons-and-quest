import type { MetadataRoute } from "next";
import siteConfig from "../../config/site.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/learn",
    "/rules",
    "/tools",
    "/characters",
    "/privacy",
    "/terms",
    "/cookies",
    "/contact",
  ].map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }),
  );

  return [...routes];
}
