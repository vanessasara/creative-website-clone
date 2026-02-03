'use client';

import { useEffect } from 'react';
import { gsap }      from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { BREAKPOINTS, FONT_PROXIMITY } from '@/lib/constants';

// ─── Font-weight proximity logic ────────────────────────────────────────────
// Activates only on desktop (≥992px).  Listens for MediaQueryList changes so
// it properly tears down / re-initialises if the window is resized across the
// breakpoint boundary.
function useFontProximity() {
  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${BREAKPOINTS.DESKTOP}px)`);

    let splits: InstanceType<typeof SplitText>[] = [];
    let chars: HTMLElement[]                      = [];
    let active                                    = false;

    function onMouseMove(e: MouseEvent) {
      for (let i = 0; i < chars.length; i++) {
        const rect = chars[i].getBoundingClientRect();
        const dist = Math.hypot(
          e.clientX - (rect.left  + rect.width  * 0.5),
          e.clientY - (rect.top   + rect.height * 0.5),
        );

        // mapRange: 0 → WEIGHT_NEAR(800), RADIUS(300) → WEIGHT_FAR(300).
        // Clamp so values beyond 300 px stay at 300, not negative.
        const weight = Math.max(
          FONT_PROXIMITY.WEIGHT_FAR,
          Math.min(
            FONT_PROXIMITY.WEIGHT_NEAR,
            gsap.utils.mapRange(
              0,                          FONT_PROXIMITY.RADIUS,
              FONT_PROXIMITY.WEIGHT_NEAR, FONT_PROXIMITY.WEIGHT_FAR,
              dist,
            ),
          ),
        );

        gsap.to(chars[i], {
          fontWeight: weight,
          duration:   FONT_PROXIMITY.DURATION, // 1s — LOCKED
          ease:       FONT_PROXIMITY.EASE,     // ease-transition — LOCKED
        });
      }
    }

    function activate() {
      if (active) return;
      active = true;

      document
        .querySelectorAll<HTMLElement>('[data-animate="font-weight"]')
        .forEach((el) => {
          const s = new SplitText(el, { type: 'chars' });
          splits.push(s);
          chars.push(...(s.chars as HTMLElement[]));
        });

      document.addEventListener('mousemove', onMouseMove);
    }

    function deactivate() {
      if (!active) return;
      active = false;

      document.removeEventListener('mousemove', onMouseMove);
      splits.forEach((s) => s.revert());
      splits = [];
      chars  = [];
    }

    function onChange(e: MediaQueryListEvent) {
      e.matches ? activate() : deactivate();
    }

    mql.addEventListener('change', onChange);
    if (mql.matches) activate();

    return () => {
      mql.removeEventListener('change', onChange);
      deactivate();
    };
  }, []);
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function Typography() {
  useFontProximity();

  return (
    <section id="typography" className="typography_wrap">
      <div className="typography_contain">

        {/* ── Eyebrow ── */}
        <div className="eyebrow_wrap">
          <div className="eyebrow_layout flex items-center gap-2">
            <div className="eyebrow_marker w-2 h-2 rounded-full bg-gold" />
            <p className="font-mono text-sm text-mid-gray">
              Chapter 2.2 Type Fundamentals
            </p>
          </div>
        </div>

        {/* ── Three "Typography." headings — proximity targets ── */}
        {/* These use the Variable font so GSAP can smoothly interpolate
            font-weight between 300 and 800 at runtime. */}
        <div className="flex flex-col gap-4 mt-8">
          <h2
            data-animate="font-weight"
            className="heading-specs text-near-white"
            style={{
              fontFamily:  "'PP Neue Montreal Variable', sans-serif",
              fontWeight:  300,
              fontSize:    'clamp(3rem, 9vw, 18.5vw)',
              lineHeight:  '1.1em',
              letterSpacing: '-3%',
            }}
          >
            Typography.
          </h2>
          <h2
            data-animate="font-weight"
            className="heading-specs text-near-white"
            style={{
              fontFamily:  "'PP Neue Montreal Variable', sans-serif",
              fontWeight:  300,
              fontSize:    'clamp(3rem, 9vw, 18.5vw)',
              lineHeight:  '1.1em',
              letterSpacing: '-3%',
            }}
          >
            Typography.
          </h2>
          <h2
            data-animate="font-weight"
            className="heading-specs text-near-white"
            style={{
              fontFamily:  "'PP Neue Montreal Variable', sans-serif",
              fontWeight:  300,
              fontSize:    'clamp(3rem, 9vw, 18.5vw)',
              lineHeight:  '1.1em',
              letterSpacing: '-3%',
            }}
          >
            Typography.
          </h2>
        </div>

        {/* ── Typography specs panel ── */}
        <div className="mt-10 flex flex-col gap-2">
          <p className="font-primary text-light-gray" style={{ fontWeight: 400 }}>
            Typography sets the foundation of any creative websites, period.
            Whether you&apos;re trying to establish a strong first impression or
            communicating a message to a target audience, your type has to be
            dialed in and align with your story and identity.
          </p>

          <div className="mt-4 flex flex-col gap-1">
            {[
              ['Typeface',        'PP Neue Montreal'],
              ['Letter Spacing', '-3%'],
              ['Line Height',    '1.1 em'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between font-mono text-sm text-mid-gray">
                <span>{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Draggable stickers — Phase 8 ── */}
        {/* ── Project case studies + video on hover — Phase 8 ── */}
      </div>
    </section>
  );
}
