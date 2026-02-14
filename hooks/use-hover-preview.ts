"use client";

import { useCallback, useRef } from "react";
import { loadSoundAsset } from "@/lib/sound-loader";
import { playSound, type SoundPlayback } from "@/lib/play-sound";

const DEBOUNCE_MS = 150;

export interface HoverPreviewHandlers {
  onPreviewStart: (soundName: string) => void;
  onPreviewStop: () => void;
}

export function useHoverPreview(): HoverPreviewHandlers {
  const playbackRef = useRef<SoundPlayback | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeNameRef = useRef<string | null>(null);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    playbackRef.current?.stop();
    playbackRef.current = null;
    activeNameRef.current = null;
  }, []);

  const start = useCallback(
    (soundName: string) => {
      // Already previewing this sound
      if (activeNameRef.current === soundName) return;

      stop();
      activeNameRef.current = soundName;

      timerRef.current = setTimeout(async () => {
        timerRef.current = null;
        // Guard: might have been cancelled during the timeout
        if (activeNameRef.current !== soundName) return;

        try {
          const asset = await loadSoundAsset(soundName);
          // Guard again after async load
          if (activeNameRef.current !== soundName) return;

          const pb = await playSound(asset.dataUri, {
            onEnd: () => {
              if (activeNameRef.current === soundName) {
                playbackRef.current = null;
                activeNameRef.current = null;
              }
            },
          });

          // Final guard
          if (activeNameRef.current !== soundName) {
            pb.stop();
            return;
          }

          playbackRef.current = pb;
        } catch {
          // Silently fail — preview is non-critical
          if (activeNameRef.current === soundName) {
            activeNameRef.current = null;
          }
        }
      }, DEBOUNCE_MS);
    },
    [stop]
  );

  return {
    onPreviewStart: start,
    onPreviewStop: stop,
  };
}
