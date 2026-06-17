import type { ReactNode } from 'react';
import { Icon } from './Icon';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  sub?: string;
  width?: number;
  children?: ReactNode;
}

/**
 * Centered desktop dialog. Overlay is `absolute inset-0` (scoped to the nearest
 * positioned ancestor / app frame), matching the prototype — not a body portal.
 */
export function Modal({ open, onClose, title, sub, width = 480, children }: ModalProps) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-[120] flex items-center justify-center p-6"
      style={{ background: 'rgba(20,32,43,.42)', backdropFilter: 'blur(2px)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rise bg-surface rounded-xl shadow-sh-pop max-w-full max-h-[90%] overflow-auto"
        style={{ width }}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between p-[22px_24px_0]">
            <div>
              {title && <h3 className="font-head text-[19px] font-bold text-ink-900">{title}</h3>}
              {sub && <p className="text-[13.5px] text-ink-500 mt-1">{sub}</p>}
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="p-[9px] rounded-sm bg-surface-3 text-ink-600"
            >
              <Icon name="x" size={18} />
            </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
