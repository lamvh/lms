import { Stat } from './Stat';
import { stats } from '../data/edunex';

/** Admin KPI row: four Stat cards bound to centre metrics. */
export function StatCards() {
  const s = stats;
  return (
    <div className="grid grid-cols-4 gap-4">
      <Stat icon="classes" tone="brand" value={s.classes} label="Active programs" sub="+2 this term" />
      <Stat icon="students" tone="green" value={s.students} label="Enrolled students" sub="+7 this term" />
      <Stat icon="teachers" tone="plum" value={s.teachers} label="Teachers" />
      <Stat icon="calendar" tone="amber" value={s.sessionsToday} label="Sessions today" />
    </div>
  );
}

export default StatCards;
