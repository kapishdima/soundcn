"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ExpoAudioEngine: () => ExpoAudioEngine,
  useSound: () => useSound
});
module.exports = __toCommonJS(index_exports);

// src/use-sound.ts
var import_react = require("react");

// src/engine.ts
var import_expo_av = require("expo-av");
var ExpoAudioEngine = class {
  async play(asset, options = {}) {
    const { volume = 1, playbackRate = 1, onEnd } = options;
    await import_expo_av.Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const { sound } = await import_expo_av.Audio.Sound.createAsync(
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
    const { sound } = await import_expo_av.Audio.Sound.createAsync({ uri: asset.dataUri });
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
  const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
  const playbackRef = (0, import_react.useRef)(null);
  const stop = (0, import_react.useCallback)(() => {
    if (playbackRef.current) {
      playbackRef.current.stop();
      playbackRef.current = null;
    }
    setIsPlaying(false);
    onStop?.();
  }, [onStop]);
  const play = (0, import_react.useCallback)(
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
  const pause = (0, import_react.useCallback)(() => {
    stop();
    onPause?.();
  }, [stop, onPause]);
  return [play, { stop, pause, isPlaying, duration: sound.duration ?? null, sound }];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ExpoAudioEngine,
  useSound
});
