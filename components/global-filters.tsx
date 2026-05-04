import { CategoryFilter } from "@/components/category-filter";
import { SoundSearch } from "@/components/sounds/sound-search";
import { useGlobalFilters } from "@/hooks/use-global-filters";
import type { SoundCatalogItem } from "@/lib/sound-catalog";

type GlobalFiltersProps = {
	sounds: SoundCatalogItem[];
	onApplySearch: () => void;
};

export function GlobalFilters({ sounds, onApplySearch }: GlobalFiltersProps) {
	const { query, setQuery, activeCategory, setActiveCategory } =
		useGlobalFilters({ sounds });

	return (
		<div className="flex w-full flex-col gap-3 lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:w-[240px] lg:overflow-y-auto lg:pr-2">
			<SoundSearch
				value={query}
				onChange={setQuery}
				onEnterGrid={onApplySearch}
				className="max-w-none w-full"
			/>
			<CategoryFilter
				sounds={sounds}
				activeCategory={activeCategory}
				onChange={setActiveCategory}
			/>
		</div>
	);
}
