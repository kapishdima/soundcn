import type { SoundAsset } from "@/lib/sound-types";

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

export async function playSound(
  sound: SoundAsset,
  options: { volume?: number; playbackRate?: number } = {}
): Promise<AudioBufferSourceNode> {
  const ctx = getAudioContext();

  if (ctx.state === "suspended") {
    await ctx.resume();
  }

  const buffer = await decodeAudioData(sound.dataUri);
  const source = ctx.createBufferSource();
  const gain = ctx.createGain();

  source.buffer = buffer;
  source.playbackRate.value = options.playbackRate ?? 1;
  gain.gain.value = options.volume ?? 1;

  source.connect(gain);
  gain.connect(ctx.destination);
  source.start(0);

  return source;
}
