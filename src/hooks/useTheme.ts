import { useCallback, useEffect, useState } from 'react';
import type { ThemeId } from '../types';
import { THEMES, isThemeId } from '../themes/palettes';

export const THEME_STORAGE_KEY = 'sahil.tui.theme';

function systemTheme(): ThemeId {
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  }
  return 'tokyo-night';
}

export function getInitialTheme(): ThemeId {
  try {
    if (typeof document !== 'undefined') {
      const current = document.documentElement.dataset.theme;
      if (isThemeId(current)) {
        return current;
      }
    }
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (isThemeId(stored)) {
        return stored;
      }
    }
  } catch {
    // Storage or DOM access is optional; fall through to the system theme.
  }
  return systemTheme();
}

function applyTheme(theme: ThemeId): void {
  if (typeof document === 'undefined') {
    return;
  }
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', THEMES[theme].bg);
  }
  document.documentElement.style.backgroundColor = THEMES[theme].bg;
}

export function useTheme(): { theme: ThemeId; setTheme: (theme: ThemeId) => void } {
  const [theme, setThemeState] = useState<ThemeId>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
      }
    } catch {
      // A private-mode or unavailable storage implementation must not break reading.
    }
  }, [theme]);

  const setTheme = useCallback((next: ThemeId) => {
    if (isThemeId(next)) {
      setThemeState(next);
    }
  }, []);

  return { theme, setTheme };
}
