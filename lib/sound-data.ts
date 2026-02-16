import { cache } from "react";
import { getBroadCategory, type SoundCatalogItem } from "@/lib/sound-catalog";
import registry from "@/registry.json";

function buildCatalog(): SoundCatalogItem[] {
	return registry.items
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
					keywords:
						((item.meta as Record<string, unknown>)?.keywords as string[]) ??
						[],
				},
			};
		})
		.sort((a, b) => a.title.localeCompare(b.title));
}

function buildIndex(
	sounds: SoundCatalogItem[],
): Map<string, SoundCatalogItem> {
	return new Map(sounds.map((s) => [s.name, s]));
}

/** Returns the full sorted catalog. Deduplicated per request via React cache. */
export const getAllSounds = cache((): SoundCatalogItem[] => {
	return buildCatalog();
});

/** O(1) lookup of a single sound by slug name. */
export const getSoundByName = cache(
	(name: string): SoundCatalogItem | undefined => {
		const index = buildIndex(getAllSounds());
		return index.get(name);
	},
);

/** Return sounds in the same broad category, excluding the given name. */
export const getRelatedSounds = cache(
	(name: string, broadCategory: string, limit = 8): SoundCatalogItem[] => {
		return getAllSounds()
			.filter((s) => s.broadCategory === broadCategory && s.name !== name)
			.slice(0, limit);
	},
);
