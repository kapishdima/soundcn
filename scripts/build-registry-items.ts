#!/usr/bin/env npx tsx
/**
 * Builds individual /r/{name}.json files from registry.json.
 *
 * For each registry item, reads source files, inlines their content,
 * and writes a shadcn-compatible registry-item JSON to public/r/.
 *
 * Also generates public/r/registry.json (public index without content/keywords).
 *
 * Usage:
 *   bun scripts/build-registry-items.ts
 *   npx tsx scripts/build-registry-items.ts
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const REGISTRY_PATH = resolve(ROOT, "registry.json");
const OUTPUT_DIR = resolve(ROOT, "public/r");

const SCHEMA = "https://ui.shadcn.com/schema/registry-item.json";
const REGISTRY_SCHEMA = "https://ui.shadcn.com/schema/registry.json";

// ── helpers ──────────────────────────────────────────────────────────

function stripKeywords(meta: Record<string, unknown> | undefined) {
  if (!meta) return meta;
  const { keywords, ...rest } = meta;
  return rest;
}

// ── main ─────────────────────────────────────────────────────────────

const registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf-8"));
const items: Array<Record<string, unknown>> = registry.items;

mkdirSync(OUTPUT_DIR, { recursive: true });

let created = 0;
let errors = 0;

const publicItems: Array<Record<string, unknown>> = [];

for (const item of items) {
  const name = item.name as string;

  try {
    // Read and inline file contents
    const files = (item.files as Array<Record<string, unknown>>) ?? [];
    const filesWithContent = files.map((file) => {
      const filePath = resolve(ROOT, file.path as string);
      const content = readFileSync(filePath, "utf-8");
      return { ...file, content };
    });

    // Build the individual registry-item JSON
    const output: Record<string, unknown> = { $schema: SCHEMA };

    // Preserve field order: name, type, title, author, description, registryDependencies, files, meta, categories
    if (item.name != null) output.name = item.name;
    if (item.type != null) output.type = item.type;
    if (item.title != null) output.title = item.title;
    if (item.author != null) output.author = item.author;
    if (item.description != null) output.description = item.description;
    if (item.registryDependencies != null)
      output.registryDependencies = item.registryDependencies;
    output.files = filesWithContent;
    if (item.meta != null) output.meta = stripKeywords(item.meta as Record<string, unknown>);
    if (item.categories != null) output.categories = item.categories;

    const json = JSON.stringify(output, null, 2) + "\n";
    writeFileSync(resolve(OUTPUT_DIR, `${name}.json`), json);
    created++;

    // Build public index entry (no content, no keywords)
    const publicFiles = files.map(({ content, ...rest }) => rest);
    const publicItem: Record<string, unknown> = {};
    if (item.name != null) publicItem.name = item.name;
    if (item.type != null) publicItem.type = item.type;
    if (item.title != null) publicItem.title = item.title;
    if (item.author != null) publicItem.author = item.author;
    if (item.description != null) publicItem.description = item.description;
    if (item.registryDependencies != null)
      publicItem.registryDependencies = item.registryDependencies;
    publicItem.files = publicFiles;
    if (item.meta != null) publicItem.meta = stripKeywords(item.meta as Record<string, unknown>);
    if (item.categories != null) publicItem.categories = item.categories;

    publicItems.push(publicItem);
  } catch (err) {
    errors++;
    console.error(`  ERROR ${name}: ${(err as Error).message}`);
  }
}

// Write public registry index
const publicRegistry = {
  $schema: REGISTRY_SCHEMA,
  name: registry.name,
  homepage: registry.homepage,
  items: publicItems,
};
writeFileSync(
  resolve(OUTPUT_DIR, "registry.json"),
  JSON.stringify(publicRegistry, null, 2) + "\n"
);

console.log(`\nDone! Created ${created} item files in public/r/`);
if (errors > 0) {
  console.log(`  ${errors} errors (see above)`);
}
console.log(`  registry.json updated with ${publicItems.length} items`);
