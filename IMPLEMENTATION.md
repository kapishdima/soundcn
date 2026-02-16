# soundcn - shadcn Registry for Sound Effects

## Context

Проект в стиле shadcn/ui, но для звуковых эффектов. Пользователи устанавливают звуки через `npx shadcn add https://soundcn.xyz/r/click-8bit.json` и получают TypeScript-модуль с base64-закодированным звуком + React-хук для воспроизведения. Ноль зависимостей, работает офлайн, tree-shakeable.

## Ключевое архитектурное решение: Base64 в TypeScript

shadcn registry распространяет только **текстовые файлы** (content поле в JSON). Бинарные файлы (MP3) напрямую не поддерживаются. Решение: кодировать MP3 в base64 data URI внутри `.ts` файлов.

- Overhead: +33% к размеру (30KB MP3 -> 40KB текст)
- Для UI-звуков (5-50KB) это приемлемо
- Tree-shaking: неиспользуемые звуки удаляются бандлером
- Лимит: звуки до ~100KB (покрывает 95% UI-эффектов)

## Лицензирование

**Источник:** Kenney (CC0, Public Domain) - 60K+ ассетов, полностью свободные, ноль ограничений.
Другие источники можно добавить позже после проверки лицензий.

## Структура проекта

```
soundcn/
├── app/                          # Next.js website
│   ├── layout.tsx
│   ├── page.tsx                  # Landing page
│   ├── globals.css
│   ├── sounds/
│   │   ├── page.tsx              # Browse all sounds
│   │   └── [category]/page.tsx   # Filter by category
│   └── docs/
│       └── page.tsx              # Documentation
│
├── components/                   # Website components
│   ├── sound-card.tsx            # Card with play button
│   ├── sound-player.tsx          # Inline player
│   ├── sound-grid.tsx            # Grid layout
│   ├── copy-install-button.tsx   # Copy npx command
│   └── ...
│
├── registry/                     # Registry source files
│   └── new-york/
│       ├── hooks/
│       │   └── use-sound.ts      # Core hook (Web Audio API)
│       ├── lib/
│       │   └── sound-types.ts    # TypeScript types
│       └── sounds/               # Sound modules
│           ├── click-8bit/click-8bit.ts
│           ├── click-soft/click-soft.ts
│           ├── switch-on/switch-on.ts
│           ├── notification-pop/notification-pop.ts
│           └── ...
│
├── scripts/                      # Build pipeline
│   ├── encode-sound.ts           # Audio -> base64 TS module
│   ├── import-kenney.ts          # Batch import from Kenney packs
│   ├── validate-sounds.ts        # Validate all sounds
│   └── generate-catalog.ts       # Generate website catalog
│
├── raw-sounds/                   # Source audio files (not in registry)
│   ├── kenney-ui-audio/
│   ├── kenney-interface-sounds/
│   └── ...
│
├── public/r/                     # Built registry JSON (shadcn build output)
├── registry.json                 # Registry manifest
├── components.json               # shadcn config
└── package.json
```

## Как это работает

### 1. Sound module (что устанавливается пользователю)

```typescript
// registry/soundcn/sounds/click-8bit/click-8bit.ts
import type { SoundAsset } from "@/lib/sound-types";

export const click8bitSound: SoundAsset = {
  name: "click-8bit",
  dataUri: "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAA...",
  duration: 0.15,
  format: "mp3",
  license: "CC0",
  author: "Kenney",
};
```

### 2. Core hook (устанавливается автоматически как registryDependency)

```typescript
// registry/soundcn/hooks/use-sound.ts
"use client";
// Lightweight hook on Web Audio API:
// - Singleton AudioContext (shared across all sounds)
// - Buffer caching (no re-decoding same sound)
// - Autoplay policy handling (ctx.resume())
// - SSR-safe ("use client" + lazy init)
// - ~100 lines, ZERO npm dependencies
export function useSound(sound: SoundAsset, options?: UseSoundOptions): UseSoundReturn
```

API:
```typescript
const [play, { stop, pause, isPlaying, duration }] = useSound(sound, {
  volume: 0.5,        // 0-1
  playbackRate: 1.0,  // speed multiplier
  interrupt: true,     // stop previous before new play
  soundEnabled: true,  // global toggle
  onPlay, onEnd, onStop, onPause  // callbacks
});
```

### 3. Usage (что видит пользователь)

```tsx
import { click8bitSound } from "@/sounds/click-8bit";
import { useSound } from "@/hooks/use-sound";

function Button() {
  const [play] = useSound(click8bitSound, { volume: 0.5 });
  return <button onClick={() => play()}>Click me</button>;
}
```

### 4. Registry item JSON (что генерирует shadcn build)

```json
{
  "name": "click-8bit",
  "type": "registry:block",
  "registryDependencies": ["use-sound"],
  "files": [{
    "path": "registry/soundcn/sounds/click-8bit/click-8bit.ts",
    "content": "import type { SoundAsset }...",
    "type": "registry:lib"
  }],
  "categories": ["click", "8-bit", "ui"],
  "meta": { "duration": 0.15, "license": "CC0", "tags": ["click", "retro"] }
}
```

## Категории звуков

| Категория | Описание | Примеры |
|-----------|----------|---------|
| `click` | Клики, нажатия | click-8bit, click-soft, click-heavy |
| `switch` | Переключатели | switch-on, switch-off |
| `notification` | Уведомления | notification-pop, notification-chime |
| `feedback` | Обратная связь | success-fanfare, error-buzz |
| `navigation` | Переходы | whoosh-light, slide-in |
| `hover` | Наведение | hover-tick, hover-bubble |
| `typing` | Клавиатура | key-press, key-enter |
| `game-8bit` | Ретро-игры | jump-8bit, coin-collect, power-up |
| `game-action` | Экшн-игры | footstep-grass, sword-swing |
| `ambient` | Фоновые | ambient-rain, ambient-forest |
| `system` | Системные | boot-up, shutdown |

Naming convention: `{descriptor}-{variant}` в kebab-case.

## Build Pipeline

```
raw-sounds/*.ogg  -->  ffmpeg (MP3 64kbps mono)  -->  base64 encode  -->  .ts module  -->  registry.json  -->  shadcn build  -->  public/r/*.json
```

Скрипт `encode-sound.ts`:
1. Конвертирует OGG/WAV -> MP3 через ffmpeg (64kbps, mono, 44.1kHz)
2. Base64-кодирует MP3
3. Извлекает duration через ffprobe
4. Валидирует размер (<100KB)
5. Генерирует TypeScript модуль

## Sound Packs (бандлы)

Пакеты через `registryDependencies` - устанавливают несколько звуков одной командой:

```json
{
  "name": "ui-essentials-pack",
  "registryDependencies": [
    "click-soft", "click-8bit", "switch-on", "switch-off",
    "notification-pop", "success-fanfare", "error-buzz"
  ],
  "files": []
}
```

## Фазы реализации

### Phase 1: Foundation (текущая сессия)
1. Клонировать `shadcn-ui/registry-template` в текущую директорию
2. Адаптировать под soundcn (переименовать, обновить metadata)
3. Создать `registry/soundcn/lib/sound-types.ts` - TypeScript types
4. Создать `registry/soundcn/hooks/use-sound.ts` - core hook (Web Audio API)
5. Скачать Kenney UI Audio pack, выбрать 5-10 звуков
6. Создать `scripts/encode-sound.ts` - конвертация audio -> base64 TS module
7. Сгенерировать 5-10 звуковых модулей:
   - `click-8bit`, `click-soft` (click)
   - `switch-on`, `switch-off` (switch)
   - `notification-pop` (notification)
   - `success-fanfare`, `error-buzz` (feedback)
   - `hover-tick` (hover)
   - `jump-8bit`, `coin-collect` (game-8bit)
8. Настроить `registry.json` со всеми items
9. `shadcn build` + проверить что JSON корректны
10. Тест установки: `npx shadcn add` в отдельном проекте

### Phase 2: Website (следующая сессия)
- Landing page, Sound library с превью
- Документация
- Copy install command

### Phase 3: Expand & Launch
- Расширить до 50+ звуков
- Sound packs
- Deploy, анонс

## Верификация

1. `shadcn build` генерирует корректные JSON в `public/r/`
2. `npx shadcn add http://localhost:3000/r/click-8bit.json` устанавливает 3 файла (types, hook, sound)
3. Установленный хук воспроизводит звук в React-компоненте
4. Website отображает и проигрывает все звуки
5. `scripts/validate-sounds.ts` проходит без ошибок
