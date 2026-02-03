# The Creative Website Manual — Next.js + Tailwind CSS + GSAP Migration Guide

> A phase-by-phase instruction manual for Claude Code (or any developer) to convert the existing Webflow/jQuery/GSAP static site into a Next.js 15 application using Tailwind CSS v4 and GSAP 3.x. Every color, typeface, easing curve, animation timing, breakpoint, and grid spec from the original site is documented as a **LOCKED value**. Nothing in the visual output or motion design may change.

---

## 🔒 GLOBAL RESTRICTIONS — READ BEFORE ANYTHING ELSE

These rules apply to **every single phase**. They are non-negotiable. If a value appears in this list, it may **never** be altered, approximated, or replaced with a Tailwind default.

### Color Lock
Every hex value below is final. Do not use Tailwind's built-in palette (blue-500, gray-400, etc.) anywhere. All colors must be defined as custom values in `tailwind.config.ts` or as CSS custom properties and referenced by name.

```
PAGE BACKGROUND:        #080807
DARK SURFACE:           #292929
MID GRAY:               #7d7d7d
LIGHT GRAY:             #dcddde
OFF WHITE:              #f1f0ee
NEAR WHITE:             #fcfcfc
GOLD ACCENT:            #ffb700
BUTTON BORDER REST:     #515151
HOVER BG:               #EAEAEA
HOVER TEXT:             #070707
OVERLAY BLOCK:          #262626
CANVAS GRID BORDER:     #0C0C0C
DEEP DARK BROWN:        #120c00
LIGHTEST CREAM:         #fff6e5
SKY BLUE:               #47a0ff
YELLOW GOLD:            #ffd900
DEEP TEAL:              #265855
MID TEAL:               #31726e
DARK TEAL GREEN:        #193937
DARKEST TEAL:           #182b2a
PALE YELLOW CREAM:      #fbf6c0
WARM BEIGE:             #eee2cd
TAN SAND:               #c4b59c
OCHRE:                  #a58f69
```

### Font Lock
Only these three font families may be used. No Google Fonts, no system fallbacks beyond the ones listed below.

```
PRIMARY:      PP Neue Montreal    (Light 300, Book 400, Regular 400, Medium 500, Bold 700)
DISPLAY:      PP Mondwest         (Regular 400)
MONO / UI:    Rand Mono           (Thin 100, Regular 400)
```

### Easing Lock
These six custom eases are the **only** custom eases on the site. Their cubic-bezier values are exact. Do not round, adjust, or replace them.

```
ease-primary:      cubic-bezier(0.87, 0, 0.13, 1)
ease-secondary:    cubic-bezier(0.31, 0.75, 0.22, 1)
ease-fade:         cubic-bezier(0.76, 0, 0.24, 1)
ease-preloader:    cubic-bezier(0.64, 0.04, 0.42, 0.99)
ease-transition:   cubic-bezier(0.16, 1, 0.35, 1)
ease-button:       cubic-bezier(0.16, 1, 0.3, 1)
```

### Animation Timing Lock
Every duration, delay, stagger, and threshold below is exact. Do not change them for "feel" or "polish."

```
Loader percentage counter:       2s, ease-preloader
Loader barcode line stagger:     0.06s per line
Loader dial wipe:                0.4s, stagger 0.07s
Menu open fade:                  0.8s, ease-secondary, delay 0.3s
Menu scramble stagger:           0.1s per item, 0.8s duration
Nav link CSS transition:         0.5s, ease-secondary
Heading word reveal:             0.9s, stagger 0.02s, ease-transition
Heading line reveal:             0.9s, stagger 0.15s
About overlay fade stagger:      0.1s, ease power2.out, scrub 1
CREATIVITY char stagger:         0.2s amount, 0.7s duration, ease-primary
TECHNICALITY scramble in:        1.6s
TECHNICALITY scramble out:       0.8s
Layout flip duration:            1s, expo.inOut, stagger 0.2s
Section-end scale:               to 0.85, opacity 0.1, over +=100% scrub
Pixel grid stagger:              amount 1.3, grid [10, 9], axis y
Canvas cell fill:                0.1s fade in, 0.5s fade out, 0.2s delay
Draggable press:                 0.1s scale 1.2, rotation random -30 to +30
Draggable release:               0.2s, back.out(3)
Button border flash sequence:    0.05 / 0.08 / 0.04 / 0.06 / 0.03 / 0.5s
Button 1 text roll:              0.6s, stagger 0.075s, ease-primary
Button 1 motion path:            0.57s
Button 2 motion path:            0.45s, ease-button
Star rotation:                   4s, none, infinite, rotationY 360
Globe timeScale formula:         Math.abs(velocity × 0.005) + 1, ease back to 1 over 0.6s
Counter tween:                   0 → 50 over 3s, power1.inOut, yoyo, repeat infinite, delay 0.5s
Organic columns:                 0.6s, power1.inOut, stagger each 0.08s from center, yoyo
Color gradient clip stagger:     8% offset per band
Font-weight proximity radius:    300px, animation 1s, ease-transition, weight 300↔800
Lenis duration:                  0.7s
```

### Breakpoint Lock
Use these exact values in Tailwind config. Do not use Tailwind's sm/md/lg/xl defaults.

```
mobile:            max-width 479px
mobileLandscape:   max-width 767px
tablet:            max-width 991px
desktop:           min-width 992px
```

### Grid Lock
```
Columns:   12
Gutter:    1rem / 16px
```

### Typography Specs Lock
```
Letter Spacing:  -3%   (on PP Neue Montreal headings)
Line Height:     1.1em (on PP Neue Montreal headings)
```

---

## Phase 1 — Next.js Project Scaffold & File Structure

### 1.1 Initialize the project

```bash
pnpm dlx create-next-app@latest cwm-site
cd cwm-site
```

When prompted:
- TypeScript: **Yes**
- ESLint: **Yes**
- Tailwind CSS: **Yes**
- App Router: **Yes**
- Import alias (`@/`): **Yes**

### 1.2 Install all required packages

```bash
pnpm add gsap lenis
```

> `gsap` 3.12+ ships its own types — `@types/gsap` is not needed. `lenis` has built-in TypeScript declarations.

### 1.3 Target file structure

Every file path here is the target location. Map original files exactly as shown.

```
cwm-site/
├── app/
│   ├── layout.tsx                        — root layout: font loading, theme class, Lenis provider
│   ├── page.tsx                          — single page, renders all sections in order
│   └── providers.tsx                     — client-side context: Lenis instance, GSAP plugin registration
├── components/
│   ├── Loader.tsx                        — full loader sequence (Phase 6)
│   ├── Nav.tsx                           — navigation + overlay menu (Phase 5)
│   ├── Hero.tsx                          — hero section with logo SVG, barcode, brackets
│   ├── About.tsx                         — Chapter 1: word overlay, CREATIVITY, TECHNICALITY
│   ├── Grids.tsx                         — Chapter 2.1: layout flip demo, grid specs
│   ├── Typography.tsx                    — Chapter 2.2: font-weight proximity, draggable stickers
│   ├── Colors.tsx                        — Chapter 2.3: swatch rows, clip-path gradients
│   ├── Motion.tsx                        — Chapter 2.4: marquee, globe, counter, stars
│   ├── Practice.tsx                      — Chapter 3: stacking cards
│   ├── Resources.tsx                     — curated resource links
│   ├── PixelTransition.tsx               — reusable pixel grid transition mask
│   ├── Marquee.tsx                       — reusable marquee band component
│   ├── CanvasGrid.tsx                    — reusable interactive canvas grid
│   └── StickyStack.tsx                   — reusable sticky-stack wrapper
├── hooks/
│   ├── useGSAP.ts                        — thin wrapper around React useEffect for GSAP timelines
│   ├── useLenis.ts                       — access the Lenis instance from context
│   ├── useParallax.ts                    — reads data-parallax attributes, wires ScrollTrigger
│   └── useSplitText.ts                   — wraps SplitText init + cleanup
├── lib/
│   ├── gsapPlugins.ts                    — registers all GSAP plugins once (client-side only)
│   ├── easings.ts                        — exports all 6 CustomEase definitions
│   └── constants.ts                      — all LOCKED color/font/breakpoint values as TS exports
├── styles/
│   └── globals.css                       — Tailwind directives, @font-face declarations, CSS custom properties
├── public/
│   ├── fonts/                            — copy all .woff2 / .otf / .woff files exactly as-is
│   ├── videos/                           — copy all .mp4 files exactly as-is
│   └── images/                           — copy all image assets exactly as-is
├── tailwind.config.ts                    — custom theme: colors, fonts, screens, spacing
└── next.config.ts                        — font domains whitelist, image domains if needed
```

### 1.4 Key architectural decisions

**Single page app.** The original is a single `index.html`. Keep it that way: `app/page.tsx` renders every section component in sequence. Do **not** split into route pages.

**Client components are opt-in.** Every component that uses GSAP, DOM manipulation, `useEffect`, event listeners, or `window` must have `"use client"` at the top. Layout sections that are purely static markup can remain Server Components.

**GSAP plugins register once.** Create `lib/gsapPlugins.ts` as a client-only module. It imports GSAP and calls `gsap.registerPlugin(...)` for every plugin. Import this file once in `providers.tsx`. Never call `registerPlugin` inside a component.

**Lenis is a singleton.** Create one Lenis instance in a React Context provider (`providers.tsx`). All components that need scroll access consume this context via the `useLenis` hook. Never instantiate Lenis inside a component.

**Fonts are self-hosted.** All font files live in `public/fonts/`. They are loaded via `@font-face` in `globals.css`. Do **not** use `next/font` — it will rename and hash the files, breaking the exact weight mapping. The `@font-face` declarations must match the original weight values exactly.

---

## Phase 2 — Typography System

### 2.1 Font file placement

Copy these files to `public/fonts/` with **no renames**:

```
PPNeueMontreal-Light.woff2
PPNeueMontreal-Book.woff2
PPNeueMontreal-Regular.woff2
PPNeueMontreal-Medium.woff2
PPNeueMontreal-Bold.woff2
PPNeueMontreal-Variable.woff2
PPMondwest-Regular.otf
Rand-Mono-Thin.woff
Rand-Mono-Regular.woff
```

### 2.2 @font-face declarations in globals.css

Write these **exactly** as shown. Weight values are locked. Do not use `font-weight: 100 900` variable range — each weight is a separate face so GSAP's per-character weight animation works correctly at runtime.

```css
/* PP Neue Montreal */
@font-face {
  font-family: 'PP Neue Montreal';
  src: url('/fonts/PPNeueMontreal-Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'PP Neue Montreal';
  src: url('/fonts/PPNeueMontreal-Book.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'PP Neue Montreal';
  src: url('/fonts/PPNeueMontriend-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'PP Neue Montreal';
  src: url('/fonts/PPNeueMontreal-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'PP Neue Montreal';
  src: url('/fonts/PPNeueMontreal-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* PP Mondwest */
@font-face {
  font-family: 'PP Mondwest';
  src: url('/fonts/PPMondwest-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Rand Mono */
@font-face {
  font-family: 'Rand Mono';
  src: url('/fonts/Rand-Mono-Thin.woff') format('woff');
  font-weight: 100;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Rand Mono';
  src: url('/fonts/Rand-Mono-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### 2.3 Tailwind font config

In `tailwind.config.ts`, extend the theme fonts:

```ts
fontFamily: {
  primary:  ["'PP Neue Montreal'", "sans-serif"],
  display:  ["'PP Mondwest'", "sans-serif"],
  mono:     ["'Rand Mono'", "monospace"],
},
```

### 2.4 Utility class mapping (use these Tailwind classes in JSX)

| Original class / role            | Tailwind class(es) to apply                                              |
|----------------------------------|--------------------------------------------------------------------------|
| `u-text-style-display`           | `font-display text-white`                                                |
| `u-text-style-h1`                | `font-primary font-bold`                                                 |
| `u-text-style-h2`                | `font-primary font-medium` or `font-bold` depending on context           |
| `u-text-style-h4` / `u-text-style-large` | `font-primary font-normal`                                       |
| Body copy                        | `font-primary font-light` or `font-primary` (weight 400 Book)            |
| `u-mono`                         | `font-mono text-sm`                                                      |

### 2.5 Heading typography specs

On every `<h1>`, `<h2>`, and display heading that uses PP Neue Montreal, add these **locked** styles. Do not let Tailwind's default heading styles override them.

```css
/* In globals.css, scoped to a shared class or applied per-component */
.heading-specs {
  letter-spacing: -3%;     /* LOCKED */
  line-height: 1.1em;      /* LOCKED */
}
```

Or apply inline via Tailwind's arbitrary value syntax:

```jsx
<h1 className="font-primary font-bold tracking-[-3%] leading-[1.1em]">
```

### 2.6 Font-weight proximity effect (desktop only, ≥992px)

This is the most technically demanding typography feature. Implementation rules:

1. Only activate on elements with `data-animate="font-weight"` — the three "Typography." headings.
2. Only activate at `min-width: 992px`. On tablet and below, do nothing.
3. Use GSAP `SplitText` to split each heading into **individual characters** (not words, not lines).
4. On `mousemove` (attached to `document` or the nearest scroll container):
   - Calculate pixel distance from cursor to each character's bounding box center.
   - If distance < **300px** (locked), animate that character's `fontWeight` toward **800**.
   - If distance ≥ 300px, animate that character's `fontWeight` toward **300**.
   - Use `gsap.to()` with duration **1s** and ease **`ease-transition`** (`cubic-bezier(0.16, 1, 0.35, 1)`).
   - Use `gsap.utils.mapRange(0, 300, 800, 300, distance)` to get the target weight value.
5. Clean up: on component unmount, remove the mousemove listener and revert all SplitText instances.

---

## Phase 3 — Color System

### 3.1 Tailwind theme colors

All colors go into `tailwind.config.ts` under `theme.extend.colors`. Use the exact names and hex values from the Global Restrictions. Example:

```ts
colors: {
  // Base / Neutral
  'page-bg':      '#080807',
  'dark-surface': '#292929',
  'mid-gray':     '#7d7d7d',
  'light-gray':   '#dcddde',
  'off-white':    '#f1f0ee',
  'near-white':   '#fcfcfc',

  // UI Accents
  'gold':         '#ffb700',
  'btn-border':   '#515151',
  'hover-bg':     '#EAEAEA',
  'hover-text':   '#070707',
  'overlay':      '#262626',
  'grid-border':  '#0C0C0C',

  // Cool Tones
  'deep-dark':    '#120c00',
  'cream-light':  '#fff6e5',
  'sky-blue':     '#47a0ff',
  'yellow-gold':  '#ffd900',
  'deep-teal':    '#265855',
  'mid-teal':     '#31726e',

  // Warm Tones
  'teal-green':   '#193937',
  'darkest-teal': '#182b2a',
  'pale-cream':   '#fbf6c0',
  'warm-beige':   '#eee2cd',
  'tan-sand':     '#c4b59c',
  'ochre':        '#a58f69',
},
```

### 3.2 CSS custom properties (for JS runtime access)

In `globals.css`, also declare these same colors as CSS custom properties so GSAP and canvas code can read them from JS without hardcoding:

```css
:root {
  --color-page-bg:      #080807;
  --color-dark-surface: #292929;
  --color-gold:         #ffb700;
  --color-overlay:      #262626;
  --color-grid-border:  #0C0C0C;
  --color-hover-bg:     #EAEAEA;
  --color-hover-text:   #070707;
  --color-btn-border:   #515151;
  /* ... repeat all 24 colors ... */
}
```

### 3.3 Dark theme base

The root layout (`layout.tsx`) must apply the dark theme class to `<body>` or a wrapper `<div>`:

```tsx
<body className="bg-page-bg text-near-white min-h-screen">
```

This sets the page background to `#080807` and default text to `#fcfcfc`. Every section inherits these unless explicitly overridden by a section-scoped class.

### 3.4 Color swatch rendering

The Colors section renders 18 color swatches in two rows (cool + warm). Each swatch is a `<div>` with an inline `style={{ backgroundColor: hexValue }}`. Do **not** use Tailwind bg classes here — the swatches are data-driven from an array of objects defined in `constants.ts`.

---

## Phase 4 — Layout & Grid System

### 4.1 Tailwind grid config

In `tailwind.config.ts`:

```ts
screens: {
  'mobile':          { max: '479px' },
  'mobileLandscape': { max: '767px' },
  'tablet':          { max: '991px' },
  'desktop':         '992px',          // min-width
},
```

> ⚠️ Tailwind's default screen values are completely overridden. Do not keep sm, md, lg, xl.

The 12-column grid with 1rem gutter is applied via Tailwind utilities directly in JSX:

```jsx
<div className="grid grid-cols-12 gap-4">  {/* gap-4 = 1rem = 16px */}
```

### 4.2 CSS Grid named lines (for full-bleed sections)

The original uses named grid lines (`full-start`, `content-start`, `content-end`, `full-end`). Replicate this with a global CSS class in `globals.css`:

```css
.grid-breakout {
  display: grid;
  grid-template-columns:
    [full-start] 1fr
    [content-start] repeat(12, 1fr)
    [content-end] 1fr
    [full-end];
  gap: 1rem;  /* LOCKED */
}

.span-full {
  grid-column: full-start / full-end;
}
.span-content {
  grid-column: content-start / content-end;
}
```

### 4.3 Interactive layout flip demo (Grids component)

This is the live layout-toggle demo. Implementation:

1. The demo container is a CSS grid. Three layout configurations exist as separate sets of `grid-area` values.
2. Four child elements exist: heading (`grids_flip_h1`), nav block (`grids_flip_nav`), paragraph (`grids_flip_p`), cover image (`grids_flip_cover`).
3. Three buttons have `data-btn-layout="1"` / `"2"` / `"3"`. Clicking one:
   - Removes the currently active `is-layout-X` class from the grid container.
   - Applies the new `is-layout-X` class.
4. **Before** the class swap, call `Flip.getState(gridChildren)`.
5. **After** the class swap, call `Flip.from(state, { duration: 1, ease: 'expo.inOut', stagger: { each: 0.2, from: 'start' }, scale: true })`.
6. All durations and eases are **LOCKED** — see Global Restrictions.

Each layout's `grid-area` values must be defined in CSS (not Tailwind) because they change at breakpoints (991px, 479px). Define them in `globals.css` or a component-scoped `<style>` block.

### 4.4 Sticky stacking layout

Components that use sticky stacking (Resources, About) must:

1. Wrap children in a container with `data-stack-list` attribute.
2. On mount (inside a `useEffect`), iterate over children and set each child's CSS `position: sticky` and `top` to `1.75rem + (index × 3.3rem)`.
3. The top offset formula is **locked**: `1.75rem + (index * 3.3rem)`.

### 4.5 Pixel transition grid

The `PixelTransition.tsx` component renders a 10×9 grid of `.pixel_item` divs. Some carry `.pixel_black`. The animation:

- All items start hidden (`opacity: 0`, `scale: 0` or equivalent).
- GSAP animates them in with stagger config: `{ amount: 1.3, grid: [10, 9], axis: 'y' }`.
- Linked to scroll via ScrollTrigger.

---

## Phase 5 — Navigation & Menu System

### 5.1 Component structure

`Nav.tsx` is a **client component** (`"use client"`). It renders:

- A hamburger toggle button
- A full-screen overlay `.nav_menu` — initially `display: none`
- Inside the menu: chapter links, barcode SVG, open/close labels, animated plus icon

### 5.2 Open animation sequence (GSAP Timeline)

When the hamburger is clicked, run this exact timeline:

```
tl.set(navMenu, { display: 'flex' })
tl.to(navMenu, { autoAlpha: 1, height: 'auto', duration: 0.8, ease: 'ease-secondary', delay: 0.3 })
tl.to(navTextItems, { /* ScrambleText reveal */ duration: 0.8, stagger: 0.1 }, '<')
tl.to(pageMain, { opacity: 0.6, duration: 0.6 }, '<')
```

- ScrambleText chars set: `"-_x0$9"` — **LOCKED**.
- On mobile (≤767px), animate `height` to `"100%"` instead of `"auto"`.

### 5.3 Close animation

Simply reverse the timeline: `tl.reverse()`.

### 5.4 Nav link hover states (CSS only)

These are pure CSS — no JS needed. Apply via Tailwind + custom CSS:

```css
.menu-heading-link {
  transition: background-color 0.5s cubic-bezier(0.31, 0.75, 0.22, 1),
              color 0.5s cubic-bezier(0.31, 0.75, 0.22, 1),
              padding 0.5s cubic-bezier(0.31, 0.75, 0.22, 1);
}
.menu-heading-link:hover {
  background-color: #EAEAEA;   /* LOCKED: hover-bg */
  color: #070707;              /* LOCKED: hover-text */
  padding-left: 0.333em;
  padding-right: 0.333em;
}
.menu-heading-link:hover .menu-link-wrap {
  border-top: 1px solid #ffb700;  /* LOCKED: gold */
}
```

> The transition duration **0.5s** and ease **cubic-bezier(0.31, 0.75, 0.22, 1)** are both LOCKED.

---

## Phase 6 — Loader & Entry Animation

### 6.1 Component overview

`Loader.tsx` is a **client component**. It renders on top of everything else (z-index highest). It is controlled entirely by a single GSAP master timeline that plays once on mount.

After the loader finishes, it sets itself to `display: none`. The rest of the page is then visible.

### 6.2 Visual elements to render

Render these DOM elements inside the Loader:

- `.loader-percentage` — an `<h1>` for the counter (0 → 100)
- `.loader-percent-icon` — the `%` glyph
- `.loader-dials` — a row of small dial elements (`.loader-dial`)
- `.loader-text` — mono-styled labels rendered in a specific order (see Phase 1 source doc, loader text block)
- `[loader-blink]` — individual characters that blink: `[`, `0`, `%`
- `.hero-logo-paths` — the SVG logo paths (stroke + fill)
- `.brackets` — four corner bracket SVGs

### 6.3 Sequence breakdown — implement as ONE master timeline

**Phase A — Logo stutter (0s–1s, randomized start)**

Each SVG path in the hero logo gets its own mini-timeline:

```ts
logoPath.forEach((path) => {
  const randomDelay = gsap.utils.random(0, 0.5);
  const tl = gsap.timeline({ delay: randomDelay });
  tl.set(path, { opacity: 0 })
    .to(path, { opacity: 1, duration: 0.05 }, '+=' + 0.25)
    .to(path, { opacity: 0, duration: 0.04 }, '+=' + 0.02)
    .to(path, { opacity: 1, duration: 0.06 }, '+=' + 0.1)
    .to(path, { opacity: 1, duration: 0.07 }, '+=' + 0.2);
});
```

Bracket SVGs use the same pattern but with tighter timings: `0.03, 0.04, 0.02, 0.04`. All timings LOCKED.

**Phase B — Mid section reveal**

Fade in loader mid-wrap, dials, percentage, details, text all at once: `autoAlpha: 1, duration: 0.5`.

**Phase C — Blinking text flash**

Characters in `[loader-blink]` use the same stutter pattern as logo paths, with random offset up to 0.3s.

**Phase D — Main sequence (starts at 3.5s delay — LOCKED)**

Implement in order:

1. Set barcode lines to `yPercent: -101`
2. ScrambleText all hero mono text to empty first
3. ScrambleText reveal — stagger 0.1s each, chars: `" "` (space only) — LOCKED
4. Barcode lines slide to `yPercent: 0`, duration 0.8s, stagger 0.06s, ease `ease-preloader`
5. Counter: tween `{ value: 0 }` to `{ value: 100 }`, duration **2s**, ease **`ease-preloader`**. `onUpdate` rounds and writes to DOM.
6. Dial wipes: `xPercent: 100`, duration 0.4s, stagger 0.07s
7. At ~3s into sequence: scramble hero mono text back to empty (`rightToLeft: true`)
8. Blinking characters fade out with `steps(4)` ease, random stagger
9. Loader wrapper fades out with `steps(7)` ease
10. Set loader to `display: none`

**Mobile variant:** On ≤767px, loader height animates to `88dvh` instead of full viewport wipe.

### 6.4 Easing used

| Element | Ease | Duration |
|---|---|---|
| Percentage counter | `ease-preloader` | 2s |
| Barcode lines | `ease-preloader` | 0.8s |
| Dial wipes | `ease-preloader` | 0.4s |
| Blink char fade | `steps(4)` | — |
| Loader final fade | `steps(7)` | — |

---

## Phase 7 — Scroll-Based Animations (GSAP + ScrollTrigger + Lenis)

### 7.1 Lenis setup (in providers.tsx)

```ts
"use client";
import { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';

const LenisContext = createContext<Lenis | null>(null);

export function LenisProvider({ children }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.7,          // LOCKED
      infinite: true,         // LOCKED
    });
    lenisRef.current = lenis;

    // Sync with GSAP ScrollTrigger
    lenis.on('scroll', () => {
      // ScrollTrigger.update() — called here
    });

    // Sync with GSAP ticker
    function raf(time: number) { lenis.raf(time); }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);  // LOCKED: 0

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() { return useContext(LenisContext); }
```

### 7.2 Global parallax system

Create `hooks/useParallax.ts`. Any element with `data-parallax="trigger"` is a parallax container. Read these data attributes and wire a ScrollTrigger:

| Attribute | Default | Maps to |
|---|---|---|
| `data-parallax-direction` | `"vertical"` | animate `yPercent` or `xPercent` |
| `data-parallax-start` | `20` | start yPercent/xPercent value |
| `data-parallax-end` | `-20` | end yPercent/xPercent value |
| `data-parallax-scrub` | `true` | scrub: true |
| `data-parallax-scroll-start` | `"top bottom"` | trigger start |
| `data-parallax-scroll-end` | `"bottom top"` | trigger end |
| `data-parallax-disable` | — | skip on `"mobile"` / `"mobileLandscape"` / `"tablet"` |

All parallax uses **`ease: "none"`** — LOCKED. Linear scrub only.

### 7.3 Heading reveal patterns

**Pattern A — Word split (`data-split="heading"`):**
- Split heading into **words** via SplitText.
- Each word animates: `yPercent: 101 → 0`, duration **0.9s**, stagger **0.02s**, ease **`ease-transition`**.
- Trigger: heading enters at `top 80%` of viewport. Plays once.

**Pattern B — Line split (`data-split="global"`):**
- Split into **lines** via SplitText.
- Each line animates: `yPercent: 100 → 0`, duration **0.9s**, stagger **0.15s**.
- Trigger: same as Pattern A.

### 7.4 Section-end pin + scale-down

Elements with `data-section-end`:
- Pin at bottom of viewport as user scrolls past.
- While pinned, scrub `scale` from `1 → 0.85` and `opacity` from `1 → 0.1` over a range of `+=100%`.
- Characters inside `[data-split="sectionEnd"]` fade out in random order with `steps(5)` ease during the same scrub range.

### 7.5 About section — word overlay reveal

The four `<h2>` lines in the About section:
1. Split into words via SplitText.
2. Each word gets wrapped in a container with an `overlay-block` div on top (`background: #262626`, `z-index: 1`).
3. The section uses a **pinned sticky container** (`top 20%` to `bottom 70%`).
4. As the section scrolls through the pin range, overlays fade out one by one: `opacity: 0`, stagger **0.1s**, ease `power2.out`, **scrub: 1**.

### 7.6 "CREATIVITY" character reveal

- Split `.about_p_creativity` into **characters**.
- All start at `yPercent: -100`.
- Animate to `yPercent: 0`, duration **0.7s**, stagger amount **0.2s**, ease **`ease-primary`**.
- Trigger: `.about_h1_t` enters at `top center`.
- `toggleActions: "play none none reverse"` — reverses on scroll back up.

### 7.7 "TECHNICALITY" scramble

- Element `[data-about-tech]` displays `</ >` at rest.
- On scroll enter (`top 40%`): ScrambleText reveals `</TECHNICALITY>` over **1.6s**.
- Scramble chars: `` +_1x><*^0!~ `` — LOCKED.
- On scroll leave back: scrambles back to `</ >` over **0.8s**.
- Implemented via ScrollTrigger `onEnter` / `onLeaveBack` callbacks — **not** scrubbed.

### 7.8 SVG path group reveal

SVG elements with `[path-group]`:
- Each `<path>` child fades from `opacity: 0`, stagger **0.1s**.
- Scrubbed from `top 20%` to `bottom bottom` of the sticky container.
- Ease: **`steps(1)`** — binary on/off per path.

### 7.9 Practice section — stacking scale

Multiple `.practice_contain_inner` elements stacked absolutely. Each element's scale is calculated as:

```
scale = 0.85 ^ (index + 1)
```

So: index 0 = 0.85, index 1 = 0.7225, index 2 ≈ 0.614, etc. The formula is **LOCKED**.

Scale is animated via scrub from `top center` to `bottom top` of `.practice_contain_content`, ease `power2.out`, `transformOrigin: center center`.

### 7.10 Grid guide item flash

`.grids_guide_item` elements on scroll enter play this flicker sequence:

```
opacity: 0 → 1 (0.04s) → 0 (0.03s) → 1 (0.04s) → 1 (0.05s)
```

Each item starts at a random offset up to **0.5s**. This re-triggers on every viewport entry (`once: false`).

### 7.11 Accelerating globe

`[data-accelerating-globe]` contains 8 circle elements that loop their width animation:
- Base `timeScale: 1`
- On each scroll frame, measure scroll velocity.
- Set `timeScale = Math.abs(velocity * 0.005) + 1` — LOCKED formula.
- On scroll stop (100ms timeout), ease timeScale back to 1 over **0.6s**, ease `power2.out`.

### 7.12 Counter animation ("34")

- Tween `{ value: 0 }` to `{ value: 50 }`, duration **3s**, ease **`power1.inOut`**.
- `yoyo: true`, `repeat: -1` (infinite), `repeatDelay: 0.5s`.
- `onUpdate`: round value, write to DOM.
- Only starts when `.animation_types-wrap` enters at `start: "top bottom"`.

---

## Phase 8 — Interactive Elements

### 8.1 Canvas grid (`CanvasGrid.tsx`)

This is a **client component** that renders a `<canvas>` element. Configuration comes from data attributes on the parent container:

| Attribute | Default |
|---|---|
| `data-grid-size-desktop` | `64` |
| `data-grid-size-mobile` | `8` |
| `data-grid-border-size` | `0.15` |
| `data-grid-border-color` | `#0C0C0C` |
| `data-grid-colors` | `["#EAEAEA"]` |
| `data-grid-background` | `transparent` |

Implementation:

1. On mount, calculate grid cell size from canvas dimensions ÷ column count.
2. Draw grid lines every frame via `requestAnimationFrame`.
3. On `mousemove`: find which cell the cursor is in. If it's a new cell, fill it:
   - Pick a random color from the `data-grid-colors` array.
   - Animate alpha: `0 → 1` over **0.1s**, then `1 → 0` over **0.5s** after a **0.2s** delay.
4. Touch devices: **skip** the mousemove listener entirely.
5. Border color is always `#0C0C0C` — LOCKED.

### 8.2 Draggable stickers (Typography section)

Elements with `[data-sticker="item"]` inside `[data-sticker="wrap"]`:

- Use GSAP `Draggable.create()`.
- `bounds`: parent wrap element.
- `dragResistance: 0.1` — LOCKED.
- **onPress:** `gsap.to(element, { scale: 1.2, rotation: gsap.utils.random(-30, 30), filter: 'drop-shadow(0px 10px 8px rgba(0,0,0,0.3))', duration: 0.1 })`
- **onRelease:** `gsap.to(element, { scale: 1, rotation: 0, filter: 'none', duration: 0.2, ease: 'back.out(3)' })`

All values LOCKED.

### 8.3 Video on hover

Six video elements exist for project showcases. Implementation:

1. Each `<video>` has **no** `src` initially. The actual URL is in `data-video-src`.
2. On `mouseenter`:
   - If `src` is not set, set it from `data-video-src`.
   - Set `data-video-on-hover="active"`.
   - Call `video.play()`.
3. On `mouseleave`:
   - Set `data-video-on-hover="not-active"`.
   - After **200ms** delay: `video.pause()`, `video.currentTime = 0`.
4. All `<video>` tags have attributes: `autoPlay`, `loop`, `muted`, `playsInline`.

Video files (copy to `public/videos/`):
```
Mammoth Murals Compressed.mp4
OH Arch Compressed.mp4
Supersolid Thumbnail Compressed.mp4
```

### 8.4 Cursor coordinate display

Two elements (`[data-coordinates-x]` and `[data-coordinates-y]`) show live mouse position.

A single `mousemove` listener on `document`:
```ts
document.addEventListener('mousemove', (e) => {
  xEl.textContent = String(Math.round(e.pageX));
  yEl.textContent = String(Math.round(e.pageY));
});
```

Use `Math.round` — LOCKED. `pageX` / `pageY` — not `clientX` / `clientY`.

---

## Phase 9 — Motion, Marquee & Micro-Interactions

### 9.1 Marquee component (`Marquee.tsx`)

A reusable client component. Props come from data attributes on the wrapper:

| Attribute | Effect |
|---|---|
| `data-marquee-speed` | Base speed multiplier (e.g., `15`) |
| `data-marquee-direction` | `"left"` or `"right"` |
| `data-marquee-duplicate` | Number of clones for seamless loop (e.g., `2`) |
| `data-marquee-scroll-speed` | Horizontal offset `vw` during scroll |

Implementation:

1. On mount, clone the content collection N times and append for seamless loop.
2. Animate all instances with `xPercent: -100`, `repeat: -1`.
3. Duration = `speed × (contentWidth / windowWidth) × responsiveMultiplier`.
   - Responsive multiplier: **0.25** on mobile (≤479px), **0.5** on tablet (≤991px), **1** on desktop. LOCKED.
4. Start the animation at **50% progress** so it begins mid-loop (no visible jump).
5. ScrollTrigger watches the marquee. While scrolling forward, flip the `timeScale` sign (inverts direction).
6. A secondary scrubbed timeline offsets the scroll wrapper horizontally by `±scrollSpeed vw` as it scrolls through the viewport.

### 9.2 Organic column animation

`.animations_organic_bg_column` elements:
- `yPercent: 50`, duration **0.6s**, ease `power1.inOut`.
- `transformOrigin: bottom`.
- Stagger: `{ each: 0.08, from: 'center', repeat: -1, yoyo: true }`.

All values LOCKED.

### 9.3 Colors section clip-path reveal

Six `.colors_visual_gradient` bands:
- Each starts as a collapsed polygon (all points on left edge — invisible).
- Expands to full clip-path shape via scroll scrub (1:1).
- Each band's trigger is offset by **8%** from the previous one:
  - Band 0: `top 70%`
  - Band 1: `top 62%`
  - Band 2: `top 54%`
  - Band 3: `top 46%`
  - Band 4: `top 38%`
  - Band 5: `top 30%`
- Ease: `power2.out`.

### 9.4 Star rotation

SVG `[star]` elements:
- `rotationY: 360`, duration **4s**, ease `none`, repeat `-1` (infinite).
- `transformPerspective: 1000`, `transformOrigin: center center`.

### 9.5 Button hover with motion path

**Button variant 1:**
- On `mouseenter`: split `[split-hover-text]` into characters via SplitText.
- Animate all chars to `yPercent: -93` (rolling text effect), duration **0.6s**, stagger **0.075s**, ease **`ease-primary`**.
- Simultaneously: SVG dot (`[data-draw="1"]`) animates along the path defined by `[data-ease="1"]` using MotionPathPlugin. Duration **0.57s**. Aligned to path, auto-rotating, anchor at center.
- On `mouseleave`: reverse the entire timeline.

**Button variant 2:**
- Same motion path concept.
- Ease: **`ease-button`** (`cubic-bezier(0.16, 1, 0.3, 1)`). Duration **0.45s**. No text split.

### 9.6 Button border flash (Grid section)

When layout buttons scroll into view (`top 80%` to `bottom 20%`):

1. Buttons slide in: `y: -30, opacity: 0 → y: 0, opacity: 1`, duration **0.6s**.
2. Border-color flash sequence on all `.button_main_wrap`:

```
#ffb700 (0.05s) → #515151 (0.08s) → #ffb700 (0.04s) → #515151 (0.06s) → #ffb700 (0.03s) → #515151 (0.5s, eased)
```

All durations LOCKED. `toggleActions: "play none none reset"`.

---

## Phase 10 — Custom Easing Registration

### 10.1 File: `lib/easings.ts`

This file must be imported **once**, client-side, before any animation runs. It registers all six custom eases.

```ts
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

// ALL VALUES LOCKED — DO NOT MODIFY
CustomEase.create('ease-primary',     '0.87, 0, 0.13, 1');
CustomEase.create('ease-secondary',   '0.31, 0.75, 0.22, 1');
CustomEase.create('ease-fade',        '0.76, 0, 0.24, 1');
CustomEase.create('ease-preloader',   '0.64, 0.04, 0.42, 0.99');
CustomEase.create('ease-transition',  '0.16, 1, 0.35, 1');
CustomEase.create('ease-button',      '0.16, 1, 0.3, 1');
```

### 10.2 File: `lib/gsapPlugins.ts`

```ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { Flip } from 'gsap/Flip';
import { Draggable } from 'gsap/Draggable';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

// Import easing registration (runs CustomEase.create calls)
import './easings';

gsap.registerPlugin(
  ScrollTrigger,
  SplitText,
  ScrambleTextPlugin,
  Flip,
  Draggable,
  MotionPathPlugin,
  DrawSVGPlugin
);

export { gsap, ScrollTrigger, SplitText, ScrambleTextPlugin, Flip, Draggable, MotionPathPlugin, DrawSVGPlugin };
```

### 10.3 CSS cubic-bezier matches

Two places in CSS also use easing values directly (not via CustomEase). These must match exactly:

```css
/* Button CSS transitions */
transition-timing-function: cubic-bezier(0.87, 0, 0.13, 1);   /* = ease-primary */

/* Nav link CSS transitions */
transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);    /* = ease-button */
```

---

## Phase 11 — Responsive Design & Breakpoints

### 11.1 Tailwind screen config (already stated in Phase 4, repeated for clarity)

```ts
screens: {
  'mobile':          { max: '479px' },
  'mobileLandscape': { max: '767px' },
  'tablet':          { max: '991px' },
  'desktop':         '992px',
},
```

### 11.2 What changes at each breakpoint

**Desktop (≥992px):**
- Font-weight proximity effect is **active** on "Typography." headings.
- Canvas grid: **64 columns**.
- Marquee speed multiplier: **1×**.
- Full menu animations.

**Tablet (≤991px):**
- Font-weight proximity effect is **disabled** — do nothing on mousemove for those headings.
- Layout flip grid areas adjust (component-specific CSS media queries).
- Marquee speed multiplier: **0.5×**.

**Mobile Landscape (≤767px):**
- Parallax effects with `data-parallax-disable="mobileLandscape"` are **skipped** entirely.
- Menu height animates to `100%` (full viewport) instead of auto.
- Canvas grid: **8 columns**.

**Mobile (≤479px):**
- Parallax effects with `data-parallax-disable="mobile"` are **skipped**.
- Layout flip grid areas rearrange completely (cover becomes full-width).
- Marquee speed multiplier: **0.25×**.
- Loader animates to **88dvh** height instead of full wipe.

### 11.3 Container queries

The original uses container queries at three thresholds. Replicate in `globals.css`:

```css
/* threshold-large */
@container (min-width: 62em) { ... }

/* threshold-medium */
@container (min-width: 48em) { ... }

/* threshold-small */
@container (min-width: 30em) { ... }
```

These are independent of viewport width and apply to specific components. Apply `container` class (or `container-type: inline-size`) to the relevant parent components.

---

## Phase 12 — Page Content & Section Map

### 12.1 Section render order in `page.tsx`

`app/page.tsx` must render components in this exact order. Do **not** reorder.

```tsx
import Loader from '@/components/Loader';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Grids from '@/components/Grids';
import Typography from '@/components/Typography';
import Colors from '@/components/Colors';
import Motion from '@/components/Motion';
import Practice from '@/components/Practice';
import Resources from '@/components/Resources';

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <main>
        <Hero />
        <About />
        <Grids />
        <Typography />
        <Colors />
        <Motion />
        <Practice />
        <Resources />
      </main>
    </>
  );
}
```

### 12.2 Repeated motifs — shared components

These elements appear in multiple sections. Build them as **shared components**, not duplicated markup:

| Motif | Where it appears | Component |
|---|---|---|
| Barcode SVG | Nav, Loader, Hero | `<Barcode />` — same `viewBox="0 0 333 109"` SVG |
| Bracket SVGs | Hero, Loader | `<Brackets />` — four corner brackets, each `viewBox="0 0 14 14"` |
| Chapter labels | Above every section | `<ChapterLabel chapter="1" title="About" />` — mono-styled eyebrow |
| Active ingredients sidebar | Alongside chapter nav | `<ActiveIngredients />` — lists `webflow` → `next.js`, `gsap` |

### 12.3 Section content summary

Each section component must contain the following content and interactive elements. These are content requirements, not styling instructions — styling is handled by Phase 2 (type), Phase 3 (color), and Phase 4 (layout).

**Hero:** Logo SVG (stroke + fill versions), barcode graphic, four corner brackets, coordinate display elements.

**About (Chapter 1):** "CREATIVITY" display heading, four-line word-overlay paragraph, "TECHNICALITY" scramble element, sticky card with expanding container, pixel transition at the end.

**Grids (Chapter 2.1):** 12-column grid spec display (columns: 12, gutter: 1rem), interactive layout flip demo with 3 layout buttons, CSS grid code example shown as readable content, "grids are just guidelines" outro text.

**Typography (Chapter 2.2):** Three "Typography." headings (font-weight proximity targets), draggable letter stickers, three project type case studies (Supersolid, S-2K, Mammoth Murals) with typeface breakdowns and video-on-hover previews.

**Colors (Chapter 2.3):** Color philosophy intro, cool-tone swatch row (6 swatches), warm-tone swatch row (6 swatches), neutral swatch row (6 swatches), gradient clip-path reveal animation, three project color case studies (OH Architecture, Mammoth Murals, SOGAI).

**Motion (Chapter 2.4):** Marquee bands with words "Motion", "Animation", "Interaction", organic column animation background, accelerating globe, counter element ("34"), rotating star elements, micro-interaction specs panel (3 patterns with duration/easing/method), button motion-path demos.

**Practice (Chapter 3):** Stacking cards with "Put in the reps" message and encouragement copy.

**Resources:** Curated lists under three headings: books, courses/communities, inspiration sites. Each item is a hoverable link with an arrow icon.

---

## Phase 13 — GSAP Plugin Usage Summary & Checklist

This is a final verification checklist. Every plugin listed here must be installed, registered, and used in the locations shown.

| Plugin | npm package path | Used In |
|---|---|---|
| **ScrollTrigger** | `gsap/ScrollTrigger` | Every scroll animation across all sections |
| **SplitText** | `gsap/SplitText` | Heading reveals (word/line/char), font-weight proximity, button text roll, About word overlays |
| **ScrambleTextPlugin** | `gsap/ScrambleTextPlugin` | Loader text reveal, nav menu text reveal, TECHNICALITY scramble |
| **Flip** | `gsap/Flip` | Layout grid demo — state capture before class swap, animate from old to new positions |
| **Draggable** | `gsap/Draggable` | Typography section sticker elements |
| **MotionPathPlugin** | `gsap/MotionPathPlugin` | Button hover — SVG dots travel along defined SVG paths |
| **DrawSVGPlugin** | `gsap/DrawSVGPlugin` | SVG stroke animations on interactive elements |
| **CustomEase** | `gsap/CustomEase` | Defines all 6 custom easing curves (see Phase 10) |

### Final checklist before shipping

- [ ] All 24 color hex values match the Global Restrictions exactly. Zero approximations.
- [ ] All three font families load from `public/fonts/` via `@font-face`. No Google Fonts, no `next/font`.
- [ ] All six CustomEase curves are registered with exact cubic-bezier values.
- [ ] All animation durations and stagger values match the Timing Lock.
- [ ] Breakpoints are set to 479 / 767 / 991 / 992. No Tailwind defaults remain.
- [ ] 12-column grid with 1rem gutter is applied consistently.
- [ ] Heading letter-spacing (-3%) and line-height (1.1em) are applied on all PP Neue Montreal headings.
- [ ] Lenis is initialized once, synced to GSAP ticker, lagSmoothing set to 0.
- [ ] GSAP plugins are registered once in `gsapPlugins.ts`, never inside components.
- [ ] Font-weight proximity effect is disabled on tablet and below (≤991px).
- [ ] Canvas grid uses 64 columns on desktop, 8 on mobile.
- [ ] Marquee speed multipliers are 1× desktop, 0.5× tablet, 0.25× mobile.
- [ ] Loader height on mobile is 88dvh.
- [ ] Menu height on mobile is 100%.
- [ ] All video elements load lazily (no `src` until first hover).
- [ ] Coordinate display uses `pageX` / `pageY` with `Math.round`.
- [ ] Section render order matches Phase 12.2 exactly.
- [ ] Dark theme (`bg-page-bg`) is applied at the root body level.
- [ ] All client components have `"use client"` directive.
- [ ] No Tailwind default color palette classes are used anywhere (no `bg-blue-500`, `text-gray-400`, etc.).
