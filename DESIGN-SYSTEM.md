# The Creative Website Manual — UI/UX Design & Technical Reference

> A full breakdown of how this site is built, styled, animated, and structured. Written in phases from the ground up.

---

## Phase 1 — Project Overview & File Structure

**What this site is:** A single-page editorial website by Huy and Ivor that teaches the methodology behind crafting award-winning creative websites. It doubles as a living showcase of the very techniques it documents — grids, typography, color, and motion are all demonstrated interactively on the page.

**Built with:** Webflow (exported static HTML), GSAP (animation engine), Lenis (smooth scroll), jQuery, and a suite of GSAP plugins. All assets are self-contained — no CDN dependencies at runtime.

```
project/
├── index.html                          — single page, ~743 lines (minified)
├── css/
│   ├── cwm9.webflow.shared.*.min.css   — Webflow framework + all project styles (190 KB)
│   └── slater-49802.css                — custom overrides: hover states, overlays, nav (1.4 KB)
├── js/
│   ├── 17411.js                        — module entry point; dynamically imports the two below
│   ├── slater-49467.js                 — main animation logic (18 KB): loader, scroll, hover, marquee
│   ├── slater-49655.js                 — section animations (3.6 KB): practice, colors, grids, type
│   ├── gsap.min.js                     — GSAP core
│   ├── ScrollTrigger.min.js            — scroll-linked animation plugin
│   ├── SplitText.min.js                — text splitting for per-character/word/line animation
│   ├── CustomEase.min.js               — custom cubic-bezier easing curves
│   ├── Flip.min.js                     — layout-state flip animation (FLIP technique)
│   ├── Draggable.min.js                — drag-and-drop plugin
│   ├── MotionPathPlugin.min.js         — animate along SVG paths
│   ├── ScrambleTextPlugin.min.js       — text scramble/typewriter effect
│   ├── DrawSVGPlugin.min.js            — animate SVG stroke drawing
│   ├── lenis.min.js                    — buttery smooth scroll
│   ├── jquery-3.5.1.min.*.js           — jQuery
│   └── webflow.*.js                    — Webflow runtime
├── css/
│   └── (same as above)
├── fonts/
│   ├── PPNeueMontreal-Light.woff2
│   ├── PPNeueMontreal-Book.woff2
│   ├── PPNeueMontreal-Regular.woff2
│   ├── PPNeueMontreal-Medium.woff2
│   ├── PPNeueMontreal-Bold.woff2
│   ├── PPNeueMontreal-Variable.woff2
│   ├── PPMondwest-Regular.otf
│   ├── Rand-Mono-Thin.woff
│   └── Rand-Mono-Regular.woff
└── images/
    └── (avif/png/jpg assets, SVGs, opengraph image)
```

**Page theme:** Dark. The root container carries `u-theme-dark`. Backgrounds are near-black; text is white/light gray. Warm accent pops (yellow-gold, orange) and cool accent pops (cyan, teal) are used sparingly for emphasis.

---

## Phase 2 — Typography System

Three typeface families do all the work on this site. Each one has a specific role and is never used outside that role.

### Typefaces

| Family | Role | Weights Used | Format |
|---|---|---|---|
| **PP Neue Montreal** | Primary heading + body | Light (300), Book (400), Regular (400), Medium (500), Bold (700) | woff2 (+ variable font file) |
| **PP Mondwest** | Display / large statement headings | Regular (400) | otf |
| **Rand Mono** | Monospace UI labels, code-like text, metadata | Thin (100), Regular (400) | woff |

### How they map to the page

- **Display text** (the biggest headings — "CREATIVITY", "Grids & Layouts", "Colors", "Motion", "Animation", "Interaction"): PP Mondwest Regular. These use the utility class `u-text-style-display`.
- **H1 headings** ("Methods", "Type usage in", counter "34"): PP Neue Montreal Bold. Class: `u-text-style-h1`.
- **H2 headings** (section sub-headings, the word-reveal paragraphs): PP Neue Montreal Medium/Bold. Class: `u-text-style-h2`.
- **H3/H4** (labels like "Examples", "chapters", "CURRENT GRID SPECS"): PP Neue Montreal Regular. Classes: `u-text-style-h4`, `u-text-style-large`.
- **Body copy** (explanatory paragraphs): PP Neue Montreal Light or Book.
- **Mono / UI labels** (loader text, grid specs, chapter numbers, eyebrows, coordinate readouts): Rand Mono. Class: `u-mono`.

### Typography specs shown on the page itself

The page documents its own type system in the Grid section sidebar:

| Property | Value |
|---|---|
| Typeface | PP Neue Montreal |
| Letter Spacing | -3% |
| Line Height | 1.1em |

### The font-weight proximity effect

On desktop (min-width 992px), the three "Typography." headings have `data-animate="font-weight"`. Each heading is split into individual characters via SplitText. As the mouse moves across the page, every character's distance to the cursor is calculated. Characters within 300px get their `font-weight` animated between 300 (far) and 800 (close) using `gsap.utils.mapRange`. The animation eases with `ease-transition` (cubic-bezier 0.16, 1, 0.35, 1) over 1 second — so the weight shifts feel fluid, not snappy.

---

## Phase 3 — Color System

The site operates on a strict dark base with two accent temperature families: cool tones and warm tones. Every color on the page is intentional and documented — the site literally teaches its own color philosophy in the Colors section.

### Base / neutral palette (the 6 neutrals shown as swatches)

These six are displayed as a horizontal row of color blocks on the page. They form the structural palette — backgrounds, text, borders, surfaces.

| Hex | Name / Usage |
|---|---|
| `#080807` | Page background. Near-black with a barely perceptible warm bias. |
| `#292929` | Dark surface. Used on cards, overlays, loader elements. |
| `#7d7d7d` | Mid gray. Secondary text, dividers, inactive states. |
| `#dcddde` | Light gray. Subtle text on dark backgrounds. |
| `#f1f0ee` | Off-white. Warm-tinted light surface. |
| `#fcfcfc` | Near-white. Primary light text color. |

### Cool tone palette (the 6 cool swatches)

Grouped under the label **"Cool tones"** with the note: *"Evoke emotions such as calm, sophistication, and trust."*

| Hex | Usage context |
|---|---|
| `#120c00` | Deepest dark — almost black with brown undertone. |
| `#fff6e5` | Lightest warm cream — used as a soft background or card fill. |
| `#47a0ff` | Bright sky blue. Primary cool accent. |
| `#ffd900` | Saturated yellow-gold. Primary warm accent. |
| `#265855` | Deep teal. Used in SOGAI project palette. |
| `#31726e` | Mid teal. Secondary teal accent. |

### Warm tone palette (the 6 warm swatches)

Grouped under the label **"Warm tones"** with the note: *"Evoke emotions such as energy, passion, and anger."* The container carrying these swatches has the class `is-warm`.

| Hex | Usage context |
|---|---|
| `#193937` | Dark teal-green. Deep background variant. |
| `#182b2a` | Darkest teal. Pairs with the lighter teals. |
| `#fbf6c0` | Pale yellow cream. Soft warm surface. |
| `#eee2cd` | Warm beige. Body/card background in warm contexts. |
| `#c4b59c` | Tan / sand. Warm mid-tone. |
| `#a58f69` | Ochre / dark sand. Warm accent for text or borders. |

### Accent colors used in the UI itself (not swatches)

| Hex | Where it appears |
|---|---|
| `#ffb700` | Gold border flash on layout buttons (the rapid border-color animation). Also the top border on nav menu link hover. The signature "pulse" accent. |
| `#515151` | The resting border color of layout buttons (alternates with `#ffb700` in the flash sequence). |
| `#EAEAEA` | Hover background on buttons and nav links. |
| `#070707` | Hover text color on buttons and nav links (dark text on light hover bg). |
| `#262626` | The `overlay-block` background — the dark block that sits over each word in the about section and fades out on scroll. |
| `#0C0C0C` | Canvas grid border color (the interactive hover grid). |

### How color is used across the three project case studies

The site documents its own color decisions for three client projects shown in the Colors section:

- **OH Architecture** — Monochromatic. Subtle shade variations only. Refined, gallery-like.
- **Mammoth Murals** — Monochrome foundation with yellow (`#ffd900`) and blue (`#47a0ff`) accent injections at key moments. Playful energy.
- **SOGAI** — Rich teals (`#265855`, `#31726e`) and dark tones for depth. Warm creams (`#eee2cd`, `#fbf6c0`) soften the tech-forward subject.

---

## Phase 4 — Layout & Grid System

### The 12-column grid

The site uses a standard 12-column CSS grid system. The grid specs are displayed on the page itself:

| Property | Value |
|---|---|
| Columns | 12 |
| Rows | none (auto) |
| Gutter / Gap | 1rem / 16px |

Webflow generates the grid variables:
- `--site--column-count` controls the total column count
- `--site--column-width` is calculated per breakpoint
- `--site--margin` is the page-edge margin
- CSS custom properties `--span-1` through `--span-12` and `--start-1` through `--start-12` are generated for placement

The grid is exposed via a CSS Grid `grid-template-columns` using the `--grid-breakout` variable which includes named lines `[full-start]`, `[content-start]`, `[content-end]`, `[full-end]` for full-bleed vs content-contained sections.

### The interactive layout flip demo

The Grids & Layouts section contains a live demo where three layout configurations can be toggled. A 4x4 or 5x5 CSS grid contains four child elements: a heading (`grids_flip_h1`), a nav block (`grids_flip_nav`), a paragraph (`grids_flip_p`), and a cover image (`grids_flip_cover`).

Clicking layout buttons (`data-btn-layout="1"`, `"2"`, `"3"`) swaps which `is-layout` class is active. The GSAP **Flip plugin** captures the DOM state before the class swap, applies the new layout, and animates every element from its old position to its new position using the browser's layout engine. The animation runs at:

- Duration: 1 second
- Ease: `expo.inOut`
- Stagger: 0.2s, from `"start"`
- Scale: true (elements scale smoothly rather than jumping)

The three layout configurations use explicit `grid-area` values to place each of the four blocks in different quadrants of the grid. Each layout is also responsive — the grid areas change at 991px and 479px breakpoints.

### Sticky stacking layout

The resources section and about section both use a sticky-stack pattern. Elements inside `[data-stack-list]` are positioned `sticky` via JS at runtime, each offset by `1.75rem + (index × 3.3rem)` from the top. This creates the layered card-stacking scroll effect where cards peel away as you scroll.

### The pixel transition grid

Between sections, a grid of small square elements (`.pixel_item`) is used as a transition mask. These are laid out in a 10×9 grid and animated in with a staggered reveal using GSAP's grid stagger (`stagger: { amount: 1.3, grid: [10, 9], axis: "y" }`) linked to scroll via ScrollTrigger. Some pixels carry the class `.pixel_black` for contrast.

---

## Phase 5 — Navigation & Menu System

### Structure

The nav sits in `.nav_wrap` at the top of the page. It contains a hamburger-style toggle and a full-screen overlay menu (`.nav_menu`) that is hidden by default (`display: none`).

The menu contains:
- Chapter navigation links styled as large headings (`menu_heading_link`):
  - **About** — links to Chapter 1
  - **Design + Dev** — links to Chapter 2, with sub-items: 2.1 Grids & Layouts, 2.2 Typography, 2.3 Color, 2.4 Motion
- A barcode graphic (`.nav_barcode`) — the same SVG barcode motif used in the hero/loader
- Open/close text labels with an animated plus icon (`.nav_plus`) that shifts padding on hover

### Open/close animation

When the hamburger is clicked, a GSAP timeline plays:

1. Menu container is set to `display: flex`
2. Menu fades in from `opacity: 0` and `height: 0` over 0.8s with `ease-secondary` (cubic-bezier 0.31, 0.75, 0.22, 1), starting at a 0.3s delay
3. Each nav text item (`[data-nav-text]`) reveals via **ScrambleText** — the text is first replaced with random characters from the set `-_x0$9`, then unscrambles to the real text over 0.8s with a 0.1s stagger between items
4. The main page content (`.page_main`) dims to `opacity: 0.6` over 0.6s

Clicking again reverses the entire timeline. On mobile (max-width 768px), the menu height animates to `100%` instead of auto-sizing.

### Nav link hover states

Each `menu_heading_link` has a CSS transition of 0.5s with `ease-secondary`. On hover:
- Background becomes `#EAEAEA`
- Text color becomes `#070707`
- Left and right padding expand to `0.333em`
- The inner `menu_link_wrap` div gets a `border-top: 1px solid #ffb700` (gold accent line)

The plus icon (`.nav_plus`) shifts its padding on hover to create a subtle spacing animation.

---

## Phase 6 — Loader & Entry Animation

The loader is the first thing the user sees. It runs entirely on a GSAP timeline and has multiple layered sequences that overlap.

### Loader visual elements

- **Percentage counter** — a large `h1` that counts from 0 to 100
- **Percentage icon** — the `%` symbol next to it
- **Loader dials** — a row of small dial indicators (`.loader-dial`) that wipe across
- **Loader text** — monospace code-like labels shown in sequence:
  ```
  ©CWM — FW25
  prjct by
  huy + ivor
  [l] vn.us
  // site.loading
  [f] Scripts() {
  initlenis();
  initnav();
  initloader();
  }
  ```
- **Blinking characters** — individual characters (`[`, `0`, `%`) split via SplitText that blink/flash
- **Hero logo paths** — the SVG logo paths that flash in with a stutter effect
- **Brackets** — four bracket SVGs (top-left, top-right, bottom-left, bottom-right) that also flash in

### Sequence breakdown

**Phase A — Logo stutter (0s–1s, random):**
Each SVG path in the hero logo is animated independently with a hand-timed "flicker" sequence:
- delay 0.25s → opacity 1 (0.05s)
- delay 0.02s → opacity 0 (0.04s)
- delay 0.1s → opacity 1 (0.06s)
- delay 0.2s → opacity 1 (0.07s)

Each path starts at a random time between 0–0.5s, so the logo assembles in a scattered, electronic-glitch manner. The bracket SVGs use the same flicker pattern but with tighter timings (0.03s, 0.04s, 0.02s, 0.04s).

**Phase B — Mid section reveal:**
The loader mid-wrap, dials, percentage, details, and text all fade in together at `autoAlpha: 1` over 0.5s.

**Phase C — Blinking text flash:**
The SplitText characters in `[loader-blink]` flash in with the same stutter pattern, each starting at a random offset up to 0.3s apart.

**Phase D — Main sequence (starts at 3.5s delay):**
1. Barcode lines (`[barcodeLine]`) are set to `yPercent: -101` (hidden above)
2. The hero mono text elements are scrambled to empty space first
3. Hero mono text unscrambles to reveal the actual loader labels — staggered at 0.1s each, using ScrambleText with `chars: " "` (space character as the scramble alphabet)
4. Barcode lines slide down to `yPercent: 0` over 0.8s with 0.06s stagger and `ease-preloader`
5. The percentage counter animates from 0 → 100 over 2s using `ease-preloader` (cubic-bezier 0.64, 0.04, 0.42, 0.99), with an `onUpdate` callback that rounds and displays the value
6. The loader container slides up (`height: 100%` → animates up) in sync
7. Dial indicators wipe across (`xPercent: 100`) over 0.4s with 0.07s stagger
8. At ~3s into the sequence, the hero mono text scrambles back to empty (rightToLeft: true)
9. Blinking characters fade out with `steps(4)` ease and random stagger
10. The loader wrapper fades out with `steps(7)` ease
11. Loader is set to `display: none`

**Mobile variant (max-width 768px):** The loader container animates height to `88dvh` instead of the full-height wipe used on desktop.

### Easing used in the loader

- `ease-preloader` (`0.64, 0.04, 0.42, 0.99`) — used for the percentage counter and dial wipes. Slow start, then accelerates — gives a "loading" feel.
- `steps(4)` — used for the blinking character fade. Creates a discrete, digital blink.
- `steps(7)` — used for the final loader fade. More steps = smoother but still stepped.

---

## Phase 7 — Scroll-Based Animations (GSAP + ScrollTrigger)

Almost every animation on the page after the loader is scroll-driven. GSAP's ScrollTrigger plugin is used throughout, always paired with Lenis smooth scroll (synced via `lenis.on("scroll", ScrollTrigger.update)`).

### Lenis smooth scroll setup

```
duration: 0.7s
infinite: true (loops scroll momentum)
```
Lenis is synced to GSAP's ticker so ScrollTrigger updates every frame. `lagSmoothing` is set to 0 to prevent timing drift.

### Global parallax system

Any element with `data-parallax="trigger"` becomes a parallax container. The system reads the following attributes to configure each one:

| Attribute | Default | Effect |
|---|---|---|
| `data-parallax-direction` | `"vertical"` | `"horizontal"` animates `xPercent` instead of `yPercent` |
| `data-parallax-start` | `20` | Starting percent offset |
| `data-parallax-end` | `-20` | Ending percent offset |
| `data-parallax-scrub` | `true` | Scrub value (true = linked 1:1 to scroll) |
| `data-parallax-scroll-start` | `"top bottom"` | ScrollTrigger start point |
| `data-parallax-scroll-end` | `"bottom top"` | ScrollTrigger end point |
| `data-parallax-disable` | — | `"mobile"`, `"mobileLandscape"`, or `"tablet"` to skip on that device |

All parallax uses `ease: "none"` — pure linear scrub, no easing curve applied on top of scroll.

### Heading reveal animations

Two patterns are used for headings:

**Pattern A — Character split (`data-split="heading"`):**
The heading is split into words via SplitText. Each word animates from `yPercent: 101` (below) to its resting position over 0.9s with 0.02s stagger. Ease: `ease-transition`. Triggers once when the heading enters at `top 80%` of the viewport.

**Pattern B — Line split (`data-split="global"`):**
Same as above but splits into lines instead of words. Each line animates from `yPercent: 100` over 0.9s with 0.15s stagger between lines.

### Section-end pin + scale-down

Elements with `data-section-end` are pinned at the bottom of the viewport as the user scrolls past. While pinned, the element scales down to 0.85 and fades to `opacity: 0.1` over a scrubbed range of `+=100%`. When the scroll leaves, the element snaps back to `scale: 1, opacity: 1`. This creates the effect of a section "shrinking away" as the next section slides over it.

Characters inside `[data-split="sectionEnd"]` also fade out in random order with `steps(5)` ease during the same scroll range.

### The About section — word overlay reveal

The about section contains four h2 lines that together read:

> *"Creative websites are the intersection of creativity and technicality to form bespoke digital experiences"*

Each line is split into words via SplitText. Every word gets a wrapper div and an `overlay-block` div (a dark rectangle at `background: #262626`, `z-index: 1`) placed on top of it. As the section scrolls through a pinned sticky container (from `top 20%` to `bottom 70%`), the overlays fade out one by one (`opacity: 0`, stagger 0.1s, `ease: power2.out`, scrub: 1). The words are revealed progressively as you scroll — a "reading pace" effect.

### The "CREATIVITY" heading character reveal

The large display heading "CREATIVITY" (`.about_p_creativity`) is split into characters. All characters start at `yPercent: -100` (hidden above the baseline). They animate to `yPercent: 0` over 0.7s with a stagger amount of 0.2s and `ease-primary`. The trigger is `.about_h1_t` entering at `top center`. The animation reverses if you scroll back up (`toggleActions: "play none none reverse"`).

### The "TECHNICALITY" scramble

The element `[data-about-tech]` displays the text `</ >` at rest. When it scrolls into view (enters at `top 40%`), it scrambles using characters `+_1x><*^0!~`` to reveal `</TECHNICALITY>` over 1.6s. If the user scrolls back out, it scrambles back to `</ >` over 0.8s. This is done via ScrollTrigger `onEnter` / `onLeaveBack` callbacks — not scrubbed.

### SVG path groups reveal

In the about section, SVG elements with `[path-group]` contain multiple `<path>` children. Each path fades in from `opacity: 0` with a 0.1s stagger, scrubbed from `top 20%` to `bottom bottom` of the sticky container. Uses `steps(1)` ease — binary on/off per path, creating a sharp reveal.

### The practice section — stacking scale

The practice section contains multiple `.practice_contain_inner` elements stacked absolutely. Each one is scaled down based on its index: `scale = 0.85^(index+1)`. So index 0 = 0.85, index 1 = 0.7225, index 2 = 0.614, etc. The scale is animated via scrub from `top center` to `bottom top` of the trigger `.practice_contain_content`, with `ease: power2.out` and `transformOrigin: center center`.

### Grid guide items flash

When `.grids_guide_item` elements scroll into view, each one plays a rapid flicker sequence (the same logo-stutter pattern from the loader): opacity 0 → 1 (0.04s) → 0 (0.03s) → 1 (0.04s) → 1 (0.05s). Each item starts at a random offset up to 0.5s. This re-triggers every time the element enters the viewport (`once: false`).

### The accelerating globe

A globe graphic (`[data-accelerating-globe]`) contains 8 circle elements that animate their widths in a looping timeline. The loop runs at `timeScale: 1` at rest. A scroll event listener measures scroll velocity every frame. When the user scrolls fast, the `timeScale` is set to `Math.abs(velocity × 0.005) + 1` — so faster scrolling speeds up the globe rotation. After scrolling stops (100ms timeout), the timeScale eases back to 1 over 0.6s with `power2.out`.

### Counter animation

The number "34" in the Methods bento is actually a live counter. An object `{ value: 0 }` is tweened to `{ value: 50 }` over 3s with `power1.inOut`, then yoyo'd back down — repeating infinitely with a 0.5s delay between loops. An `onUpdate` callback rounds the value and writes it to the DOM. The animation only starts when `.animation_types-wrap` enters the viewport (`start: "top bottom"`).

---

## Phase 8 — Interactive Elements

### Canvas grid on hover

Multiple sections have an interactive grid background driven by a `<canvas>` element. Any container with `[data-grid]` gets a canvas appended to it. The grid is configured via data attributes:

| Attribute | Default | Effect |
|---|---|---|
| `data-grid-size-desktop` | `64` | Number of columns on desktop |
| `data-grid-size-mobile` | `8` | Number of columns on mobile |
| `data-grid-border-size` | `0.15` | Border line width in pixels |
| `data-grid-border-color` | `#0C0C0C` | Border color |
| `data-grid-colors` | `["#EAEAEA"]` | Array of possible fill colors (JSON) |
| `data-grid-background` | `transparent` | Canvas background |

On `mousemove`, the code finds which grid cell the cursor is in. If it's a new cell, that cell is filled with a random color from the `data-grid-colors` array, animated to `alpha: 1` over 0.1s, then faded back to `alpha: 0` over 0.5s with a 0.2s delay. The canvas redraws every frame via `requestAnimationFrame`. Touch devices skip the mousemove listener entirely.

### Draggable stickers (Typography section)

In the Typography section, elements with `[data-sticker="item"]` inside a `[data-sticker="wrap"]` container are made draggable via GSAP's Draggable plugin. Configuration:

- `bounds`: constrained to the parent wrap element
- `dragResistance: 0.1` — slight resistance to movement
- **onPress:** The dragged item scales to 1.2, rotates to a random angle between -30° and +30°, and gets a drop shadow (`drop-shadow(0px 10px 8px rgba(0,0,0,0.3))`). Duration: 0.1s.
- **onRelease:** Snaps back to `scale: 1`, `rotation: 0`, shadow removed. Ease: `back.out(3)` (overshoots and bounces back). Duration: 0.2s.

### Video on hover

Six video elements exist in the page (project showcases). Videos have no `src` attribute initially — they are loaded lazily on first hover. The `data-video-src` attribute holds the actual URL. On `mouseenter`:
1. If `src` is not yet set, it is set from `data-video-src`
2. `dataset.videoOnHover` is set to `"active"` (for CSS state targeting)
3. `video.play()` is called

On `mouseleave`:
1. `dataset.videoOnHover` is set to `"not-active"`
2. After a 200ms delay, the video pauses and resets to `currentTime: 0`

The three video sources:
- `Mammoth Murals Compressed.mp4`
- `OH Arch Compressed.mp4`
- `Supersolid Thumbnail Compressed.mp4`

All videos have `autoplay`, `loop`, `muted`, and `playsinline` attributes for mobile compatibility.

### Cursor coordinate display

Two elements (`[data-coordinates-x]` and `[data-coordinates-y]`) display the live mouse position on the page. A single `mousemove` listener on `document` updates their `textContent` with `Math.round(e.pageX)` and `Math.round(e.pageY)` every frame.

### Button hover with motion path

Two button styles use animated SVG dots that travel along a path on hover:

**Button 1:** On `mouseenter`, the text inside `[split-hover-text]` is split into characters. All characters animate to `yPercent: -93` (shift up to reveal the duplicate row below — a "rolling text" effect) over 0.6s with 0.075s stagger and `ease-primary`. Simultaneously, an SVG dot (`[data-draw="1"]`) animates along the SVG path defined by `[data-ease="1"]` using MotionPathPlugin — aligned to the path, auto-rotating, anchored at center. Duration: 0.57s. On `mouseleave`, the entire timeline reverses.

**Button 2:** Same motion path concept but with the custom ease `ease-button` (cubic-bezier 0.16, 1, 0.3, 1) and a duration of 0.45s. No text split animation on this variant.

### Button border flash (Grid section)

When the layout buttons scroll into view (`top 80%` to `bottom 20%`), a GSAP timeline plays a rapid border-color oscillation sequence on all `.button_main_wrap` elements:

1. Buttons slide in from `y: -30, opacity: 0` over 0.6s
2. Border flashes to `#ffb700` (0.05s) → `#515151` (0.08s) → `#ffb700` (0.04s) → `#515151` (0.06s) → `#ffb700` (0.03s) → `#515151` (0.5s, eased out)

This creates a brief electrical-pulse effect on the buttons as they appear. The sequence resets if the user scrolls back past the trigger (`toggleActions: "play none none reset"`).

---

## Phase 9 — Motion, Marquee & Micro-Interactions

### Marquee system

The page contains horizontal scrolling marquee bands. Each marquee is configured via data attributes on the container:

| Attribute | Effect |
|---|---|
| `data-marquee-speed` | Base speed multiplier (e.g. `15`) |
| `data-marquee-direction` | `"left"` or `"right"` |
| `data-marquee-duplicate` | Number of content clones for seamless looping (e.g. `2`) |
| `data-marquee-scroll-speed` | Horizontal offset percentage applied during scroll |

**How it works:**
1. The collection element is cloned N times and appended for seamless looping
2. All collection instances are animated with `xPercent: -100` on repeat, with a duration calculated as `speed × (contentWidth / windowWidth) × responsiveMultiplier`. The responsive multiplier is 0.25 on mobile, 0.5 on tablet, 1 on desktop.
3. The animation starts at 50% progress so it begins mid-loop (no visible jump)
4. A ScrollTrigger watches the marquee's position. While scrolling forward, the marquee direction inverts (timeScale flips sign). This creates the effect of the marquee "responding" to scroll direction.
5. A secondary scrubbed timeline offsets the scroll wrapper horizontally by `±scrollSpeed vw` as the marquee scrolls through the viewport — adding a parallax-like lateral drift.

### The organic column animation

In the animations section, a row of background columns (`.animations_organic_bg_column`) loops infinitely:
- `yPercent: 50` — each column moves down by 50%
- Duration: 0.6s
- Ease: `power1.inOut`
- Transform origin: bottom (so they grow/shrink from the base)
- Stagger: `{ each: 0.08, from: "center", repeat: -1, yoyo: true }` — columns pulse outward from the center and bounce back

### Colors section clip-path reveal

The Colors section has 6 gradient bands (`.colors_visual_gradient`). Each band starts as a collapsed polygon (all points on the left edge — invisible) and expands to its full clip-path shape as the user scrolls. The expansion is scrubbed 1:1 with scroll. Each band's trigger start/end is offset by 8% from the previous (`top 70%` → `top 62%` → `top 54%`, etc.) so they stagger their reveal naturally. Ease: `power2.out`.

### Star rotation

SVG star elements (`[star]`) rotate continuously on the Y axis (3D spin):
- `rotationY: 360`
- Duration: 4s
- Ease: `none` (constant speed)
- Repeat: infinite
- `transformPerspective: 1000` and `transformOrigin: center center` give the spin a subtle 3D depth

### The animation specs displayed on the page

The site documents three of its own micro-interaction patterns in detail:

**Pattern 1 — Organic motion:**
| Spec | Value |
|---|---|
| Duration | 1.5 sec |
| Easing | 0.23, 0.32, 0.23, 0.2 |
| Stagger | 0.025 sec |

**Pattern 2 — Text reveal (split-text):**
| Spec | Value |
|---|---|
| Duration | 0.6 sec |
| Easing | 0.87, 0, 0.13, 1 |
| Method | split-text (gsap) |

**Pattern 3 — Overlap & follow-through:**
| Spec | Value |
|---|---|
| Duration | 0.45 sec |
| Easing | 0.16, 1, 0.3, 1 |
| Method | Overlap & Follow through (CSS) |

---

## Phase 10 — All Custom Easing Curves

Every custom ease in the project is defined via `CustomEase.create()`. These are the only easing functions used — no stock GSAP eases are used for the main UI (only for internal utility like `power2.out` on helper animations).

| Name | Cubic Bezier | Character | Used In |
|---|---|---|---|
| `ease-primary` | `0.87, 0, 0.13, 1` | Sharp acceleration, smooth deceleration | Character reveals, text animations |
| `ease-secondary` | `0.31, 0.75, 0.22, 1` | Ease-in-out with mid-emphasis | Menu open/close, overlays |
| `ease-fade` | `0.76, 0, 0.24, 1` | Quick start, gradual finish | Opacity transitions |
| `ease-preloader` | `0.64, 0.04, 0.42, 0.99` | Slow start, rapid acceleration | Loader counter, dial wipes |
| `ease-transition` | `0.16, 1, 0.35, 1` | Overshoot + settle | Section transitions, font-weight animation |
| `ease-button` | `0.16, 1, 0.3, 1` | Same family as transition, slightly tighter | Button 2 motion path |

CSS also uses two cubic-bezier values directly:
- `cubic-bezier(0.87, 0, 0.13, 1)` — matches `ease-primary`, used on button CSS transitions
- `cubic-bezier(0.16, 1, 0.3, 1)` — matches `ease-button`, used on nav link CSS transitions

---

## Phase 11 — Responsive Design & Breakpoints

| Breakpoint | Max Width | Label |
|---|---|---|
| Mobile | 479px | Extra small screens |
| Mobile Landscape | 767px | Small screens |
| Tablet | 991px | Medium screens |
| Desktop | 992px+ | Large screens |

### What changes at each breakpoint

**Desktop (992px+):**
- Font-weight proximity effect is active on "Typography." headings
- Canvas grid uses 64 columns
- Marquee speed multiplier: 1×
- Full menu animations

**Tablet (≤991px):**
- Font-weight proximity effect is disabled
- Layout flip grid areas adjust (e.g. layout 2 cover spans wider)
- Marquee speed multiplier: 0.5×

**Mobile Landscape (≤767px):**
- Parallax effects with `data-parallax-disable="mobileLandscape"` are skipped
- Menu animates to full viewport height
- Canvas grid uses 8 columns

**Mobile (≤479px):**
- Parallax effects with `data-parallax-disable="mobile"` are skipped
- Layout flip grid areas rearrange completely (cover becomes full-width)
- Marquee speed multiplier: 0.25×
- Loader animates to `88dvh` height instead of full wipe

Container queries are also used (`threshold-large` at 62em, `threshold-medium` at 48em, `threshold-small` at 30em) for component-level responsive behavior independent of viewport width.

---

## Phase 12 — Page Content & Section Map

The page flows top to bottom in this order:

| # | Section | Key Content |
|---|---|---|
| 0 | **Loader** | Code-style labels, percentage counter, logo flicker, barcode lines |
| 1 | **Hero** | Logo SVG (stroke + fill versions), barcode graphic, brackets, coordinate display |
| 2 | **Chapter 1: About** | "CREATIVITY" heading reveal, word-overlay paragraph reveal, "TECHNICALITY" scramble, sticky card with expanding container, pixel transition |
| 3 | **Chapter 2.1: Grids & Layouts** | 12-column grid specs, interactive layout flip demo (3 layouts), CSS grid code example displayed as content, "grids are just guidelines" outro |
| 4 | **Chapter 2.2: Typography** | Three "Typography." headings with font-weight proximity effect, draggable letter stickers, three project type case studies (Supersolid, S-2K, Mammoth Murals) with typeface breakdowns and video-on-hover previews |
| 5 | **Chapter 2.3: Colors** | Color philosophy intro, cool/warm tone swatch rows (18 swatches total), gradient clip-path reveal animation, three project color case studies (OH Architecture, Mammoth Murals, SOGAI) |
| 6 | **Chapter 2.4: Motion / Animation / Interaction** | Marquee bands with the words "Motion", "Animation", "Interaction", organic column animation, accelerating globe, counter ("34"), rotating stars, micro-interaction specs panel, button motion-path demos |
| 7 | **Chapter 2.4 cont: Organic Animations** | Explanation of delays/staggers/easings, organic motion demo |
| 8 | **Chapter 3: Final Word (Practice)** | Stacking card with "Put in the reps" message, encouragement to build passion projects |
| 9 | **Resources** | Curated lists of books, courses/communities, and inspiration sites — each as a hoverable link with arrow icon |

### Repeated motifs

- **Barcode SVG** — appears in the nav, the loader, and the hero. Same `viewBox="0 0 333 109"` SVG, reused.
- **Bracket SVGs** — four corner brackets (`viewBox="0 0 14 14"`) appear in the hero and flash in during the loader.
- **Chapter labels** — monospace eyebrows like `chapter 1:`, `chapter 2.1: grids & layouts` appear above each section.
- **"project by huy + ivor"** — footer attribution repeated at the bottom and in the nav sidebar.
- **Active ingredients sidebar** — a small panel listing `webflow` and `gsap` as the tools used, appears alongside chapter navigation.

---

## Phase 13 — GSAP Plugin Usage Summary

| Plugin | How It's Used |
|---|---|
| **ScrollTrigger** | Every scroll animation. Scrub, pin, toggleActions, onEnter/onLeaveBack callbacks. |
| **SplitText** | Splits headings into chars, words, or lines for staggered reveal. Also used for the font-weight proximity effect and button text roll. |
| **ScrambleTextPlugin** | Loader text reveal, nav menu text reveal, "TECHNICALITY" scramble in/out. |
| **Flip** | The layout grid demo — captures state before CSS class swap, animates from old positions to new. |
| **Draggable** | Typography section sticker elements — drag within bounds, scale/rotate on press, bounce back on release. |
| **MotionPathPlugin** | Button hover animations — SVG dots travel along defined SVG paths with auto-rotation. |
| **DrawSVGPlugin** | Referenced in plugin registration; used for SVG stroke animations on interactive elements. |
| **CustomEase** | Defines all 6 custom easing curves used across the site. |
