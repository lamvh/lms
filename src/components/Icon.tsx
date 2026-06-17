import type { CSSProperties } from 'react';

/** 24-grid stroke icon paths, inheriting currentColor. Ported from the prototype icon set. */
const PATHS = {
  dashboard: 'M4 4h7v7H4zM13 4h7v4h-7zM13 11h7v9h-7zM4 13h7v7H4z',
  classes: 'M4 5.5A2 2 0 0 1 6 4h8.5a1.5 1.5 0 0 1 1.5 1.5V20l-3-2-3 2V4M16 7h4v13l-2-1.3L16 20',
  calendar: 'M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM4 10h16M8 3v4M16 3v4',
  materials: 'M4 7a2 2 0 0 1 2-2h4l2 2.5h6a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z',
  teachers: 'M8 11a3.2 3.2 0 1 0 0-6.4A3.2 3.2 0 0 0 8 11zM2.5 19.5a5.5 5.5 0 0 1 11 0M16 4.5a3 3 0 0 1 0 6M18 14.2a5.5 5.5 0 0 1 3.5 5.3',
  students: 'M12 4 2.5 8.5 12 13l9.5-4.5zM6 10.5V15c0 1.4 2.7 2.7 6 2.7s6-1.3 6-2.7v-4.5M21.5 8.5v5',
  zalo: 'M12 3.2c-5 0-9 3.2-9 7.2 0 2.3 1.3 4.3 3.4 5.6L5.6 20l3.9-2a11 11 0 0 0 2.5.3c5 0 9-3.2 9-7.2s-4-7.2-9-7.2z',
  bell: 'M6 9a6 6 0 0 1 12 0c0 4 1.2 5.5 2 6.5H4c.8-1 2-2.5 2-6.5zM9.5 19a2.5 2.5 0 0 0 5 0',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
  plus: 'M12 5v14M5 12h14',
  chevL: 'M14 6l-6 6 6 6',
  chevR: 'M10 6l6 6-6 6',
  chevDown: 'M6 10l6 6 6-6',
  chevUp: 'M6 14l6-6 6 6',
  download: 'M12 4v11M7 11l5 4 5-4M5 20h14',
  upload: 'M12 16V5M7 9l5-4 5 4M5 20h14',
  link: 'M9.5 14.5l5-5M8 12l-2 2a3 3 0 0 0 4 4l2-2M16 12l2-2a3 3 0 0 0-4-4l-2 2',
  external: 'M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4',
  check: 'M5 12.5l4.5 4.5L19 7',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7.5V12l3 2',
  filter: 'M4 6h16M7 12h10M10 18h4',
  more: 'M6 12h.01M12 12h.01M18 12h.01',
  home: 'M4 11l8-7 8 7M6 9.5V20h12V9.5',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20a7 7 0 0 1 14 0',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM4 12h2M18 12h2M12 4v2M12 18v2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4',
  logout: 'M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 12h10M16 8l4 4-4 4',
  send: 'M5 12l15-7-7 15-2.5-5.5L5 12z',
  eye: 'M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  edit: 'M4 20h4L18 10l-4-4L4 16zM14 6l4 4',
  trash: 'M5 7h14M10 7V5h4v2M6 7l1 13h10l1-13',
  pin: 'M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  mail: 'M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM4 8l8 5 8-5',
  phone: 'M5 4h3l1.5 5-2 1.5a11 11 0 0 0 5 5l1.5-2 5 1.5V19a2 2 0 0 1-2 2 16 16 0 0 1-16-16 2 2 0 0 1 2-2z',
  play: 'M8 5l11 7-11 7z',
  file: 'M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM14 3v5h5',
  checkSquare: 'M9 11l2.5 2.5L16 8M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z',
  x: 'M6 6l12 12M18 6L6 18',
  menu: 'M4 7h16M4 12h16M4 17h16',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z',
  arrowR: 'M5 12h14M13 6l6 6-6 6',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM13 13h7v7h-7zM4 13h7v7H4z',
  list: 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  image: 'M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM4 16l4-4 4 4 3-3 5 5M9 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
  video: 'M4 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM16 10l5-3v10l-5-3',
  audio: 'M9 18V7l9-2v11M9 18a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM18 16a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z',
  share: 'M8 12l8-4M8 12l8 4M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM21 5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM21 19a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z',
  printer: 'M7 8V4h10v4M7 18H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v6H7z',
  lock: 'M6 11V8a6 6 0 0 1 12 0v3M5 11h14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z',
  sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19',
  book: 'M5 4h10a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2zM17 6h2v14H7',
  flag: 'M5 21V4M5 5h11l-2 3 2 3H5',
  dots: 'M12 6h.01M12 12h.01M12 18h.01',
  msg: 'M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 3v-3a2 2 0 0 1-1-2z',
  star: 'M12 4l2.3 5 5.7.5-4.3 3.7 1.3 5.6L12 16l-5 2.8 1.3-5.6L4 9.5 9.7 9z',
  check2: 'M5 12.5l4.5 4.5L19 7',
} as const;

export type IconName = keyof typeof PATHS;

/** All glyph names, in the order shown on the Components page foundations grid. */
export const ICON_NAMES = Object.keys(PATHS) as IconName[];

export interface IconProps {
  /** Glyph name. Unknown names fall back to the `file` glyph. */
  name: IconName | (string & {});
  size?: number;
  stroke?: number;
  className?: string;
  style?: CSSProperties;
}

export function Icon({ name, size = 20, stroke = 1.7, className, style }: IconProps) {
  const d = PATHS[name as IconName] ?? PATHS.file;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ flexShrink: 0, ...style }}
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

export default Icon;
