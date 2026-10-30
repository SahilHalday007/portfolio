export type WindowId = 'whoami' | 'about' | 'projects' | 'stack' | 'log' | 'contact';

export type ThemeId =
  | 'tokyo-night'
  | 'gruvbox-dark'
  | 'catppuccin-mocha'
  | 'nord'
  | 'phosphor'
  | 'amber'
  | 'light';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  name: string;
  file: string;
  category: string;
  problem: string;
  role: string;
  stack: string[];
  highlights: string[];
  links: ProjectLink[];
  linkTodos?: string[];
  visual: 'grid' | 'chip' | 'chart' | 'site' | 'inventory' | 'vision' | 'portal';
}

export interface StackGroup {
  title: string;
  icon: string;
  items: string[];
}

export interface LogEntry {
  hash: string;
  role: string;
  detail: string;
  date: string;
}

export interface ProfileFact {
  key: string;
  value: string;
}
