import { classById } from '../../data/edunex';
import type { ClassItem, ScheduleSlot, Student } from '../../types/edunex';
import type { BadgeStatus } from '../../components/StatusBadge';

export interface StuSession extends ScheduleSlot {
  class: ClassItem;
}

/** All scheduled sessions across a student's enrolled classes. */
export function studentSessions(stu: Student): StuSession[] {
  const out: StuSession[] = [];
  for (const cid of stu.classes ?? []) {
    const c = classById(cid);
    if (!c) continue;
    for (const s of c.schedule) out.push({ ...s, class: c });
  }
  return out;
}

export const firstNameOf = (n: string) => n.trim().split(' ').slice(-1)[0];
export const shortTeacher = (n: string) => n.replace('Thầy ', '').replace('Cô ', '').replace('Ms. ', '');

/** Homework status → [badge status, label]. */
export const HW_META: Record<string, [BadgeStatus, string]> = {
  pending: ['warn', 'Pending'],
  submitted: ['soon', 'Submitted'],
  graded: ['active', 'Graded'],
};
