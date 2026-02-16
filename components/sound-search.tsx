"use client";

import { useEffect, useRef } from "react";
import { Search } from "lucide-react";

interface SoundSearchProps {
  value: string;
  onChange: (value: string) => void;
  onEnterGrid?: () => void;
}

export function SoundSearch({ value, onChange, onEnterGrid }: SoundSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full lg:max-w-sm">
      <Search
        className="text-muted-foreground/60 absolute left-3 top-1/2 size-4 -translate-y-1/2"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="text"
        name="search"
        aria-label="Search sounds"
        autoComplete="off"
        placeholder="Search sounds&#x2026;"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onEnterGrid?.();
          }
        }}
        className="border-border/60 bg-secondary/40 placeholder:text-muted-foreground/50 h-10 w-full rounded-lg border pl-9 pr-14 text-sm outline-none transition-[color,border-color,box-shadow,background-color] focus-visible:ring-[3px] focus-visible:ring-primary/20 focus-visible:border-primary/40 focus-visible:shadow-lg focus-visible:shadow-primary/15"
      />
      <kbd className="text-muted-foreground/40 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[11px]">
        &#8984;K
      </kbd>
    </div>
  );
}
