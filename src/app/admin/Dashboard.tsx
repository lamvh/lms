import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { Button } from '../../components/Button';
import { StatusBadge } from '../../components/StatusBadge';
import { StatCards } from '../../components/StatCards';
import { Segmented } from '../../components/Segmented';
import { Avatar } from '../../components/Avatar';
import { useNotify } from '../useToasts';
import { to12 } from '../../lib/time';
import { todaySessions } from '../../data/today-sessions';
import { classes, teacherById, teachers, DAYS, DAYS_FULL, todayIndex } from '../../data/edunex';
import type { ClassStatus } from '../../types/edunex';

const card = 'bg-surface border border-line rounded-lg shadow-sh-card';

function Greeting() {
  return (
    <div>
      <div className="font-head text-[11px] font-bold tracking-[.10em] uppercase text-brand mb-1.5">
        {DAYS_FULL[todayIndex]}, 14 June 2026
      </div>
      <h1 className="font-head text-[28px] font-bold text-ink-900">Good afternoon, Phương 👋</h1>
      <p className="text-[15px] text-ink-500 mt-[7px]">
        You have <b className="text-ink-800">{todaySessions().length} sessions</b> scheduled today across 3 rooms.
      </p>
    </div>
  );
}

function TodaySchedule({ openClass }: { openClass: (id: string) => void }) {
  const sessions = todaySessions();
  const nowMin = 17 * 60 + 10;
  return (
    <div className={`${card} p-[20px_22px] flex flex-col`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <h3 className="font-head text-[16.5px] font-bold text-ink-900">Today’s schedule</h3>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-xs bg-surface-3 text-ink-600">{sessions.length} sessions</span>
        </div>
        <span className="text-[13px] text-ink-400 font-medium">{DAYS_FULL[todayIndex]}</span>
      </div>
      <div className="flex flex-col">
        {sessions.map((s, i) => {
          const [h, m] = s.s.split(':').map(Number);
          const start = h * 60 + m;
          const endMin = parseInt(s.e.split(':')[0]) * 60 + parseInt(s.e.split(':')[1]);
          const isNow = nowMin >= start && nowMin < endMin;
          const past = endMin < nowMin;
          const t = teacherById(s.class.teacher);
          return (
            <div
              key={i}
              onClick={() => openClass(s.class.id)}
              className={`flex items-center gap-3.5 px-2.5 py-3 rounded-md cursor-pointer transition-colors ${isNow ? 'bg-a-50' : 'hover:bg-surface-2'} ${past ? 'opacity-55' : ''}`}
            >
              <div className="w-[62px] text-right shrink-0">
                <div className={`font-head font-bold text-sm ${isNow ? 'text-a-700' : 'text-ink-800'}`}>{to12(s.s)}</div>
                <div className="text-[11.5px] text-ink-400">{to12(s.e)}</div>
              </div>
              <div className="w-1 self-stretch rounded shrink-0" style={{ background: s.class.color }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[14.5px] text-ink-900 truncate">{s.class.name}</span>
                  {isNow && <StatusBadge status="active" label="Now" />}
                </div>
                <div className="text-[12.5px] text-ink-500 mt-0.5">{t?.name} · {s.class.room} · {s.class.students} students</div>
              </div>
              <Icon name="chevR" size={17} className="text-ink-300" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QuickActions() {
  const navigate = useNavigate();
  const notify = useNotify();
  const acts = [
    { icon: 'plus' as const, label: 'Add a class', fn: () => notify('New class form opened', 'plus') },
    { icon: 'printer' as const, label: 'Export timetable', fn: () => navigate('/admin/calendar') },
    { icon: 'materials' as const, label: 'Upload material', fn: () => navigate('/admin/materials') },
    { icon: 'students' as const, label: 'Add a student', fn: () => notify('New student form opened', 'plus') },
  ];
  return (
    <div className={`${card} p-[18px_20px]`}>
      <h3 className="font-head text-[15.5px] font-bold text-ink-900 mb-3.5">Quick actions</h3>
      <div className="grid grid-cols-2 gap-2.5">
        {acts.map((a) => (
          <button
            key={a.label}
            type="button"
            onClick={a.fn}
            className="flex flex-col items-start gap-2.5 p-[13px] border border-line rounded-md bg-surface text-left transition-colors hover:bg-surface-2 hover:border-ink-300"
          >
            <span className="w-[34px] h-[34px] rounded-[9px] bg-a-50 text-a-700 flex items-center justify-center">
              <Icon name={a.icon} size={18} />
            </span>
            <span className="text-[13.5px] font-semibold text-ink-800">{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function StartingSoon({ openClass }: { openClass: (id: string) => void }) {
  const soon = classes.filter((c) => c.status === 'soon');
  return (
    <div className={`${card} p-[18px_20px]`}>
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="font-head text-[15.5px] font-bold text-ink-900">Starting soon</h3>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-xs bg-surface-3 text-ink-600">{soon.length}</span>
      </div>
      <div className="flex flex-col gap-3">
        {soon.map((c) => {
          const t = teacherById(c.teacher);
          return (
            <div key={c.id} onClick={() => openClass(c.id)} className="flex items-center gap-[11px] cursor-pointer">
              <div className="w-[38px] h-[38px] rounded-[10px] shrink-0 flex items-center justify-center font-head font-bold text-[13px]" style={{ background: c.color + '1a', color: c.color }}>
                {DAYS[c.schedule[0].d]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13.5px] font-semibold truncate text-ink-900">{c.name}</div>
                <div className="text-xs text-ink-500">{t?.short} · {to12(c.schedule[0].s)} · {c.students} enrolled</div>
              </div>
              <Icon name="chevR" size={16} className="text-ink-300" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ClassTable({ openClass }: { openClass: (id: string) => void }) {
  const [tab, setTab] = useState<'all' | ClassStatus>('all');
  const [teacher, setTeacher] = useState('all');
  let rows = classes;
  if (tab !== 'all') rows = rows.filter((c) => c.status === tab);
  if (teacher !== 'all') rows = rows.filter((c) => c.teacher === teacher);

  return (
    <div className={`${card} overflow-hidden`}>
      <div className="flex items-center gap-3 p-[16px_20px] border-b border-line flex-wrap">
        <h3 className="font-head text-base font-bold text-ink-900 mr-1">All programs</h3>
        <Segmented size="sm" value={tab} onChange={(v) => setTab(v as typeof tab)} options={[{ value: 'all', label: 'All' }, { value: 'active', label: 'Active' }, { value: 'soon', label: 'Soon' }, { value: 'paused', label: 'Paused' }]} />
        <div className="flex-1" />
        <select value={teacher} onChange={(e) => setTeacher(e.target.value)} className="border border-line rounded-sm px-3 py-[7px] text-[13px] text-ink-600 bg-surface font-body">
          <option value="all">All teachers</option>
          {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13.5px] min-w-[680px]">
          <thead>
            <tr className="text-left text-ink-400 text-[11.5px] uppercase tracking-[.06em]">
              <th className="px-5 py-[11px] font-bold">Program</th>
              <th className="px-3 py-[11px] font-bold">Teacher</th>
              <th className="px-3 py-[11px] font-bold">Schedule</th>
              <th className="px-3 py-[11px] font-bold">Students</th>
              <th className="px-3 py-[11px] font-bold">Status</th>
              <th className="px-5 py-[11px] font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => {
              const t = teacherById(c.teacher);
              return (
                <tr key={c.id} onClick={() => openClass(c.id)} className="border-t border-line-soft cursor-pointer hover:bg-surface-2">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.color }} />
                      <span className="font-semibold text-ink-900">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    {t && (
                      <span className="flex items-center gap-2">
                        <Avatar name={t.name} short={t.short} color={t.color} size={24} />
                        <span className="text-ink-600">{t.short}</span>
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-ink-600">{c.schedule.map((s) => DAYS[s.d]).join(', ')}</td>
                  <td className="px-3 py-3 text-ink-600">{c.students}</td>
                  <td className="px-3 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-5 py-3 text-right">
                    <Button variant="ghost" size="sm" iconOnly onClick={(e) => { e.stopPropagation(); openClass(c.id); }}>
                      <Icon name="chevR" size={16} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Admin dashboard (Balanced layout): greeting, KPIs, schedule, quick actions, programs table. */
export function Dashboard() {
  const navigate = useNavigate();
  const openClass = (id: string) => navigate(`/admin/classes/${id}`);
  return (
    <div className="flex flex-col gap-[22px] max-w-[1180px]">
      <Greeting />
      <StatCards />
      <div className="grid grid-cols-[1.7fr_1fr] gap-[18px] items-start max-[980px]:grid-cols-1">
        <TodaySchedule openClass={openClass} />
        <div className="flex flex-col gap-[18px]">
          <QuickActions />
          <StartingSoon openClass={openClass} />
        </div>
      </div>
      <ClassTable openClass={openClass} />
    </div>
  );
}

export default Dashboard;
