/**
 * EduNex LMS sample data (ported from edunex/data.js → typed module).
 * Init order is load-bearing: students, then zoom + roster, then the focus-student
 * mutation, then stats — preserve it or rosters/stats break.
 */
import type {
  ClassItem,
  Homework,
  Material,
  Payment,
  Result,
  Student,
  Submission,
  Teacher,
  Template,
  Stats,
  ZnsLogEntry,
} from '../types/edunex';

const C = {
  gold: '#E0A200', amber: '#C9821F', teal: '#1E8A8A', indigo: '#4C5FB0',
  plum: '#8A5A86', green: '#2E9E6B', rust: '#B96A4B', slate: '#56708A',
  navy: '#2A4D74', moss: '#5E8A4A',
};

export const teachers: Teacher[] = [
  { id: 't1', name: 'Ms. Jane Trần', short: 'JT', color: C.gold, subject: 'Founder · Career Coaching · CV & Interview', email: 'jane@edunex.co.nz', phone: '021 555 0110' },
  { id: 't2', name: 'Cô Nguyễn Mai Hương', short: 'MH', color: C.teal, subject: 'IELTS & Academic English', email: 'huong@edunex.co.nz', phone: '021 555 0142' },
  { id: 't3', name: 'Thầy Lê Quốc Anh', short: 'QA', color: C.indigo, subject: 'Business & Workplace English', email: 'quocanh@edunex.co.nz', phone: '021 555 0187' },
  { id: 't4', name: 'Cô Phạm Thanh Vân', short: 'TV', color: C.plum, subject: 'Conversation & Pronunciation', email: 'van@edunex.co.nz', phone: '021 555 0119' },
  { id: 't5', name: 'Thầy Đỗ Hoàng Nam', short: 'HN', color: C.green, subject: 'Career Strategy & LinkedIn', email: 'nam@edunex.co.nz', phone: '021 555 0166' },
];

export const classes: ClassItem[] = [
  { id: 'c1', name: 'VIP Career Program', subject: 'Career · Job Guaranteed', teacher: 't1', color: C.gold, status: 'active', room: 'Online 1:1', level: 'All levels', students: 8, price: 4000, schedule: [{ d: 1, s: '18:30', e: '20:00' }, { d: 3, s: '18:30', e: '20:00' }], zalo: 'zalo.me/g/edunex-vip', materials: 18 },
  { id: 'c2', name: 'CV & Interview Mastery', subject: 'Career · 1:1 Coaching', teacher: 't1', color: C.amber, status: 'active', room: 'Online 1:1', level: 'Intermediate', students: 14, price: 399, schedule: [{ d: 1, s: '17:00', e: '18:30' }, { d: 4, s: '17:00', e: '18:30' }], zalo: 'zalo.me/g/edunex-platinum', materials: 12 },
  { id: 'c3', name: 'CV & Interview Jumpstart', subject: 'Career · 1:1 Coaching', teacher: 't5', color: C.moss, status: 'active', room: 'Zoom 1', level: 'Beginner', students: 22, price: 199, schedule: [{ d: 2, s: '18:00', e: '19:30' }], zalo: 'zalo.me/g/edunex-gold', materials: 8 },
  { id: 'c4', name: 'Job-Hunting Roadmap', subject: 'Career · Self-paced', teacher: 't5', color: C.slate, status: 'active', room: 'On-demand', level: 'All levels', students: 64, price: 49, schedule: [{ d: 5, s: '10:00', e: '11:00' }], zalo: 'zalo.me/g/edunex-silver', materials: 24 },
  { id: 'c5', name: 'Workplace English', subject: 'English', teacher: 't3', color: C.indigo, status: 'active', room: 'Zoom 2', level: 'Intermediate', students: 18, price: 89, schedule: [{ d: 1, s: '19:00', e: '20:30' }, { d: 4, s: '19:00', e: '20:30' }], zalo: 'zalo.me/g/edunex-workenglish', materials: 16 },
  { id: 'c6', name: 'IELTS Booster', subject: 'English · IELTS', teacher: 't2', color: C.teal, status: 'active', room: 'Zoom 1', level: 'Upper-Int', students: 12, price: 129, schedule: [{ d: 0, s: '17:30', e: '19:00' }, { d: 2, s: '17:30', e: '19:00' }], zalo: 'zalo.me/g/edunex-ielts', materials: 14 },
  { id: 'c7', name: 'Conversation Club', subject: 'English', teacher: 't4', color: C.plum, status: 'active', room: 'Hub', level: 'Elementary', students: 16, price: 39, schedule: [{ d: 3, s: '18:00', e: '19:30' }], zalo: 'zalo.me/g/edunex-convo', materials: 6 },
  { id: 'c8', name: 'Pronunciation Lab', subject: 'English', teacher: 't4', color: C.rust, status: 'soon', room: 'Studio', level: 'All levels', students: 9, price: 59, schedule: [{ d: 5, s: '13:00', e: '14:30' }], zalo: 'zalo.me/g/edunex-pronlaB', materials: 4 },
  { id: 'c9', name: 'Interview English', subject: 'English · Career', teacher: 't3', color: C.navy, status: 'soon', room: 'Zoom 2', level: 'Intermediate', students: 7, price: 79, schedule: [{ d: 5, s: '14:00', e: '15:30' }], zalo: 'zalo.me/g/edunex-interview', materials: 3 },
  { id: 'c10', name: 'LinkedIn & Branding', subject: 'Career', teacher: 't5', color: C.amber, status: 'paused', room: 'Zoom 1', level: 'All levels', students: 11, price: 69, schedule: [{ d: 4, s: '12:00', e: '13:00' }], zalo: 'zalo.me/g/edunex-linkedin', materials: 5 },
];

const firstPool = ['An', 'Bảo', 'Châu', 'Dung', 'Giang', 'Hân', 'Khôi', 'Linh', 'Minh', 'Ngọc', 'Phúc', 'Quỳnh', 'Sơn', 'Trang', 'Vy', 'Yến', 'Đạt', 'Hương', 'Nam', 'Thảo'];
const lastPool = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ', 'Đặng', 'Bùi', 'Đỗ', 'Ngô'];
const focusPool = ['Job-ready English', 'IELTS 6.5', 'CV & Interview', 'Career switch', 'Workplace English', 'Conversation'];
const pcolors = [C.gold, C.teal, C.plum, C.indigo, C.green, C.amber, C.rust, C.moss, C.slate, C.navy];

function makeStudents(): Student[] {
  const out: Student[] = [];
  let n = 0;
  for (let i = 0; i < lastPool.length; i++) {
    for (let j = 0; j < 2; j++) {
      const f = firstPool[(i * 2 + j) % firstPool.length];
      const l = lastPool[i];
      out.push({
        id: 's' + ++n,
        name: `${l} ${firstPool[(i * 3 + j) % firstPool.length]} ${f}`,
        short: l.slice(0, 1) + f.slice(0, 1),
        color: pcolors[n % pcolors.length],
        year: focusPool[n % focusPool.length],
      });
    }
  }
  return out;
}

export const students: Student[] = makeStudents();

// Per-class Zoom meeting (manageable in class detail).
const zoomIds = ['88421577901', '87300944120', '90155233889', '82901176540', '77412009338', '81234477812', '95600388423', '88077123904', '76133499021', '84511200671'];
classes.forEach((cl, i) => {
  const raw = zoomIds[i] || '8800000' + (1000 + i);
  cl.zoom = {
    url: 'https://zoom.us/j/' + raw,
    id: raw.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3'),
    pass: 'EduNex' + (10 + i),
    host: cl.teacher,
  };
});

classes.forEach((cl, idx) => {
  cl.roster = students.slice(idx, idx + Math.min(cl.students, 8)).map((s) => s.id);
});

export const focusStudent: Student = students[3];
focusStudent.name = 'Nguyễn Thảo My';
focusStudent.short = 'TM';
focusStudent.color = C.gold;
focusStudent.year = 'CV & Interview';
focusStudent.classes = ['c2', 'c5', 'c6'];

export const materials: Material[] = [
  { id: 'm1', class: 'c2', session: 'Session 4 · Your value statement', title: 'Value statement worksheet.pdf', type: 'pdf', size: '240 KB', date: '12 Jun', to: 'class' },
  { id: 'm2', class: 'c2', session: 'Session 4 · Your value statement', title: '6 NZ CV templates.zip', type: 'doc', size: '1.8 MB', date: '12 Jun', to: 'class' },
  { id: 'm3', class: 'c2', session: 'Session 3 · Interview frameworks', title: 'STAR method, model answers.pdf', type: 'pdf', size: '520 KB', date: '05 Jun', to: 'class' },
  { id: 'm4', class: 'c2', session: 'Session 3 · Interview frameworks', title: 'Mock interview feedback (My).m4a', type: 'audio', size: '7.4 MB', date: '05 Jun', to: 'Nguyễn Thảo My' },
  { id: 'm5', class: 'c1', session: 'VIP · Week 6', title: 'Personal job-search roadmap.pdf', type: 'pdf', size: '1.1 MB', date: '11 Jun', to: 'class' },
  { id: 'm6', class: 'c1', session: 'VIP · Week 6', title: 'LinkedIn rebuild checklist.pdf', type: 'pdf', size: '380 KB', date: '11 Jun', to: 'class' },
  { id: 'm7', class: 'c5', session: 'Unit 5 · Meetings', title: 'Meeting phrase bank.pdf', type: 'pdf', size: '460 KB', date: '10 Jun', to: 'class' },
  { id: 'm8', class: 'c5', session: 'Unit 5 · Meetings', title: 'Email templates · workplace.docx', type: 'doc', size: '310 KB', date: '10 Jun', to: 'class' },
  { id: 'm9', class: 'c5', session: 'Unit 4 · Presentations', title: 'Presentation skills slides.pptx', type: 'slides', size: '3.2 MB', date: '03 Jun', to: 'class' },
  { id: 'm10', class: 'c6', session: 'Week 8 · Writing Task 2', title: 'Task 2 · opinion essays (Band 7+).pdf', type: 'pdf', size: '2.4 MB', date: '09 Jun', to: 'class' },
  { id: 'm11', class: 'c6', session: 'Week 8 · Speaking', title: 'Speaking Part 2 cue cards.pdf', type: 'pdf', size: '420 KB', date: '09 Jun', to: 'class' },
  { id: 'm12', class: 'c6', session: 'Week 7 · Listening', title: 'Listening practice · Section 1.mp3', type: 'audio', size: '6.4 MB', date: '02 Jun', to: 'class' },
  { id: 'm13', class: 'c4', session: 'Module 2 · The CV', title: 'CV that gets interviews (guide).pdf', type: 'pdf', size: '1.3 MB', date: '08 Jun', to: 'class' },
  { id: 'm14', class: 'c3', session: 'Session 1 · CV review', title: 'CV before & after (examples).pdf', type: 'pdf', size: '900 KB', date: '07 Jun', to: 'class' },
];

export const templates: Template[] = [
  { id: 'tpl1', key: 'reminder', name: 'Session reminder', on: true, preview: 'Xin chào {student}! Buổi {class} sẽ diễn ra lúc {time} ngày mai ({room}). Hẹn gặp em, EduNex.' },
  { id: 'tpl2', key: 'material', name: 'New material', on: true, preview: 'Lớp {class} vừa có tài liệu mới: “{material}”. Em đăng nhập EduNex để tải về nhé.' },
  { id: 'tpl3', key: 'cancel', name: 'Session change', on: true, preview: 'Thông báo: Buổi {class} ngày {date} sẽ dời lịch. EduNex sẽ sắp lịch bù và báo lại em sớm.' },
  { id: 'tpl4', key: 'enrol', name: 'Enrolment confirmation', on: false, preview: 'Chúc mừng {student} đã ghi danh {class}! Lịch học: {schedule}. Nhóm Zalo: {zalo}. EduNex.' },
];

export const znsLog: ZnsLogEntry[] = [
  { id: 'z1', tpl: 'Session reminder', class: 'CV & Interview Mastery', recipients: 14, time: 'Today · 16:02', status: 'sent' },
  { id: 'z2', tpl: 'New material', class: 'Workplace English', recipients: 18, time: 'Today · 15:40', status: 'sent' },
  { id: 'z3', tpl: 'Session reminder', class: 'IELTS Booster', recipients: 12, time: 'Today · 15:10', status: 'sent' },
  { id: 'z4', tpl: 'New material', class: 'VIP Career Program', recipients: 8, time: 'Yesterday · 19:20', status: 'sent' },
  { id: 'z5', tpl: 'Session change', class: 'LinkedIn & Branding', recipients: 11, time: 'Yesterday · 12:05', status: 'failed' },
  { id: 'z6', tpl: 'Enrolment confirmation', class: 'CV & Interview Jumpstart', recipients: 1, time: '2 days ago · 10:30', status: 'sent' },
];

export const homework: Homework[] = [
  { id: 'hw1', class: 'c2', title: 'Draft your value statement', due: '16 Jun', status: 'submitted', grade: null },
  { id: 'hw2', class: 'c2', title: 'Record a 2-min self-introduction', due: '19 Jun', status: 'pending', grade: null },
  { id: 'hw3', class: 'c5', title: 'Write a meeting-request email', due: '17 Jun', status: 'graded', grade: 'A' },
  { id: 'hw4', class: 'c5', title: 'Prepare a 3-slide intro deck', due: '21 Jun', status: 'pending', grade: null },
  { id: 'hw5', class: 'c6', title: 'IELTS Writing Task 2 essay', due: '18 Jun', status: 'graded', grade: '7.0' },
  { id: 'hw6', class: 'c6', title: 'Speaking Part 2 recording', due: '20 Jun', status: 'submitted', grade: null },
];

export const submissions: Submission[] = [
  { id: 'sub1', student: 's2', class: 'c2', title: 'Value statement draft', when: '2h ago', type: 'doc' },
  { id: 'sub2', student: 's4', class: 'c2', title: 'Self-intro recording', when: '5h ago', type: 'audio' },
  { id: 'sub3', student: 's1', class: 'c1', title: 'Job-search roadmap', when: 'Yesterday', type: 'doc' },
  { id: 'sub4', student: 's6', class: 'c2', title: 'Mock interview answers', when: 'Yesterday', type: 'doc' },
  { id: 'sub5', student: 's3', class: 'c1', title: 'LinkedIn headline draft', when: '2 days ago', type: 'doc' },
];

export const results: Result[] = [
  { class: 'c2', overall: 'A-', items: [['Value statement', 'A'], ['Mock interview 1', 'B+'], ['CV review', 'A']] },
  { class: 'c5', overall: 'A', items: [['Email writing', 'A'], ['Meeting roleplay', 'A-']] },
  { class: 'c6', overall: '6.5', items: [['Writing Task 2', '7.0'], ['Speaking Part 2', '6.5'], ['Listening', '6.0']] },
];

export const payments: Payment[] = [
  { id: 'INV-1042', item: 'CV & Interview Mastery', amount: 399, date: '02 May 2026', method: 'Visa •• 4242', status: 'paid' },
  { id: 'INV-1051', item: 'Workplace English', amount: 89, date: '10 May 2026', method: 'Visa •• 4242', status: 'paid' },
  { id: 'INV-1066', item: 'IELTS Booster', amount: 129, date: '01 Jun 2026', method: 'Bank transfer', status: 'due' },
];

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const DAYS_FULL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const todayIndex = 1; // Tuesday

export const teacherById = (id: string): Teacher | undefined => teachers.find((t) => t.id === id);
export const classById = (id: string): ClassItem | undefined => classes.find((c) => c.id === id);
export const studentById = (id: string): Student | undefined => students.find((s) => s.id === id);

export const stats: Stats = {
  classes: classes.filter((c) => c.status !== 'paused').length,
  students: 156,
  teachers: teachers.length,
  sessionsToday: classes.filter((c) => c.status !== 'paused' && c.schedule.some((x) => x.d === todayIndex)).length,
};
