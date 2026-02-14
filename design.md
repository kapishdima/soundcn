Plan: Sound Demo Page

 Context

 The soundcn landing page currently shows "Coming soon". We need to build the main library page where users can browse, preview, and copy install commands for all curated
 sounds. References: svgl.app (category sidebar + grid) and lucide-animated.com (flat grid + search). Given we have only 12 curated sounds, a single-page layout with
 horizontal category pills and search is the right fit (sidebar would be overkill).

 registry.json Changes

 Minimal change needed. Current structure already has all required metadata (categories, meta.tags, meta.duration, meta.sizeKb, meta.license, author).

 One fix to make: add registryDependencies: ["use-sound"] to each sound item so npx shadcn add auto-installs the hook. This is needed for the install flow regardless.

 Primary category for filtering = categories[0] (already works: click, switch, notification, feedback, hover, game-8bit).

 Page Structure

 Single page at /sounds with client-side search + category filtering. No separate category routes for now.

 /sounds
 ├── Header: "Sounds" title + subtitle
 ├── Search bar (Input + Search icon)
 ├── Category pills: [All] [Click (2)] [Switch (2)] [Feedback (2)] [Notification (1)] [Hover (1)] [8-Bit Game (2)]
 └── Grid (1/2/3 cols responsive)
     └── SoundCard x N
         ├── CardHeader: title + category badge
         ├── CardContent: play button (centered, prominent) + description
         ├── Meta row: duration · size · license
         └── CardFooter: copy install command button

 Component Tree

 app/sounds/page.tsx           (Server) - reads registry.json, extracts catalog, passes to client
   components/sounds-page.tsx  (Client) - search/filter state, layout
     components/sound-search.tsx      - Input wrapper with Search icon
     components/category-filter.tsx   - horizontal pill buttons
     components/sound-grid.tsx        - responsive CSS grid
       components/sound-card.tsx      (Client) - Card with play, info, copy

 New Files
 ┌────────────────────────────────┬──────────────────────────────────────────────────────────────────────────────────────────────────┐
 │              File              │                                             Purpose                                              │
 ├────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────┤
 │ lib/sound-catalog.ts           │ SoundCatalogItem type + CATEGORY_CONFIG display names                                            │
 ├────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────┤
 │ lib/play-sound.ts              │ Imperative playSound(dataUri) utility (Web Audio API, same pattern as use-sound.ts but non-hook) │
 ├────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────┤
 │ lib/sound-loader.ts            │ Map of soundName -> () => import(...) for dynamic loading (avoids bundling base64 data)          │
 ├────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────┤
 │ app/sounds/page.tsx            │ Server component: read registry.json, filter to sounds, pass catalog                             │
 ├────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────┤
 │ components/sounds-page.tsx     │ Client wrapper: search query + active category state, filtering logic                            │
 ├────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────┤
 │ components/sound-search.tsx    │ Search input using shadcn Input + lucide Search icon                                             │
 ├────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────┤
 │ components/category-filter.tsx │ Horizontal scrollable row of category pill buttons                                               │
 ├────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────┤
 │ components/sound-grid.tsx      │ grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 + empty state                               │
 ├────────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────┤
 │ components/sound-card.tsx      │ shadcn Card with play button, metadata, copy command                                             │
 └────────────────────────────────┴──────────────────────────────────────────────────────────────────────────────────────────────────┘
 Modified Files
 ┌────────────────┬────────────────────────────────────────────────────────────┐
 │      File      │                           Change                           │
 ├────────────────┼────────────────────────────────────────────────────────────┤
 │ registry.json  │ Add registryDependencies: ["use-sound"] to each sound item │
 ├────────────────┼────────────────────────────────────────────────────────────┤
 │ app/page.tsx   │ Add link/CTA to /sounds                                    │
 ├────────────────┼────────────────────────────────────────────────────────────┤
 │ app/layout.tsx │ Update metadata title/description                          │
 └────────────────┴────────────────────────────────────────────────────────────┘
 Key Design Decisions

 Playback: imperative playSound() instead of useSound hook

 The useSound hook pre-decodes audio in useEffect — not suitable for a catalog page where we need lazy on-demand playback. Create lib/play-sound.ts that reuses the same
 AudioContext singleton + buffer cache pattern (~20 lines) but as a plain async function.

 Dynamic imports via explicit loader map

 Template literal dynamic imports (import(\@/sounds/${name}/${name}`)) are unreliable with bundlers. Instead, lib/sound-loader.ts` maps each curated sound name to a static
  import function:
 const loaders = {
   "click-8bit": () => import("@/registry/soundcn/sounds/click-8bit/click-8bit"),
   // ...12 entries
 };
 This ensures proper code-splitting — each sound's base64 data is a separate chunk loaded only on play.

 Search: instant client-side filtering

 Search matches against name, title, description, and meta.tags. With 12 items, no debounce needed. Filter logic in useMemo.

 SoundCard play button states

 - Idle: Play icon (lucide Play)
 - Loading: Spinner (lucide Loader2 with animate-spin)
 - Playing: Stop icon (lucide Square), auto-returns to idle on sound end

 Copy install button

 Shows npx shadcn add https://soundcn.dev/r/{name}.json in monospace. Click copies to clipboard, shows checkmark for 2s.

 Implementation Order

 0. Save this design document as design.md in project root
 1. lib/sound-catalog.ts — types + category config
 2. lib/play-sound.ts — imperative playback utility
 3. lib/sound-loader.ts — dynamic import map
 4. components/sound-search.tsx — search input
 5. components/category-filter.tsx — category pills
 6. components/sound-card.tsx — individual card (play + copy + meta)
 7. components/sound-grid.tsx — grid layout + empty state
 8. components/sounds-page.tsx — client wrapper with state
 9. app/sounds/page.tsx — server component entry point
 10. registry.json — add registryDependencies
 11. app/page.tsx + app/layout.tsx — update landing page and metadata

 Reuse Existing Code

 - registry/soundcn/ui/card.tsx — Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
 - registry/soundcn/ui/button.tsx — Button (variants: default, secondary, ghost, outline; sizes: default, sm, icon)
 - registry/soundcn/ui/input.tsx — Input
 - lib/utils.ts — cn() utility
 - lucide-react — Play, Square, Loader2, Search, Copy, Check, Clock icons
 - AudioContext pattern from registry/soundcn/hooks/use-sound.ts lines 10-36

 Verification

 1. npm run dev — page loads at /sounds without errors
 2. All 12 sounds visible in the grid
 3. Click play on any card — sound plays, button shows stop state
 4. Search "8bit" — filters to click-8bit and jump-8bit
 5. Click category pill "Click" — shows only click-8bit and click-soft
 6. Click "All" — shows all sounds again
 7. Click copy button — install command copied to clipboard
 8. npm run build — no build errors, sound data is code-split (not in main bundle)