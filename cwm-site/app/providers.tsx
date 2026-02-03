'use client';

import { createContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap }          from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register all GSAP plugins once — client-side only.
import '@/lib/gsapPlugins';

export const LenisContext = createContext<Lenis | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.7,   // LOCKED
      infinite: true,  // LOCKED
    });
    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Drive Lenis via GSAP ticker so scroll and animations share the same frame
    function raf(time: number) {
      lenis.raf(time);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0); // LOCKED: 0

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
