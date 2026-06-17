/** Shared domain types for the EduNex sample data (ported from edunex/data.js). */

export type ClassStatus = 'active' | 'soon' | 'paused';
export type MaterialType = 'pdf' | 'doc' | 'slides' | 'audio' | 'video' | 'image' | 'link';

export interface Teacher {
  id: string;
  name: string;
  short: string;
  color: string;
  subject: string;
  email: string;
  phone: string;
}

export interface ScheduleSlot {
  /** Day index 0=Mon … 6=Sun. */
  d: number;
  s: string;
  e: string;
}

export interface ZoomMeeting {
  url: string;
  id: string;
  pass: string;
  host: string;
}

export interface ClassItem {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  color: string;
  status: ClassStatus;
  room: string;
  level: string;
  students: number;
  price: number;
  schedule: ScheduleSlot[];
  zalo: string;
  materials: number;
  /** Added post-init. */
  zoom?: ZoomMeeting;
  /** Student ids — added post-init. */
  roster?: string[];
}

export interface Student {
  id: string;
  name: string;
  short: string;
  color: string;
  /** `year` repurposed as learning focus. */
  year: string;
  /** Class ids — only set on the focus student. */
  classes?: string[];
}

export interface Material {
  id: string;
  class: string;
  session: string;
  title: string;
  type: MaterialType;
  size: string;
  date: string;
  to: string;
}

export interface Template {
  id: string;
  key: string;
  name: string;
  on: boolean;
  preview: string;
}

export interface ZnsLogEntry {
  id: string;
  tpl: string;
  class: string;
  recipients: number;
  time: string;
  status: 'sent' | 'failed';
}

export interface Homework {
  id: string;
  class: string;
  title: string;
  due: string;
  status: 'submitted' | 'pending' | 'graded';
  grade: string | null;
}

export interface Submission {
  id: string;
  student: string;
  class: string;
  title: string;
  when: string;
  type: MaterialType;
}

export interface Result {
  class: string;
  overall: string;
  items: [string, string][];
}

export interface Payment {
  id: string;
  item: string;
  amount: number;
  date: string;
  method: string;
  status: 'paid' | 'due';
}

export interface Stats {
  classes: number;
  students: number;
  teachers: number;
  sessionsToday: number;
}
