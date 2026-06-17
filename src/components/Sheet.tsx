import type { ReactNode } from 'react';

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
}

/**
 * Mobile bottom sheet with grab handle. Overlay is `absolute inset-0`
 * (scoped to the app frame), matching the prototype — not a body portal.
 */
export function Sheet({ open, onClose, title, children }: SheetProps) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-[120] flex items-end"
      style={{ background: 'rgba(20,32,43,.4)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="sheet-rise w-full bg-surface rounded-t-[24px] max-h-[82%] overflow-auto"
        style={{ padding: '10px 20px calc(20px + env(safe-area-inset-bottom))' }}
        role="dialog"
        aria-modal="true"
      >
        <div className="w-[38px] h-[5px] rounded-pill bg-line mx-auto mt-1 mb-3.5" />
        {title && <h3 className="font-head text-lg font-bold mb-3.5">{title}</h3>}
        {children}
      </div>
    </div>
  );
}

export default Sheet;
