import type { InputHTMLAttributes } from 'react';

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Error styling (red border + ring). */
  error?: boolean;
}

/** Single-line text input. Gold focus ring. */
export function Field({ error = false, className = '', ...rest }: FieldProps) {
  return (
    <input
      className={[
        'w-full px-3.5 py-[11px] text-sm rounded-sm bg-surface text-ink-800',
        'border transition-[border-color,box-shadow] placeholder:text-ink-300',
        'focus:outline-none',
        error
          ? 'border-danger focus:shadow-[0_0_0_3px_theme(colors.danger-bg)] shadow-[0_0_0_3px_theme(colors.danger-bg)]'
          : 'border-line focus:border-a-500 focus:shadow-[0_0_0_3px_theme(colors.a.100)]',
        'disabled:bg-surface-3 disabled:text-ink-400 disabled:cursor-not-allowed',
        className,
      ].join(' ')}
      aria-invalid={error || undefined}
      {...rest}
    />
  );
}

export default Field;
