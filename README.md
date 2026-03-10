# soundcn

![soundcn](public/hero.png)

Open-source collection of UI sound effects, installable via [shadcn CLI](https://ui.shadcn.com/docs/cli).

## Problem

Adding sound to web interfaces is tedious. You either hunt for free samples, deal with licensing, wire up audio loading, or pull in heavy libraries — all for a simple button click sound.

## What is soundcn

A curated registry of 700+ short sound effects (clicks, notifications, transitions, game sounds) that you can add to any React project with a single command:

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
    <td align="center" width="150"><a href="https://shoogle.dev/"><img src="public/sponsors/shoogle.png" width="60" alt="Shoogle"/><br/><b>Shoogle</b></a></td>
    <td align="center" width="150"><a href="https://nuqs.dev/"><img src="https://pbs.twimg.com/profile_images/1825629130852859904/TvP7rOsK_400x400.jpg" width="60" alt="nuqs"/><br/><b>nuqs</b></a></td>
    <td align="center" width="150"><a href="https://beste.co/"><img src="https://pbs.twimg.com/profile_images/2019696450482184192/64Ony09u_400x400.png" width="60" alt="Beste"/><br/><b>Beste</b></a></td>
    <td align="center" width="150"><a href="https://shadcnstudio.com/?utm_source=soundcn&utm_medium=banner&utm_campaign=github"><img src="https://cdn.shadcnstudio.com/ss-assets/marketing/shadcn-studio-logos/shadcn-studio-symbol.svg" width="60" alt="Shadcn Studio"/><br/><b>Shadcn Studio</b></a></td>
    <td align="center" width="150"><a href="https://shadcnspace.com/"><img src="https://pbs.twimg.com/profile_images/1998745226710757379/OKDPM3p-_400x400.jpg" width="60" alt="Shadcn Space"/><br/><b>Shadcn Space</b></a></td>
  </tr>
  <tr>
    <td align="center" width="150"><a href="https://x.com/AliBey_10"><img src="https://avatars.githubusercontent.com/u/42802922?v=4" width="60" alt="Ali Bey"/><br/><b>Ali Bey</b></a></td>
    <td align="center" width="150"><a href="https://x.com/brobro"><img src="https://pbs.twimg.com/profile_images/2004979173547270144/rDHpaxF-_400x400.jpg" width="60" alt="Bro Bro"/><br/><b>Bro Bro</b></a></td>
    <td align="center" width="150"><a href="https://educalvolopez.com/"><img src="https://avatars.githubusercontent.com/u/13372238?v=4" width="60" alt="Edu Calvo"/><br/><b>Edu Calvo</b></a></td>
    <td align="center" width="150"><a href="https://www.orcdev.com/"><img src="https://avatars.githubusercontent.com/u/7549148?v=4" width="60" alt="OrcDev"/><br/><b>OrcDev</b></a></td>
    <td align="center" width="150"><a href="https://irsyad.co/"><img src="https://avatars.githubusercontent.com/u/44585532?v=4" width="60" alt="Irsyad A. Panjaitan"/><br/><b>Irsyad A. Panjaitan</b></a></td>
  </tr>
  <tr>
    <td align="center" width="150"><a href="https://chanhdai.com/"><img src="https://assets.chanhdai.com/images/chanhdai-avatar-ghibli.webp" width="60" alt="Chánh Đại"/><br/><b>Chánh Đại</b></a></td>
    <td align="center" width="150"><a href="https://pro.reactbits.dev/"><img src="https://avatars.githubusercontent.com/u/48634587?v=4" width="60" alt="David Haz"/><br/><b>David Haz</b></a></td>
    <td align="center" width="150"><a href="https://efferd.com/"><img src="https://pbs.twimg.com/profile_images/2024177105110781953/zPXZyKbx_400x400.jpg" width="60" alt="Shaban"/><br/><b>Shaban</b></a></td>
    <td align="center" width="150"><a href="https://ephraimduncan.com/"><img src="https://pbs.twimg.com/profile_images/1740764353408753664/uPGbBhm0_400x400.jpg" width="60" alt="Ephraim Duncan"/><br/><b>Ephraim Duncan</b></a></td>
    <td align="center" width="150"><a href="https://lucide-animated.com/"><img src="https://pbs.twimg.com/profile_images/2008873143859888128/SH9UlBBa_400x400.jpg" width="60" alt="Dmytro Tovstokoryi"/><br/><b>Dmytro Tovstokoryi</b></a></td>
  </tr>
  <tr>
    <td align="center" width="150"><a href="https://ui.aceternity.com/"><img src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg" width="60" alt="Manu Arora"/><br/><b>Manu Arora</b></a></td>
    <td align="center" width="150"><a href="https://www.aniketpawar.com/"><img src="https://pbs.twimg.com/profile_images/2026346581998579718/sTG3FVKy_400x400.jpg" width="60" alt="Aniket Pawar"/><br/><b>Aniket Pawar</b></a></td>
    <td align="center" width="150"><a href="https://mellowlines.dev/"><img src="https://pbs.twimg.com/profile_images/1780553225067692032/GAal_jdo_400x400.jpg" width="60" alt="Alex Kostyniuk"/><br/><b>Alex Kostyniuk</b></a></td>
    <td align="center" width="150"><a href="https://www.kartikk.tech/"><img src="https://pbs.twimg.com/profile_images/2002424842470203392/4ZusYS4Y_400x400.jpg" width="60" alt="Kartik"/><br/><b>Kartik</b></a></td>
    <td align="center" width="150"><a href="https://brodin.dev/"><img src="https://pbs.twimg.com/profile_images/1842594307569573888/1ZQfD1w0_400x400.jpg" width="60" alt="Nathan Brodin"/><br/><b>Nathan Brodin</b></a></td>
  </tr>
  <tr>
    <td align="center" width="150"><a href="https://pro.lndev.me/"><img src="https://pbs.twimg.com/profile_images/1890537843908374528/wvFcdsEl_400x400.jpg" width="60" alt="LN"/><br/><b>LN</b></a></td>
  </tr>
</table>

## Stats

[![RepoStars](https://repostars.dev/api/embed?repo=kapishdima%2Fsoundcn&theme=minimal)](https://repostars.dev/?repos=kapishdima%2Fsoundcn&theme=minimal)


## License

Most sounds are sourced from CC0-licensed collections (primarily [Kenney](https://kenney.nl)).

The **World of Warcraft collection** (110 sounds) is an exception — those assets are property of Blizzard Entertainment, Inc. and are **not** CC0 or freely licensed. soundcn is not affiliated with or endorsed by Blizzard Entertainment, Inc. World of Warcraft® is a registered trademark of Blizzard Entertainment, Inc. These sounds are included for non-commercial, educational, and reference purposes only.
