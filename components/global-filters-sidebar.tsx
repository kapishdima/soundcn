import { CategoryFilterVertical } from "@/components/category-filter-vertical";
import { InstallAllInCategoryButton } from "@/components/install-category-button";
import { SoundSearch } from "@/components/sound-search";
import { useGlobalFilters } from "@/hooks/use-global-filters";
import { ALL_CATEGORY, type SoundCatalogItem } from "@/lib/sound-catalog";

type GlobalFiltersSidebarProps = {
	sounds: SoundCatalogItem[];
	onApplySearch: () => void;
};

export function GlobalFiltersSidebar({
	sounds,
	onApplySearch,
}: GlobalFiltersSidebarProps) {
	const { query, setQuery, activeCategory, setActiveCategory } =
		useGlobalFilters({ sounds });

	const showInstallAll = activeCategory !== ALL_CATEGORY && sounds.length > 1;

	return (
		<div className="flex w-full flex-col gap-3 lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:w-[240px] lg:overflow-y-auto lg:pr-2">
			<SoundSearch
				value={query}
				onChange={setQuery}
				onEnterGrid={onApplySearch}
				className="max-w-none w-full"
			/>
			<CategoryFilterVertical
				sounds={sounds}
				activeCategory={activeCategory}
				onChange={setActiveCategory}
			/>
			{showInstallAll ? (
				<div className="pt-1">
					<InstallAllInCategoryButton sounds={sounds} />
				</div>
			) : null}
		</div>
	);
}
