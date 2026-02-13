"use client";

import { useCallback, useMemo, useState } from "react";
import { Github, Volume2 } from "lucide-react";
import {
  ALL_CATEGORY,
  CATEGORY_ORDER,
  type SoundCatalogItem,
} from "@/lib/sound-catalog";
import { CategoryFilter } from "@/components/category-filter";
import { SoundGrid } from "@/components/sound-grid";
import { SoundSearch } from "@/components/sound-search";
import { SoundDetail } from "@/components/sound-detail";

interface SoundsPageProps {
  sounds: SoundCatalogItem[];
}

export function SoundsPage({ sounds }: SoundsPageProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);
  const [selectedSound, setSelectedSound] = useState<SoundCatalogItem | null>(
    null
  );

  const filteredSounds = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return sounds.filter((sound) => {
      const categoryMatch =
        activeCategory === ALL_CATEGORY ||
        sound.broadCategory === activeCategory;

      if (!categoryMatch) return false;
      if (!normalized) return true;

      const searchableText = [
        sound.name,
        sound.title,
        sound.description,
        sound.meta.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalized);
    });
  }, [activeCategory, query, sounds]);

  const categoryOptions = useMemo(() => {
    const categoryCounts = sounds.reduce<Record<string, number>>(
      (acc, sound) => {
        const key = sound.broadCategory;
        acc[key] = (acc[key] ?? 0) + 1;
        return acc;
      },
      {}
    );

    const ordered = CATEGORY_ORDER.filter(
      (cat) => (categoryCounts[cat] ?? 0) > 0
    ).map((cat) => ({
      key: cat,
      label: cat,
      count: categoryCounts[cat] ?? 0,
    }));

    return [
      { key: ALL_CATEGORY, label: "All", count: sounds.length },
      ...ordered,
    ];
  }, [sounds]);

  const handleSelect = useCallback((sound: SoundCatalogItem) => {
    setSelectedSound(sound);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedSound(null);
  }, []);

  return (
    <div className="flex min-h-svh flex-col">
      {/* Header — always at top */}
      <header className="border-input mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <Volume2 className="size-5" />
          <span className="text-lg font-bold tracking-tight">soundcn</span>
        </div>
        <a
          href="https://github.com/soundcn/soundcn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="GitHub"
        >
          <Github className="size-5" />
        </a>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center gap-4 px-4 pt-12 pb-16">
        <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Beautiful UI sounds
          <br />
          <span className="text-muted-foreground">for your next project</span>
        </h1>
        <p className="text-muted-foreground max-w-md text-center text-base">
          A collection of carefully crafted sounds for user interfaces. Inspired
          by shadcn/ui design philosophy.
        </p>
      </section>

      {/* Sticky action bar: search + categories */}
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

        <SoundGrid sounds={filteredSounds} onSelect={handleSelect} />
      </main>

      {/* Drawer */}
      <SoundDetail sound={selectedSound} onClose={handleClose} />
    </div>
  );
}
