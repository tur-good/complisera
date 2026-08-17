import type { MetadataRoute } from "next";
import { euCountries } from "./country-data";
import { absoluteUrl } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const countryPaths = euCountries.map(([, slug]) => `/countries/${slug}`);
  const publicPaths = [
    "/",
    "/checker",
    "/calculator",
    "/assessment",
    "/countries",
    ...countryPaths,
    "/pricing",
    "/demo",
    "/support",
    "/partners",
    "/knowledge",
    "/legal",
    "/legal/terms",
    "/legal/privacy",
    "/legal/subscriptions",
    "/legal/refunds",
    "/etsy-eu-compliance",
    "/shopify-eu-compliance",
    "/amazon-eu-compliance",
    "/handmade-eu-compliance",
    "/jewellery-eu-compliance",
  ];

  return publicPaths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date("2026-08-12"),
    changeFrequency: path.startsWith("/countries/") ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/checker" ? 0.9 : 0.7,
  }));
}
