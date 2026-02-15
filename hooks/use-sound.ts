"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  SoundAsset,
  UseSoundOptions,
  UseSoundReturn,
} from "@/lib/sound-types";

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

const bufferCache = new Map<string, AudioBuffer>();

async function decodeAudioData(dataUri: string): Promise<AudioBuffer> {
  const cached = bufferCache.get(dataUri);
  if (cached) return cached;

  const ctx = getAudioContext();
  const base64 = dataUri.split(",")[1];
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const audioBuffer = await ctx.decodeAudioData(bytes.buffer.slice(0));
  bufferCache.set(dataUri, audioBuffer);
  return audioBuffer;
}

export function useSound(
  sound: SoundAsset,
  options: UseSoundOptions = {}
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
  const [duration, setDuration] = useState<number | null>(
    sound.duration ?? null
  );
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    let cancelled = false;
    decodeAudioData(sound.dataUri).then((buffer) => {
      if (!cancelled) {
        bufferRef.current = buffer;
        setDuration(buffer.duration);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [sound.dataUri]);

  const stop = useCallback(() => {
    if (sourceRef.current) {
      try {
        sourceRef.current.stop();
      } catch {
        // Already stopped
      }
      sourceRef.current = null;
    }
    setIsPlaying(false);
    onStop?.();
  }, [onStop]);

  const play = useCallback(
    (overrides?: { volume?: number; playbackRate?: number }) => {
      if (!soundEnabled || !bufferRef.current) return;

      const ctx = getAudioContext();

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      if (interrupt && sourceRef.current) {
        stop();
      }

      const source = ctx.createBufferSource();
      const gain = ctx.createGain();

      source.buffer = bufferRef.current;
      source.playbackRate.value = overrides?.playbackRate ?? playbackRate;
      gain.gain.value = overrides?.volume ?? volume;

      source.connect(gain);
      gain.connect(ctx.destination);

      source.onended = () => {
        setIsPlaying(false);
        onEnd?.();
      };

      source.start(0);
      sourceRef.current = source;
      gainRef.current = gain;
      setIsPlaying(true);
      onPlay?.();
    },
    [soundEnabled, playbackRate, volume, interrupt, stop, onPlay, onEnd]
  );

  const pause = useCallback(() => {
    stop();
    onPause?.();
  }, [stop, onPause]);

  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.value = volume;
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      if (sourceRef.current) {
        try {
          sourceRef.current.stop();
        } catch {
          // Already stopped
        }
      }
    };
  }, []);

  return [play, { stop, pause, isPlaying, duration, sound }] as const;
}
