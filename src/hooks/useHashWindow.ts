import { useCallback, useEffect, useState } from 'react';
import { WINDOW_IDS } from '../content';
import type { WindowId } from '../types';

function isWindowId(value: string): value is WindowId {
  return (WINDOW_IDS as readonly string[]).includes(value);
}

export function windowFromHash(hash: string): WindowId {
  const candidate = hash.replace(/^#\/?/, '');
  if (isWindowId(candidate)) {
    return candidate;
  }
  return 'whoami';
}

export function hashForWindow(window: WindowId): string {
  return `#${window}`;
}

export function useHashWindow(): { activeWindow: WindowId; onWindowChange: (window: WindowId) => void } {
  const [activeWindow, setActiveWindow] = useState<WindowId>(() =>
    typeof window === 'undefined' ? 'whoami' : windowFromHash(window.location.hash),
  );

  useEffect(() => {
    const synchronize = () => {
      setActiveWindow(windowFromHash(window.location.hash));
    };
    synchronize();
    window.addEventListener('hashchange', synchronize);
    window.addEventListener('popstate', synchronize);
    return () => {
      window.removeEventListener('hashchange', synchronize);
      window.removeEventListener('popstate', synchronize);
    };
  }, []);

  const onWindowChange = useCallback((next: WindowId) => {
    setActiveWindow(next);
    if (typeof window !== 'undefined') {
      const hash = hashForWindow(next);
      if (window.location.hash !== hash) {
        window.location.hash = next;
      }
    }
  }, []);

  return { activeWindow, onWindowChange };
}
