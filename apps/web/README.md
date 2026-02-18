# soundcn

![soundcn](public/hero.png)

Open-source collection of UI sound effects, installable via [shadcn CLI](https://ui.shadcn.com/docs/cli).

## Problem

Adding sound to web interfaces is tedious. You either hunt for free samples, deal with licensing, wire up audio loading, or pull in heavy libraries — all for a simple button click sound.

## What is soundcn

A curated registry of 700+ short sound effects (clicks, notifications, transitions, game sounds) that you can add to any React project with a single command:

```bash
npx shadcn add https://soundcn.xyz/r/click-soft.json
```

Each sound is a self-contained TypeScript module with an inline base64 data URI — no external files, no runtime fetching, no CORS issues. Sounds are installed directly into your codebase, not as a dependency.

Includes a `useSound` hook for playback via the Web Audio API. Zero dependencies.

## How it works

- Browse sounds at [soundcn.xyz](https://soundcn.xyz/)
- Install any sound — it copies the `.ts` file and the `useSound` hook into your project
- Import and play:

```tsx
import { useSound } from "@/hooks/use-sound";
import { clickSoftSound } from "@/sounds/click-soft";

const [play] = useSound(clickSoftSound);
```

## License

Sounds are sourced from CC0-licensed collections (primarily [Kenney](https://kenney.nl)).
