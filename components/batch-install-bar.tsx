"use client";

import { useState } from "react";
import { Check, Package, X } from "lucide-react";
import { buildInstallCommand } from "@/lib/sound-install";
import type { PackageManager } from "@/lib/package-manager";
import { cn } from "@/lib/utils";

interface BatchInstallBarProps {
  selectedNames: Set<string>;
  onClear: () => void;
  pm: PackageManager;
}

export function BatchInstallBar({
  selectedNames,
  onClear,
  pm,
}: BatchInstallBarProps) {
  const [copied, setCopied] = useState(false);
  const count = selectedNames.size;

  if (count === 0) return null;

  const cmd = buildInstallCommand(Array.from(selectedNames), pm);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "flex items-center gap-3 rounded-2xl border border-primary/20",
        "bg-card/95 backdrop-blur-xl shadow-[0_20px_60px_-10px] shadow-primary/15",
        "px-5 py-3",
        "animate-in slide-in-from-bottom-4 fade-in-0 duration-300"
      )}
    >
      {/* Count badge */}
      <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <span className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold tabular-nums">
          {count}
        </span>
        <span className="hidden sm:inline text-muted-foreground font-normal">
          selected
        </span>
      </span>

      {/* Divider */}
      <span className="h-6 w-px bg-border/60" aria-hidden="true" />

      {/* Copy install command */}
      <button
        onClick={handleCopy}
        className={cn(
          "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-[color,background-color,box-shadow] duration-150",
          copied
            ? "bg-green-500/10 text-green-600 dark:text-green-400"
            : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20 active:scale-[0.97]"
        )}
      >
        {copied ? (
          <>
            <Check className="size-4" />
            Copied
          </>
        ) : (
          <>
            <Package className="size-4" />
            Copy install
          </>
        )}
      </button>

      {/* Preview command (truncated) */}
      <code className="hidden md:block max-w-[280px] truncate text-[11px] text-muted-foreground font-mono">
        {cmd}
      </code>

      {/* Clear selection */}
      <button
        onClick={onClear}
        className="flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        aria-label="Clear selection"
      >
        <X className="size-3.5" />
      </button>

      <span className="sr-only" aria-live="polite">
        {copied ? "Install command copied to clipboard" : ""}
      </span>
    </div>
  );
}
