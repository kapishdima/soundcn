import { memo } from "react";
import { EmptyBars } from "@/components/empty-bars";
import { SoundCard } from "@/components/sounds/sound-card";
import { Button } from "@/components/ui/button";
import { useGlobalFilters } from "@/hooks/use-global-filters";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import { useSoundSelection } from "@/hooks/use-sound-selection";
import type { SoundCatalogItem } from "@/lib/sound-catalog";

interface SoundGridProps {
	sounds: SoundCatalogItem[];
	onPreviewStart: (soundName: string) => void;
	onPreviewStop: () => void;
	focusRef?: React.MutableRefObject<(() => void) | null>;
}

export const SoundGrid = memo(function SoundGrid({
	sounds,
	onPreviewStart,
	onPreviewStop,
	focusRef,
}: SoundGridProps) {
	const { gridRef, onKeyDown, focusFirst } = useGridNavigation();
	const { selectMode, selectedNames, handleBatchSelect, handleSelect } =
		useSoundSelection({ sounds });
	const { handleClearFilters } = useGlobalFilters({ sounds });

	if (focusRef) {
		focusRef.current = focusFirst;
	}

	if (sounds.length === 0) {
		return (
			<div className="flex min-h-[50vh] items-center justify-center text-center text-muted-foreground">
				<div>
					<EmptyBars />
					<p className="text-sm text-pretty my-2">
						No sounds match your filters.
					</p>
					<Button onClick={handleClearFilters} variant="outline">
						Clear filters
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div
			ref={gridRef}
			onKeyDown={onKeyDown}
			className="grid min-h-screen grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
		>
			{sounds.map((sound) => (
				<SoundCard
					key={sound.name}
					sound={sound}
					selected={selectedNames?.has(sound.name) ?? false}
					selectMode={selectMode}
					onSelect={handleSelect}
					onBatchSelect={handleBatchSelect}
					onPreviewStart={onPreviewStart}
					onPreviewStop={onPreviewStop}
				/>
			))}
		</div>
	);
});
