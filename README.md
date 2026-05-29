# soundcn

![soundcn](public/og-dark.png)

Open-source collection of UI sound effects, installable via [shadcn CLI](https://ui.shadcn.com/docs/cli).

## Problem

Adding sound to web interfaces is tedious. You either hunt for free samples, deal with licensing, wire up audio loading, or pull in heavy libraries — all for a simple button click sound.

## What is soundcn

A curated registry of 700+ short sound effects (clicks, notifications, transitions, game sounds) that you can add to any React project with a single command:
…
```bash
npx shadcn add @soundcn/click-soft
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

## Thanks all my sponsors

<table align="center">
  <tr>
    <td align="center" width="150"><a href="https://shadcnblocks.com/?utm_source=soundcn.xyz"><b>Shadcnblocks.com</b><br/><sub>2000+ Shadcn UI Blocks</sub></a></td>
  </tr>
</table>

## Stats

[![RepoStars](https://repostars.dev/api/embed?repo=kapishdima%2Fsoundcn&theme=minimal)](https://repostars.dev/?repos=kapishdima%2Fsoundcn&theme=minimal)


## License

Most sounds are sourced from CC0-licensed collections (primarily [Kenney](https://kenney.nl)).

The **World of Warcraft collection** (110 sounds) is an exception — those assets are property of Blizzard Entertainment, Inc. and are **not** CC0 or freely licensed. soundcn is not affiliated with or endorsed by Blizzard Entertainment, Inc. World of Warcraft® is a registered trademark of Blizzard Entertainment, Inc. These sounds are included for non-commercial, educational, and reference purposes only.
