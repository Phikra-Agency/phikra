import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const routes = [
    "",
    "#/agency",
    "#/services",
    "#/portfolio",
    "#/news",
    "#/contact",
    "#/legal",
    "#/privacy",
  ];

  return routes.map((r) => ({
    url: `${base}/${r}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.7,
  }));
}
