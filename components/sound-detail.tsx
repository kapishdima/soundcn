"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Download, Loader2, Play, Square } from "lucide-react";
import type { SoundCatalogItem } from "@/lib/sound-catalog";
import { formatDuration, formatSizeKb } from "@/lib/sound-catalog";
import { loadSoundAsset } from "@/lib/sound-loader";
import { playSound, type SoundPlayback } from "@/lib/play-sound";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

type PlayState = "idle" | "loading" | "playing";

function toCamelCase(name: string): string {
  return name.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

function CopyRow({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
        {label}
      </span>
      <div className="group/row relative">
        <pre className="bg-secondary/50 overflow-x-auto rounded-lg p-3 pr-10 text-sm leading-relaxed [scrollbar-width:none]">
          <code className="font-mono">{text}</code>
        </pre>
        <button
          onClick={handleCopy}
          className={cn(
            "absolute right-2 top-2 flex size-7 items-center justify-center rounded-md transition-opacity hover:bg-accent",
            copied ? "opacity-100" : "opacity-0 group-hover/row:opacity-100"
          )}
          aria-label={`Copy ${label}`}
        >
          {copied ? (
            <Check className="size-3.5 text-green-500" />
          ) : (
            <Copy className="text-muted-foreground size-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}

interface SoundDetailProps {
  sound: SoundCatalogItem | null;
  onClose: () => void;
}

export function SoundDetail({ sound, onClose }: SoundDetailProps) {
  const playbackRef = useRef<SoundPlayback | null>(null);
  const [playState, setPlayState] = useState<PlayState>("idle");

  const exportName = sound ? `${toCamelCase(sound.name)}Sound` : "";
  const installCmd = sound
    ? `npx shadcn add https://soundcn.dev/r/${sound.name}.json`
    : "";
  const usageCode = sound
    ? `import { useSound } from "@/hooks/use-sound";
import { ${exportName} } from "@/sounds/${sound.name}";

const [play] = useSound(${exportName});`
    : "";

  // Stop playback when sound changes or drawer closes
  useEffect(() => {
    return () => {
      playbackRef.current?.stop();
      playbackRef.current = null;
    };
  }, [sound?.name]);

  // Reset play state when sound changes
  useEffect(() => {
    setPlayState("idle");
  }, [sound?.name]);

  const handleDownload = async () => {
    if (!sound) return;
    try {
      const asset = await loadSoundAsset(sound.name);
      const res = await fetch(asset.dataUri);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${sound.name}.${asset.format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(`[SoundDetail] Failed to download "${sound.name}":`, err);
    }
  };

  const handleTogglePlayback = async () => {
    if (!sound) return;

    if (playState === "playing") {
      playbackRef.current?.stop();
      playbackRef.current = null;
      setPlayState("idle");
      return;
    }

    try {
      setPlayState("loading");
      const asset = await loadSoundAsset(sound.name);
      const pb = await playSound(asset.dataUri, {
        onEnd: () => {
          playbackRef.current = null;
          setPlayState("idle");
        },
      });
      playbackRef.current = pb;
      setPlayState("playing");
    } catch (err) {
      console.error(`[SoundDetail] Failed to play "${sound.name}":`, err);
      playbackRef.current = null;
      setPlayState("idle");
    }
  };

  return (
    <Drawer
      open={!!sound}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DrawerContent>
        {sound && (
          <div className="mx-auto w-full max-w-2xl px-4 pb-8">
            <DrawerHeader className="px-0">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleTogglePlayback}
                  className={cn(
                    "relative flex size-14 shrink-0 items-center justify-center rounded-full transition-colors",
                    playState === "playing"
                      ? "bg-foreground text-background"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                  aria-label={
                    playState === "playing" ? "Stop sound" : "Play sound"
                  }
                >
                  {playState === "playing" && (
                    <span className="bg-foreground/30 absolute inset-0 animate-ping rounded-full" />
                  )}
                  {playState === "loading" ? (
                    <Loader2 className="size-6 animate-spin" />
                  ) : playState === "playing" ? (
                    <Square className="relative size-5" />
                  ) : (
                    <Play className="relative ml-0.5 size-6" />
                  )}
                </button>

                <div className="min-w-0 flex-1 text-left">
                  <DrawerTitle className="truncate text-lg">
                    {sound.title}
                  </DrawerTitle>
                  <DrawerDescription>
                    {formatDuration(sound.meta.duration)} ·{" "}
                    {formatSizeKb(sound.meta.sizeKb)} · {sound.meta.license}
                  </DrawerDescription>
                </div>

                <button
                  onClick={handleDownload}
                  className="text-muted-foreground hover:text-foreground hover:bg-secondary flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors"
                  aria-label="Download sound file"
                >
                  <Download className="size-5" />
                </button>
              </div>
            </DrawerHeader>

            {sound.description && (
              <p className="text-muted-foreground text-sm mb-6">
                {sound.description}
              </p>
            )}

            <div className="flex flex-col gap-4">
              <CopyRow label="Install" text={installCmd} />
              <CopyRow label="Usage" text={usageCode} />
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
