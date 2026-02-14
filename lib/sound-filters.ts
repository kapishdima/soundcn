import {
  ALL_CATEGORY,
  CATEGORY_ORDER,
  type SoundCatalogItem,
} from "@/lib/sound-catalog";
import type { CategoryFilterOption } from "@/components/category-filter";

export function filterSounds(
  sounds: SoundCatalogItem[],
  query: string,
  category: string
): SoundCatalogItem[] {
  const normalized = query.trim().toLowerCase();

  return sounds.filter((sound) => {
    if (category !== ALL_CATEGORY && sound.broadCategory !== category) {
      return false;
    }

    if (!normalized) return true;

    const searchableText = [
      sound.name,
      sound.title,
      sound.description,
      sound.meta.tags.join(" "),
      sound.meta.keywords.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    const terms = normalized.split(/\s+/).filter(Boolean);
    return terms.every((term) => searchableText.includes(term));
  });
}

export function buildCategoryOptions(
  sounds: SoundCatalogItem[]
): CategoryFilterOption[] {
  const counts = sounds.reduce<Record<string, number>>((acc, sound) => {
    const key = sound.broadCategory;
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const ordered = CATEGORY_ORDER.filter(
    (cat) => (counts[cat] ?? 0) > 0
  ).map((cat) => ({
    key: cat,
    label: cat,
    count: counts[cat] ?? 0,
  }));

  return [
    { key: ALL_CATEGORY, label: "All", count: sounds.length },
    ...ordered,
  ];
}
