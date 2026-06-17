import { Avatar } from './Avatar';
import { StatusBadge } from './StatusBadge';
import { Button } from './Button';
import { Icon } from './Icon';
import { teacherById, DAYS } from '../data/edunex';
import type { ClassItem } from '../types/edunex';

export interface ClassCardProps {
  c: ClassItem;
  openClass: (id: string) => void;
  notify: (msg: string, icon?: string) => void;
}

/** Program summary card: status badge, coach, schedule, room and quick actions. */
export function ClassCard({ c, openClass, notify }: ClassCardProps) {
  const t = teacherById(c.teacher);
  return (
    <div
      onClick={() => openClass(c.id)}
      className="bg-surface border border-line rounded-lg shadow-sh-card overflow-hidden cursor-pointer transition-shadow hover:shadow-sh-2"
    >
      <div className="h-[5px]" style={{ background: c.color }} />
      <div className="px-[17px] py-4">
        <div className="flex justify-between items-start gap-2.5">
          <div className="min-w-0 flex-1">
            <h4 className="font-head text-[15px] font-bold leading-tight text-ink-900">{c.name}</h4>
            <div className="text-[12.5px] text-ink-400 mt-[5px]">
              {c.subject} · {c.level}
            </div>
          </div>
          <StatusBadge status={c.status} />
        </div>
        {t && (
          <div className="flex items-center gap-2 mt-3.5">
            <Avatar name={t.name} short={t.short} color={t.color} size={28} />
            <span className="text-[13px] text-ink-600 flex-1">{t.name}</span>
          </div>
        )}
        <div className="flex gap-3.5 mt-3.5 text-[12.5px] text-ink-500">
          <span className="flex items-center gap-[5px]">
            <Icon name="calendar" size={14} />
            {c.schedule.map((s) => DAYS[s.d]).join(', ')}
          </span>
          <span className="flex items-center gap-[5px]">
            <Icon name="students" size={14} />
            {c.students}
          </span>
          <span className="flex items-center gap-[5px]">
            <Icon name="pin" size={14} />
            {c.room}
          </span>
        </div>
        <div className="flex gap-2 mt-[15px]">
          <Button
            variant="soft"
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              openClass(c.id);
            }}
          >
            <Icon name="arrowR" size={15} />
            Open program
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            onClick={(e) => {
              e.stopPropagation();
              notify('Timetable exported', 'download');
            }}
          >
            <Icon name="printer" size={15} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ClassCard;
