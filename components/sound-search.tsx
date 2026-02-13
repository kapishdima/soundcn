"use client";

import { useEffect, useRef } from "react";
import { Search } from "lucide-react";

interface SoundSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function SoundSearch({ value, onChange }: SoundSearchProps) {
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
    <div className="relative w-full max-w-[260px]">
      <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search sounds..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring/50 focus-visible:border-ring h-9 w-full rounded-lg border pl-9 pr-3 text-sm outline-none transition-shadow focus-visible:ring-[3px]"
      />
    </div>
  );
}
