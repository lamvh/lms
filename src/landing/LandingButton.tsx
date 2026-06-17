import type { AnchorHTMLAttributes, ReactNode } from 'react';

export type LandingBtnVariant = 'gold' | 'ghost' | 'dark';

const VARIANTS: Record<LandingBtnVariant, string> = {
  gold: 'bg-gold text-[#23252E] shadow-[0_4px_16px_rgba(242,180,0,.34)] hover:bg-[#FFC22B] hover:shadow-[0_6px_22px_rgba(242,180,0,.42)] border-transparent',
  ghost: 'bg-paper text-l-ink border-l-line shadow-l-soft hover:border-gold-600 hover:text-gold-700',
  dark: 'bg-l-ink text-white border-transparent hover:bg-[#2E323C]',
};

interface LandingButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LandingBtnVariant;
  lg?: boolean;
  children?: ReactNode;
}

/** Marketing-page anchor button (landing cream + gold styling). */
export function LandingButton({ variant = 'gold', lg = false, className = '', children, ...rest }: LandingButtonProps) {
  return (
    <a
      className={[
        'inline-flex items-center justify-center gap-[9px] font-head font-semibold rounded-[14px] border whitespace-nowrap transition-[transform,box-shadow,background] active:translate-y-px cursor-pointer',
        lg ? 'px-7 py-4 text-base' : 'px-[22px] py-[13px] text-[15px]',
        VARIANTS[variant],
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </a>
  );
}

export default LandingButton;
