import type { InstallMethod } from "@/lib/install-method";
import { getInstallPrefix, type PackageManager } from "@/lib/package-manager";

function toCamelCase(name: string): string {
	return name.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

export interface SetupStep {
	label: string;
	code: string;
	targetPath: string;
}

export interface SoundSnippets {
	exportName: string;
	installCmd: string | null;
	usageCode: string;
	setupSteps: SetupStep[] | null;
}

const SOUND_ENGINE_SOURCE = `let audioContext: AudioContext | null = null;
const bufferCache = new Map<string, AudioBuffer>();

export function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

export async function decodeAudioData(dataUri: string): Promise<AudioBuffer> {
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

export interface PlaySoundOptions {
  volume?: number;
  playbackRate?: number;
  onEnd?: () => void;
}

export interface SoundPlayback {
  stop: () => void;
}

export async function playSound(
  dataUri: string,
  options: PlaySoundOptions = {}
): Promise<SoundPlayback> {
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
        // No-op if already stopped.
      }
    },
  };
}`;

const SOUND_TYPES_SOURCE = `export interface SoundAsset {
  name: string;
  dataUri: string;
  duration: number;
  format: "mp3" | "wav" | "ogg";
  license: "CC0" | "OGA-BY" | "MIT";
  author: string;
}

export interface UseSoundOptions {
  volume?: number;
  playbackRate?: number;
  interrupt?: boolean;
  soundEnabled?: boolean;
  onPlay?: () => void;
  onEnd?: () => void;
  onPause?: () => void;
  onStop?: () => void;
}

export type PlayFunction = (overrides?: {
  volume?: number;
  playbackRate?: number;
}) => void;

export interface SoundControls {
  stop: () => void;
  pause: () => void;
  isPlaying: boolean;
  duration: number | null;
  sound: SoundAsset;
}

export type UseSoundReturn = readonly [PlayFunction, SoundControls];`;

export function getSoundSnippets(
	name: string,
	pm: PackageManager,
	method: InstallMethod = "shadcn",
): SoundSnippets {
	const exportName = `${toCamelCase(name)}Sound`;

	switch (method) {
		case "shadcn": {
			const prefix = getInstallPrefix(pm);
			const installCmd = `${prefix} add @soundcn/use-sound @soundcn/${name}`;
			const usageCode = `import { useSound } from "@/hooks/use-sound";
import { ${exportName} } from "@/sounds/${name}";

const [play] = useSound(${exportName});`;
			return { exportName, installCmd, usageCode, setupSteps: null };
		}

		case "shadcn-vue": {
			const installCmd = `${getInstallPrefix(pm, "vue")} add https://soundcn.xyz/r/${name}.json`;
			const usageCode = `<script setup lang="ts">
import { playSound } from "@/lib/sound-engine";
import { ${exportName} } from "@/lib/soundcn/sounds/${name}/${name}.ts";

async function play() {
  await playSound(${exportName}.dataUri);
}
</script>

<template>
  <button @click="play">Play Sound</button>
</template>`;
			return { exportName, installCmd, usageCode, setupSteps: null };
		}

		case "manual": {
			const usageCode = `import { playSound } from "@/lib/sound-engine";
import { ${exportName} } from "@/lib/soundcn/sounds/${name}/${name}";

await playSound(${exportName}.dataUri, { volume: 0.8 });`;
			const setupSteps: SetupStep[] = [
				{
					label: "lib/sound-engine.ts",
					code: SOUND_ENGINE_SOURCE,
					targetPath: "lib/sound-engine.ts",
				},
				{
					label: "lib/sound-types.ts",
					code: SOUND_TYPES_SOURCE,
					targetPath: "lib/sound-types.ts",
				},
				{
					label: `lib/soundcn/sounds/${name}.ts`,
					code: "", // loaded dynamically from registry
					targetPath: `lib/soundcn/sounds/${name}.ts`,
				},
			];
			return { exportName, installCmd: null, usageCode, setupSteps };
		}
	}
}
