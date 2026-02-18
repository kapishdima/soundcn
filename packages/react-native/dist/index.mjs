// src/use-sound.ts
import { useCallback, useRef, useState } from "react";

// src/engine.ts
import { Audio } from "expo-av";
var ExpoAudioEngine = class {
  async play(asset, options = {}) {
    const { volume = 1, playbackRate = 1, onEnd } = options;
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const { sound } = await Audio.Sound.createAsync(
      { uri: asset.dataUri },
      {
        volume,
        rate: playbackRate,
        shouldCorrectPitch: true
      }
    );
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        onEnd?.();
        sound.unloadAsync();
      }
    });
    await sound.playAsync();
    return {
      stop: () => {
        sound.stopAsync().then(() => sound.unloadAsync());
      }
    };
  }
  async preload(asset) {
    const { sound } = await Audio.Sound.createAsync({ uri: asset.dataUri });
    await sound.unloadAsync();
  }
};

// src/use-sound.ts
var engine = new ExpoAudioEngine();
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
  const playbackRef = useRef(null);
  const stop = useCallback(() => {
    if (playbackRef.current) {
      playbackRef.current.stop();
      playbackRef.current = null;
    }
    setIsPlaying(false);
    onStop?.();
  }, [onStop]);
  const play = useCallback(
    async (overrides) => {
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
        }
      });
      playbackRef.current = playback;
      setIsPlaying(true);
      onPlay?.();
    },
    [sound, soundEnabled, volume, playbackRate, interrupt, stop, onPlay, onEnd]
  );
  const pause = useCallback(() => {
    stop();
    onPause?.();
  }, [stop, onPause]);
  return [play, { stop, pause, isPlaying, duration: sound.duration ?? null, sound }];
}
export {
  ExpoAudioEngine,
  useSound
};
