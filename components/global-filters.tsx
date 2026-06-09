import { CategoryFilter } from "@/components/category-filter";
import { PremiumSponsorBanner } from "@/components/sounds/premium-sponsor-banner";
import { SoundSearch } from "@/components/sounds/sound-search";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useGlobalFilters } from "@/hooks/use-global-filters";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import type { SortKey } from "@/lib/sound-filters";

type GlobalFiltersProps = {
	sounds: SoundCatalogItem[];
	onApplySearch: () => void;
};

export function GlobalFilters({ sounds, onApplySearch }: GlobalFiltersProps) {
	const {
		query,
		setQuery,
		activeCategory,
		setActiveCategory,
		sortBy,
		setSortBy,
	} = useGlobalFilters({ sounds });

	return (
		<div className="flex w-full flex-col gap-3 lg:sticky lg:top-4 lg:h-[calc(100dvh-2rem)] lg:w-[240px] lg:overflow-hidden">
			<SoundSearch
				value={query}
				onChange={setQuery}
				onEnterGrid={onApplySearch}
				className="w-full"
			/>
			<Select value={sortBy} onValueChange={(v) => setSortBy(v as SortKey)}>
				<SelectTrigger aria-label="Sort by" className="w-full">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="title">Title (A–Z)</SelectItem>
					<SelectItem value="size-asc">Size: small → large</SelectItem>
					<SelectItem value="size-desc">Size: large → small</SelectItem>
				</SelectContent>
			</Select>
			<CategoryFilter
				sounds={sounds}
				activeCategory={activeCategory}
				onChange={setActiveCategory}
				className="min-h-0 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain lg:pr-2"
			/>
			<PremiumSponsorBanner />
		</div>
	);
}
