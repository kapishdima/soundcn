"use client";

import { memo, useMemo } from "react";
import { Check } from "lucide-react";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { formatDuration } from "@/lib/sound-catalog";
import { cn } from "@/lib/utils";

interface SoundCardProps {
  sound: SoundCatalogItem;
  selected?: boolean;
  selectMode?: boolean;
  onSelect: (sound: SoundCatalogItem) => void;
  onToggleSelect?: (soundName: string) => void;
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
  selected = false,
  selectMode = false,
  onSelect,
  onToggleSelect,
  onPreviewStart,
  onPreviewStop,
}: SoundCardProps) {
  const bars = useMemo(() => {
    const h = hashName(sound.name);
    return Array.from({ length: 5 }, (_, i) => ({
      height: 30 + ((h * (i + 1) * 7) % 60),
      duration: 0.55 + ((h * (i + 1) * 3) % 5) / 8,
      delay: ((h * (i + 1) * 11) % 7) / 25,
    }));
  }, [sound.name]);

  const handleClick = (e: React.MouseEvent) => {
    // Shift+click or ctrl/cmd+click toggles selection
    if (e.shiftKey || e.metaKey || e.ctrlKey) {
      e.preventDefault();
      onToggleSelect?.(sound.name);
      return;
    }
    // In select mode, toggle selection on normal click
    if (selectMode) {
      onToggleSelect?.(sound.name);
      return;
    }
    onSelect(sound);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onPointerEnter={(e) => {
        e.currentTarget.focus({ preventScroll: true });
        onPreviewStart(sound.name);
      }}
      onPointerLeave={onPreviewStop}
      onFocus={() => onPreviewStart(sound.name)}
      onBlur={onPreviewStop}
      className={cn(
        "group relative flex cursor-pointer flex-col items-center gap-3 rounded-xl border p-4 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
        selected
          ? "border-primary bg-primary/[0.06] shadow-[0_0_0_1px] shadow-primary/30 scale-[0.97] transition-[border-color,box-shadow,transform] duration-200"
          : "border-border/50 bg-card hover:border-primary/30 hover:shadow-[0_8px_30px_-8px] hover:shadow-primary/[0.08] hover:scale-[1.03] active:scale-[0.97] transition-[border-color,box-shadow,transform] duration-200"
      )}
    >
      {/* Selection indicator */}
      {(selectMode || selected) ? (
        <span
          className={cn(
            "absolute top-2.5 right-2.5 flex size-5 items-center justify-center rounded-full border-2 transition-all duration-150",
            selected
              ? "border-primary bg-primary text-primary-foreground scale-100"
              : "border-muted-foreground/30 bg-card/80 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100"
          )}
        >
          {selected ? <Check className="size-3" strokeWidth={3} /> : null}
        </span>
      ) : null}

      {/* Mini equalizer bars */}
      <div
        className="flex items-end justify-center gap-[3px] h-10"
        aria-hidden="true"
      >
        {bars.map((bar, i) => (
          <span
            key={i}
            className={cn(
              "eq-bar-mini w-[3.5px] rounded-full transition-colors",
              selected
                ? "bg-primary/60"
                : "bg-muted-foreground/20 group-hover:bg-primary/70"
            )}
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
