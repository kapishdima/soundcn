#!/usr/bin/env npx tsx
/**
 * Enriches registry.json sound items with AI-generated descriptions and keywords.
 *
 * Usage:
 *   bun run registry:enrich                    # enrich all unenriched sounds
 *   bun run registry:enrich --dry-run          # preview without writing
 *   bun run registry:enrich --force            # re-enrich all sounds
 *   bun run registry:enrich --model <id>       # use a specific model
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { generateObject } from "ai";
import { createGateway } from "@ai-sdk/gateway";
import { z } from "zod";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const REGISTRY_PATH = resolve(ROOT, "registry.json");

// ── CLI flags ───────────────────────────────────────────────────────

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const force = args.includes("--force");

function getFlag(name: string): string | undefined {
  const idx = args.indexOf(name);
  return idx !== -1 ? args[idx + 1] : undefined;
}

const modelId = getFlag("--model") ?? "google/gemini-2.5-flash";

// ── AI setup ────────────────────────────────────────────────────────

const apiKey = process.env.AI_GATEWAY_API_KEY;
if (!apiKey || apiKey === "your_key_here") {
  console.error(
    "Error: Set AI_GATEWAY_API_KEY in .env.local before running this script."
  );
  process.exit(1);
}

const gateway = createGateway({ apiKey });

const SoundEnrichmentSchema = z.object({
  sounds: z.array(
    z.object({
      name: z.string().describe("The exact sound name from the input"),
      description: z
        .string()
        .describe(
          "One sentence describing what the sound is and its ideal use-case"
        ),
      keywords: z
        .array(z.string())
        .describe(
          "15-20 semantic keywords: UI use-cases, emotions, synonyms, developer intent"
        ),
    })
  ),
});

// ── helpers ──────────────────────────────────────────────────────────

interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  categories?: string[];
  author?: string;
  meta?: {
    duration?: number;
    format?: string;
    sizeKb?: number;
    license?: string;
    tags?: string[];
    keywords?: string[];
  };
  [key: string]: unknown;
}

function needsEnrichment(item: RegistryItem): boolean {
  if (force) return true;
  return !item.meta?.keywords || item.meta.keywords.length === 0;
}

function buildPrompt(batch: RegistryItem[]): string {
  const soundList = batch
    .map(
      (s) =>
        `- name: "${s.name}", title: "${s.title}", categories: [${(s.categories ?? []).join(", ")}], tags: [${(s.meta?.tags ?? []).join(", ")}], duration: ${s.meta?.duration ?? 0}s`
    )
    .join("\n");

  return `You are a sound design expert helping developers find the right UI sound effects.

For each sound below, generate:
1. **description**: One clear sentence describing what the sound sounds like and its ideal use-case in a UI/app context.
2. **keywords**: 15-20 semantic search keywords covering:
   - UI use-cases (e.g., button press, form submit, toast notification)
   - Emotions/feel (e.g., satisfying, urgent, playful, subtle)
   - Synonyms (e.g., click→tap/press/hit, notification→alert/ping/ding)
   - Developer intent (e.g., modal close, dropdown open, error feedback)
   - Sound characteristics (e.g., short, crisp, deep, bright)

Keep keywords lowercase, single words or short phrases. Make the name field match EXACTLY.

Sounds:
${soundList}`;
}

const BATCH_SIZE = 50;

function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

// ── main ────────────────────────────────────────────────────────────

async function main() {
  const registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf-8"));

  const soundItems: RegistryItem[] = registry.items.filter(
    (item: RegistryItem) => item.type === "registry:block"
  );

  const toEnrich = soundItems.filter(needsEnrichment);

  console.log(
    `Found ${soundItems.length} sounds, ${toEnrich.length} need enrichment.`
  );

  if (toEnrich.length === 0) {
    console.log("Nothing to enrich. Use --force to re-enrich all sounds.");
    return;
  }

  if (dryRun) {
    console.log(`\nDRY RUN — would enrich ${toEnrich.length} sounds:`);
    for (const s of toEnrich.slice(0, 10)) {
      console.log(`  - ${s.name}`);
    }
    if (toEnrich.length > 10) {
      console.log(`  ... and ${toEnrich.length - 10} more`);
    }
    console.log(`\nModel: ${modelId}`);
    console.log(`Batches: ${Math.ceil(toEnrich.length / BATCH_SIZE)}`);
    return;
  }

  const batches = chunk(toEnrich, BATCH_SIZE);
  console.log(
    `Processing ${batches.length} batches of up to ${BATCH_SIZE} sounds...`
  );
  console.log(`Model: ${modelId}\n`);

  // Build a lookup for quick writes back
  const itemByName = new Map<string, RegistryItem>();
  for (const item of registry.items) {
    itemByName.set(item.name, item);
  }

  let enriched = 0;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(
      `Batch ${i + 1}/${batches.length} (${batch.length} sounds)...`
    );

    try {
      const { object } = await generateObject({
        model: gateway(modelId),
        schema: SoundEnrichmentSchema,
        prompt: buildPrompt(batch),
      });

      for (const result of object.sounds) {
        const item = itemByName.get(result.name);
        if (!item) {
          console.warn(`  Warning: "${result.name}" not found in registry`);
          continue;
        }

        item.description = result.description;
        if (!item.meta) item.meta = {};
        item.meta.keywords = result.keywords;
        enriched++;
      }

      const missing = batch.length - object.sounds.length;
      if (missing > 0) {
        console.warn(`  Warning: ${missing} sounds missing from AI response`);
      }

      console.log(`  Done — ${object.sounds.length} sounds enriched`);
    } catch (err) {
      console.error(`  Error on batch ${i + 1}:`, err);
      console.error("  Continuing with next batch...");
    }
  }

  // Write back
  writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + "\n");
  console.log(`\nDone! Enriched ${enriched} sounds in registry.json.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
