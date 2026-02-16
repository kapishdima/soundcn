import { memo } from "react";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { SoundCard } from "@/components/sound-card";
import { useGridNavigation } from "@/hooks/use-grid-navigation";

interface SoundGridProps {
  sounds: SoundCatalogItem[];
  selectedNames?: Set<string>;
  selectMode?: boolean;
  onSelect: (sound: SoundCatalogItem) => void;
  onToggleSelect?: (soundName: string) => void;
  onPreviewStart: (soundName: string) => void;
  onPreviewStop: () => void;
  onClearFilters?: () => void;
  focusRef?: React.MutableRefObject<(() => void) | null>;
}

const EMPTY_EQ = [35, 55, 25, 70, 40, 60, 30];

export const SoundGrid = memo(function SoundGrid({
  sounds,
  selectedNames,
  selectMode = false,
  onSelect,
  onToggleSelect,
  onPreviewStart,
  onPreviewStop,
  onClearFilters,
  focusRef,
}: SoundGridProps) {
  const { gridRef, onKeyDown, focusFirst } = useGridNavigation();

  if (focusRef) {
    focusRef.current = focusFirst;
  }

  if (sounds.length === 0) {
    return (
      <div className="border-border/40 text-muted-foreground rounded-xl border border-dashed px-6 py-20 text-center">
        <div
          className="mx-auto mb-4 flex items-end justify-center gap-[3px] h-8"
          aria-hidden="true"
        >
          {EMPTY_EQ.map((h, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-muted-foreground/15"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <p className="text-sm text-pretty">No sounds match your filters.</p>
        {onClearFilters ? (
          <button
            onClick={onClearFilters}
            className="mt-4 inline-flex items-center rounded-lg border border-border/60 bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            Clear filters
          </button>
        ) : null}
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
          onSelect={onSelect}
          onToggleSelect={onToggleSelect}
          onPreviewStart={onPreviewStart}
          onPreviewStop={onPreviewStop}
        />
      ))}
    </div>
  );
});
