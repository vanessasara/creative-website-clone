import { useEffect } from 'react';
import type { DependencyList } from 'react';

/**
 * Thin wrapper around useEffect for GSAP timelines.
 * `setup` runs on mount (or when deps change).
 * Return { cleanup } to kill timelines / remove listeners on unmount.
 */
export function useGSAP(
  setup: () => { cleanup?: () => void } | void,
  deps: DependencyList = [],
) {
  useEffect(() => {
    const result = setup();
    return () => { result?.cleanup?.(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
