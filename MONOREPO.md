# soundcn — Turborepo Monorepo Plan

## Контекст

Текущий soundcn — монолитный Next.js сайт. Пользователи устанавливают звуки через shadcn CLI (`shadcn add @soundcn/{name}`), что отлично для веба. Но нет возможности использовать звуки напрямую в React Native, Electron или Tauri через npm.

Цель: реструктурировать проект в Turborepo монорепо и создать npm пакеты с чистым API для всех платформ.

---

## Ключевые решения

### 1. Turborepo — да
- Несколько пакетов с общим кодом (типы, метаданные)
- Единый `build`/`publish` pipeline с кэшированием
- Независимые версии пакетов

### 2. Платформенная проблема
| Платформа | Audio API |
|---|---|
| Browser, Electron, Tauri | `AudioContext` (Web Audio API) — уже работает |
| React Native | ❌ нет `AudioContext`, нужен `expo-av` |

Решение: абстрактный `SoundEngine` интерфейс + две реализации.

### 3. Стратегия звуковых данных ✅ Выбрано
Tree-shakable base64: каждый звук — отдельный файл в `@soundcn/sounds`. Пользователь импортирует только нужное, бандлер исключит остальное:
```ts
import { click1Sound } from '@soundcn/sounds/click-1'
import { errorSound } from '@soundcn/sounds/error-1'
// В бандл попадёт только 2 звука, остальные 698 — исключены
```

---

## Целевая структура

```
soundcn/                          ← корень монорепо
├── apps/
│   └── web/                      ← текущий Next.js сайт (перемещён)
│
├── packages/
│   ├── sounds/                   ← @soundcn/sounds
│   ├── engine/                   ← @soundcn/engine
│   ├── react/                    ← @soundcn/react
│   └── react-native/             ← @soundcn/react-native
│
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## Пакеты — детали

### `@soundcn/sounds`
- Все 700+ звуков как tree-shakable экспорты
- Файл на звук: `src/sounds/click-1.ts` → `export const click1Sound: SoundAsset`
- Каталог метаданных: `src/catalog.ts` (без base64, только имена/теги/категории)
- Зависимости: только `@soundcn/engine` (для типа `SoundAsset`)

**Источник данных**: существующие файлы из `registry/soundcn/sounds/{name}/{name}.ts`

### `@soundcn/engine`
- `SoundEngine` interface (абстракция для любой платформы)
- `WebAudioEngine` класс — реализация через `AudioContext`
- Источник: `lib/sound-engine.ts` (рефакторинг в класс)
- Типы: `SoundAsset`, `PlayOptions`, `SoundPlayback` (из `lib/sound-types.ts`)

```ts
// packages/engine/src/types.ts
export interface SoundEngine {
  play(asset: SoundAsset, options?: PlayOptions): Promise<SoundPlayback>
  preload?(asset: SoundAsset): Promise<void>
}
```

### `@soundcn/react`
- `useSound(asset, options?)` хук → возвращает `[play, controls]`
- Источник: `hooks/use-sound.ts` (адаптировать под пакет)
- Peerдепы: `react`, `@soundcn/engine`, `@soundcn/sounds`

### `@soundcn/react-native`
- `ExpoAudioEngine` — реализует `SoundEngine` через `expo-av`
- `useSound(asset, options?)` — тот же API что в `@soundcn/react`
- Peerдепы: `react-native`, `expo-av`, `@soundcn/engine`

---

## Шаги реализации

### Шаг 1: Инициализация монорепо ✅ Начать отсюда
1. Создать `pnpm-workspace.yaml` в корне:
   ```yaml
   packages:
     - 'apps/*'
     - 'packages/*'
   ```
2. Создать `turbo.json` с pipeline: `build`, `lint`, `type-check`
3. Обновить корневой `package.json` (убрать next deps, добавить workspaces)
4. Переместить текущий Next.js проект в `apps/web/`
5. Обновить все пути импортов в `apps/web/`

### Шаг 2: `packages/engine` — @soundcn/engine
**Файлы для создания:**
- `packages/engine/src/types.ts` — типы (из `lib/sound-types.ts`)
- `packages/engine/src/web.ts` — WebAudioEngine класс (из `lib/sound-engine.ts`)
- `packages/engine/src/index.ts` — реэкспорт
- `packages/engine/package.json` — с `"exports"` полем для ESM/CJS

**Критично:** добавить `"sideEffects": false` для tree-shaking.

### Шаг 3: `packages/sounds` — @soundcn/sounds
**Источник:** `registry/soundcn/sounds/{name}/{name}.ts` — 700+ файлов уже существуют!

Стратегия:
1. Копировать файлы из `registry/soundcn/sounds/` в `packages/sounds/src/sounds/`
2. Обновить импорт типа `SoundAsset` с `@soundcn/engine`
3. Создать `packages/sounds/src/index.ts` — реэкспорт всех звуков
4. Создать `packages/sounds/src/catalog.ts` — каталог без base64 (из `lib/sound-catalog.ts`)
5. Настроить `package.json` с `"exports"` для subpath imports:
   ```json
   {
     "exports": {
       ".": "./src/index.ts",
       "./catalog": "./src/catalog.ts",
       "./*": "./src/sounds/*.ts"
     }
   }
   ```

### Шаг 4: `packages/react` — @soundcn/react
**Источник:** `hooks/use-sound.ts`

1. Создать `packages/react/src/use-sound.ts` (адаптировать из `hooks/use-sound.ts`)
2. Заменить прямые вызовы `playSound()` на `WebAudioEngine`
3. Экспортировать типы `UseSoundOptions`, `UseSoundReturn`

### Шаг 5: `packages/react-native` — @soundcn/react-native
**Новый код:**
1. `packages/react-native/src/engine.ts` — `ExpoAudioEngine implements SoundEngine`
   - `expo-av Audio.Sound.createAsync()` для загрузки base64
   - Метод `play()` → `sound.playAsync()`
   - Метод `stop()` → `sound.stopAsync()`
2. `packages/react-native/src/use-sound.ts` — хук с тем же API что `@soundcn/react`

### Шаг 6: Build настройка
Каждый пакет использует `tsup` для сборки:
```json
{
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts"
  }
}
```

### Шаг 7: Обновить `apps/web`
- Обновить импорты: `@/lib/sound-engine` → `@soundcn/engine`
- Обновить импорты: `@/lib/sound-types` → `@soundcn/engine`
- Обновить импорты: `@/hooks/use-sound` → `@soundcn/react`

---

## Критические файлы

| Файл | Действие |
|---|---|
| `package.json` | Обновить (убрать next deps, добавить workspaces) |
| `lib/sound-engine.ts` | Источник для `packages/engine/src/web.ts` |
| `lib/sound-types.ts` | Источник для `packages/engine/src/types.ts` |
| `hooks/use-sound.ts` | Источник для `packages/react/src/use-sound.ts` |
| `registry/soundcn/sounds/*/` | Источник для `packages/sounds/src/sounds/` |
| `lib/sound-catalog.ts` | Источник для `packages/sounds/src/catalog.ts` |

**Новые файлы:**
- `pnpm-workspace.yaml`
- `turbo.json`
- `packages/engine/` (весь пакет)
- `packages/sounds/` (весь пакет)
- `packages/react/` (весь пакет)
- `packages/react-native/` (весь пакет)
- `apps/web/` (перемещённый текущий проект)

---

## Порядок публикации

1. `@soundcn/engine` (нет зависимостей на другие soundcn пакеты)
2. `@soundcn/sounds` (зависит от `@soundcn/engine` только для типов)
3. `@soundcn/react` (зависит от `@soundcn/engine`)
4. `@soundcn/react-native` (зависит от `@soundcn/engine`)

---

## Верификация

1. `pnpm build` в корне — все пакеты должны собраться
2. Написать `apps/test-app/` (простой Vite проект) с:
   ```ts
   import { click1Sound } from '@soundcn/sounds/click-1'
   import { useSound } from '@soundcn/react'
   ```
3. Проверить bundle size — tree-shaking должен исключить неиспользуемые звуки
4. Проверить TypeScript типы: `tsc --noEmit` в каждом пакете
5. Для React Native: создать Expo Snack и протестировать воспроизведение

---

## Риски

| Риск | Митигация |
|---|---|
| `@soundcn/sounds` будет очень большой пакет (~100MB base64) | Tree-shaking + subpath imports решают это частично; рассмотреть CDN для звуков |
| expo-av API может измениться | Абстракция через `SoundEngine` интерфейс изолирует изменения |
| Перемещение проекта сломает CI/CD | Обновить пути в Vercel настройках (`apps/web`) |
