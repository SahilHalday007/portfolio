import { useEffect, useState } from 'react';
import { THEMES, isThemeId } from '../themes/palettes';
import { useTheme } from '../hooks/useTheme';
import type { ThemeId, WindowId } from '../types';

export function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const formatted = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Africa/Dar_es_Salaam',
  }).format(now);

  return (
    <span className="tui-status__clock">
      <span aria-hidden="true">[</span>
      <time dateTime={now.toISOString()} aria-label="Current time in Dar es Salaam">
        {formatted} EAT
      </time>
      <span aria-hidden="true">]</span>
    </span>
  );
}

export function ThemePicker() {
  const { theme, setTheme } = useTheme();
  const themes = Object.keys(THEMES).filter(isThemeId);

  return (
    <label className="tui-status__theme">
      <span>theme</span>
      <select
        value={theme}
        onChange={(event) => {
          const next: string = event.target.value;
          if (isThemeId(next)) {
            setTheme(next as ThemeId);
          }
        }}
      >
        {themes.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
}

function useScrollPosition(): string {
  const [position, setPosition] = useState('top');

  useEffect(() => {
    const update = () => {
      const limit = document.documentElement.scrollHeight - window.innerHeight;
      if (limit <= 0) {
        setPosition('top');
        return;
      }
      const percent = Math.round((window.scrollY / limit) * 100);
      setPosition(`${String(Math.min(100, Math.max(0, percent))).padStart(3, '0')}%`);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return position;
}

interface StatusLineProps {
  activeWindow: WindowId;
}

export default function StatusLine({ activeWindow }: StatusLineProps) {
  const scrollPosition = useScrollPosition();

  return (
    <footer className="tui-status" aria-label="Terminal status">
      <span className="tui-status__mode">NORMAL</span>
      <span aria-hidden="true">|</span>
      <span className="tui-status__window">{activeWindow}</span>
      <span aria-hidden="true">|</span>
      <ThemePicker />
      <span aria-hidden="true">|</span>
      <Clock />
      <span aria-hidden="true">|</span>
      <span>{scrollPosition}</span>
    </footer>
  );
}
