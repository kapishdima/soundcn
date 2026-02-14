"use client";

import { useCallback, useMemo, useState } from "react";
import { useQueryState, parseAsString } from "nuqs";
import { Github } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ALL_CATEGORY, type SoundCatalogItem } from "@/lib/sound-catalog";
import { filterSounds, buildCategoryOptions } from "@/lib/sound-filters";
import { CategoryFilter } from "@/components/category-filter";
import { SoundGrid } from "@/components/sound-grid";
import { SoundSearch } from "@/components/sound-search";
import dynamic from "next/dynamic";

const SoundDetail = dynamic(() =>
  import("@/components/sound-detail").then((mod) => mod.SoundDetail)
);
import { useHoverPreview } from "@/hooks/use-hover-preview";

interface SoundsPageProps {
  sounds: SoundCatalogItem[];
}

// Deterministic bar configs for the hero equalizer
const HERO_BARS = Array.from({ length: 80 }, (_, i) => ({
  duration: 0.6 + (((i * 7) % 11) / 11) * 0.9,
  delay: ((i * 3) % 17) / 17 * 1.5,
  height: 20 + (((i * 5) % 7) / 7) * 80,
}));

const EQ_LOGO_HEIGHTS = [55, 90, 35, 75, 45];

function EqLogo() {
  return (
    <div className="flex items-end gap-[2.5px] h-[18px]" aria-hidden="true">
      {EQ_LOGO_HEIGHTS.map((h, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-primary"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
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

  const handleSelect = useCallback(
    (sound: SoundCatalogItem) => {
      onPreviewStop();
      setSelectedSound(sound);
    },
    [onPreviewStop]
  );

  const handleClose = useCallback(() => {
    setSelectedSound(null);
  }, []);

  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      {/* ── Header ── */}
      <header className="stagger-fade-up mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2.5">
          <EqLogo />
          <span
            className="font-display text-lg font-bold tracking-tight"
            aria-label="soundcn"
          >
            soundcn
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/soundcn/soundcn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="size-5" aria-hidden="true" />
          </a>
          <ThemeToggle />
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 pt-8 pb-14 sm:pt-14 sm:pb-20">
        {/* Radial amber glow — warm spotlight effect */}
        <div
          className="pointer-events-none absolute -top-48 -left-32 h-[650px] w-[750px] opacity-[0.06] dark:opacity-[0.10] blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse, var(--primary) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        {/* Background equalizer bars */}
        <div
          className="pointer-events-none absolute inset-0 flex items-end gap-[2px] overflow-hidden opacity-[0.045] dark:opacity-[0.08]"
          aria-hidden="true"
        >
          {HERO_BARS.map((bar, i) => (
            <span
              key={i}
              className="hero-eq-bar min-w-0 flex-1 rounded-t-sm bg-primary"
              style={{
                height: `${bar.height}%`,
                transformOrigin: "bottom",
                animation: `eq ${bar.duration}s ease-in-out ${bar.delay}s infinite`,
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-6xl">
          <h1
            className="stagger-fade-up font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            <span className="text-primary">{sounds.length}</span> curated UI
            sounds.
            <br />
            <span className="text-muted-foreground">Copy. Paste. Play.</span>
          </h1>

          <p
            className="stagger-fade-up text-muted-foreground mt-5 max-w-lg text-base leading-relaxed sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            Open-source sound effects for modern web apps. Install any sound
            with a single CLI command.
          </p>

          <div className="stagger-fade-up mt-7" style={{ animationDelay: "240ms" }}>
            <div className="bg-secondary/70 border-border/60 inline-flex items-center gap-3 rounded-lg border px-4 py-2.5 font-mono text-sm backdrop-blur-sm">
              <span className="text-primary select-none">$</span>
              <code className="text-foreground/80">
                npx shadcn add https://soundcn.dev/r/click-soft.json
              </code>
              <span
                className="inline-block w-[7px] h-[15px] rounded-[1px] bg-primary/60"
                style={{ animation: "blink-caret 1.1s step-end infinite" }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky search & filter bar ── */}
      <div
        className="stagger-fade-up bg-background/80 sticky top-0 z-40 border-b backdrop-blur-xl"
        style={{ animationDelay: "350ms" }}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-6 py-3">
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

      {/* ── Content ── */}
      <main
        id="main-content"
        className="stagger-fade-up mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-8"
        style={{ animationDelay: "450ms" }}
      >
        <p className="text-muted-foreground text-sm tabular-nums">
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

      {/* ── Drawer ── */}
      <SoundDetail sound={selectedSound} onClose={handleClose} />
    </div>
  );
}
