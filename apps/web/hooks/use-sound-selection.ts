import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGlobalFilters } from "@/hooks/use-global-filters";
import { useHoverPreview } from "@/hooks/use-hover-preview";
import type { SoundCatalogItem } from "@soundcn/sounds/catalog";

export const useSoundSelection = ({
	sounds,
}: {
	sounds: SoundCatalogItem[];
}) => {
	const { onPreviewStop } = useHoverPreview();
	const { activeCategory, query } = useGlobalFilters({ sounds });
	const prevFiltersRef = useRef({ activeCategory, query });

	const [soundParam, setSoundParam] = useQueryState(
		"sound",
		parseAsString.withDefault("").withOptions({ shallow: true }),
	);

	const [selectedNames, setSelectedNames] = useState<Set<string>>(
		() => new Set(),
	);
	const selectMode = selectedNames.size > 0;

	const handleBatchSelect = (name: string) => {
		setSelectedNames((prev) => {
			const next = new Set(prev);
			if (next.has(name)) {
				next.delete(name);
			} else {
				next.add(name);
			}
			return next;
		});
	};

	const handleClearSelection = () => setSelectedNames(new Set());

	// Build a name→item lookup for deep linking
	const soundsByName = useMemo(() => {
		const map = new Map<string, SoundCatalogItem>();
		for (const s of sounds) {
			map.set(s.name, s);
		}
		return map;
	}, [sounds]);

	// Resolve the selected sound from URL param or null
	const selectedSound = soundParam
		? (soundsByName.get(soundParam) ?? null)
		: null;

	const handleSelect = (sound: SoundCatalogItem) => {
		onPreviewStop();
		setSoundParam(sound.name);
	};

	useEffect(() => {
		if (
			prevFiltersRef.current.activeCategory !== activeCategory ||
			prevFiltersRef.current.query !== query
		) {
			prevFiltersRef.current = { activeCategory, query };

			if (selectedNames.size > 0) {
				setSelectedNames(new Set());
			}
		}
	}, [activeCategory, query, selectedNames.size]);

	return {
		selectedNames,
		selectMode,
		handleSelect,
		handleBatchSelect,
		handleClearSelection,
		selectedSound,
		setSoundParam,
	};
};
