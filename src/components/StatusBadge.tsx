export type BadgeStatus = 'active' | 'soon' | 'paused' | 'warn';

/** Status pill styles (theme'd): active = green, soon = charcoal-info, paused = muted, warn = amber. */
const STATUS: Record<BadgeStatus, { label: string; pill: string; dot: string }> = {
  active: { label: 'Active', pill: 'bg-success-bg text-[#1F8456]', dot: 'bg-success' },
  soon: { label: 'Starting soon', pill: 'bg-info-bg text-p-600', dot: 'bg-p-500' },
  paused: { label: 'Paused', pill: 'bg-surface-3 text-ink-500', dot: 'bg-ink-400' },
  warn: { label: 'Overdue', pill: 'bg-warn-bg text-warn', dot: 'bg-warn' },
};

export interface StatusBadgeProps {
  status: BadgeStatus;
  /** Override the default label (e.g. a custom warn message). */
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const s = STATUS[status] || STATUS.active;
  return (
    <span
      className={`inline-flex items-center gap-[5px] font-head font-semibold text-xs px-[9px] py-[3px] rounded-pill leading-[1.3] whitespace-nowrap ${s.pill}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {label ?? s.label}
    </span>
  );
}

export default StatusBadge;
