// src/use-sound.ts
import { useCallback, useEffect, useRef, useState } from "react";
import { decodeAudioData, getAudioContext } from "@soundcn/engine";
function useSound(sound, options = {}) {
  const {
    volume = 1,
    playbackRate = 1,
    interrupt = false,
    soundEnabled = true,
    onPlay,
    onEnd,
    onPause,
    onStop
  } = options;
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(
    sound.duration ?? null
  );
  const sourceRef = useRef(null);
  const gainRef = useRef(null);
  const bufferRef = useRef(null);
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
      }
      sourceRef.current = null;
    }
    setIsPlaying(false);
    onStop?.();
  }, [onStop]);
  const play = useCallback(
    (overrides) => {
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
        }
      }
    };
  }, []);
  return [play, { stop, pause, isPlaying, duration, sound }];
}
export {
  useSound
};
