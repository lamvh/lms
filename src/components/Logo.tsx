export interface LogoProps {
  size?: number;
  /** Light variant for dark surfaces. */
  light?: boolean;
  showText?: boolean;
  textSize?: number;
}

/** EduNex wordmark with gradient mark. Mark can stand alone via showText=false. */
export function Logo({ size = 34, light = false, showText = true, textSize }: LogoProps) {
  const ts = textSize || size * 0.52;
  return (
    <div className="flex items-center" style={{ gap: size * 0.3 }}>
      <div
        className="flex items-center justify-center shrink-0"
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.28,
          background: 'linear-gradient(145deg, #FFC93D, #D29900)',
          boxShadow: '0 3px 10px rgba(224,162,0,.35)',
        }}
      >
        <svg
          width={size * 0.62}
          height={size * 0.62}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#191B20"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 4 21.5 8 12 12 2.5 8z" />
          <path d="M6.5 10v3.2c0 1.5 2.5 2.8 5.5 2.8s5.5-1.3 5.5-2.8V10" />
          <path d="M21.5 8v4.2" />
        </svg>
      </div>
      {showText && (
        <span
          className="font-head font-extrabold tracking-[-0.02em] leading-none"
          style={{ fontSize: ts, color: light ? '#fff' : '#191B20' }}
        >
          Edu<span style={{ color: light ? '#FFC93D' : '#D29900' }}>Nex</span>
        </span>
      )}
    </div>
  );
}

export default Logo;
