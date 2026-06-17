import type { CSSProperties } from 'react';
import { shade } from '../lib/color';

export interface AvatarProps {
  /** Full name — initials are the last two words' first letters. */
  name?: string;
  /** Explicit initials, overrides `name`. */
  short?: string;
  /** Base gradient color. */
  color?: string;
  size?: number;
  /** Draw a white + tinted ring around the avatar. */
  ring?: boolean;
  style?: CSSProperties;
}

export function Avatar({
  name,
  short,
  color = '#2A6298',
  size = 38,
  ring = false,
  style,
}: AvatarProps) {
  const initials =
    short ||
    (name || '?')
      .split(' ')
      .slice(-2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();
  return (
    <div
      className="inline-flex items-center justify-center rounded-pill font-head font-bold text-white shrink-0 tracking-[.01em]"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: `linear-gradient(140deg, ${color}, ${shade(color, -18)})`,
        boxShadow: ring ? `0 0 0 3px #fff, 0 0 0 4px ${color}33` : 'none',
        ...style,
      }}
    >
      {initials}
    </div>
  );
}

export default Avatar;
