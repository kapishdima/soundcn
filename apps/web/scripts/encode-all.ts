#!/usr/bin/env npx tsx
/**
 * Batch-encodes all .ogg files from assets/ into base64 TypeScript sound modules.
 *
 * Walks every folder and subfolder in assets/, converting each .ogg file to
 * registry/soundcn/sounds/{sound-name}/{sound-name}.ts
 *
 * Sound name is derived from the filename (kebab-case, without extension).
 * Duplicates get the parent folder prefix automatically.
 *
 * Usage:
 *   npx tsx scripts/encode-all.ts
 *   npx tsx scripts/encode-all.ts --dry-run     # preview without writing
 *   npx tsx scripts/encode-all.ts --filter rpg   # only process paths containing "rpg"
 */

import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  statSync,
  rmSync,
} from "fs";
import { execSync } from "child_process";
import { resolve, basename, extname, dirname, relative } from "path";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const ASSETS_DIR = resolve(ROOT, "assets");
const SOUNDS_DIR = resolve(ROOT, "registry/soundcn/sounds");
const TEMP_DIR = resolve(ROOT, ".tmp-audio");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const filterIdx = args.indexOf("--filter");
const filter = filterIdx !== -1 ? args[filterIdx + 1] : null;

// Collect all .ogg files recursively
function collectOggFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = resolve(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...collectOggFiles(full));
    } else if (extname(entry).toLowerCase() === ".ogg") {
      results.push(full);
    }
  }
  return results;
}

// Convert filename to kebab-case sound name
function toKebab(filename: string): string {
  return (
    basename(filename, extname(filename))
      // camelCase/PascalCase boundaries: "phaseJump1" -> "phase-Jump-1"
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      // number boundaries: "click3" -> "click-3"
      .replace(/([a-zA-Z])(\d)/g, "$1-$2")
      .replace(/(\d)([a-zA-Z])/g, "$1-$2")
      // underscores and spaces to dashes
      .replace(/[_\s]+/g, "-")
      // collapse multiple dashes
      .replace(/-+/g, "-")
      .toLowerCase()
      // trim trailing dashes
      .replace(/^-|-$/g, "")
  );
}

// Derive a prefix from the parent folder for disambiguation
function folderPrefix(filePath: string): string {
  const rel = relative(ASSETS_DIR, filePath);
  const parts = rel.split("/");
  // Use the pack folder name, strip "kenney_" prefix
  if (parts.length >= 2) {
    const pack = parts[0].replace(/^kenney_/, "");
    return toKebab(pack);
  }
  return "";
}

// Convert camelCase export name
function toExportName(kebab: string): string {
  const camel = kebab.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
  return camel + "Sound";
}

console.log("Scanning assets/...\n");

const allFiles = collectOggFiles(ASSETS_DIR);
const filtered = filter
  ? allFiles.filter((f) => f.toLowerCase().includes(filter.toLowerCase()))
  : allFiles;

console.log(`Found ${allFiles.length} .ogg files${filter ? `, ${filtered.length} matching "${filter}"` : ""}\n`);

// Detect name collisions and add prefix
const nameMap = new Map<string, string[]>();
for (const file of filtered) {
  const name = toKebab(basename(file));
  if (!nameMap.has(name)) nameMap.set(name, []);
  nameMap.get(name)!.push(file);
}

// Build final name -> file mapping
const finalMap = new Map<string, string>();
for (const [name, files] of nameMap) {
  if (files.length === 1) {
    finalMap.set(name, files[0]);
  } else {
    // Disambiguate with folder prefix
    for (const file of files) {
      const prefix = folderPrefix(file);
      // Also include subfolder if exists
      const rel = relative(ASSETS_DIR, file);
      const parts = rel.split("/");
      let disambiguated: string;
      if (parts.length > 2) {
        // Has subfolder (e.g. music-jingles/8-Bit jingles/file.ogg)
        const sub = toKebab(parts.slice(1, -1).join("-"));
        disambiguated = `${prefix}-${sub}-${name}`;
      } else {
        disambiguated = `${prefix}-${name}`;
      }
      finalMap.set(disambiguated, file);
    }
  }
}

const sorted = [...finalMap.entries()].sort((a, b) => a[0].localeCompare(b[0]));

if (dryRun) {
  console.log("DRY RUN - would generate:\n");
  for (const [name, file] of sorted) {
    console.log(`  ${name} <- ${relative(ROOT, file)}`);
  }
  console.log(`\nTotal: ${sorted.length} sounds`);
  process.exit(0);
}

// Ensure dirs
mkdirSync(TEMP_DIR, { recursive: true });
mkdirSync(SOUNDS_DIR, { recursive: true });

let success = 0;
let skipped = 0;
let errors = 0;

for (const [name, file] of sorted) {
  const tempMp3 = resolve(TEMP_DIR, `${name}.mp3`);

  // Convert to MP3
  try {
    execSync(
      `ffmpeg -y -i "${file}" -c:a libmp3lame -b:a 64k -ac 1 -ar 44100 "${tempMp3}"`,
      { stdio: "pipe" }
    );
  } catch {
    console.error(`  SKIP ${name} - ffmpeg failed`);
    errors++;
    continue;
  }

  const mp3Buffer = readFileSync(tempMp3);
  const sizeKb = Math.round(mp3Buffer.length / 1024);

  if (sizeKb > 100) {
    console.warn(`  SKIP ${name} - ${sizeKb}KB exceeds 100KB limit`);
    skipped++;
    try { rmSync(tempMp3); } catch {}
    continue;
  }

  const base64 = mp3Buffer.toString("base64");
  const dataUri = `data:audio/mpeg;base64,${base64}`;

  // Duration
  let duration = 0;
  try {
    duration = parseFloat(
      execSync(
        `ffprobe -v error -show_entries format=duration -of csv=p=0 "${tempMp3}"`,
        { encoding: "utf-8" }
      ).trim()
    );
  } catch {}

  const exportName = toExportName(name);

  const tsContent = `import type { SoundAsset } from "@soundcn/engine";

export const ${exportName}: SoundAsset = {
  name: "${name}",
  dataUri: "${dataUri}",
  duration: ${duration.toFixed(3)},
  format: "mp3",
  license: "CC0",
  author: "Kenney",
};
`;

  const outputDir = resolve(SOUNDS_DIR, name);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(resolve(outputDir, `${name}.ts`), tsContent);

  console.log(`  OK ${name} (${sizeKb}KB, ${duration.toFixed(2)}s)`);
  success++;

  // Clean temp
  try { rmSync(tempMp3); } catch {}
}

// Clean temp dir
try { rmSync(TEMP_DIR, { recursive: true }); } catch {}

console.log(`\nDone: ${success} generated, ${skipped} skipped (too large), ${errors} errors`);
