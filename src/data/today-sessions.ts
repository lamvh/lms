import { classes, todayIndex } from './edunex';
import type { ClassItem, ScheduleSlot } from '../types/edunex';

export interface TodaySession extends ScheduleSlot {
  class: ClassItem;
}

/** Today's non-paused sessions, sorted by start time. */
export function todaySessions(): TodaySession[] {
  const out: TodaySession[] = [];
  for (const c of classes) {
    if (c.status === 'paused') continue;
    for (const s of c.schedule) {
      if (s.d === todayIndex) out.push({ ...s, class: c });
    }
  }
  return out.sort((a, b) => a.s.localeCompare(b.s));
}
