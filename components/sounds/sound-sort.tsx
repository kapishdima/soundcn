import type React from "react";
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

export const SoundSort: React.FC<{ sounds: SoundCatalogItem[] }> = ({
	sounds,
}) => {
	const { sortBy, setSortBy } = useGlobalFilters({ sounds });

	return (
		<Select value={sortBy} onValueChange={(v) => setSortBy(v as SortKey)}>
			<SelectTrigger aria-label="Sort by" className="w-full">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="title">Title (A–Z)</SelectItem>
				<SelectItem value="size-asc">Size: Smallest first</SelectItem>
				<SelectItem value="size-desc">Size: Largest first</SelectItem>
			</SelectContent>
		</Select>
	);
};
