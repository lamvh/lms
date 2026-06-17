import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'accent' | 'ghost' | 'soft' | 'zalo';

/** Theme'd variant styles (gold primary reads as the main CTA). */
const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-ink-900 shadow-[0_2px_10px_rgba(242,180,0,.30)] hover:bg-a-400',
  accent: 'bg-accent text-ink-900 hover:bg-a-400',
  ghost: 'bg-surface text-ink-700 border-line hover:bg-surface-2 hover:border-ink-300',
  soft: 'bg-a-50 text-a-700 hover:bg-a-100',
  zalo: 'bg-zalo-bg text-zalo hover:bg-[#D6E7FF]',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'md' | 'sm';
  /** Icon-only square padding. */
  iconOnly?: boolean;
  /** Show a spinner and disable interaction. */
  loading?: boolean;
  children?: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  iconOnly = false,
  loading = false,
  disabled,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const pad = iconOnly ? 'p-[9px]' : size === 'sm' ? 'px-3 py-[7px] text-[13px] gap-1.5' : 'px-4 py-2.5 text-sm gap-2';
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center font-head font-semibold rounded-sm leading-none border border-transparent whitespace-nowrap',
        'transition-[background,box-shadow,border-color,transform] active:translate-y-[.5px]',
        'disabled:opacity-45 disabled:cursor-not-allowed disabled:shadow-none',
        pad,
        VARIANTS[variant],
        className,
      ].join(' ')}
      {...rest}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="w-[15px] h-[15px] rounded-full border-2 border-current border-t-transparent opacity-90"
          style={{ animation: 'spin .7s linear infinite' }}
        />
      )}
      {children}
    </button>
  );
}

export default Button;
