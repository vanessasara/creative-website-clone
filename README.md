<!-- ## Project Overview

This is **The Creative Website Manual™** — a static HTML site showcasing creative web design techniques. It's a single-page portfolio/educational site built with:

- **Webflow** (exported static HTML)
- **GSAP** (GreenSock Animation Platform) with extensive plugins
- **Lenis** smooth scroll
- **jQuery** for DOM utilities

The site is fully self-contained with no external CDN dependencies.

**Recent Updates (2026):**
- ✅ HTML formatted and readable (743 → 3,787 lines)
- ✅ CSS organized into 23 logical files
- ✅ JavaScript modernized to ES6+ modules
- ✅ Folders renamed for clarity (js→scripts, css→styles, etc.)
- ✅ All animation logic preserved exactly

## Viewing the Site

Serve the site with any static server:

```bash
# Python 3
python3 -m http.server 8000

```

Then visit `http://localhost:8000`

## Architecture

**Status:** ✅ **Modernized** (HTML5, organized CSS, ES6+ modules, readable structure)

### File Structure

```
.
├── index.html                      # Formatted HTML5 (3,787 lines, readable with section comments)
├── DESIGN-SYSTEM.md                # Comprehensive animation/design documentation
├── MIGRATION.md                    # Old → new structure mapping
├── styles/                         # Organized CSS (23 files)
│   ├── base/
│   │   ├── reset.css               # HTML5 normalize & resets
│   │   ├── variables.css           # CSS custom properties
│   │   └── typography.css          # Font-face declarations
│   ├── layout/
│   │   ├── grid.css                # 12-column grid system
│   │   ├── containers.css          # Container widths, spacing
│   │   └── responsive.css          # Responsive utilities
│   ├── components/
│   │   ├── buttons.css, navigation.css, loader.css
│   │   ├── hero.css, about.css, practice.css
│   │   ├── typography-section.css, colors-section.css
│   │   ├── grids-section.css, motion.css, resources.css
│   ├── animations/
│   │   ├── keyframes.css           # @keyframes animations
│   │   ├── transitions.css         # Timing functions
│   │   └── gsap-helpers.css        # GSAP-specific CSS
│   ├── utilities/
│   │   └── helpers.css             # Utility classes
│   └── main.css                    # Main import file
├── scripts/                        # Modern ES6+ modules
│   ├── main.js                     # Entry point
│   ├── 17411.js                    # Bridge to legacy + new code
│   ├── core/
│   │   ├── smooth-scroll.js        # Lenis initialization
│   │   ├── responsive.js           # Breakpoint utilities
│   ├── animations/sections/
│   │   ├── practice.js, colors.js  # Section-specific animations
│   ├── utils/
│   │   ├── canvas-grid.js          # Canvas grid hover
│   │   ├── cursor-coordinates.js   # Cursor tracking
│   │   ├── video-hover.js          # Video lazy loading
│   │   └── stack-items.js          # Sticky stacking
│   └── lib/                        # Third-party libraries
│       ├── gsap/                   # GSAP plugins
│       ├── lenis.min.js, jquery, webflow
├── assets/
│   ├── fonts/                      # PP Neue Montreal, PP Mondwest, Rand Mono
│   └── images/                     # avif/png/jpg assets, SVGs
│   ├── gsap.min.js                 # GSAP core
│   ├── ScrollTrigger.min.js        # Scroll-based animations
│   ├── SplitText.min.js            # Text splitting (chars/words/lines)
│   ├── CustomEase.min.js           # Custom cubic-bezier easing
│   ├── Flip.min.js                 # Layout state transitions
│   ├── Draggable.min.js            # Drag-and-drop
│   ├── MotionPathPlugin.min.js     # SVG path animation
│   ├── ScrambleTextPlugin.min.js   # Text scramble effects
│   ├── DrawSVGPlugin.min.js        # SVG stroke animation
│   ├── lenis.min.js                # Smooth scroll
│   ├── jquery-3.5.1.min.*.js       # jQuery
│   └── webflow.*.js                # Webflow runtime
├── fonts/                          # PP Neue Montreal, PP Mondwest, Rand Mono
└── images/                         # avif/png/jpg assets, SVGs
```

### JavaScript Architecture

The site uses **modular animation files** that are dynamically imported:

1. **17411.js** — Entry point that imports the two main modules
2. **slater-49467.js** — Core animations:
   - Loader sequence (percentage counter, scramble text, logo flicker)
   - Lenis smooth scroll initialization
   - Global parallax system
   - Navigation menu animations
   - Canvas grid hover effect
   - Cursor coordinate tracking
   - Video-on-hover lazy loading
3. **slater-49655.js** — Section-specific animations:
   - About section (word overlay reveal, character reveals, scramble effects)
   - Grid section (Flip layout transitions, border flash)
   - Typography section (font-weight proximity effect, draggable stickers)
   - Colors section (clip-path gradient reveals)
   - Motion section (marquee, organic columns, accelerating globe, button motion paths)

All animations are initialized via `initScript()` which calls individual init functions.

### Custom Easing Curves

The site uses **six custom easing functions** defined via `CustomEase.create()`:

| Name | Cubic Bezier | Usage |
|------|--------------|-------|
| `ease-primary` | `0.87, 0, 0.13, 1` | Character reveals, text animations |
| `ease-secondary` | `0.31, 0.75, 0.22, 1` | Menu open/close, overlays |
| `ease-fade` | `0.76, 0, 0.24, 1` | Opacity transitions |
| `ease-preloader` | `0.64, 0.04, 0.42, 0.99` | Loader counter, dial wipes |
| `ease-transition` | `0.16, 1, 0.35, 1` | Section transitions, font-weight animation |
| `ease-button` | `0.16, 1, 0.3, 1` | Button motion path variant 2 |

These are used throughout instead of GSAP's built-in eases.

## Key Animation Patterns

### Scroll-Based Animations (ScrollTrigger)

All scroll animations use **Lenis smooth scroll** synced with GSAP:

```javascript
lenis.on("scroll", ScrollTrigger.update)
gsap.ticker.add((e) => { lenis?.raf(1000 * e) })
```

**Common ScrollTrigger patterns:**
- `scrub: true` or numeric value — Links animation progress 1:1 to scroll
- `pin: true` — Pins element while scrolling through animation
- `toggleActions: "play none none reverse"` — Play on enter, reverse on leave back
- `start: "top 80%"` / `end: "bottom top"` — Trigger points in viewport

### Parallax System

Elements with `data-parallax="trigger"` get automatic parallax via:

```javascript
data-parallax-direction="vertical"  // or "horizontal"
data-parallax-start="20"            // Starting percent offset
data-parallax-end="-20"             // Ending percent offset
data-parallax-scrub="true"          // Scrub value
data-parallax-disable="mobile"      // Skip on mobile/tablet
```

### Text Splitting (SplitText)

Three patterns used across the site:

1. **Heading reveal** (`data-split="heading"`): Splits into words, animates `yPercent: 101 → 0`
2. **Line reveal** (`data-split="global"`): Splits into lines, animates `yPercent: 100 → 0`
3. **Character effects**: Used for font-weight proximity, scramble effects, stagger reveals

**Important:** Line containers need `overflow: hidden` for yPercent clip effect.

### Canvas Grid Interaction

Containers with `[data-grid]` get an interactive canvas grid:

```javascript
data-grid-size-desktop="64"          // Number of columns on desktop
data-grid-size-mobile="8"            // Number of columns on mobile
data-grid-border-size="0.15"         // Border width in px
data-grid-border-color="#0C0C0C"     // Border color
data-grid-colors='["#EAEAEA"]'       // Fill colors (JSON array)
data-grid-background="transparent"   // Canvas background
```

On mousemove, cells fill with random colors, fade in (0.1s), hold, then fade out (0.5s). Uses RAF draw loop with state machine (filling → holding → fading). Touch devices skip entirely.

### Marquee System

Marquee bands use these data attributes:

```javascript
data-marquee-speed="15"              // Base speed multiplier
data-marquee-direction="left"        // "left" or "right"
data-marquee-duplicate="2"           // Number of content clones
data-marquee-scroll-speed="10"       // Horizontal offset % during scroll
```

Marquee direction inverts on forward scroll via `timeScale` flip, creating scroll-reactive movement.

## DESIGN-SYSTEM.md Reference

**Before making any changes**, consult **DESIGN-SYSTEM.md** — it documents:

- Phase 1: Project overview & file structure
- Phase 2: Typography system (3 typefaces, font-weight proximity effect)
- Phase 3: Color system (neutrals + cool/warm palettes)
- Phase 4: Layout & grid (12-column grid, Flip transitions, sticky stacking)
- Phase 5: Navigation & menu (scramble text reveal)
- Phase 6: Loader & entry animation (percentage counter, logo flicker)
- Phase 7: Scroll-based animations (parallax, heading reveals, section pinning)
- Phase 8: Interactive elements (canvas grid, draggable stickers, video-on-hover)
- Phase 9: Motion & marquee (organic columns, clip-path reveals, motion paths)
- Phase 10: Custom easing curves
- Phase 11: Responsive breakpoints
- Phase 12: Page content & section map
- Phase 13: GSAP plugin usage summary

This is the **definitive reference** for understanding how every animation works.

## Breakpoints

| Breakpoint | Max Width | Changes |
|------------|-----------|---------|
| Mobile | 479px | Canvas: 8 cols, Marquee: 0.25× speed, Loader: 88dvh height |
| Mobile Landscape | 767px | Canvas: 8 cols, Menu: full height |
| Tablet | 991px | Font-weight proximity disabled, Marquee: 0.5× speed |
| Desktop | 992px+ | Canvas: 64 cols, Font-weight proximity active, Marquee: 1× speed |

Media queries use `gsap.matchMedia()` with `isMobile`, `isTablet`, `isDesktop` conditions.

## Key Gotchas

### JavaScript

- **Code is minified** — Variable names are shortened (`e`, `t`, `a`, `o`). Use DESIGN-SYSTEM.md to understand logic flow.
- **SplitText cleanup** — Always revert splits on cleanup to avoid memory leaks
- **Touch detection** — Uses `window.matchMedia('(hover: none)').matches` to skip hover effects on touch devices
- **Video lazy loading** — Videos have no `src` initially; loaded from `data-video-src` on first hover
- **Lenis sync** — Must sync Lenis with ScrollTrigger via `lenis.on("scroll", ScrollTrigger.update)`
- **Globe timeScale** — Uses proxy object `{ value }` because you can't tween Timeline.timeScale() directly
- **Scroll velocity** — Sampled via `gsap.ticker.add()` for frame-synced measurements

### HTML/CSS

- **Single HTML file** — All markup is in index.html (743 lines, minified)
- **Data attributes drive animations** — Most animations read config from `data-*` attributes
- **Webflow classes** — Many classes are Webflow-generated; custom overrides are in slater-49802.css
- **z-index layering** — Overlay blocks use `z-index: 1`, sticky nav uses higher values

## Common Tasks

### Modifying Animations

1. Locate the animation in DESIGN-SYSTEM.md to understand its logic
2. Find the corresponding function in `slater-49467.js` or `slater-49655.js`
3. Edit the minified code (or use prettier/beautify first for readability)
4. Test at all breakpoints (mobile, tablet, desktop)

### Adding New Scroll Animations

```javascript
ScrollTrigger.create({
  trigger: element,
  start: "top 80%",
  end: "bottom 20%",
  scrub: true,
  animation: gsap.to(element, { ... })
})
```

### Debugging ScrollTrigger

Add markers to visualize trigger points:

```javascript
ScrollTrigger.create({
  markers: true,  // Shows start/end lines
  id: "debug-name",
  ...
})
```

Use `ScrollTrigger.getAll()` in console to inspect all triggers.

## Dependencies

All dependencies are **bundled and self-contained** — no npm, no build process, no CDN. To update libraries:

1. Download updated library from official source
2. Replace the corresponding `.min.js` file in `js/`
3. Test thoroughly (especially GSAP plugins — they have tight version coupling)

## License & Attribution

Site by **Huy and Ivor**. Assets are proprietary (fonts, images, copy). Code patterns are educational reference. -->