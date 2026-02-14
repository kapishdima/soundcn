"use client";

import { useCallback, useMemo, useState } from "react";
import { useQueryState, parseAsString } from "nuqs";
import { Github, Volume2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ALL_CATEGORY, type SoundCatalogItem } from "@/lib/sound-catalog";
import { filterSounds, buildCategoryOptions } from "@/lib/sound-filters";
import { CategoryFilter } from "@/components/category-filter";
import { SoundGrid } from "@/components/sound-grid";
import { SoundSearch } from "@/components/sound-search";
import { SoundDetail } from "@/components/sound-detail";
import { useHoverPreview } from "@/hooks/use-hover-preview";

interface SoundsPageProps {
  sounds: SoundCatalogItem[];
}

export function SoundsPage({ sounds }: SoundsPageProps) {
  const [query, setQuery] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({ shallow: true, throttleMs: 300 })
  );
  const [activeCategory, setActiveCategory] = useQueryState(
    "category",
    parseAsString.withDefault(ALL_CATEGORY).withOptions({ shallow: true })
  );
  const [selectedSound, setSelectedSound] = useState<SoundCatalogItem | null>(
    null
  );

  const filteredSounds = useMemo(
    () => filterSounds(sounds, query, activeCategory),
    [sounds, query, activeCategory]
  );

  const categoryOptions = useMemo(
    () => buildCategoryOptions(sounds),
    [sounds]
  );

  const { onPreviewStart, onPreviewStop } = useHoverPreview();

  const handleSelect = useCallback((sound: SoundCatalogItem) => {
    onPreviewStop();
    setSelectedSound(sound);
  }, [onPreviewStop]);

  const handleClose = useCallback(() => {
    setSelectedSound(null);
  }, []);

  return (
    <div className="flex min-h-svh flex-col">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <Volume2 className="size-5" />
          <span className="text-lg font-bold tracking-tight">soundcn</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/soundcn/soundcn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="size-5" />
          </a>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero */}
      {/* <section className="flex flex-col items-center gap-4 px-4 pt-12 pb-16">
        <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Beautiful UI sounds
          <br />
          <span className="text-muted-foreground">for your next project</span>
        </h1>
        <p className="text-muted-foreground max-w-md text-center text-base">
          A collection of carefully crafted sounds for user interfaces. Inspired
          by shadcn/ui design philosophy.
        </p>
      </section> */}

      {/* Sticky action bar */}
      <div className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3">
          <SoundSearch value={query} onChange={setQuery} />
          <div className="min-w-0 flex-1">
            <CategoryFilter
              options={categoryOptions}
              activeCategory={activeCategory}
              onChange={setActiveCategory}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6">
        <p className="text-muted-foreground text-sm">
          {filteredSounds.length} sound
          {filteredSounds.length !== 1 ? "s" : ""}
        </p>

        <SoundGrid
          sounds={filteredSounds}
          onSelect={handleSelect}
          onPreviewStart={onPreviewStart}
          onPreviewStop={onPreviewStop}
        />
      </main>

      {/* Drawer */}
      <SoundDetail sound={selectedSound} onClose={handleClose} />
    </div>
  );
}
