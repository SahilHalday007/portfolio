import type { ReactNode } from 'react';

export type IconName =
  | 'user'
  | 'id'
  | 'folder'
  | 'layers'
  | 'branch'
  | 'mail'
  | 'grid'
  | 'chip'
  | 'chart'
  | 'site'
  | 'inventory'
  | 'vision'
  | 'portal';

const PATHS: Record<IconName, ReactNode> = {
  user: (
    <>
      <circle cx="8" cy="5.5" r="2.5" />
      <path d="M3 13c0-2.8 2.2-4.5 5-4.5s5 1.7 5 4.5" />
    </>
  ),
  id: (
    <>
      <rect x="3" y="2.8" width="10" height="10.4" rx="1" />
      <path d="M5.8 6h4.4M5.8 8.4h4.4M5.8 10.8h2.6" />
    </>
  ),
  folder: <path d="M2.5 4.2h4l1.2 1.5h4.8V12h-10z" />,
  layers: (
    <>
      <path d="M8 2.6l5.4 2.9L8 8.4 2.6 5.5z" />
      <path d="M2.6 8.4L8 11.3l5.4-2.9" />
      <path d="M2.6 11.2L8 14.1l5.4-2.9" />
    </>
  ),
  branch: (
    <>
      <circle cx="5" cy="4" r="1.6" />
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="11" cy="8" r="1.6" />
      <path d="M5 5.6v4.8M6.4 4.4c2 0 1.8 1.9 3.1 2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="2.4" y="4" width="11.2" height="8" rx="1" />
      <path d="M2.8 4.6L8 9l5.2-4.4" />
    </>
  ),
  grid: (
    <>
      <rect x="2.8" y="2.8" width="4.4" height="4.4" />
      <rect x="8.8" y="2.8" width="4.4" height="4.4" />
      <rect x="2.8" y="8.8" width="4.4" height="4.4" />
      <rect x="8.8" y="8.8" width="4.4" height="4.4" />
    </>
  ),
  chip: (
    <>
      <rect x="5" y="5" width="6" height="6" rx="1" />
      <path d="M6.5 2.5v2.5M9.5 2.5v2.5M6.5 11v2.5M9.5 11v2.5M2.5 6.5H5M2.5 9.5H5M11 6.5h2.5M11 9.5h2.5" />
    </>
  ),
  chart: (
    <>
      <path d="M2.5 2.5v11h11" />
      <path d="M5.5 10.5v-3M8.5 10.5V6M11.5 10.5V4.5" />
    </>
  ),
  site: (
    <>
      <rect x="2.5" y="3.5" width="11" height="9" rx="1" />
      <path d="M2.5 6h11" />
      <path d="M4.5 4.7h.1M6.2 4.7h.1" />
      <path d="M4.5 9.5h7" />
    </>
  ),
  inventory: (
    <>
      <path d="M2.5 4.5L8 2.5l5.5 2v7L8 13.5 2.5 11.5z" />
      <path d="M2.5 4.5L8 6.5l5.5-2M8 6.5v7" />
    </>
  ),
  vision: (
    <>
      <path d="M1.8 8S4 4.5 8 4.5 14.2 8 14.2 8 12 11.5 8 11.5 1.8 8 1.8 8z" />
      <circle cx="8" cy="8" r="1.8" />
    </>
  ),
  portal: (
    <>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M8 4.7a3.3 3.3 0 0 1 0 6.6" />
    </>
  ),
};

interface IconProps {
  name: IconName;
  title?: string;
  className?: string;
}

export default function Icon({ name, title, className }: IconProps) {
  const classes = ['tui-icon', className].filter(Boolean).join(' ');
  return (
    <svg
      className={classes}
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable={false}
    >
      {title ? <title>{title}</title> : null}
      {PATHS[name]}
    </svg>
  );
}
