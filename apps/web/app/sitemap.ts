import type { MetadataRoute } from "next";
import { getAllSounds } from "@/lib/sound-data";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://soundcn.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const sounds = getAllSounds();
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...sounds.map((sound) => ({
      url: `${baseUrl}/sound/${sound.name}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
