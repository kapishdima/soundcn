"use client";

import { memo, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Clock,
  Copy,
  Download,
  HardDrive,
  Loader2,
  Play,
  Scale,
  Square,
  Tag,
} from "lucide-react";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { formatDuration, formatSizeKb } from "@/lib/sound-catalog";
import { getSoundSnippets } from "@/lib/sound-snippets";
import type { PackageManager } from "@/lib/package-manager";
import { PackageManagerSwitcher } from "@/components/package-manager-switcher";
import { useSoundPlayback, type PlayState } from "@/hooks/use-sound-playback";
import { useSoundDownload } from "@/hooks/use-sound-download";
import { usePackageManager } from "@/hooks/use-package-manager";
import { useHoverPreview } from "@/hooks/use-hover-preview";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import { cn } from "@/lib/utils";

/* ── Waveform generation (pure, deterministic) ── */

function generateWaveform(name: string, length: number): number[] {
  let seed = 0;
  for (let i = 0; i < name.length; i++) {
    seed = seed + name.charCodeAt(i) * (i + 1);
  }
  return Array.from({ length }, (_, i) => {
    const x = i / (length - 1);
    const envelope = Math.sin(x * Math.PI);
    const n1 = Math.sin(i * 2.5 + seed * 0.1) * 0.3;
    const n2 = Math.sin(i * 5.7 + seed * 0.3) * 0.2;
    const n3 = Math.sin(i * 11.3 + seed * 0.7) * 0.1;
    return Math.max(8, (envelope * 0.65 + (n1 + n2 + n3) * 0.35 + 0.35) * 100);
  });
}

/* ── Player hero section ── */

function PlayerHero({
  name,
  playState,
  onToggle,
}: {
  name: string;
  playState: PlayState;
  onToggle: () => void;
}) {
  const bars = useMemo(() => generateWaveform(name, 80), [name]);
  const isPlaying = playState === "playing";

  return (
    <button
      onClick={onToggle}
      className={cn(
        "group/player relative flex w-full items-center gap-4 rounded-2xl border px-5 py-5 sm:px-6 sm:py-6 transition-[color,background-color,border-color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
        isPlaying
          ? "border-primary/30 bg-primary/[0.06]"
          : "border-border/60 bg-secondary/40 hover:border-primary/20 hover:bg-secondary/70"
      )}
      aria-label={isPlaying ? "Stop sound" : "Play sound"}
    >
      <span
        className={cn(
          "relative flex size-12 shrink-0 items-center justify-center rounded-full transition-[color,background-color,box-shadow] duration-200",
          isPlaying
            ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
            : "bg-secondary text-muted-foreground group-hover/player:bg-primary/10 group-hover/player:text-primary"
        )}
      >
        {isPlaying ? (
          <span
            className="bg-primary/20 absolute inset-0 animate-ping motion-reduce:animate-none rounded-full"
            aria-hidden="true"
          />
        ) : null}
        {playState === "loading" ? (
          <Loader2 className="size-5 animate-spin" aria-hidden="true" />
        ) : isPlaying ? (
          <Square className="relative size-4" aria-hidden="true" />
        ) : (
          <Play className="relative ml-0.5 size-5" aria-hidden="true" />
        )}
      </span>

      <div
        className="flex flex-1 items-center justify-center gap-[1.5px] h-10 sm:h-12"
        aria-hidden="true"
      >
        {bars.map((h, i) => (
          <span
            key={i}
            className={cn(
              "min-w-0 flex-1 max-w-[3px] rounded-full transition-colors duration-300",
              isPlaying
                ? "bg-primary/60"
                : "bg-muted-foreground/15 group-hover/player:bg-muted-foreground/25"
            )}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </button>
  );
}

/* ── Metadata pill ── */

function MetaPill({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary/60 px-3 py-1.5 text-xs text-muted-foreground">
      <Icon className="size-3.5 shrink-0" aria-hidden="true" />
      {children}
    </span>
  );
}

/* ── Copy block ── */

function CopyBlock({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-[11px] font-semibold uppercase tracking-wide">
          {label}
        </span>
        <button
          onClick={handleCopy}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium transition-colors",
            copied
              ? "text-green-500"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          )}
          aria-label={`Copy ${label}`}
        >
          {copied ? (
            <>
              <Check className="size-3" aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3" aria-hidden="true" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto rounded-xl border border-border/40 bg-secondary/30 p-4 text-[13px] leading-relaxed [scrollbar-width:none]">
        <code className="font-mono">{text}</code>
      </pre>
      <span className="sr-only" aria-live="polite">
        {copied ? `${label} copied to clipboard` : ""}
      </span>
    </div>
  );
}

/* ── Install block with PM switcher ── */

function InstallBlock({
  text,
  pm,
  onPmChange,
}: {
  text: string;
  pm: PackageManager;
  onPmChange: (pm: PackageManager) => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-[11px] font-semibold uppercase tracking-wide">
          Install
        </span>
        <button
          onClick={handleCopy}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium transition-colors",
            copied
              ? "text-green-500"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          )}
          aria-label="Copy install command"
        >
          {copied ? (
            <>
              <Check className="size-3" aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3" aria-hidden="true" />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="rounded-xl border border-border/40 bg-secondary/30">
        <div className="border-b border-border/40 px-3 py-1.5">
          <PackageManagerSwitcher value={pm} onChange={onPmChange} />
        </div>
        <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed [scrollbar-width:none]">
          <code className="font-mono">{text}</code>
        </pre>
      </div>
      <span className="sr-only" aria-live="polite">
        {copied ? "Install command copied to clipboard" : ""}
      </span>
    </div>
  );
}

/* ── Related sound card (miniature, links to its own page) ── */

function hashName(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = h + name.charCodeAt(i) * (i + 1);
  }
  return h;
}

const RelatedSoundCard = memo(function RelatedSoundCard({
  sound,
  onPreviewStart,
  onPreviewStop,
}: {
  sound: SoundCatalogItem;
  onPreviewStart: (name: string) => void;
  onPreviewStop: () => void;
}) {
  const bars = useMemo(() => {
    const h = hashName(sound.name);
    return Array.from({ length: 5 }, (_, i) => ({
      height: 30 + ((h * (i + 1) * 7) % 60),
      duration: 0.55 + ((h * (i + 1) * 3) % 5) / 8,
      delay: ((h * (i + 1) * 11) % 7) / 25,
    }));
  }, [sound.name]);

  return (
    <Link
      href={`/sound/${sound.name}`}
      onPointerEnter={() => onPreviewStart(sound.name)}
      onPointerLeave={onPreviewStop}
      onFocus={() => onPreviewStart(sound.name)}
      onBlur={onPreviewStop}
      className="group relative flex cursor-pointer flex-col items-center gap-3 rounded-xl border border-border/50 bg-card p-4 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.08] hover:scale-[1.03] active:scale-[0.97] transition-[border-color,box-shadow,transform] duration-200 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
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

      <span className="line-clamp-1 text-center text-sm font-medium">
        {sound.title}
      </span>

      <span className="text-muted-foreground text-xs">
        {sound.broadCategory} &middot; {formatDuration(sound.meta.duration)}
      </span>
    </Link>
  );
});

/* ── Main page component ── */

interface SoundDetailPageProps {
  sound: SoundCatalogItem;
  relatedSounds: SoundCatalogItem[];
}

export function SoundDetailPage({ sound, relatedSounds }: SoundDetailPageProps) {
  const [pm, setPm] = usePackageManager();
  const { playState, toggle } = useSoundPlayback(sound.name);
  const download = useSoundDownload(sound.name);
  const { onPreviewStart, onPreviewStop } = useHoverPreview();
  const { gridRef: relatedGridRef, onKeyDown: relatedKeyDown } = useGridNavigation();

  const snippets = useMemo(
    () => getSoundSnippets(sound.name, pm),
    [sound.name, pm]
  );

  const tags = sound.meta.tags;

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-medium"
      >
        Skip to Content
      </a>

      {/* ── Back navigation ── */}
      <nav className="stagger-fade-up mx-auto w-full max-w-3xl px-6 pt-6 pb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to Catalog
        </Link>
      </nav>

      <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-6 pb-16">
        {/* ── Identity ── */}
        <header
          className="stagger-fade-up pt-4 pb-6"
          style={{ animationDelay: "50ms" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex shrink-0 items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {sound.broadCategory}
                </span>
                <span className="text-muted-foreground text-xs">
                  by {sound.author}
                </span>
              </div>
              <h1 className="font-display text-3xl font-bold text-balance sm:text-4xl">
                {sound.title}
              </h1>
              {sound.description ? (
                <p className="mt-2 text-muted-foreground text-base leading-relaxed text-pretty max-w-xl">
                  {sound.description}
                </p>
              ) : null}
            </div>

            <button
              onClick={download}
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none mt-1"
              aria-label="Download sound file"
            >
              <Download className="size-5" aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* ── Player ── */}
        <div
          className="stagger-fade-up"
          style={{ animationDelay: "100ms" }}
        >
          <PlayerHero
            name={sound.name}
            playState={playState}
            onToggle={toggle}
          />
        </div>

        {/* ── Metadata ── */}
        <div
          className="stagger-fade-up mt-5 flex flex-wrap items-center gap-2"
          style={{ animationDelay: "150ms" }}
        >
          <MetaPill icon={Clock}>
            {formatDuration(sound.meta.duration)}
          </MetaPill>
          <MetaPill icon={HardDrive}>
            {formatSizeKb(sound.meta.sizeKb)}
          </MetaPill>
          <MetaPill icon={Scale}>{sound.meta.license}</MetaPill>
          {tags.length > 0 ? (
            <MetaPill icon={Tag}>
              {tags.slice(0, 4).join(", ")}
              {tags.length > 4 ? ` +${tags.length - 4}` : null}
            </MetaPill>
          ) : null}
        </div>

        {/* ── Integration code ── */}
        <div
          className="stagger-fade-up mt-8 flex flex-col gap-6"
          style={{ animationDelay: "200ms" }}
        >
          <InstallBlock
            text={snippets.installCmd}
            pm={pm}
            onPmChange={setPm}
          />
          <CopyBlock label="Usage" text={snippets.usageCode} />
        </div>

        {/* ── Related sounds ── */}
        {relatedSounds.length > 0 ? (
          <section
            className="stagger-fade-up mt-12"
            style={{ animationDelay: "260ms" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-balance">
                More {sound.broadCategory} Sounds
              </h2>
              <Link
                href={`/?category=${encodeURIComponent(sound.broadCategory)}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none rounded-md px-2 py-1"
              >
                View all
              </Link>
            </div>
            <div
              ref={relatedGridRef}
              onKeyDown={relatedKeyDown}
              role="grid"
              aria-label="Related sounds"
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
            >
              {relatedSounds.map((s) => (
                <RelatedSoundCard
                  key={s.name}
                  sound={s}
                  onPreviewStart={onPreviewStart}
                  onPreviewStop={onPreviewStop}
                />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
