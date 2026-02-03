// ────────────────────────────────────────────
// ALL VALUES IN THIS FILE ARE LOCKED.
// Do not modify any hex, number, or string.
// ────────────────────────────────────────────

export const COLORS = {
  // Base / Neutral
  PAGE_BG:        '#080807',
  DARK_SURFACE:   '#292929',
  MID_GRAY:       '#7d7d7d',
  LIGHT_GRAY:     '#dcddde',
  OFF_WHITE:      '#f1f0ee',
  NEAR_WHITE:     '#fcfcfc',

  // UI Accents
  GOLD:           '#ffb700',
  BTN_BORDER:     '#515151',
  HOVER_BG:       '#EAEAEA',
  HOVER_TEXT:     '#070707',
  OVERLAY:        '#262626',
  GRID_BORDER:    '#0C0C0C',

  // Cool Tones
  DEEP_DARK:      '#120c00',
  CREAM_LIGHT:    '#fff6e5',
  SKY_BLUE:       '#47a0ff',
  YELLOW_GOLD:    '#ffd900',
  DEEP_TEAL:      '#265855',
  MID_TEAL:       '#31726e',

  // Warm Tones
  TEAL_GREEN:     '#193937',
  DARKEST_TEAL:   '#182b2a',
  PALE_CREAM:     '#fbf6c0',
  WARM_BEIGE:     '#eee2cd',
  TAN_SAND:       '#c4b59c',
  OCHRE:          '#a58f69',
} as const;

export const COOL_SWATCHES = [
  { hex: COLORS.DEEP_DARK,    label: 'Deep Dark' },
  { hex: COLORS.CREAM_LIGHT,  label: 'Lightest Cream' },
  { hex: COLORS.SKY_BLUE,     label: 'Sky Blue' },
  { hex: COLORS.YELLOW_GOLD,  label: 'Yellow Gold' },
  { hex: COLORS.DEEP_TEAL,    label: 'Deep Teal' },
  { hex: COLORS.MID_TEAL,     label: 'Mid Teal' },
] as const;

export const WARM_SWATCHES = [
  { hex: COLORS.TEAL_GREEN,   label: 'Dark Teal Green' },
  { hex: COLORS.DARKEST_TEAL, label: 'Darkest Teal' },
  { hex: COLORS.PALE_CREAM,   label: 'Pale Yellow Cream' },
  { hex: COLORS.WARM_BEIGE,   label: 'Warm Beige' },
  { hex: COLORS.TAN_SAND,     label: 'Tan Sand' },
  { hex: COLORS.OCHRE,        label: 'Ochre' },
] as const;

export const NEUTRAL_SWATCHES = [
  { hex: COLORS.PAGE_BG,      label: 'Page Background' },
  { hex: COLORS.DARK_SURFACE, label: 'Dark Surface' },
  { hex: COLORS.MID_GRAY,     label: 'Mid Gray' },
  { hex: COLORS.LIGHT_GRAY,   label: 'Light Gray' },
  { hex: COLORS.OFF_WHITE,    label: 'Off White' },
  { hex: COLORS.NEAR_WHITE,   label: 'Near White' },
] as const;

export const BREAKPOINTS = {
  MOBILE:           479,
  MOBILE_LANDSCAPE: 767,
  TABLET:           991,
  DESKTOP:          992,
} as const;

export const GRID = {
  COLUMNS: 12,
  GUTTER:  '1rem',
} as const;

export const STICKY_STACK = {
  BASE_TOP: '1.75rem',  // starting top offset
  STEP:     '3.3rem',   // per-index increment
} as const;

// Font-weight proximity: radius in px, target weights, animation timing
export const FONT_PROXIMITY = {
  RADIUS:   300,       // px — LOCKED
  WEIGHT_NEAR: 800,
  WEIGHT_FAR:  300,
  DURATION: 1,         // seconds — LOCKED
  EASE:     'ease-transition',
} as const;

// Canvas grid defaults
export const CANVAS_GRID = {
  SIZE_DESKTOP:  64,
  SIZE_MOBILE:   8,
  BORDER_SIZE:   0.15,
  BORDER_COLOR:  COLORS.GRID_BORDER,
  COLORS:        [COLORS.HOVER_BG],
  BACKGROUND:    'transparent',
  FILL_IN:       0.1,   // seconds — alpha 0 → 1
  FILL_OUT:      0.5,   // seconds — alpha 1 → 0
  FILL_DELAY:    0.2,   // seconds
} as const;

// Marquee responsive multipliers
export const MARQUEE_MULTIPLIERS = {
  DESKTOP: 1,
  TABLET:  0.5,
  MOBILE:  0.25,
} as const;
