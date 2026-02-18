#!/usr/bin/env npx tsx
/**
 * One-off migration: adds sound-engine.ts to all sound items in registry.json.
 *
 * - Adds a new "sound-engine" registry:lib item
 * - Adds "registry/soundcn/lib/sound-engine.ts" to each sound item's files array
 *
 * Usage:
 *   npx tsx scripts/migrate-add-sound-engine.ts
 *   npx tsx scripts/migrate-add-sound-engine.ts --dry-run
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const REGISTRY_PATH = resolve(ROOT, "registry.json");
const dryRun = process.argv.includes("--dry-run");

const SOUND_ENGINE_FILE = {
  path: "registry/soundcn/lib/sound-engine.ts",
  type: "registry:lib",
};

const SOUND_ENGINE_ITEM = {
  name: "sound-engine",
  type: "registry:lib",
  title: "Sound Engine",
  description:
    "Framework-agnostic audio engine using Web Audio API. Zero dependencies.",
  files: [SOUND_ENGINE_FILE],
  categories: ["lib"],
};

const registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf-8"));

// Check if sound-engine item already exists
const hasEngineItem = registry.items.some(
  (item: { name: string }) => item.name === "sound-engine"
);

if (!hasEngineItem) {
  // Insert after sound-types and use-sound items (index 2)
  const useSoundIdx = registry.items.findIndex(
    (item: { name: string }) => item.name === "use-sound"
  );
  const insertIdx = useSoundIdx >= 0 ? useSoundIdx + 1 : 2;
  registry.items.splice(insertIdx, 0, SOUND_ENGINE_ITEM);
  console.log(`+ Added "sound-engine" registry item at index ${insertIdx}`);
} else {
  console.log('  "sound-engine" item already exists, skipping');
}

// Add sound-engine.ts file to all sound items that have use-sound.ts in their files
let updated = 0;
for (const item of registry.items) {
  if (item.type !== "registry:block") continue;

  const files = item.files as Array<{ path: string; type: string }>;
  if (!files) continue;

  // Check if it already has sound-engine.ts
  const hasEngine = files.some(
    (f) => f.path === "registry/soundcn/lib/sound-engine.ts"
  );
  if (hasEngine) continue;

  // Check if it has use-sound.ts (meaning it's a sound item)
  const hasUseSound = files.some(
    (f) => f.path === "registry/soundcn/hooks/use-sound.ts"
  );
  if (!hasUseSound) continue;

  files.push({ ...SOUND_ENGINE_FILE });
  updated++;
}

if (dryRun) {
  console.log(
    `DRY RUN — would update ${updated} sound items with sound-engine.ts`
  );
  process.exit(0);
}

writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + "\n");
console.log(`Updated ${updated} sound items with sound-engine.ts file`);
