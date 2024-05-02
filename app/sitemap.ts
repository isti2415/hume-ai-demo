import { MetadataRoute } from "next";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://humeaidemo.online"
    : "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${BASE_URL}`,
    },
    {
      url: `${BASE_URL}/written-language`,
    },
    {
      url: `${BASE_URL}/facial-expression`,
    },
    {
      url: `${BASE_URL}/vocal-burst`,
    },
    {
      url: `${BASE_URL}/speech-prosody`,
    },
  ];
}
