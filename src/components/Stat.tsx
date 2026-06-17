import { Icon, type IconName } from './Icon';

export type StatTone = 'brand' | 'green' | 'amber' | 'plum';

/** tone → [icon color class/value, icon bg class/value]. Plum has no token, so inline. */
const TONES: Record<StatTone, { icon: string; bg: string; inline?: boolean }> = {
  brand: { icon: 'text-brand', bg: 'bg-p-50' },
  green: { icon: 'text-a-600', bg: 'bg-a-50' },
  amber: { icon: 'text-warn', bg: 'bg-warn-bg' },
  plum: { icon: '#8A5A86', bg: '#F2E9F1', inline: true },
};

export interface StatProps {
  icon: IconName;
  label: string;
  value: string | number;
  sub?: string;
  tone?: StatTone;
}

export function Stat({ icon, label, value, sub, tone = 'brand' }: StatProps) {
  const tn = TONES[tone] || TONES.brand;
  return (
    <div className="bg-surface border border-line rounded-lg shadow-sh-card p-[18px_20px] flex flex-col gap-3.5">
      <div className="flex items-center justify-between">
        <div
          className={`w-10 h-10 rounded-md flex items-center justify-center ${tn.inline ? '' : `${tn.bg} ${tn.icon}`}`}
          style={tn.inline ? { background: tn.bg, color: tn.icon } : undefined}
        >
          <Icon name={icon} size={21} />
        </div>
        {sub && <span className="text-[12.5px] font-semibold text-a-600">{sub}</span>}
      </div>
      <div>
        <div className="font-head text-[32px] font-bold text-ink-900 leading-none">{value}</div>
        <div className="text-[13.5px] text-ink-500 mt-1.5 font-medium">{label}</div>
      </div>
    </div>
  );
}

export default Stat;
