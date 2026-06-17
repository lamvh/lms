import type { ReactNode } from 'react';

export interface TagProps {
  children?: ReactNode;
}

/** Static label tag. */
export function Tag({ children }: TagProps) {
  return (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-xs bg-surface-3 text-ink-600 whitespace-nowrap">
      {children}
    </span>
  );
}

export default Tag;
