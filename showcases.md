# Showcases — 50 UI компонентов для soundcn

## Кнопки и действия

| # | Компонент | Звук | Категория |
|---|-----------|------|-----------|
| 1 | **Like / Heart Button** — toggle с анимацией | click + collect | UI |
| 2 | **Add to Cart Button** — bounce-анимация при добавлении | pop / click-soft | UI |
| 3 | **Copy to Clipboard Button** — иконка меняется на ✓ | click + confirm | UI |
| 4 | **Delete Button** — двойное подтверждение | warning → confirm | Feedback |
| 5 | **Submit Button** — idle → loading → success/error | transition + jingle | Feedback |
| 6 | **Bookmark Button** — toggle save | click-soft | UI |
| 7 | **Upvote / Downvote** — Reddit-стиль с counter | score up/down | Game |
| 8 | **Download Button** — прогресс + завершение | click + complete | UI |

## Форм-контролы

| # | Компонент | Звук | Категория |
|---|-----------|------|-----------|
| 9 | **Toggle / Switch** — плавный flip | switch sound | UI |
| 10 | **Checkbox** — удовлетворительный тик | tick click | UI |
| 11 | **Radio Group** — переключение вариантов | selection click | UI |
| 12 | **Range Slider** — звук при движении | scrub / drag | UI |
| 13 | **Star Rating** — нарастающие тоны на hover/выбор | incremental tones | Tones |
| 14 | **OTP / PIN Input** — клик на каждую цифру | digit click | UI |
| 15 | **Password Strength Meter** — feedback при вводе | warning → success | Feedback |
| 16 | **Search Input** — focus + keystroke | keyboard click | UI |

## Уведомления и алерты

| # | Компонент | Звук | Категория |
|---|-----------|------|-----------|
| 17 | **Toast — Success** | success chime | Feedback |
| 18 | **Toast — Error** | error buzz | Feedback |
| 19 | **Toast — Warning** | warning ping | Feedback |
| 20 | **Toast — Info** | info tone | Feedback |
| 21 | **Badge Counter** — анимированный инкремент | pop | UI |
| 22 | **Status Indicator** — online/away/offline | connect/disconnect | Feedback |
| 23 | **Alert Banner** — появление с иконкой | notification | UI |

## Навигация

| # | Компонент | Звук | Категория |
|---|-----------|------|-----------|
| 24 | **Tab Switcher** — переключение вкладок | click transition | UI |
| 25 | **Accordion** — разворот/сворот | expand/collapse | UI |
| 26 | **Dropdown Menu** — открытие/закрытие | open/close | UI |
| 27 | **Sidebar Collapse** — slide с звуком | slide sound | UI |
| 28 | **Pagination** — листание страниц | page turn | UI |
| 29 | **Breadcrumb** — навигация назад | subtle click | UI |

## Карточки и списки

| # | Компонент | Звук | Категория |
|---|-----------|------|-----------|
| 30 | **Drag & Drop List** — pickup + drop | drag + thud | Impact |
| 31 | **Kanban Board Card** — перетаскивание | move + drop | Impact |
| 32 | **Swipe Card** — dismiss влево/вправо | swipe sound | UI |
| 33 | **Multi-select List** — выделение чекбоксом | tick per item | UI |
| 34 | **Expandable Card** — reveal контента | pop expand | UI |

## Прогресс и состояния

| # | Компонент | Звук | Категория |
|---|-----------|------|-----------|
| 35 | **Progress Bar** — заполнение + завершение | fill + complete | Feedback |
| 36 | **Step Wizard / Stepper** — шаг вперёд/назад | advance / back | UI |
| 37 | **Countdown Timer** — тик + финальный звонок | tick + alarm | Tones |
| 38 | **Score Counter** — анимированный рост числа | counting tones | Tones |
| 39 | **Skeleton → Content Reveal** — появление | appear whoosh | UI |

## Геймификация

| # | Компонент | Звук | Категория |
|---|-----------|------|-----------|
| 40 | **Achievement Badge Unlock** — pop с анимацией | fanfare / jingle | Jingles |
| 41 | **XP / Points Gained** — +100 float-анимация | coin collect | Game |
| 42 | **Streak Tracker** — ежедневный streak | streak chime | Game |
| 43 | **Level Up Bar** — заполнение + level up | level up jingle | Game |
| 44 | **Spin Wheel / Lottery** — крутёж + результат | spin + reveal | Game |

## Файлы и медиа

| # | Компонент | Звук | Категория |
|---|-----------|------|-----------|
| 45 | **File Dropzone** — drag + drop + complete | drag + pop + success | Feedback |
| 46 | **Mini Media Player** — play/pause/seek | click + scrub | UI |
| 47 | **Image Gallery** — переключение фото | swipe / click | UI |

## Спецэффекты

| # | Компонент | Звук | Категория |
|---|-----------|------|-----------|
| 48 | **Typewriter Text** — клик на каждый символ | keyboard click | UI |
| 49 | **Code Block Copy** — терминальный клик | terminal click | UI |
| 50 | **Keyboard Shortcut Visualizer** — нажатие клавиши | key press | UI |

---

## Структура страницы `/showcases`

- Группировать по категориям (секциями)
- Каждый блок: живой интерактивный компонент + кнопка "View code"
- Рядом — какие звуки используются с прямой ссылкой на `/sound/[name]`
