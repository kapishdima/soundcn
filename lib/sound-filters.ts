import {
	ALL_CATEGORY,
	CATEGORY_ORDER,
	type SoundCatalogItem,
} from "@/lib/sound-catalog";

const WHITESPACE_RE = /\s+/;

export function filterSounds(
	sounds: SoundCatalogItem[],
	query: string,
	category: string,
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

		const terms = normalized.split(WHITESPACE_RE).filter(Boolean);
		return terms.every((term) => searchableText.includes(term));
	});
}

// Single source of truth: the union derives from the array so the nuqs literal
// parser (parseAsStringLiteral) and the SortKey type can never drift apart.
export const SORT_KEYS = ["title", "size-asc", "size-desc"] as const;
export type SortKey = (typeof SORT_KEYS)[number];

type SortedVariants = Record<SortKey, SoundCatalogItem[]>;

/**
 * Build every sort ordering of the catalog up front. Because filterSounds()
 * preserves input order, sorting the base array once lets the runtime path stay
 * filter-only — selecting a sort becomes an array pick with no per-interaction
 * sort cost. The returned arrays are read-only: the "title" variant aliases the
 * input (already title-sorted at build time, sound-data.ts:36) while the size
 * variants are fresh copies, so callers must never mutate them.
 */
export function buildSortedVariants(
	sounds: SoundCatalogItem[],
): SortedVariants {
	return {
		title: sounds,
		"size-asc": [...sounds].sort(
			(a, b) => a.meta.sizeKb - b.meta.sizeKb || a.title.localeCompare(b.title),
		),
		"size-desc": [...sounds].sort(
			(a, b) => b.meta.sizeKb - a.meta.sizeKb || a.title.localeCompare(b.title),
		),
	};
}

export function buildCategoryOptions(sounds: SoundCatalogItem[]) {
	const counts = sounds.reduce<Record<string, number>>((acc, sound) => {
		const key = sound.broadCategory;
		acc[key] = (acc[key] ?? 0) + 1;
		return acc;
	}, {});

	const ordered = CATEGORY_ORDER.filter((cat) => (counts[cat] ?? 0) > 0).map(
		(cat) => ({
			key: cat,
			label: cat,
			count: counts[cat] ?? 0,
		}),
	);

	return [
		{ key: ALL_CATEGORY, label: "All", count: sounds.length },
		...ordered,
	];
}
