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
export {
  WebAudioEngine,
  decodeAudioData,
  getAudioContext,
  playSound
};
