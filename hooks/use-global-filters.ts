import { parseAsString, useQueryState } from "nuqs";
import { useCallback, useDeferredValue, useMemo } from "react";
import { ALL_CATEGORY, type SoundCatalogItem } from "@/lib/sound-catalog";
import { filterSounds } from "@/lib/sound-filters";

export const useGlobalFilters = ({
	sounds,
}: {
	sounds: SoundCatalogItem[];
}) => {
	const [query, setQuery] = useQueryState(
		"q",
		parseAsString
			.withDefault("")
			.withOptions({ shallow: true, throttleMs: 300 }),
	);
	const [activeCategory, setActiveCategory] = useQueryState(
		"category",
		parseAsString.withDefault(ALL_CATEGORY).withOptions({ shallow: true }),
	);

	const handleClearFilters = useCallback(() => {
		setQuery("");
		setActiveCategory(ALL_CATEGORY);
	}, [setQuery, setActiveCategory]);

	const filteredSounds = useMemo(
		() => filterSounds(sounds, query, activeCategory),
		[sounds, query, activeCategory],
	);

	// Keep old cards visible while React prepares new ones
	const deferredSounds = useDeferredValue(filteredSounds);
	const isPending = deferredSounds !== filteredSounds;

	return {
		query,
		setQuery,
		activeCategory,
		setActiveCategory,
		filteredSounds,
		deferredSounds,
		isPending,
		handleClearFilters,
	};
};
