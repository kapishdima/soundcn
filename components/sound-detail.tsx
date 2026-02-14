"use client";

import { useMemo, useState } from "react";
import {
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
import { useSoundPlayback, type PlayState } from "@/hooks/use-sound-playback";
import { useSoundDownload } from "@/hooks/use-sound-download";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

const EMPTY_TAGS: string[] = [];

/* ── Waveform generation (pure) ── */

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

/* ── Presentational: Player strip ── */

function PlayerStrip({
  name,
  playState,
  onToggle,
}: {
  name: string;
  playState: PlayState;
  onToggle: () => void;
}) {
  const bars = useMemo(() => generateWaveform(name, 56), [name]);
  const isPlaying = playState === "playing";

  return (
    <button
      onClick={onToggle}
      className={cn(
        "group/player relative flex w-full items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
        isPlaying
          ? "border-primary/30 bg-primary/[0.06]"
          : "border-border/60 bg-secondary/40 hover:border-primary/20 hover:bg-secondary/70"
      )}
      aria-label={isPlaying ? "Stop sound" : "Play sound"}
    >
      <span
        className={cn(
          "relative flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-200",
          isPlaying
            ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
            : "bg-secondary text-muted-foreground group-hover/player:bg-primary/10 group-hover/player:text-primary"
        )}
      >
        {isPlaying ? (
          <span className="bg-primary/20 absolute inset-0 animate-ping motion-reduce:animate-none rounded-full" />
        ) : null}
        {playState === "loading" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : isPlaying ? (
          <Square className="relative size-3.5" />
        ) : (
          <Play className="relative ml-0.5 size-4" />
        )}
      </span>

      <div
        className="flex flex-1 items-center justify-center gap-[1.5px] h-8"
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

/* ── Presentational: Metadata pill ── */

function MetaPill({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary/60 px-2.5 py-1 text-xs text-muted-foreground">
      <Icon className="size-3 shrink-0" />
      {children}
    </span>
  );
}

/* ── Presentational: Copiable code block ── */

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
        <span className="text-muted-foreground text-[11px] font-semibold uppercase tracking-widest">
          {label}
        </span>
        <button
          onClick={handleCopy}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium transition-all",
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
      <pre className="overflow-x-auto rounded-lg border border-border/40 bg-secondary/30 p-3 text-[13px] leading-relaxed [scrollbar-width:none]">
        <code className="font-mono">{text}</code>
      </pre>
      <span className="sr-only" aria-live="polite">
        {copied ? `${label} copied to clipboard` : ""}
      </span>
    </div>
  );
}

/* ── Main component: thin UI shell over hooks ── */

interface SoundDetailProps {
  sound: SoundCatalogItem | null;
  onClose: () => void;
}

export function SoundDetail({ sound, onClose }: SoundDetailProps) {
  const { playState, toggle } = useSoundPlayback(sound?.name ?? null);
  const download = useSoundDownload(sound?.name ?? null);

  const snippets = useMemo(
    () => (sound ? getSoundSnippets(sound.name) : null),
    [sound]
  );

  const tags = sound?.meta.tags ?? EMPTY_TAGS;

  return (
    <Drawer
      open={!!sound}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DrawerContent>
        {sound && snippets ? (
          <div className="mx-auto w-full max-w-xl px-5 pb-8">
            {/* ── 1. Identity ── */}
            <DrawerHeader className="px-0 pb-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex shrink-0 items-center rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                      {sound.broadCategory}
                    </span>
                  </div>
                  <DrawerTitle className="truncate text-xl font-bold tracking-tight">
                    {sound.title}
                  </DrawerTitle>
                  {sound.description ? (
                    <DrawerDescription className="mt-1 line-clamp-2 text-sm leading-relaxed">
                      {sound.description}
                    </DrawerDescription>
                  ) : null}
                </div>

                <button
                  onClick={download}
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10 flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none mt-1"
                  aria-label="Download sound file"
                >
                  <Download className="size-[18px]" />
                </button>
              </div>
            </DrawerHeader>

            {/* ── 2. Player ── */}
            <div className="mt-4">
              <PlayerStrip
                name={sound.name}
                playState={playState}
                onToggle={toggle}
              />
            </div>

            {/* ── 3. Metadata ── */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <MetaPill icon={Clock}>
                {formatDuration(sound.meta.duration)}
              </MetaPill>
              <MetaPill icon={HardDrive}>
                {formatSizeKb(sound.meta.sizeKb)}
              </MetaPill>
              <MetaPill icon={Scale}>{sound.meta.license}</MetaPill>
              {tags.length > 0 ? (
                <MetaPill icon={Tag}>
                  {tags.slice(0, 3).join(", ")}
                  {tags.length > 3 ? ` +${tags.length - 3}` : null}
                </MetaPill>
              ) : null}
            </div>

            {/* ── 4. Integration code ── */}
            <div className="mt-6 flex flex-col gap-5">
              <CopyBlock label="Install" text={snippets.installCmd} />
              <CopyBlock label="Usage" text={snippets.usageCode} />
            </div>
          </div>
        ) : null}
      </DrawerContent>
    </Drawer>
  );
}
