export interface ToggleProps {
  on: boolean;
  onChange: (on: boolean) => void;
  size?: number;
}

/** Binary on/off switch. Gold when on. */
export function Toggle({ on, onChange, size = 26 }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="rounded-pill relative shrink-0 transition-colors duration-200"
      style={{
        width: size * 1.75,
        height: size,
        background: on ? '#F2B400' : '#CDD6E0',
      }}
    >
      <span
        className="absolute rounded-full bg-white transition-[left] duration-200"
        style={{
          top: 3,
          left: on ? size * 1.75 - size + 3 : 3,
          width: size - 6,
          height: size - 6,
          boxShadow: '0 1px 3px rgba(0,0,0,.25)',
        }}
      />
    </button>
  );
}

export default Toggle;
