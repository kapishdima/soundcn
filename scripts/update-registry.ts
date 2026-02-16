#!/usr/bin/env npx tsx
/**
 * Scans registry/soundcn/sounds/ for sound modules and adds any missing
 * entries to registry.json.
 *
 * Usage:
 *   npx tsx scripts/update-registry.ts
 *   npx tsx scripts/update-registry.ts --dry-run   # preview without writing
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { resolve, dirname } from "path";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const SOUNDS_DIR = resolve(ROOT, "registry/soundcn/sounds");
const REGISTRY_PATH = resolve(ROOT, "registry.json");

const dryRun = process.argv.includes("--dry-run");

// ── helpers ──────────────────────────────────────────────────────────

function kebabToTitle(kebab: string): string {
  return kebab
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function kebabToTags(kebab: string): string[] {
  return kebab.split("-").filter(Boolean);
}

function categoriesFromName(name: string): string[] {
  const tags = kebabToTags(name);
  // Use first meaningful word as category, fallback to "sound"
  return tags.length > 0 ? [tags[0]] : ["sound"];
}

/** Parse a sound .ts module and extract SoundAsset fields */
function parseSoundModule(filePath: string) {
  const src = readFileSync(filePath, "utf-8");

  const getString = (key: string): string => {
    const m = src.match(new RegExp(`${key}:\\s*"([^"]*)"`, "m"));
    return m ? m[1] : "";
  };

  const getNumber = (key: string): number => {
    const m = src.match(new RegExp(`${key}:\\s*([\\d.]+)`, "m"));
    return m ? parseFloat(m[1]) : 0;
  };

  const name = getString("name");
  const duration = getNumber("duration");
  const format = getString("format") || "mp3";
  const license = getString("license") || "CC0";
  const author = getString("author") || "Kenney";

  // Estimate size from base64 dataUri length
  const dataUriMatch = src.match(/dataUri:\s*"([^"]*)"/);
  let sizeKb = 0;
  if (dataUriMatch) {
    // base64 overhead: every 4 chars = 3 bytes
    const base64Part = dataUriMatch[1].replace(/^data:[^;]+;base64,/, "");
    sizeKb = Math.round((base64Part.length * 3) / 4 / 1024);
  }

  return { name, duration, format, license, author, sizeKb };
}

// ── main ─────────────────────────────────────────────────────────────

const registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf-8"));
const existingNames = new Set(
  registry.items.map((item: { name: string }) => item.name)
);

// Collect all sound directories
const soundDirs = readdirSync(SOUNDS_DIR)
  .filter((entry) => {
    const full = resolve(SOUNDS_DIR, entry);
    return statSync(full).isDirectory();
  })
  .sort();

const newItems: typeof registry.items = [];

for (const dirName of soundDirs) {
  if (existingNames.has(dirName)) continue;

  const tsFile = resolve(SOUNDS_DIR, dirName, `${dirName}.ts`);
  try {
    statSync(tsFile);
  } catch {
    console.warn(`  SKIP ${dirName} - no ${dirName}.ts found`);
    continue;
  }

  const meta = parseSoundModule(tsFile);
  if (!meta.name) {
    console.warn(`  SKIP ${dirName} - could not parse name`);
    continue;
  }

  const title = kebabToTitle(dirName);
  const tags = kebabToTags(dirName);
  const categories = categoriesFromName(dirName);

  const item = {
    name: dirName,
    type: "registry:block",
    title,
    description: `${title} sound effect.`,
    files: [
      {
        path: `registry/soundcn/sounds/${dirName}/${dirName}.ts`,
        type: "registry:lib",
      },
    ],
    categories,
    author: `${meta.author}${meta.author === "Kenney" ? " <https://kenney.nl>" : ""}`,
    meta: {
      duration: meta.duration,
      format: meta.format,
      sizeKb: meta.sizeKb,
      license: meta.license,
      tags,
    },
    registryDependencies: ["use-sound", "sound-engine"],
  };

  newItems.push(item);
}

if (newItems.length === 0) {
  console.log("Registry is up to date — no new sounds found.");
  process.exit(0);
}

if (dryRun) {
  console.log(`DRY RUN — would add ${newItems.length} new items:\n`);
  for (const item of newItems) {
    console.log(`  + ${item.name} (${item.meta.sizeKb}KB, ${item.meta.duration.toFixed(2)}s)`);
  }
  process.exit(0);
}

registry.items.push(...newItems);

writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + "\n");

console.log(`Added ${newItems.length} new sounds to registry.json:\n`);
for (const item of newItems) {
  console.log(`  + ${item.name} (${item.meta.sizeKb}KB, ${item.meta.duration.toFixed(2)}s)`);
}
