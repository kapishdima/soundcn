import { cache } from "react";
import { getBroadCategory, type SoundCatalogItem } from "@soundcn/sounds/catalog";
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

function buildIndex(sounds: SoundCatalogItem[]): Map<string, SoundCatalogItem> {
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

export function hashName(name: string): number {
	let h = 0;
	for (let i = 0; i < name.length; i++) {
		h = h + name.charCodeAt(i) * (i + 1);
	}
	return h;
}

export const generateSoundWaves = (name: string) => {
	const h = hashName(name);

	return Array.from({ length: 5 }, (_, i) => ({
		height: 30 + ((h * (i + 1) * 7) % 60),
		duration: 0.55 + ((h * (i + 1) * 3) % 5) / 8,
		delay: ((h * (i + 1) * 11) % 7) / 25,
	}));
};

export function generateWaveform(name: string, length: number): number[] {
	let seed = 0;
	for (let i = 0; i < name.length; i++) {
		seed = seed + name.charCodeAt(i) * (i + 1);
	}
	return Array.from({ length }, (_, i) => {
		const x = i / (length - 1);
		const envelope = Math.sin(x * Math.PI);
		const n1 = Math.sin(i * 2.5 + seed * 0.1) * 0.3;
		const n2 = Math.sin(i * 5.7 + seed * 0.3) * 0.2;
		const n3 = Math.sin(i * 11.3 + seed * 0.7) * 0.1;
		return Math.max(8, (envelope * 0.65 + (n1 + n2 + n3) * 0.35 + 0.35) * 100);
	});
}
