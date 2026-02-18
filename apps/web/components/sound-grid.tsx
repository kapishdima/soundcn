import { memo } from "react";
import { EmptyBars } from "@/components/empty-bars";
import { SoundCard } from "@/components/sound-card";
import { useGlobalFilters } from "@/hooks/use-global-filters";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import { useSoundSelection } from "@/hooks/use-sound-selection";
import type { SoundCatalogItem } from "soundcn/catalog";
import { Button } from "@/registry/soundcn/ui/button";

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
			<div className="border-border/40 text-muted-foreground rounded-xl border border-dashed px-6 py-20 text-center">
				<EmptyBars />
				<p className="text-sm text-pretty">No sounds match your filters.</p>
				<Button
					onClick={handleClearFilters}
					className="mt-4 inline-flex items-center rounded-lg border border-border/60 bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
				>
					Clear filters
				</Button>
			</div>
		);
	}

	return (
		<div
			ref={gridRef}
			role="grid"
			aria-label="Sound library"
			onKeyDown={onKeyDown}
			className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
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
