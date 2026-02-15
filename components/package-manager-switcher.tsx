"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { type PackageManager, PACKAGE_MANAGERS } from "@/lib/package-manager";
import { cn } from "@/lib/utils";

interface PackageManagerSwitcherProps {
  value: PackageManager;
  onChange: (pm: PackageManager) => void;
}

export function PackageManagerSwitcher({ value, onChange }: PackageManagerSwitcherProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ x: 0, width: 0, baseWidth: 1 });
  const measured = useRef(false);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeBtn = container.querySelector<HTMLButtonElement>("[aria-checked='true']");
    if (!activeBtn) return;
    const firstBtn = container.querySelector<HTMLButtonElement>("button");
    const baseWidth = firstBtn?.offsetWidth || activeBtn.offsetWidth;
    setIndicator({
      x: activeBtn.offsetLeft,
      width: activeBtn.offsetWidth,
      baseWidth,
    });
    measured.current = true;
  }, []);

  useEffect(() => {
    measure();
  }, [value, measure]);

  // Re-measure on resize (font loading can shift widths)
  useEffect(() => {
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [measure]);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center rounded-lg border border-border/60 bg-secondary/50 p-[3px] backdrop-blur-sm"
      role="radiogroup"
      aria-label="Package manager"
    >
      {/* Sliding active indicator */}
      {indicator.width > 0 && (
        <span
          className={cn(
            "absolute top-[3px] bottom-[3px] rounded-md bg-background shadow-sm shadow-primary/10 dark:shadow-primary/5",
            measured.current && "transition-transform duration-200 ease-out"
          )}
          style={{
            width: indicator.baseWidth,
            transform: `translateX(${indicator.x}px) scaleX(${indicator.width / indicator.baseWidth})`,
            transformOrigin: "left",
          }}
          aria-hidden="true"
        />
      )}

      {PACKAGE_MANAGERS.map((pm) => {
        const isActive = pm === value;
        return (
          <button
            key={pm}
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(pm)}
            className={cn(
              "relative z-10 rounded-md px-2.5 py-1 font-mono text-xs font-medium transition-colors duration-150",
              "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
              isActive
                ? "text-foreground"
                : "text-muted-foreground/70 hover:text-muted-foreground"
            )}
          >
            {pm}
          </button>
        );
      })}
    </div>
  );
}
