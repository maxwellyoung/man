import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.metrosexualawareness.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Add more URLs for other pages
  ];
}
