import { parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";
import { useCallback, useDeferredValue, useEffect, useMemo } from "react";
import { useTrackEvent } from "@/lib/analytics";
import { ALL_CATEGORY, type SoundCatalogItem } from "@/lib/sound-catalog";
import {
	buildSortedVariants,
	filterSounds,
	SORT_KEYS,
} from "@/lib/sound-filters";

/**
 * URL-backed filter/sort state (query, category, sort) plus a reset helper.
 * Catalog-independent and cheap, so components that only need the controls (or
 * just the clear action) can call this without triggering any sort/filter work.
 * All instances stay in sync through the shared nuqs URL state.
 */
export const useFilterState = () => {
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

	return {
		query,
		setQuery,
		activeCategory,
		setActiveCategory,
		sortBy,
		setSortBy,
		handleClearFilters,
	};
};

/**
 * Filter state plus the derived, sorted + filtered sound list. Owns the
 * expensive memoized work, so call it ONLY where the list is rendered (the
 * sounds page). Control-only consumers should use useFilterState instead.
 */
export const useGlobalFilters = ({
	sounds,
}: {
	sounds: SoundCatalogItem[];
}) => {
	const trackEvent = useTrackEvent();
	const filters = useFilterState();
	const { query, activeCategory, sortBy } = filters;

	useEffect(() => {
		const trimmed = query.trim();
		if (trimmed) {
			trackEvent("search_used", { query: trimmed });
		}
	}, [query, trackEvent]);

	// Sort the catalog once per identity, then filter the pre-sorted array —
	// filterSounds preserves order, so changing sort costs no re-sort.
	const variants = useMemo(() => buildSortedVariants(sounds), [sounds]);
	const filteredSounds = useMemo(
		() => filterSounds(variants[sortBy], query, activeCategory),
		[variants, sortBy, query, activeCategory],
	);

	// Keep old cards visible while React prepares new ones
	const deferredSounds = useDeferredValue(filteredSounds);
	const isPending = deferredSounds !== filteredSounds;

	return {
		...filters,
		filteredSounds,
		deferredSounds,
		isPending,
	};
};
