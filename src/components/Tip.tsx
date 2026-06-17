import { useState, type ReactNode } from 'react';

export interface TipProps {
  label: string;
  children: ReactNode;
}

/** Hover tooltip wrapper around any trigger. */
export function Tip({ label, children }: TipProps) {
  const [show, setShow] = useState(false);
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span
          role="tooltip"
          className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-ink-900 text-white text-xs font-medium px-[9px] py-[5px] rounded-[7px] whitespace-nowrap z-50 shadow-sh-2"
        >
          {label}
        </span>
      )}
    </span>
  );
}

export default Tip;
