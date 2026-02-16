import { CategoryFilter } from "@/components/category-filter";
import { InstallAllInCategoryButton } from "@/components/install-category-button";
import { SoundSearch } from "@/components/sound-search";
import { useGlobalFilters } from "@/hooks/use-global-filters";
import { ALL_CATEGORY, type SoundCatalogItem } from "@/lib/sound-catalog";

type GlobalFiltersProps = {
	sounds: SoundCatalogItem[];
	onApplySearch: () => void;
};

export function GlobalFilters({ sounds, onApplySearch }: GlobalFiltersProps) {
	const { query, setQuery, activeCategory, setActiveCategory } =
		useGlobalFilters({ sounds });

	const showInstallAll = activeCategory !== ALL_CATEGORY && sounds.length > 1;

	return (
		<div
			className="stagger-fade-up bg-background/95 sticky top-0 z-40 border-b"
			style={{ animationDelay: "200ms" }}
		>
			<div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-6 py-3">
				<SoundSearch
					value={query}
					onChange={setQuery}
					onEnterGrid={onApplySearch}
				/>
				<div className="min-w-0 flex-1">
					<CategoryFilter
						sounds={sounds}
						activeCategory={activeCategory}
						onChange={setActiveCategory}
					/>
				</div>
				{showInstallAll ? <InstallAllInCategoryButton sounds={sounds} /> : null}
			</div>
		</div>
	);
}
