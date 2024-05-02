import { MetadataRoute } from "next";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://humeaidemo.online"
    : "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/api/og/*"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
