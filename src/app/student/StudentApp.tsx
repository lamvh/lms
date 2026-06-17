import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, type IconName } from '../../components/Icon';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { StatusBadge } from '../../components/StatusBadge';
import { SessionCard } from '../../components/SessionCard';
import { to12 } from '../../lib/time';
import { focusStudent, classById, teacherById, homework, materials, results, payments, DAYS, DAYS_FULL, todayIndex } from '../../data/edunex';
import { studentSessions, firstNameOf, shortTeacher, HW_META } from './student-helpers';

const card = 'bg-surface border border-line rounded-lg shadow-sh-card';
const stu = focusStudent;

type Tab = 'home' | 'courses' | 'homework' | 'profile';
type Page = { kind: 'class'; id: string } | { kind: 'results' } | { kind: 'payments' } | null;

function StuHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="px-4 pt-[46px] pb-[18px] bg-surface border-b border-line">
      <div className="flex items-center gap-3">
        <Avatar name={stu.name} short={stu.short} color={stu.color} size={44} ring />
        <div className="min-w-0">
          <div className="font-head text-[19px] font-bold text-ink-900 truncate">{title}</div>
          <div className="text-[12.5px] text-ink-500">{sub}</div>
        </div>
      </div>
    </div>
  );
}

function StuHome({ open, openPage, goTab }: { open: (id: string) => void; openPage: (p: Page) => void; goTab: (t: Tab) => void }) {
  const today = studentSessions(stu).filter((s) => s.d === todayIndex).sort((a, b) => a.s.localeCompare(b.s));
  const upcoming = studentSessions(stu).filter((s) => s.d > todayIndex).sort((a, b) => a.d - b.d || a.s.localeCompare(b.s)).slice(0, 3);
  const hwPending = homework.filter((h) => stu.classes?.includes(h.class) && h.status !== 'graded');
  const quick: [string, IconName, () => void][] = [
    ['Results', 'star', () => openPage({ kind: 'results' })],
    ['Payments', 'file', () => openPage({ kind: 'payments' })],
    ['Courses', 'classes', () => goTab('courses')],
  ];

  return (
    <div>
      <StuHeader title={`Xin chào, ${firstNameOf(stu.name)} 👋`} sub={`${DAYS_FULL[todayIndex]}, 14 June`} />
      <div className="px-4 pt-[18px] pb-[26px] flex flex-col gap-[22px]">
        <div className="flex gap-2.5">
          {quick.map(([l, ic, fn]) => (
            <button key={l} onClick={fn} className={`${card} flex-1 p-[13px_8px] flex flex-col items-center gap-[7px]`}>
              <span className="w-9 h-9 rounded-[10px] bg-a-50 text-a-700 flex items-center justify-center"><Icon name={ic} size={18} /></span>
              <span className="text-xs font-semibold text-ink-700">{l}</span>
            </button>
          ))}
        </div>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-head text-base font-bold text-ink-900">Today’s sessions</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-xs bg-surface-3 text-ink-600">{today.length}</span>
          </div>
          <div className="flex flex-col gap-[11px]">
            {today.length === 0 && <div className={`${card} p-5 text-center text-ink-400 text-sm`}>No sessions today 🎉</div>}
            {today.map((s, i) => <SessionCard key={i} s={s} i={i} open={open} />)}
          </div>
        </section>

        {hwPending.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-head text-base font-bold text-ink-900">Homework due</h3>
              <button onClick={() => goTab('homework')} className="text-[13px] font-semibold text-a-700">All</button>
            </div>
            <div className={`${card} p-[6px_4px]`}>
              {hwPending.slice(0, 3).map((h, i) => {
                const c = classById(h.class);
                return (
                  <div key={h.id} className={`flex items-center gap-3 px-[13px] py-[11px] ${i ? 'border-t border-line-soft' : ''}`}>
                    <span className="w-[9px] h-[9px] rounded-[3px] shrink-0" style={{ background: c?.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[13.5px] font-semibold truncate text-ink-900">{h.title}</div>
                      <div className="text-[11.5px] text-ink-400">{c?.name} · due {h.due}</div>
                    </div>
                    <StatusBadge status={HW_META[h.status][0]} label={HW_META[h.status][1]} />
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section>
          <h3 className="font-head text-base font-bold text-ink-900 mb-3">Upcoming this week</h3>
          <div className={`${card} p-[6px_4px]`}>
            {upcoming.map((s, i) => (
              <div key={i} onClick={() => open(s.class.id)} className={`flex items-center gap-[13px] px-[13px] py-[11px] cursor-pointer ${i ? 'border-t border-line-soft' : ''}`}>
                <div className="w-11 h-11 rounded-[11px] flex flex-col items-center justify-center shrink-0" style={{ background: s.class.color + '18', color: s.class.color }}>
                  <span className="text-[11px] font-bold">{DAYS[s.d]}</span>
                  <span className="text-[11px] font-semibold opacity-80">{9 + s.d}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate text-ink-900">{s.class.name}</div>
                  <div className="text-[12.5px] text-ink-500">{to12(s.s)} · {s.class.room}</div>
                </div>
                <Icon name="chevR" size={16} className="text-ink-300" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function StuCourses({ open }: { open: (id: string) => void }) {
  return (
    <div>
      <StuHeader title="Courses" sub="Programs you’re enrolled in" />
      <div className="px-4 pt-[18px] pb-[26px] flex flex-col gap-[13px]">
        {(stu.classes ?? []).map((cid, idx) => {
          const c = classById(cid);
          const t = c && teacherById(c.teacher);
          const prog = 68 + ((idx * 11) % 28);
          if (!c) return null;
          return (
            <div key={cid} onClick={() => open(cid)} className={`${card} p-0 overflow-hidden cursor-pointer flex`}>
              <div className="w-1.5" style={{ background: c.color }} />
              <div className="flex-1 p-[15px_16px]">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[15.5px] font-bold text-ink-900">{c.name}</div>
                  <Icon name="chevR" size={17} className="text-ink-300" />
                </div>
                <div className="flex items-center gap-2 mt-[9px]">
                  {t && <Avatar name={t.name} short={t.short} color={t.color} size={26} />}
                  <span className="text-[13px] text-ink-500">{t && shortTeacher(t.name)}</span>
                  <span className="ml-auto text-xs text-ink-400">{c.schedule.map((s) => DAYS[s.d]).join(', ')}</span>
                </div>
                <div className="flex items-center gap-[9px] mt-[13px]">
                  <div className="flex-1 h-[7px] rounded-pill bg-surface-3 overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: prog + '%' }} />
                  </div>
                  <span className="text-xs font-bold text-ink-600">{prog}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StuHomework({ notify }: { notify: (m: string) => void }) {
  const [filter, setFilter] = useState<'all' | 'todo' | 'done'>('all');
  let hw = homework.filter((h) => stu.classes?.includes(h.class));
  if (filter === 'todo') hw = hw.filter((h) => h.status !== 'graded');
  if (filter === 'done') hw = hw.filter((h) => h.status === 'graded');
  return (
    <div>
      <StuHeader title="Homework" sub="Assignments from your coaches" />
      <div className="px-4 pt-4 pb-[26px] flex flex-col gap-3.5">
        <div className="flex gap-2">
          {([['all', 'All'], ['todo', 'To do'], ['done', 'Done']] as const).map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)} className={`inline-flex items-center gap-1.5 text-[13px] font-semibold px-3 py-1.5 rounded-pill border ${filter === v ? 'bg-brand text-white border-brand' : 'bg-surface text-ink-600 border-line'}`}>{l}</button>
          ))}
        </div>
        <div className="flex flex-col gap-[11px]">
          {hw.map((h) => {
            const c = classById(h.class);
            return (
              <div key={h.id} className={`${card} p-[14px_15px]`}>
                <div className="flex items-center gap-[9px] mb-2">
                  <span className="w-[9px] h-[9px] rounded-[3px]" style={{ background: c?.color }} />
                  <span className="text-xs text-ink-400 font-semibold flex-1 truncate">{c?.name}</span>
                  <StatusBadge status={HW_META[h.status][0]} label={HW_META[h.status][1]} />
                </div>
                <div className="text-[15px] font-semibold text-ink-900">{h.title}</div>
                <div className="flex items-center gap-3.5 mt-2.5">
                  <span className="text-[12.5px] text-ink-500 flex items-center gap-1.5"><Icon name="calendar" size={14} />Due {h.due}</span>
                  {h.grade && <span className="text-[12.5px] font-bold text-success flex items-center gap-1.5"><Icon name="star" size={14} />Grade {h.grade}</span>}
                  <div className="flex-1" />
                  {h.status === 'pending' ? (
                    <Button size="sm" onClick={() => notify('Opening submission for: ' + h.title)}><Icon name="upload" size={14} />Submit</Button>
                  ) : h.status === 'submitted' ? (
                    <span className="text-[12.5px] text-ink-400 font-semibold">Awaiting feedback</span>
                  ) : (
                    <Button variant="ghost" size="sm" onClick={() => notify('Opening feedback for: ' + h.title)}>View feedback</Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StuProfile({ open, openPage, notify, onSignOut }: { open: (id: string) => void; openPage: (p: Page) => void; notify: (m: string) => void; onSignOut: () => void }) {
  const menu: [IconName, string, Page][] = [
    ['star', 'Results', { kind: 'results' }],
    ['file', 'Payments', { kind: 'payments' }],
  ];
  const settings: [IconName, string][] = [['bell', 'Notifications'], ['sun', 'Language · English'], ['lock', 'Privacy'], ['msg', 'Help & support']];
  return (
    <div>
      <StuHeader title={stu.name} sub={stu.year} />
      <div className="px-4 pt-[18px] pb-[26px] flex flex-col gap-5">
        <div className={`${card} p-[6px_4px]`}>
          {menu.map(([ic, l, p], i) => (
            <div key={l} onClick={() => openPage(p)} className={`flex items-center gap-[13px] px-[13px] py-3.5 cursor-pointer ${i ? 'border-t border-line-soft' : ''}`}>
              <span className="w-[34px] h-[34px] rounded-[9px] bg-a-50 text-a-700 flex items-center justify-center"><Icon name={ic} size={17} /></span>
              <span className="flex-1 text-[14.5px] font-semibold text-ink-900">{l}</span>
              <Icon name="chevR" size={16} className="text-ink-300" />
            </div>
          ))}
        </div>

        <section>
          <h3 className="font-head text-[14.5px] font-bold text-ink-900 mb-[11px]">My programs</h3>
          <div className="flex flex-col gap-[9px]">
            {(stu.classes ?? []).map((cid) => {
              const c = classById(cid);
              const t = c && teacherById(c.teacher);
              if (!c) return null;
              return (
                <div key={cid} onClick={() => open(cid)} className={`${card} p-[13px_14px] flex items-center gap-3 cursor-pointer`}>
                  <div className="w-10 h-10 rounded-[11px] flex items-center justify-center shrink-0" style={{ background: c.color + '18', color: c.color }}><Icon name="classes" size={19} /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-ink-900">{c.name}</div>
                    <div className="text-xs text-ink-500">{t && shortTeacher(t.name)}</div>
                  </div>
                  <Button variant="soft" size="sm" onClick={(e) => { e.stopPropagation(); notify('Opening Zoom: ' + c.name); }}><Icon name="video" size={15} />Join</Button>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h3 className="font-head text-[14.5px] font-bold text-ink-900 mb-[11px]">Settings</h3>
          <div className={`${card} p-1`}>
            {settings.map(([ic, l], i) => (
              <div key={l} className={`flex items-center gap-[13px] px-[13px] py-[13px] ${i ? 'border-t border-line-soft' : ''}`}>
                <Icon name={ic} size={19} className="text-ink-500" />
                <span className="flex-1 text-sm font-medium text-ink-800">{l}</span>
                <Icon name="chevR" size={16} className="text-ink-300" />
              </div>
            ))}
          </div>
        </section>

        <Button variant="ghost" className="text-danger border-danger-bg" onClick={onSignOut}><Icon name="logout" size={17} />Sign out</Button>
      </div>
    </div>
  );
}

function StuClassDetail({ classId, back, notify }: { classId: string; back: () => void; notify: (m: string) => void }) {
  const c = classById(classId);
  if (!c) return null;
  const t = teacherById(c.teacher);
  const mats = materials.filter((m) => m.class === c.id);
  function copy() {
    try { navigator.clipboard?.writeText(c!.zoom?.url ?? ''); } catch { /* noop */ }
    notify('Zoom link copied');
  }
  return (
    <div>
      <div className="px-4 pt-[46px] pb-[22px] text-white relative overflow-hidden" style={{ background: 'linear-gradient(150deg, #242832, #15171C)' }}>
        <div className="absolute -top-10 -right-[30px] w-40 h-40 rounded-full" style={{ background: `radial-gradient(circle, ${c.color}66, transparent 70%)` }} />
        <button onClick={back} className="flex items-center gap-1.5 text-white text-[13.5px] font-semibold bg-white/[.12] px-3 py-[7px] rounded-pill relative">
          <Icon name="chevL" size={16} />Back
        </button>
        <div className="relative mt-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-[9px] h-[9px] rounded-[3px]" style={{ background: c.color }} />
            <span className="text-[12.5px] text-p-200 font-semibold">{c.subject}</span>
          </div>
          <h2 className="font-head text-[23px] font-bold leading-[1.15] text-white">{c.name}</h2>
          <div className="flex items-center gap-2.5 mt-3">
            {t && <Avatar name={t.name} short={t.short} color={t.color} size={32} />}
            <div className="text-[13.5px] font-semibold">{t && shortTeacher(t.name)}<span className="text-p-200 font-normal"> · {c.level}</span></div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-[18px] pb-[26px] flex flex-col gap-[22px]">
        <div className={`${card} p-4 flex flex-col gap-[13px]`}>
          <div className="flex items-center gap-[11px]">
            <div className="w-10 h-10 rounded-[11px] bg-[#E5EEFF] text-[#2A6298] flex items-center justify-center shrink-0"><Icon name="video" size={21} /></div>
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-bold text-ink-900">Online class · Zoom</div>
              <div className="text-xs text-ink-400">Meeting ID {c.zoom?.id}</div>
            </div>
            <span className="flex items-center gap-1.5 text-[11.5px] text-success font-bold"><span className="w-[7px] h-[7px] rounded-full bg-success" />Active</span>
          </div>
          <Button className="py-3" onClick={() => notify('Opening Zoom: ' + c.name)}><Icon name="video" size={17} />Join Zoom meeting</Button>
          <div className="flex items-center gap-2 px-3 py-2.5 bg-surface-3 rounded-sm">
            <Icon name="link" size={15} className="text-ink-400 shrink-0" />
            <span className="text-[12.5px] text-ink-600 flex-1 truncate">{(c.zoom?.url ?? '').replace('https://', '')}</span>
            <button onClick={copy} className="text-[12.5px] font-bold text-a-700 shrink-0">Copy</button>
          </div>
          <div className="text-[12.5px] text-ink-500">Passcode <b className="text-ink-800">{c.zoom?.pass}</b></div>
        </div>

        <section>
          <h3 className="font-head text-[15px] font-bold text-ink-900 mb-3">Materials ({mats.length})</h3>
          <div className={`${card} p-[6px_4px]`}>
            {mats.map((m, i) => (
              <div key={m.id} className={`flex items-center gap-3 px-[13px] py-[11px] ${i ? 'border-t border-line-soft' : ''}`}>
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] font-semibold text-ink-900 truncate">{m.title}</div>
                  <div className="text-[11.5px] text-ink-400">{m.size} · {m.date}</div>
                </div>
                <Button variant="ghost" size="sm" iconOnly onClick={() => notify('Downloading ' + m.title)}><Icon name="download" size={15} /></Button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function StuSimplePage({ title, back, children }: { title: string; back: () => void; children: React.ReactNode }) {
  return (
    <div>
      <div className="px-4 pt-[46px] pb-[18px] bg-surface border-b border-line">
        <button onClick={back} className="flex items-center gap-1.5 text-ink-500 text-[13.5px] font-semibold mb-2"><Icon name="chevL" size={16} />Back</button>
        <h2 className="font-head text-[20px] font-bold text-ink-900">{title}</h2>
      </div>
      <div className="px-4 pt-4 pb-[26px] flex flex-col gap-3">{children}</div>
    </div>
  );
}

/** Student mobile portal: bottom-tab navigation (home/courses/homework/profile) + sub-pages. */
export function StudentApp() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('home');
  const [page, setPage] = useState<Page>(null);
  const [toast, setToast] = useState<string | null>(null);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };
  const open = (id: string) => setPage({ kind: 'class', id });
  const openPage = (p: Page) => setPage(p);
  const goTab = (t: Tab) => { setPage(null); setTab(t); };
  const back = () => setPage(null);
  const onSignOut = () => navigate('/login');

  const TABS: [Tab, string, IconName][] = [['home', 'Home', 'home'], ['courses', 'Courses', 'classes'], ['homework', 'Homework', 'materials'], ['profile', 'Profile', 'user']];

  let body: React.ReactNode;
  if (page?.kind === 'class') body = <StuClassDetail classId={page.id} back={back} notify={notify} />;
  else if (page?.kind === 'results') body = (
    <StuSimplePage title="Results" back={back}>
      {results.map((r) => {
        const c = classById(r.class);
        return (
          <div key={r.class} className={`${card} p-4`}>
            <div className="flex items-center justify-between"><span className="text-sm font-semibold text-ink-900">{c?.name}</span><span className="font-head font-bold text-a-700">{r.overall}</span></div>
            <div className="text-xs text-ink-500 mt-1">{r.items.map(([k, v]) => `${k}: ${v}`).join(' · ')}</div>
          </div>
        );
      })}
    </StuSimplePage>
  );
  else if (page?.kind === 'payments') body = (
    <StuSimplePage title="Payments" back={back}>
      {payments.map((p) => (
        <div key={p.id} className={`${card} p-4 flex items-center gap-3`}>
          <div className="flex-1 min-w-0"><div className="text-sm font-semibold text-ink-900 truncate">{p.item}</div><div className="text-xs text-ink-500">{p.id} · {p.date}</div></div>
          <span className="font-head font-bold text-ink-800">${p.amount}</span>
          <span className={`text-[11.5px] font-semibold px-2 py-0.5 rounded-pill ${p.status === 'paid' ? 'bg-success-bg text-success' : 'bg-warn-bg text-warn'}`}>{p.status}</span>
        </div>
      ))}
    </StuSimplePage>
  );
  else if (tab === 'home') body = <StuHome open={open} openPage={openPage} goTab={goTab} />;
  else if (tab === 'courses') body = <StuCourses open={open} />;
  else if (tab === 'homework') body = <StuHomework notify={notify} />;
  else body = <StuProfile open={open} openPage={openPage} notify={notify} onSignOut={onSignOut} />;

  return (
    <div className="h-full flex justify-center bg-p-900">
      <div className="w-full max-w-[420px] h-full flex flex-col bg-bg font-body relative overflow-hidden">
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">{body}</div>

        {toast && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[96px] z-[60] bg-ink-900 text-white text-[13px] font-semibold px-4 py-2.5 rounded-pill shadow-sh-pop flex items-center gap-2 max-w-[88%]">
            <span className="text-a-400 flex"><Icon name="check" size={16} /></span>
            {toast}
          </div>
        )}

        <nav className="shrink-0 flex bg-surface border-t border-line px-2 pt-2 pb-[26px] relative z-30">
          {TABS.map(([id, label, icon]) => {
            const on = !page && tab === id;
            return (
              <button key={id} onClick={() => goTab(id)} className={`flex-1 flex flex-col items-center gap-1 py-1.5 ${on ? 'text-a-700' : 'text-ink-400'}`}>
                <Icon name={icon} size={23} stroke={on ? 2 : 1.7} />
                <span className="text-[11px] font-semibold">{label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default StudentApp;
