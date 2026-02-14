import registry from "@/registry.json";
import { SoundsPage } from "@/components/sounds-page";
import { getBroadCategory, type SoundCatalogItem } from "@/lib/sound-catalog";

export default function Home() {
  const sounds: SoundCatalogItem[] = registry.items
    .filter((item) => item.type === "registry:block")
    .map((item) => {
      const primaryCategory = item.categories?.[0] ?? "uncategorized";
      return {
        name: item.name,
        title: item.title,
        description: item.description,
        author: item.author ?? "Unknown",
        categories: item.categories ?? [],
        primaryCategory,
        broadCategory: getBroadCategory(primaryCategory),
        meta: {
          duration: item.meta?.duration ?? 0,
          sizeKb: item.meta?.sizeKb ?? 0,
          license: item.meta?.license ?? "Unknown",
          tags: item.meta?.tags ?? [],
          keywords: (item.meta as Record<string, unknown>)?.keywords as string[] ?? [],
        },
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  return <SoundsPage sounds={sounds} />;
}
