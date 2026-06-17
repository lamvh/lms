import { Icon, type IconName } from './Icon';

export interface SegmentedOption {
  value: string;
  label?: string;
  icon?: IconName;
}

export interface SegmentedProps {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'md' | 'sm';
}

/** Single-select switch for small option sets (calendar range, view mode). */
export function Segmented({ options, value, onChange, size = 'md' }: SegmentedProps) {
  return (
    <div className="inline-flex bg-surface-3 rounded-sm p-[3px] gap-[2px]">
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={[
              'inline-flex items-center gap-1.5 font-head font-semibold whitespace-nowrap transition-all rounded-[7px]',
              size === 'sm' ? 'px-2.5 py-[5px] text-[12.5px]' : 'px-[13px] py-[7px] text-[13.5px]',
              on ? 'bg-surface text-brand shadow-sh-1' : 'bg-transparent text-ink-500',
            ].join(' ')}
          >
            {o.icon && <Icon name={o.icon} size={15} />}
            {o.label ?? o.value}
          </button>
        );
      })}
    </div>
  );
}

export default Segmented;
