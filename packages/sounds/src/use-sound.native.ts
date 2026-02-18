import { useCallback, useRef, useState } from "react";
import type {
  SoundAsset,
  UseSoundOptions,
  UseSoundReturn,
  SoundPlayback,
} from "@soundcn/engine";
import { ExpoAudioEngine } from "./engine.native";

const engine = new ExpoAudioEngine();

export function useSound(
  sound: SoundAsset,
  options: UseSoundOptions = {},
): UseSoundReturn {
  const {
    volume = 1,
    playbackRate = 1,
    interrupt = false,
    soundEnabled = true,
    onPlay,
    onEnd,
    onPause,
    onStop,
  } = options;

  const [isPlaying, setIsPlaying] = useState(false);
  const playbackRef = useRef<SoundPlayback | null>(null);

  const stop = useCallback(() => {
    if (playbackRef.current) {
      playbackRef.current.stop();
      playbackRef.current = null;
    }
    setIsPlaying(false);
    onStop?.();
  }, [onStop]);

  const play = useCallback(
    async (overrides?: { volume?: number; playbackRate?: number }) => {
      if (!soundEnabled) return;

      if (interrupt && playbackRef.current) {
        stop();
      }

      const playback = await engine.play(sound, {
        volume: overrides?.volume ?? volume,
        playbackRate: overrides?.playbackRate ?? playbackRate,
        onEnd: () => {
          setIsPlaying(false);
          playbackRef.current = null;
          onEnd?.();
        },
      });

      playbackRef.current = playback;
      setIsPlaying(true);
      onPlay?.();
    },
    [sound, soundEnabled, volume, playbackRate, interrupt, stop, onPlay, onEnd],
  );

  const pause = useCallback(() => {
    stop();
    onPause?.();
  }, [stop, onPause]);

  return [
    play,
    { stop, pause, isPlaying, duration: sound.duration ?? null, sound },
  ] as const;
}
