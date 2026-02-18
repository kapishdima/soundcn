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
  WebAudioEngine: () => WebAudioEngine,
  decodeAudioData: () => decodeAudioData,
  getAudioContext: () => getAudioContext,
  playSound: () => playSound
});
module.exports = __toCommonJS(index_exports);

// src/web.ts
var audioContext = null;
var bufferCache = /* @__PURE__ */ new Map();
function getAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}
async function decodeAudioData(dataUri) {
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
async function playSound(dataUri, options = {}) {
  const { volume = 1, playbackRate = 1, onEnd } = options;
  const ctx = getAudioContext();
  if (ctx.state === "suspended") {
    await ctx.resume();
  }
  const buffer = await decodeAudioData(dataUri);
  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  source.buffer = buffer;
  source.playbackRate.value = playbackRate;
  gain.gain.value = volume;
  source.connect(gain);
  gain.connect(ctx.destination);
  source.onended = () => {
    onEnd?.();
  };
  source.start(0);
  return {
    stop: () => {
      try {
        source.stop();
      } catch {
      }
    }
  };
}
var WebAudioEngine = class {
  async play(asset, options = {}) {
    return playSound(asset.dataUri, options);
  }
  async preload(asset) {
    await decodeAudioData(asset.dataUri);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WebAudioEngine,
  decodeAudioData,
  getAudioContext,
  playSound
});
