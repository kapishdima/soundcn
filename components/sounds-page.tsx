"use client";

import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useQueryState, parseAsString } from "nuqs";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, Github, ListChecks, Package } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ALL_CATEGORY, type SoundCatalogItem } from "@/lib/sound-catalog";
import { filterSounds, buildCategoryOptions } from "@/lib/sound-filters";
import { buildInstallCommand } from "@/lib/sound-install";
import { type PackageManager, getInstallPrefix } from "@/lib/package-manager";
import { usePackageManager } from "@/hooks/use-package-manager";
import { CategoryFilter } from "@/components/category-filter";
import { SoundGrid } from "@/components/sound-grid";
import { SoundSearch } from "@/components/sound-search";
import { BatchInstallBar } from "@/components/batch-install-bar";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const SoundDetail = dynamic(() =>
  import("@/components/sound-detail").then((mod) => mod.SoundDetail)
);
import { useHoverPreview } from "@/hooks/use-hover-preview";
import { useTypewriter } from "@/hooks/use-typewriter";

interface SoundsPageProps {
  sounds: SoundCatalogItem[];
}

// Deterministic bar configs for the hero equalizer
const HERO_BARS = Array.from({ length: 32 }, (_, i) => ({
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

/* ── Install-all-in-category button ── */

function InstallCategoryButton({
  sounds,
  pm,
}: {
  sounds: SoundCatalogItem[];
  pm: PackageManager;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const cmd = buildInstallCommand(sounds.map((s) => s.name), pm);
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-[color,background-color,border-color,box-shadow] duration-150 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
        copied
          ? "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
          : "border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 active:scale-[0.97]"
      )}
    >
      {copied ? (
        <>
          <Check className="size-3.5" />
          <span className="hidden sm:inline">Copied!</span>
        </>
      ) : (
        <>
          <Package className="size-3.5" />
          <span className="hidden sm:inline">Install all</span>
          <span className="sm:hidden">All</span>
        </>
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? "Install command copied" : ""}
      </span>
    </button>
  );
}

// Pick a diverse subset of sound names for the hero typewriter
function pickHeroWords(sounds: SoundCatalogItem[], count: number): string[] {
  if (sounds.length === 0) return ["click-soft"];
  // Deterministic spread: pick evenly spaced items
  const step = Math.max(1, Math.floor(sounds.length / count));
  const picked: string[] = [];
  for (let i = 0; i < sounds.length && picked.length < count; i += step) {
    picked.push(sounds[i].name);
  }
  return picked;
}

export function SoundsPage({ sounds }: SoundsPageProps) {
  const [pm, setPm] = usePackageManager();

  const heroWords = useMemo(
    () => pickHeroWords(sounds, 6),
    [sounds]
  );
  const { text: typedName, isTyping: cursorActive } = useTypewriter({
    words: heroWords,
  });
  const [query, setQuery] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({ shallow: true, throttleMs: 300 })
  );
  const [activeCategory, setActiveCategory] = useQueryState(
    "category",
    parseAsString.withDefault(ALL_CATEGORY).withOptions({ shallow: true })
  );

  // ── Deep link: ?sound=click-soft ──
  const [soundParam, setSoundParam] = useQueryState(
    "sound",
    parseAsString.withDefault("").withOptions({ shallow: true })
  );

  // Build a name→item lookup for deep linking
  const soundsByName = useMemo(() => {
    const map = new Map<string, SoundCatalogItem>();
    for (const s of sounds) {
      map.set(s.name, s);
    }
    return map;
  }, [sounds]);

  // Resolve the selected sound from URL param or null
  const selectedSound = soundParam ? (soundsByName.get(soundParam) ?? null) : null;

  // ── Batch selection ──
  const [selectedNames, setSelectedNames] = useState<Set<string>>(() => new Set());
  const selectMode = selectedNames.size > 0;

  const handleToggleSelect = useCallback((name: string) => {
    setSelectedNames((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedNames(new Set());
  }, []);

  const handleClearFilters = useCallback(() => {
    setQuery("");
    setActiveCategory(ALL_CATEGORY);
  }, [setQuery, setActiveCategory]);

  // ── Filtering ──
  const filteredSounds = useMemo(
    () => filterSounds(sounds, query, activeCategory),
    [sounds, query, activeCategory]
  );

  // Keep old cards visible while React prepares new ones
  const deferredSounds = useDeferredValue(filteredSounds);
  const isPending = deferredSounds !== filteredSounds;

  const categoryOptions = useMemo(
    () => buildCategoryOptions(sounds),
    [sounds]
  );

  const gridFocusRef = useRef<(() => void) | null>(null);

  const { onPreviewStart, onPreviewStop } = useHoverPreview();

  const handleSelect = useCallback(
    (sound: SoundCatalogItem) => {
      onPreviewStop();
      setSoundParam(sound.name);
    },
    [onPreviewStop, setSoundParam]
  );

  const handleClose = useCallback(() => {
    setSoundParam("");
  }, [setSoundParam]);

  // Clear batch selection when category/search changes (render-time reset
  // avoids the extra re-render + one-frame stale-selection flash of useEffect)
  const prevFiltersRef = useRef({ activeCategory, query });
  if (prevFiltersRef.current.activeCategory !== activeCategory || prevFiltersRef.current.query !== query) {
    prevFiltersRef.current = { activeCategory, query };
    if (selectedNames.size > 0) {
      setSelectedNames(new Set());
    }
  }

  // Pause hero EQ bars when scrolled off-screen
  const heroEqRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);
  useEffect(() => {
    const el = heroEqRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showInstallAll = activeCategory !== ALL_CATEGORY && deferredSounds.length > 1;

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
            className="font-display text-lg font-bold"
            aria-label="soundcn"
          >
            soundcn
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/kapishdima/soundcn"
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
        <div
          className="pointer-events-none absolute -top-48 -left-32 size-[400px] rounded-full bg-primary opacity-[0.07] dark:opacity-[0.12] blur-2xl"
          aria-hidden="true"
        />

        <div
          ref={heroEqRef}
          className="pointer-events-none absolute inset-0 flex items-end gap-[2px] overflow-hidden opacity-[0.045] dark:opacity-[0.08] [contain:layout_style]"
          aria-hidden="true"
          {...(!heroVisible && { "data-eq-paused": "" })}
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
            className="stagger-fade-up font-display text-4xl font-bold text-balance sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "50ms" }}
          >
            <span className="text-primary">{sounds.length}</span> curated UI
            sounds.
            <br />
            <span className="text-muted-foreground">Copy. Paste. Play.</span>
          </h1>

          <p
            className="stagger-fade-up text-muted-foreground mt-5 max-w-lg text-base text-pretty leading-relaxed sm:text-lg"
            style={{ animationDelay: "100ms" }}
          >
            Open-source sound effects for modern web apps. Install any sound
            with a single CLI command.
          </p>

          <div className="stagger-fade-up mt-7" style={{ animationDelay: "150ms" }}>
            <div className="bg-secondary/70 border-border/60 inline-flex items-center gap-3 rounded-lg border px-4 py-2.5 font-mono text-sm backdrop-blur-sm">
              <span className="text-primary select-none">$</span>
              <code className="text-foreground/80">
                <span>{`${getInstallPrefix(pm)} add @soundcn/`}</span>
                <span className="text-primary">{typedName}</span>
              </code>
              <span
                className="inline-block w-[7px] h-[15px] rounded-[1px] bg-primary/60"
                style={{
                  animation: cursorActive
                    ? "none"
                    : "blink-caret 1.1s step-end infinite",
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky search & filter bar ── */}
      <div
        className="stagger-fade-up bg-background/95 sticky top-0 z-40 border-b"
        style={{ animationDelay: "200ms" }}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-6 py-3">
          <SoundSearch value={query} onChange={setQuery} onEnterGrid={() => gridFocusRef.current?.()} />
          <div className="min-w-0 flex-1">
            <CategoryFilter
              options={categoryOptions}
              activeCategory={activeCategory}
              onChange={setActiveCategory}
            />
          </div>
          {showInstallAll ? (
            <InstallCategoryButton sounds={deferredSounds} pm={pm} />
          ) : null}
        </div>
      </div>

      {/* ── Content ── */}
      <main
        id="main-content"
        className="stagger-fade-up mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-8"
        style={{ animationDelay: "260ms" }}
      >
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm tabular-nums">
            {deferredSounds.length} sound
            {deferredSounds.length !== 1 ? "s" : ""}
          </p>

          <div className="text-muted-foreground/60 text-xs hidden sm:flex items-center gap-4">
            <p className="flex items-center gap-1.5">
              <span className="flex items-center gap-0.5">
                <ArrowUp className="size-3" />
                <ArrowDown className="size-3" />
                <ArrowLeft className="size-3" />
                <ArrowRight className="size-3" />
              </span>
              to navigate
            </p>
            <p className="flex items-center gap-1.5">
              <ListChecks className="size-3.5" />
              <kbd className="font-mono text-[10px]">&#8984;</kbd>+click to batch select
            </p>
          </div>
        </div>

        <div
          className={cn(
            "transition-opacity duration-150",
            isPending ? "opacity-50" : "opacity-100"
          )}
        >
          <SoundGrid
            sounds={deferredSounds}
            selectedNames={selectedNames}
            selectMode={selectMode}
            onSelect={handleSelect}
            onToggleSelect={handleToggleSelect}
            onPreviewStart={onPreviewStart}
            onPreviewStop={onPreviewStop}
            onClearFilters={handleClearFilters}
            focusRef={gridFocusRef}
          />
        </div>
      </main>

      {/* ── Batch install floating bar ── */}
      <BatchInstallBar
        selectedNames={selectedNames}
        onClear={handleClearSelection}
        pm={pm}
      />

      {/* ── Drawer ── */}
      <SoundDetail sound={selectedSound} onClose={handleClose} pm={pm} onPmChange={setPm} />
    </div>
  );
}
