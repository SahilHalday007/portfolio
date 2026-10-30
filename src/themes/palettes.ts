import type { ThemeId } from '../types';
import rawPalettes from './palettes.json';

export interface ThemePalette {
  bg: string;
  fg: string;
  cursor: string;
  sel: string;
  selFg: string;
  ansi: readonly [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string];
  accent: string;
  ok: string;
  warn: string;
  err: string;
  muted: string;
  link: string;
  border: string;
}

const THEME_IDS: readonly ThemeId[] = [
  'tokyo-night',
  'gruvbox-dark',
  'catppuccin-mocha',
  'nord',
  'phosphor',
  'amber',
  'light',
];

export const THEMES: Record<ThemeId, ThemePalette> = rawPalettes as unknown as Record<ThemeId, ThemePalette>;

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return value !== null && value !== undefined && (THEME_IDS as readonly string[]).includes(value);
}

export function themeBackground(theme: ThemeId): string {
  return THEMES[theme].bg;
}
