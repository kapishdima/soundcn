"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { loadSoundAsset } from "@/lib/sound-loader";
import { playSound, type SoundPlayback } from "@/lib/play-sound";

export type PlayState = "idle" | "loading" | "playing";

export interface SoundPlaybackControls {
  playState: PlayState;
  toggle: () => void;
}

export function useSoundPlayback(soundName: string | null): SoundPlaybackControls {
  const playbackRef = useRef<SoundPlayback | null>(null);
  const [playState, setPlayState] = useState<PlayState>("idle");

  // Stop & reset when the sound changes
  useEffect(() => {
    setPlayState("idle");
    return () => {
      playbackRef.current?.stop();
      playbackRef.current = null;
    };
  }, [soundName]);

  const toggle = useCallback(async () => {
    if (!soundName) return;

    if (playbackRef.current) {
      playbackRef.current.stop();
      playbackRef.current = null;
      setPlayState("idle");
      return;
    }

    try {
      setPlayState("loading");
      const asset = await loadSoundAsset(soundName);
      const pb = await playSound(asset.dataUri, {
        onEnd: () => {
          playbackRef.current = null;
          setPlayState("idle");
        },
      });
      playbackRef.current = pb;
      setPlayState("playing");
    } catch (err) {
      console.error(`[useSoundPlayback] Failed to play "${soundName}":`, err);
      playbackRef.current = null;
      setPlayState("idle");
    }
  }, [soundName]);

  return { playState, toggle };
}
