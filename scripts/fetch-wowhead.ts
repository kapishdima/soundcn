#!/usr/bin/env npx tsx
/**
 * Downloads WoW Classic sounds from wowhead.com as OGG files into assets/warcraft/
 *
 * Usage:
 *   npx tsx scripts/fetch-wowhead.ts
 *   npx tsx scripts/fetch-wowhead.ts --dry-run
 *   npx tsx scripts/fetch-wowhead.ts --category "User Interface"
 *   npx tsx scripts/fetch-wowhead.ts --filter "click"
 *   npx tsx scripts/fetch-wowhead.ts --limit 100
 *   npx tsx scripts/fetch-wowhead.ts --list-categories
 *   npx tsx scripts/fetch-wowhead.ts --concurrency 5
 */

import { writeFileSync, mkdirSync, existsSync, readdirSync } from "fs";
import { resolve, dirname } from "path";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const OUT_DIR = resolve(ROOT, "assets/warcraft");
const WOWHEAD_URL = "https://www.wowhead.com/classic/sounds";
const PAGE_SIZE = 1000;

// ── CLI ────────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const listCategories = args.includes("--list-categories");

function flag(name: string): string | undefined {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : undefined;
}

const categoryFilter = flag("category")?.toLowerCase();
const nameFilter = flag("filter")?.toLowerCase();
const limit = parseInt(flag("limit") ?? "Infinity", 10);
const concurrency = parseInt(flag("concurrency") ?? "4", 10);

// ── Types ──────────────────────────────────────────────────────────────────────

interface WowFile {
  id: number;
  title: string;
  url: string;
}

interface WowSound {
  id: number;
  type: number;
  name: string;
  popularity?: number;
  files: WowFile[];
}

// ── Fetch page ─────────────────────────────────────────────────────────────────

async function fetchPage(start: number): Promise<string> {
  const url = `${WOWHEAD_URL}?start=${start}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

// ── Parse wowhead HTML ─────────────────────────────────────────────────────────

/**
 * Extract a JSON array starting at the first '[' found after `startIdx`.
 * Uses bracket counting to handle arbitrarily nested structures.
 */
function extractJsonArray(html: string, startIdx: number): unknown[] | null {
  const arrayStart = html.indexOf("[", startIdx);
  if (arrayStart === -1) return null;

  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = arrayStart; i < html.length; i++) {
    const c = html[i];
    if (escape) { escape = false; continue; }
    if (c === "\\" && inString) { escape = true; continue; }
    if (c === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (c === "[") depth++;
    else if (c === "]") {
      depth--;
      if (depth === 0) {
        try {
          return JSON.parse(html.slice(arrayStart, i + 1));
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}

function parsePage(html: string): { sounds: WowSound[]; total: number } {
  // Wowhead embeds: new Listview({..., template: 'sound', ..., data: [...]})
  // Find the Listview that contains template:"sound"
  const templateIdx = html.search(/template\s*:\s*['"]sound['"]/);
  if (templateIdx === -1) {
    throw new Error("Sound Listview not found — wowhead may have changed structure");
  }

  // Find "data:" after the template marker
  const dataIdx = html.indexOf("data:", templateIdx);
  if (dataIdx === -1) throw new Error("'data:' not found after Listview template");

  const sounds = extractJsonArray(html, dataIdx + 5) as WowSound[] | null;
  if (!sounds) throw new Error("Failed to extract sound data array");

  const totalMatch = html.match(/([\d,]+)\s+sounds?\s+found/i);
  const total = totalMatch
    ? parseInt(totalMatch[1].replace(/,/g, ""), 10)
    : sounds.length;

  return { sounds, total };
}

/** Extract type id→name map from filter sidebar HTML */
function parseCategories(html: string): Map<number, string> {
  const map = new Map<number, string>();
  const optMatches = html.matchAll(/<option[^>]+value="(\d+)"[^>]*>\s*([^<]+?)\s*<\/option>/gi);
  for (const m of optMatches) {
    const id = parseInt(m[1], 10);
    const name = m[2].trim();
    if (id > 0 && name) map.set(id, name);
  }
  return map;
}

// ── Name helpers ───────────────────────────────────────────────────────────────

function toFilename(wowName: string, fileTitle: string): string {
  // Prefer the file title (more descriptive), fall back to sound name
  const base = fileTitle || wowName;
  return (
    base
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
      .replace(/([a-zA-Z])(\d)/g, "$1-$2")
      .replace(/(\d)([a-zA-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .replace(/-+/g, "-")
      .toLowerCase()
      .replace(/^-|-$/g, "") + ".ogg"
  );
}

// ── Concurrency pool ───────────────────────────────────────────────────────────

async function runPool<T>(tasks: (() => Promise<T>)[], max: number): Promise<void> {
  let i = 0;
  async function worker() {
    while (i < tasks.length) await tasks[i++]();
  }
  await Promise.all(Array.from({ length: max }, worker));
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Fetching WoW Classic sound list from wowhead.com...\n");

  const firstHtml = await fetchPage(0);
  const { sounds: firstBatch, total } = parsePage(firstHtml);
  const categories = parseCategories(firstHtml);

  if (listCategories) {
    console.log("Available categories:\n");
    const byName = [...categories.entries()].sort((a, b) => a[1].localeCompare(b[1]));
    for (const [id, name] of byName) {
      const count = firstBatch.filter((s) => s.type === id).length;
      console.log(`  [${String(id).padStart(3)}] ${name}  (${count}+ sounds)`);
    }
    console.log(`\n(counts are from first ${firstBatch.length} results only)`);
    process.exit(0);
  }

  console.log(`Total sounds: ${total}, fetched first page: ${firstBatch.length}`);

  // Fetch remaining pages
  let allSounds = [...firstBatch];
  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (totalPages > 1) {
    console.log(`Fetching ${totalPages - 1} more pages...`);
    for (let page = 1; page < totalPages; page++) {
      process.stdout.write(`  page ${page + 1}/${totalPages}... `);
      try {
        const html = await fetchPage(page * PAGE_SIZE);
        const { sounds } = parsePage(html);
        allSounds.push(...sounds);
        console.log(`+${sounds.length}`);
      } catch (e) {
        console.log(`FAILED: ${e}`);
      }
      await new Promise((r) => setTimeout(r, 400));
    }
  }

  console.log(`\nTotal loaded: ${allSounds.length} sounds`);

  // Filter by category
  if (categoryFilter) {
    const matchIds = new Set<number>();
    for (const [id, name] of categories) {
      if (name.toLowerCase().includes(categoryFilter)) matchIds.add(id);
    }
    const numeric = parseInt(categoryFilter, 10);
    if (!isNaN(numeric)) matchIds.add(numeric);

    if (matchIds.size > 0) {
      allSounds = allSounds.filter((s) => matchIds.has(s.type));
      console.log(`Category "${categoryFilter}": ${allSounds.length} sounds`);
    } else {
      console.warn(`Category "${categoryFilter}" not matched. Use --list-categories.`);
    }
  }

  // Filter by name
  if (nameFilter) {
    allSounds = allSounds.filter((s) => s.name.toLowerCase().includes(nameFilter));
    console.log(`Name filter "${nameFilter}": ${allSounds.length} sounds`);
  }

  // Sort by popularity desc
  allSounds.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));

  // Limit
  if (isFinite(limit)) allSounds = allSounds.slice(0, limit);

  // Only sounds with files
  allSounds = allSounds.filter((s) => s.files?.length > 0);

  // Flatten to individual files (one row per file variant)
  const toDownload: Array<{ soundName: string; catName: string; file: WowFile; destPath: string }> = [];

  // Load existing files to skip
  const existing = new Set<string>();
  if (existsSync(OUT_DIR)) {
    for (const f of readdirSync(OUT_DIR)) existing.add(f);
  }

  for (const sound of allSounds) {
    const catName = categories.get(sound.type) ?? `type-${sound.type}`;
    for (const file of sound.files) {
      const filename = toFilename(sound.name, file.title);
      if (existing.has(filename)) continue;
      toDownload.push({
        soundName: sound.name,
        catName,
        file,
        destPath: resolve(OUT_DIR, filename),
      });
    }
  }

  const skippedExisting = allSounds.flatMap((s) => s.files).length - toDownload.length;

  console.log(`\n${toDownload.length} files to download (${skippedExisting} already exist)\n`);

  if (toDownload.length === 0) {
    console.log("Nothing to do.");
    process.exit(0);
  }

  if (dryRun) {
    console.log("DRY RUN:\n");
    for (const { file, destPath } of toDownload.slice(0, 30)) {
      console.log(`  ${resolve(OUT_DIR, destPath).replace(ROOT + "/", "")}  ← ${file.url}`);
    }
    if (toDownload.length > 30) console.log(`  ... and ${toDownload.length - 30} more`);
    process.exit(0);
  }

  mkdirSync(OUT_DIR, { recursive: true });

  let success = 0;
  let errors = 0;

  const tasks = toDownload.map(({ soundName, catName, file, destPath }) => async () => {
    try {
      const res = await fetch(file.url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
          Referer: "https://www.wowhead.com/",
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      writeFileSync(destPath, buf);
      console.log(`  OK  ${destPath.replace(ROOT + "/", "")}  (${Math.round(buf.length / 1024)}KB)`);
      success++;
    } catch (e) {
      console.warn(`  ERR ${soundName} — ${e}`);
      errors++;
    }
  });

  console.log(`Downloading with concurrency=${concurrency}...\n`);
  await runPool(tasks, concurrency);

  console.log(`\nDone: ${success} downloaded, ${errors} errors`);
  console.log(`Saved to: assets/warcraft/`);
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
