"use client";

import { memo, useMemo } from "react";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { formatDuration } from "@/lib/sound-catalog";

interface SoundCardProps {
  sound: SoundCatalogItem;
  onSelect: (sound: SoundCatalogItem) => void;
  onPreviewStart: (soundName: string) => void;
  onPreviewStop: () => void;
}

function hashName(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = h + name.charCodeAt(i) * (i + 1);
  }
  return h;
}

export const SoundCard = memo(function SoundCard({
  sound,
  onSelect,
  onPreviewStart,
  onPreviewStop,
}: SoundCardProps) {
  // Generate deterministic EQ bar config per card
  const bars = useMemo(() => {
    const h = hashName(sound.name);
    return Array.from({ length: 5 }, (_, i) => ({
      height: 30 + ((h * (i + 1) * 7) % 60),
      duration: 0.55 + ((h * (i + 1) * 3) % 5) / 8,
      delay: ((h * (i + 1) * 11) % 7) / 25,
    }));
  }, [sound.name]);

  return (
    <button
      type="button"
      onClick={() => onSelect(sound)}
      onPointerEnter={(e) => {
        e.currentTarget.focus({ preventScroll: true });
        onPreviewStart(sound.name);
      }}
      onPointerLeave={onPreviewStop}
      onFocus={() => onPreviewStart(sound.name)}
      onBlur={onPreviewStop}
      className="group relative flex cursor-pointer flex-col items-center gap-3 rounded-xl border border-border/50 bg-card p-4 transition-[color,border-color,box-shadow,background-color,transform] duration-200 hover:border-primary/30 hover:shadow-[0_8px_30px_-8px] hover:shadow-primary/[0.08] hover:scale-[1.03] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto 140px" }}
    >
      {/* Mini equalizer bars */}
      <div
        className="flex items-end justify-center gap-[3px] h-10"
        aria-hidden="true"
      >
        {bars.map((bar, i) => (
          <span
            key={i}
            className="eq-bar-mini w-[3.5px] rounded-full bg-muted-foreground/20 group-hover:bg-primary/70 transition-colors"
            style={
              {
                height: `${bar.height}%`,
                "--eq-d": `${bar.duration}s`,
                "--eq-del": `${bar.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Sound name */}
      <span className="line-clamp-1 text-center text-sm font-medium">
        {sound.title}
      </span>

      {/* Category + duration */}
      <span className="text-muted-foreground text-xs">
        {sound.broadCategory} · {formatDuration(sound.meta.duration)}
      </span>
    </button>
  );
});
