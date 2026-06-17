import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, type IconName } from '../../components/Icon';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { StatusBadge } from '../../components/StatusBadge';
import { FileIcon } from '../../components/FileIcon';
import { ZoomPanel } from '../../components/ZoomPanel';
import { Logo } from '../../components/Logo';
import { ToastProvider, useNotify } from '../useToasts';
import { to12 } from '../../lib/time';
import { classes as allClasses, teacherById, studentById, materials, submissions, DAYS, DAYS_FULL, todayIndex } from '../../data/edunex';
import type { ClassItem, ScheduleSlot } from '../../types/edunex';

const card = 'bg-surface border border-line rounded-lg shadow-sh-card';
const me = teacherById('t1')!; // Ms. Jane
const myClasses = allClasses.filter((c) => c.teacher === me.id);

type View = 'today' | 'myclasses' | 'class' | 'homework' | 'attendance' | 'progress';
interface SessionView extends ScheduleSlot { class: ClassItem }

function todaySessions(): SessionView[] {
  const out: SessionView[] = [];
  myClasses.forEach((c) => c.schedule.forEach((s) => { if (s.d === todayIndex) out.push({ ...s, class: c }); }));
  return out.sort((a, b) => a.s.localeCompare(b.s));
}
const studentIds = Array.from(new Set(myClasses.flatMap((c) => c.roster ?? [])));
const submissionsForMe = submissions
  .filter((s) => myClasses.some((c) => c.id === s.class))
  .map((s) => ({ ...s, class: allClasses.find((c) => c.id === s.class) }));

function TeacherToday({ openClass, goAttendance }: { openClass: (id: string) => void; goAttendance: () => void }) {
  const notify = useNotify();
  const sessions = todaySessions();
  const now = 17 * 60 + 10;
  return (
    <div className="flex flex-col gap-5 max-w-[1000px]">
      <div>
        <div className="font-head text-[11px] font-bold tracking-[.10em] uppercase text-brand mb-1.5">{DAYS_FULL[todayIndex]}, 14 June 2026</div>
        <h1 className="font-head text-[27px] font-bold text-ink-900">Good afternoon, Jane 👋</h1>
        <p className="text-[15px] text-ink-500 mt-[7px]">You have <b className="text-ink-800">{sessions.length} sessions</b> today. Next one starts soon.</p>
      </div>
      <div className="flex flex-col gap-3.5">
        {sessions.length === 0 && <div className={`${card} p-[30px] text-center text-ink-400`}>No classes scheduled today 🎉</div>}
        {sessions.map((s, i) => {
          const c = s.class;
          const [h, m] = s.s.split(':').map(Number);
          const start = h * 60 + m;
          const live = now >= start && now < parseInt(s.e) * 60;
          return (
            <div key={i} className={`${card} p-0 overflow-hidden flex`}>
              <div className="w-1.5" style={{ background: c.color }} />
              <div className="flex-1 p-[18px_20px] flex items-center gap-5 flex-wrap">
                <div className="min-w-[96px]">
                  <div className={`font-head font-bold text-lg ${live ? 'text-a-700' : 'text-ink-900'}`}>{to12(s.s)}</div>
                  <div className="text-[12.5px] text-ink-400">{to12(s.e)}</div>
                </div>
                <div className="flex-1 min-w-[180px]">
                  <div className="flex items-center gap-[9px]">
                    <span className="text-base font-bold text-ink-900">{c.name}</span>
                    {live && <StatusBadge status="active" label="Now" />}
                  </div>
                  <div className="text-[13px] text-ink-500 mt-1">{c.room} · {c.students} students · {c.subject}</div>
                </div>
                <div className="flex gap-[9px]">
                  <Button variant="ghost" size="sm" onClick={goAttendance}><Icon name="checkSquare" size={15} />Attendance</Button>
                  <Button variant="ghost" size="sm" onClick={() => openClass(c.id)}><Icon name="materials" size={15} />Open</Button>
                  <Button size="sm" onClick={() => notify('Starting Zoom: ' + c.name, 'video')}><Icon name="video" size={15} />Start Zoom</Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TeacherClasses({ openClass }: { openClass: (id: string) => void }) {
  return (
    <div className="flex flex-col gap-[18px] max-w-[1100px]">
      <p className="text-sm text-ink-500">{myClasses.length} programs you teach. Open one to see the roster, schedule and materials.</p>
      <div className="grid grid-cols-2 gap-4 max-[860px]:grid-cols-1">
        {myClasses.map((c) => (
          <div key={c.id} onClick={() => openClass(c.id)} className={`${card} p-0 overflow-hidden cursor-pointer hover:shadow-sh-2 transition-shadow`}>
            <div className="h-1.5" style={{ background: c.color }} />
            <div className="p-[18px_20px]">
              <div className="flex items-center justify-between gap-2.5">
                <h3 className="font-head text-[17px] font-bold text-ink-900">{c.name}</h3>
                <StatusBadge status={c.status} />
              </div>
              <div className="text-[13px] text-ink-400 mt-[5px]">{c.subject} · {c.level}</div>
              <div className="flex gap-[18px] mt-4 text-[13px] text-ink-600">
                <span className="flex items-center gap-1.5"><Icon name="students" size={15} />{c.students} students</span>
                <span className="flex items-center gap-1.5"><Icon name="calendar" size={15} />{c.schedule.map((s) => DAYS[s.d]).join(', ')}</span>
                <span className="flex items-center gap-1.5"><Icon name="materials" size={15} />{c.materials}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeacherHomework() {
  const notify = useNotify();
  const subs = submissionsForMe;
  const [done, setDone] = useState<string[]>([]);
  const pending = subs.filter((s) => !done.includes(s.id));
  return (
    <div className="flex flex-col gap-[18px] max-w-[920px]">
      <div className="flex items-center gap-3">
        <p className="text-sm text-ink-500"><b className="text-ink-800">{pending.length}</b> submissions waiting for your feedback.</p>
        <div className="flex-1" />
        {pending.length > 0 && <Button variant="ghost" size="sm" onClick={() => notify('Opening grading queue')}><Icon name="checkSquare" size={15} />Grade all</Button>}
      </div>
      <div className={`${card} p-[8px_6px]`}>
        {pending.length === 0 && <div className="p-[30px] text-center text-ink-400">All caught up, nothing to mark 🎉</div>}
        {subs.map((s, i) => {
          const st = studentById(s.student);
          const c = s.class;
          const isDone = done.includes(s.id);
          return (
            <div key={s.id} className={`flex items-center gap-3.5 p-3.5 ${i ? 'border-t border-line-soft' : ''} ${isDone ? 'opacity-50' : ''}`}>
              <FileIcon type={s.type} size={42} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-ink-900">{s.title}</div>
                <div className="text-[12.5px] text-ink-500 mt-0.5 flex items-center gap-[7px]">
                  <span className="w-2 h-2 rounded-[2px]" style={{ background: c?.color }} />{c?.name} · {st ? st.name : 'Student'} · {s.when}
                </div>
              </div>
              {isDone ? (
                <StatusBadge status="active" label="Graded" />
              ) : (
                <Button size="sm" onClick={() => { setDone((d) => [...d, s.id]); notify('Graded: ' + s.title); }}><Icon name="edit" size={14} />Grade</Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TeacherAttendance() {
  const notify = useNotify();
  const [cid, setCid] = useState(myClasses[0]?.id);
  const c = myClasses.find((x) => x.id === cid) ?? myClasses[0];
  const roster = (c.roster ?? []).map((id) => studentById(id)).filter(Boolean);
  const [marks, setMarks] = useState<Record<string, string>>({});
  useEffect(() => {
    const init: Record<string, string> = {};
    roster.forEach((s) => { init[s!.id] = 'present'; });
    setMarks(init);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid]);
  const opt: [string, string, string][] = [['present', 'Present', '#2E9E6B'], ['late', 'Late', '#C9821F'], ['absent', 'Absent', '#D55B43']];
  const present = Object.values(marks).filter((v) => v === 'present').length;
  return (
    <div className="flex flex-col gap-[18px] max-w-[920px]">
      <div className="flex items-center gap-3 flex-wrap">
        <select value={cid} onChange={(e) => setCid(e.target.value)} className="border border-line rounded-sm px-[13px] py-[9px] text-sm font-semibold text-ink-700 bg-surface font-body">
          {myClasses.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
        </select>
        <span className="text-[13.5px] text-ink-500">{DAYS_FULL[todayIndex]}, 14 June · {present}/{roster.length} present</span>
        <div className="flex-1" />
        <Button size="sm" onClick={() => notify('Attendance saved for ' + c.name)}><Icon name="check" size={15} />Save attendance</Button>
      </div>
      <div className={`${card} p-[8px_6px]`}>
        {roster.map((s, i) => (
          <div key={s!.id} className={`flex items-center gap-[13px] p-[12px_14px] ${i ? 'border-t border-line-soft' : ''}`}>
            <Avatar name={s!.name} short={s!.short} color={s!.color} size={36} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-ink-900">{s!.name}</div>
              <div className="text-xs text-ink-400">{s!.year}</div>
            </div>
            <div className="inline-flex bg-surface-3 rounded-sm p-[3px] gap-0.5">
              {opt.map(([v, l, col]) => {
                const on = marks[s!.id] === v;
                return (
                  <button key={v} onClick={() => setMarks((m) => ({ ...m, [s!.id]: v }))} className={`px-3 py-1.5 text-[12.5px] font-bold rounded-[7px] ${on ? 'bg-surface shadow-sh-1' : ''}`} style={{ color: on ? col : '#8B909B' }}>{l}</button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeacherProgress() {
  const [cid, setCid] = useState('all');
  let ids = studentIds;
  if (cid !== 'all') ids = allClasses.find((c) => c.id === cid)?.roster ?? [];
  const rows = ids.map((id) => studentById(id)).filter(Boolean);
  return (
    <div className="flex flex-col gap-[18px] max-w-[1000px]">
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setCid('all')} className={`inline-flex items-center gap-1.5 text-[13px] font-semibold px-3 py-1.5 rounded-pill border ${cid === 'all' ? 'bg-brand text-white border-brand' : 'bg-surface text-ink-600 border-line'}`}>All my students <span className="opacity-70">{studentIds.length}</span></button>
        {myClasses.map((c) => (
          <button key={c.id} onClick={() => setCid(c.id)} className={`inline-flex items-center gap-1.5 text-[13px] font-semibold px-3 py-1.5 rounded-pill border ${cid === c.id ? 'bg-brand text-white border-brand' : 'bg-surface text-ink-600 border-line'}`}>
            <span className="w-2 h-2 rounded-[2px]" style={{ background: c.color }} />{c.name}
          </button>
        ))}
      </div>
      <div className={`${card} overflow-hidden divide-y divide-line-soft`}>
        {rows.map((s) => (
          <div key={s!.id} className="flex items-center gap-3 px-5 py-3">
            <Avatar name={s!.name} short={s!.short} color={s!.color} size={34} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-ink-900 truncate">{s!.name}</div>
              <div className="text-xs text-ink-500">{s!.year}</div>
            </div>
            <span className="font-head font-bold text-a-700 text-sm">{['A', 'A-', 'B+', '7.0', '6.5'][s!.id.charCodeAt(1) % 5]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeacherClassDetail({ classId, back }: { classId: string; back: () => void }) {
  const notify = useNotify();
  const c = allClasses.find((x) => x.id === classId);
  if (!c) return null;
  const roster = (c.roster ?? []).map((id) => studentById(id)).filter(Boolean);
  const mats = materials.filter((m) => m.class === c.id);
  return (
    <div className="flex flex-col gap-5 max-w-[1000px]">
      <button onClick={back} className="flex items-center gap-1.5 text-ink-500 text-[13.5px] font-semibold w-fit"><Icon name="chevL" size={16} />Back to classes</button>
      <div className={`${card} p-0 overflow-hidden`}>
        <div className="h-1.5" style={{ background: c.color }} />
        <div className="p-[22px_24px] flex items-start gap-5 flex-wrap">
          <div className="flex-1 min-w-[240px]">
            <div className="flex items-center gap-3 mb-2"><h1 className="font-head text-[24px] font-bold text-ink-900">{c.name}</h1><StatusBadge status={c.status} /></div>
            <p className="text-sm text-ink-500">{c.subject} · {c.level} · {c.students} students</p>
          </div>
          <div className="w-[250px] max-[640px]:w-full"><ZoomPanel c={c} notify={notify} /></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 max-[860px]:grid-cols-1">
        <div className={`${card} overflow-hidden`}>
          <h3 className="font-head text-[15px] font-bold text-ink-900 px-4 py-3 border-b border-line">Roster ({roster.length})</h3>
          {roster.map((s) => (
            <div key={s!.id} className="flex items-center gap-3 px-4 py-3 border-t border-line-soft first:border-t-0">
              <Avatar name={s!.name} short={s!.short} color={s!.color} size={32} />
              <span className="flex-1 text-sm font-semibold text-ink-900 truncate">{s!.name}</span>
            </div>
          ))}
        </div>
        <div className={`${card} overflow-hidden`}>
          <h3 className="font-head text-[15px] font-bold text-ink-900 px-4 py-3 border-b border-line">Materials ({mats.length})</h3>
          {mats.map((m) => (
            <div key={m.id} className="flex items-center gap-3 px-4 py-3 border-t border-line-soft first:border-t-0">
              <FileIcon type={m.type} size={34} />
              <span className="flex-1 text-[13.5px] font-semibold text-ink-900 truncate">{m.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Inner() {
  const navigate = useNavigate();
  const notify = useNotify();
  const [view, setView] = useState<View>('today');
  const [classId, setClassId] = useState<string | null>(null);

  const openClass = (id: string) => { setClassId(id); setView('class'); };
  const go = (v: View) => { setClassId(null); setView(v); };

  const nav: { id: View; label: string; icon: IconName; badge?: number }[] = [
    { id: 'today', label: "Today's Classes", icon: 'calendar', badge: todaySessions().length },
    { id: 'myclasses', label: 'My Classes', icon: 'classes' },
    { id: 'homework', label: 'Homework to Mark', icon: 'materials', badge: submissionsForMe.length },
    { id: 'attendance', label: 'Attendance', icon: 'checkSquare' },
    { id: 'progress', label: 'Student Progress', icon: 'students' },
  ];
  const titles: Record<View, string> = { today: "Today's Classes", myclasses: 'My Classes', class: 'Class details', homework: 'Homework to Mark', attendance: 'Attendance', progress: 'Student Progress' };

  let content: React.ReactNode;
  if (view === 'today') content = <TeacherToday openClass={openClass} goAttendance={() => go('attendance')} />;
  else if (view === 'myclasses') content = <TeacherClasses openClass={openClass} />;
  else if (view === 'class' && classId) content = <TeacherClassDetail classId={classId} back={() => go('myclasses')} />;
  else if (view === 'homework') content = <TeacherHomework />;
  else if (view === 'attendance') content = <TeacherAttendance />;
  else content = <TeacherProgress />;

  return (
    <div className="h-full flex bg-bg overflow-hidden font-body relative">
      <aside className="w-[252px] shrink-0 flex flex-col p-[20px_14px] gap-1.5" style={{ background: 'linear-gradient(180deg, #1C1F26, #15171C)' }}>
        <div className="px-2 pt-1 pb-2"><Logo size={32} light textSize={20} /></div>
        <div className="flex items-center gap-2.5 px-2.5 pt-2.5 pb-3.5 mb-1.5 border-b border-white/10">
          <Avatar name={me.name} short={me.short} color={me.color} size={38} />
          <div className="min-w-0">
            <div className="text-white text-[13.5px] font-bold truncate">{me.name}</div>
            <div className="text-p-300 text-[11.5px]">Coach workspace</div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          {nav.map((it) => {
            const on = view === it.id || (it.id === 'myclasses' && view === 'class');
            return (
              <button key={it.id} onClick={() => go(it.id)} className={`flex items-center gap-[11px] px-3 py-2.5 rounded-sm font-head font-semibold text-sm ${on ? 'bg-white/[.14] text-white' : 'text-p-100 hover:bg-white/[.08]'}`}>
                <Icon name={it.icon} size={19} /><span className="flex-1 text-left">{it.label}</span>
                {it.badge ? <span className="text-[10.5px] font-bold px-[7px] py-px rounded-pill bg-accent text-ink-900">{it.badge}</span> : null}
              </button>
            );
          })}
        </div>
        <button onClick={() => navigate('/login')} className="flex items-center gap-[11px] px-3 py-2.5 rounded-sm font-head font-semibold text-sm text-p-100 hover:bg-white/[.08]">
          <Icon name="logout" size={19} /> Sign out
        </button>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <header className="h-16 shrink-0 bg-surface border-b border-line flex items-center px-[26px] gap-4">
          <h2 className="font-head text-[19px] font-bold text-ink-900">{titles[view]}</h2>
          <div className="flex-1" />
          <div className="flex items-center gap-2 bg-surface-3 rounded-sm px-3 h-[38px] w-[230px]">
            <Icon name="search" size={17} className="text-ink-400" />
            <input placeholder="Search students…" className="border-none bg-transparent text-[13.5px] flex-1 outline-none text-ink-700" />
          </div>
          <Button variant="ghost" iconOnly className="relative" aria-label="Notifications" onClick={() => notify('You have 3 new submissions', 'bell')}>
            <Icon name="bell" size={19} />
            <span className="absolute top-[7px] right-2 w-[7px] h-[7px] rounded-full bg-danger border-[1.5px] border-white" />
          </Button>
        </header>
        <main className="flex-1 min-h-0 overflow-y-auto px-7 pt-[26px] pb-10">{content}</main>
      </div>
    </div>
  );
}

/** Teacher / coach desktop workspace (Ms. Jane): sidebar with badges + 5 views. */
export function TeacherApp() {
  return (
    <ToastProvider>
      <Inner />
    </ToastProvider>
  );
}

export default TeacherApp;
