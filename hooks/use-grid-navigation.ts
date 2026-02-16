"use client";

import { useCallback, useRef } from "react";

function getColumnCount(grid: HTMLElement): number {
  const style = getComputedStyle(grid);
  const columns = style.gridTemplateColumns.split(" ").length;
  return columns || 1;
}

/**
 * Provides arrow-key navigation for a CSS grid of focusable children.
 *
 * Returns a ref (attach to the grid container) and a keydown handler.
 * Also exposes `focusFirst()` so external controls can jump into the grid.
 */
export function useGridNavigation() {
  const gridRef = useRef<HTMLDivElement>(null);

  const focusFirst = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const first = grid.querySelector<HTMLElement>(
      ":scope > a, :scope > button"
    );
    first?.focus();
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const grid = gridRef.current;
      if (!grid) return;

      const items = Array.from(
        grid.querySelectorAll<HTMLElement>(":scope > a, :scope > button")
      );
      if (items.length === 0) return;

      const currentIndex = items.indexOf(document.activeElement as HTMLElement);
      if (currentIndex === -1) return;

      let nextIndex: number | null = null;

      switch (e.key) {
        case "ArrowRight":
          nextIndex =
            currentIndex + 1 < items.length ? currentIndex + 1 : null;
          break;
        case "ArrowLeft":
          nextIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : null;
          break;
        case "ArrowDown": {
          const cols = getColumnCount(grid);
          nextIndex =
            currentIndex + cols < items.length ? currentIndex + cols : null;
          break;
        }
        case "ArrowUp": {
          const cols = getColumnCount(grid);
          nextIndex = currentIndex - cols >= 0 ? currentIndex - cols : null;
          break;
        }
        default:
          return;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        items[nextIndex].focus();
      }
    },
    []
  );

  return { gridRef, onKeyDown, focusFirst };
}
