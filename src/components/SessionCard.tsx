import { Icon } from './Icon';
import { to12 } from '../lib/time';
import { teacherById } from '../data/edunex';
import type { ClassItem } from '../types/edunex';

/** A schedule slot resolved against its class. */
export interface SessionView {
  s: string;
  e: string;
  d?: number;
  class: ClassItem;
}

export interface SessionCardProps {
  s: SessionView;
  /** Index in the day's list; i=0 flags "Next up". */
  i: number;
  open: (id: string) => void;
}

/** Student timetable row: time range, class, coach, room and Zoom. */
export function SessionCard({ s, i, open }: SessionCardProps) {
  const t = teacherById(s.class.teacher);
  return (
    <div
      onClick={() => open(s.class.id)}
      className="bg-surface border border-line rounded-lg shadow-sh-card overflow-hidden flex cursor-pointer"
    >
      <div className="w-[5px]" style={{ background: s.class.color }} />
      <div className="flex-1 px-[15px] py-3.5">
        <div className="flex items-center justify-between">
          <span className="font-head font-bold text-[15px] text-a-700">
            {to12(s.s)} – {to12(s.e)}
          </span>
          {i === 0 && (
            <span className="inline-flex items-center gap-[5px] font-head font-semibold text-[11px] px-[9px] py-[3px] rounded-pill bg-info-bg text-p-600">
              <span className="w-1.5 h-1.5 rounded-full bg-p-500" />
              Next up
            </span>
          )}
        </div>
        <div className="text-[15.5px] font-semibold mt-1.5 text-ink-900">{s.class.name}</div>
        <div className="flex items-center gap-3.5 mt-[7px] text-[12.5px] text-ink-500">
          <span className="flex items-center gap-[5px]">
            <Icon name="teachers" size={14} />
            {t?.short}
          </span>
          <span className="flex items-center gap-[5px]">
            <Icon name="pin" size={14} />
            {s.class.room}
          </span>
          <span className="ml-auto flex items-center gap-1 text-a-700 font-bold">
            <Icon name="video" size={14} />
            Zoom
          </span>
        </div>
      </div>
    </div>
  );
}

export default SessionCard;
