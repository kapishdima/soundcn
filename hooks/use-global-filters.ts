import { parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";
import { useCallback, useDeferredValue, useEffect, useMemo } from "react";
import { useTrackEvent } from "@/lib/analytics";
import { ALL_CATEGORY, type SoundCatalogItem } from "@/lib/sound-catalog";
import { filterSounds, SORT_KEYS, sortSounds } from "@/lib/sound-filters";

export const useGlobalFilters = ({
	sounds,
}: {
	sounds: SoundCatalogItem[];
}) => {
	const trackEvent = useTrackEvent();
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
	const [sortBy, setSortBy] = useQueryState(
		"sort",
		parseAsStringLiteral(SORT_KEYS)
			.withDefault("title")
			.withOptions({ shallow: true }),
	);

	const handleClearFilters = useCallback(() => {
		setQuery("");
		setActiveCategory(ALL_CATEGORY);
		setSortBy("title");
	}, [setQuery, setActiveCategory, setSortBy]);

	useEffect(() => {
		const trimmed = query.trim();
		if (trimmed) {
			trackEvent("search_used", { query: trimmed });
		}
	}, [query, trackEvent]);

	const filteredSounds = useMemo(
		() => sortSounds(filterSounds(sounds, query, activeCategory), sortBy),
		[sounds, query, activeCategory, sortBy],
	);

	// Keep old cards visible while React prepares new ones
	const deferredSounds = useDeferredValue(filteredSounds);
	const isPending = deferredSounds !== filteredSounds;

	return {
		query,
		setQuery,
		activeCategory,
		setActiveCategory,
		sortBy,
		setSortBy,
		filteredSounds,
		deferredSounds,
		isPending,
		handleClearFilters,
	};
};
