import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { SoundCard } from "@/components/sound-card";

interface SoundGridProps {
  sounds: SoundCatalogItem[];
  onSelect: (sound: SoundCatalogItem) => void;
  onPreviewStart: (soundName: string) => void;
  onPreviewStop: () => void;
}

export function SoundGrid({
  sounds,
  onSelect,
  onPreviewStart,
  onPreviewStop,
}: SoundGridProps) {
  if (sounds.length === 0) {
    return (
      <div className="border-muted text-muted-foreground rounded-xl border border-dashed px-6 py-16 text-center">
        No sounds match your filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
      {sounds.map((sound) => (
        <SoundCard
          key={sound.name}
          sound={sound}
          onSelect={onSelect}
          onPreviewStart={onPreviewStart}
          onPreviewStop={onPreviewStop}
        />
      ))}
    </div>
  );
}
