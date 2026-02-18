#!/usr/bin/env npx tsx
/**
 * Encodes a raw audio file into a base64 TypeScript sound module.
 *
 * Usage:
 *   npx tsx scripts/encode-sound.ts \
 *     --input raw-sounds/kenney-ui-audio/Audio/click1.ogg \
 *     --name click-8bit \
 *     --author "Kenney" \
 *     --license CC0 \
 *     --category click
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { execSync } from "child_process";
import { resolve, dirname } from "path";

const args = process.argv.slice(2);

function getArg(name: string): string {
  const idx = args.indexOf(`--${name}`);
  if (idx === -1 || idx + 1 >= args.length) {
    console.error(`Missing required argument: --${name}`);
    process.exit(1);
  }
  return args[idx + 1];
}

function getOptionalArg(name: string, defaultValue: string): string {
  const idx = args.indexOf(`--${name}`);
  if (idx === -1 || idx + 1 >= args.length) return defaultValue;
  return args[idx + 1];
}

const input = getArg("input");
const name = getArg("name");
const author = getOptionalArg("author", "Kenney");
const license = getOptionalArg("license", "CC0") as "CC0" | "OGA-BY" | "MIT";
const category = getOptionalArg("category", "ui");

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const SOUNDS_DIR = resolve(ROOT, "registry/soundcn/sounds");
const TEMP_DIR = resolve(ROOT, ".tmp-audio");

// Ensure temp dir exists
mkdirSync(TEMP_DIR, { recursive: true });

const inputPath = resolve(ROOT, input);
if (!existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}

const tempMp3 = resolve(TEMP_DIR, `${name}.mp3`);

// Step 1: Convert to MP3 via ffmpeg
console.log(`Converting ${input} to MP3...`);
try {
  execSync(
    `ffmpeg -y -i "${inputPath}" -c:a libmp3lame -b:a 64k -ac 1 -ar 44100 "${tempMp3}"`,
    { stdio: "pipe" }
  );
} catch (e: unknown) {
  const err = e as { stderr?: Buffer };
  console.error("ffmpeg conversion failed:", err.stderr?.toString());
  process.exit(1);
}

// Step 2: Read MP3 and base64-encode
const mp3Buffer = readFileSync(tempMp3);
const base64 = mp3Buffer.toString("base64");
const dataUri = `data:audio/mpeg;base64,${base64}`;

const sizeKb = Math.round(mp3Buffer.length / 1024);
if (sizeKb > 100) {
  console.warn(
    `Warning: ${name} is ${sizeKb}KB (>${100}KB limit). Consider a shorter clip.`
  );
}

// Step 3: Get duration via ffprobe
let duration = 0;
try {
  const durationStr = execSync(
    `ffprobe -v error -show_entries format=duration -of csv=p=0 "${tempMp3}"`,
    { encoding: "utf-8" }
  ).trim();
  duration = parseFloat(durationStr);
} catch {
  console.warn("Could not extract duration via ffprobe, defaulting to 0");
}

// Step 4: Generate TypeScript module
const varName = name
  .replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase())
  .replace(/^([a-z])/, (_, c) => c.toLowerCase());

const exportName = `${varName}Sound`;

const tsContent = `import type { SoundAsset } from "@soundcn/engine";

export const ${exportName}: SoundAsset = {
  name: "${name}",
  dataUri: "${dataUri}",
  duration: ${duration.toFixed(3)},
  format: "mp3",
  license: "${license}",
  author: "${author}",
};
`;

const outputDir = resolve(SOUNDS_DIR, name);
mkdirSync(outputDir, { recursive: true });
const outputPath = resolve(outputDir, `${name}.ts`);
writeFileSync(outputPath, tsContent);

// Step 5: Clean up temp file
try {
  execSync(`rm "${tempMp3}"`);
} catch {
  // ignore
}

console.log(`Generated: registry/soundcn/sounds/${name}/${name}.ts`);
console.log(`  Size: ${sizeKb}KB | Duration: ${duration.toFixed(3)}s | Category: ${category}`);
console.log(
  `  Export: ${exportName} | License: ${license} | Author: ${author}`
);
