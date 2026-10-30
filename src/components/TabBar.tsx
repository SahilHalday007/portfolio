import { WINDOW_IDS } from '../content';
import type { WindowId } from '../types';

interface TabBarProps {
  activeWindow: WindowId;
  onSelect: (window: WindowId) => void;
  label: string;
}

export default function TabBar({ activeWindow, onSelect, label }: TabBarProps) {
  return (
    <nav className="tui-tabs" aria-label={label}>
      <ul>
        {WINDOW_IDS.map((window, index) => {
          const selected = window === activeWindow;
          return (
            <li key={window}>
              <a
                href={`#${window}`}
                className={selected ? 'tui-tab tui-tab--active' : 'tui-tab'}
                aria-current={selected ? 'page' : undefined}
                onClick={() => onSelect(window)}
              >
                <span aria-hidden="true">[{index + 1}] </span>
                {window}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
