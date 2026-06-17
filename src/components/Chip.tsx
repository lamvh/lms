import type { ReactNode } from 'react';

export interface ChipProps {
  /** Selected state — charcoal brand fill. */
  on?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

/** Selectable filter chip. */
export function Chip({ on = false, onClick, children }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex items-center gap-1.5 text-[13px] font-semibold px-3 py-1.5 rounded-pill whitespace-nowrap',
        'border transition-[background,border-color,color]',
        on
          ? 'bg-brand text-white border-brand'
          : 'bg-surface text-ink-600 border-line hover:bg-surface-2',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

export default Chip;
