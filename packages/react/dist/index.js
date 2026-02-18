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
  useSound: () => useSound
});
module.exports = __toCommonJS(index_exports);

// src/use-sound.ts
var import_react = require("react");
var import_engine = require("@soundcn/engine");
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
  const [duration, setDuration] = (0, import_react.useState)(
    sound.duration ?? null
  );
  const sourceRef = (0, import_react.useRef)(null);
  const gainRef = (0, import_react.useRef)(null);
  const bufferRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    let cancelled = false;
    (0, import_engine.decodeAudioData)(sound.dataUri).then((buffer) => {
      if (!cancelled) {
        bufferRef.current = buffer;
        setDuration(buffer.duration);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [sound.dataUri]);
  const stop = (0, import_react.useCallback)(() => {
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
  const play = (0, import_react.useCallback)(
    (overrides) => {
      if (!soundEnabled || !bufferRef.current) return;
      const ctx = (0, import_engine.getAudioContext)();
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
  const pause = (0, import_react.useCallback)(() => {
    stop();
    onPause?.();
  }, [stop, onPause]);
  (0, import_react.useEffect)(() => {
    if (gainRef.current) {
      gainRef.current.gain.value = volume;
    }
  }, [volume]);
  (0, import_react.useEffect)(() => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useSound
});
