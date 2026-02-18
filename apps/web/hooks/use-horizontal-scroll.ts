"use client";

import { useRef, useEffect, useState, useCallback } from "react";

/**
 * Hook to enable horizontal scrolling via drag (mouse/touch) and wheel.
 * Returns a ref to be attached to the scrollable container.
 */
export function useHorizontalScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // State for cursor style to give visual feedback
  const [isGrabbing, setIsGrabbing] = useState(false);

  const onMouseDown = useCallback((e: MouseEvent) => {
    const slider = ref.current;
    if (!slider) return;

    isDragging.current = true;
    setIsGrabbing(true);
    startX.current = e.pageX - slider.offsetLeft;
    scrollLeft.current = slider.scrollLeft;
  }, []);

  const onMouseLeave = useCallback(() => {
    isDragging.current = false;
    setIsGrabbing(false);
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    setIsGrabbing(false);
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    const slider = ref.current;
    if (!slider) return;

    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX.current) * 2; // Scroll-fast multiplier
    slider.scrollLeft = scrollLeft.current - walk;
  }, []);

  const onWheel = useCallback((e: WheelEvent) => {
    const slider = ref.current;
    if (!slider) return;

    if (e.deltaY === 0) return;
    // If predominantly horizontal, let native scroll handle it (trackpads)
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

    slider.scrollLeft += e.deltaY;

    // Prevent page scroll only if we are scrolling the list
    const isAtLeft = slider.scrollLeft <= 0;
    const isAtRight =
      slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1;

    if (!(isAtLeft && e.deltaY < 0) && !(isAtRight && e.deltaY > 0)) {
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    const slider = ref.current;
    if (!slider) return;

    // Passive: false is needed for wheel preventDefault
    slider.addEventListener("mousedown", onMouseDown);
    slider.addEventListener("mouseleave", onMouseLeave);
    slider.addEventListener("mouseup", onMouseUp);
    slider.addEventListener("mousemove", onMouseMove);
    slider.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      slider.removeEventListener("mousedown", onMouseDown);
      slider.removeEventListener("mouseleave", onMouseLeave);
      slider.removeEventListener("mouseup", onMouseUp);
      slider.removeEventListener("mousemove", onMouseMove);
      slider.removeEventListener("wheel", onWheel);
    };
  }, [onMouseDown, onMouseLeave, onMouseUp, onMouseMove, onWheel]);

  return { ref, isGrabbing };
}
