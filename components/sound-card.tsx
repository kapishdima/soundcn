"use client";

import { memo } from "react";
import { Play } from "lucide-react";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { formatDuration, formatSizeKb } from "@/lib/sound-catalog";

interface SoundCardProps {
  sound: SoundCatalogItem;
  onSelect: (sound: SoundCatalogItem) => void;
  onPreviewStart: (soundName: string) => void;
  onPreviewStop: () => void;
}

export const SoundCard = memo(function SoundCard({
  sound,
  onSelect,
  onPreviewStart,
  onPreviewStop,
}: SoundCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(sound)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(sound);
        }
      }}
      onPointerEnter={(e) => {
        e.currentTarget.focus({ preventScroll: true });
        onPreviewStart(sound.name);
      }}
      onPointerLeave={onPreviewStop}
      onFocus={() => onPreviewStart(sound.name)}
      onBlur={onPreviewStop}
      className="border-input group relative flex cursor-pointer flex-col items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-accent/50"
    >
      {/* Play icon */}
      <div className="bg-secondary text-secondary-foreground flex size-12 items-center justify-center rounded-full">
        <Play className="ml-0.5 size-5" />
      </div>

      {/* Sound name */}
      <span className="line-clamp-1 text-center text-sm font-medium">
        {sound.title}
      </span>

      {/* Duration + size */}
      <span className="text-muted-foreground text-xs">
        {formatDuration(sound.meta.duration)} ·{" "}
        {formatSizeKb(sound.meta.sizeKb)}
      </span>
    </div>
  );
});
