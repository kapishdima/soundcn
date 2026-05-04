import { CategoryFilter } from "@/components/category-filter";
import { PremiumSponsorBanner } from "@/components/sounds/premium-sponsor-banner";
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
		<div className="flex w-full flex-col gap-3 lg:sticky lg:top-4 lg:h-[calc(100dvh-2rem)] lg:w-[240px] lg:overflow-hidden">
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
				className="min-h-0 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain lg:pr-2"
			/>
			<PremiumSponsorBanner className="hidden lg:flex" />
		</div>
	);
}
