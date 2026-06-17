import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { StatusBadge } from '../../components/StatusBadge';
import { FileIcon } from '../../components/FileIcon';
import { ZoomPanel } from '../../components/ZoomPanel';
import { useNotify } from '../useToasts';
import { to12 } from '../../lib/time';
import { classById, teacherById, studentById, materials, DAYS } from '../../data/edunex';

const card = 'bg-surface border border-line rounded-lg shadow-sh-card';

/** Admin class detail: header, Zoom panel, roster / materials tabs. */
export function ClassDetail() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const notify = useNotify();
  const [tab, setTab] = useState<'roster' | 'materials'>('roster');

  const c = classId ? classById(classId) : undefined;
  if (!c) {
    return (
      <div className="max-w-[1100px]">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/classes')}>
          <Icon name="chevL" size={16} />Back to classes
        </Button>
        <p className="text-ink-500 mt-4">Class not found.</p>
      </div>
    );
  }

  const t = teacherById(c.teacher);
  const roster = (c.roster ?? []).map((id) => studentById(id)).filter(Boolean);
  const mats = materials.filter((m) => m.class === c.id);

  const info = [
    { icon: 'teachers' as const, label: 'Teacher', value: t?.name.replace('Thầy ', '').replace('Cô ', '').replace('Ms. ', '') ?? '' },
    { icon: 'calendar' as const, label: 'Schedule', value: c.schedule.map((s) => DAYS[s.d] + ' ' + to12(s.s)).join(' · ') },
    { icon: 'pin' as const, label: 'Room', value: c.room },
    { icon: 'students' as const, label: 'Students', value: c.students + ' enrolled' },
  ];

  return (
    <div className="flex flex-col gap-5 max-w-[1100px]">
      <button onClick={() => navigate('/admin/classes')} className="flex items-center gap-1.5 text-ink-500 text-[13.5px] font-semibold w-fit">
        <Icon name="chevL" size={16} />Back to classes
      </button>

      <div className={`${card} p-0 overflow-hidden`}>
        <div className="h-1.5" style={{ background: c.color }} />
        <div className="p-[22px_24px] flex items-start gap-5 flex-wrap">
          <div className="flex-1 min-w-[240px]">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-head text-[25px] font-bold text-ink-900">{c.name}</h1>
              <StatusBadge status={c.status} />
            </div>
            <p className="text-sm text-ink-500">{c.subject} · {c.level} · since Term 1, 2026</p>
            <div className="grid grid-cols-[repeat(4,auto)] gap-x-[34px] gap-y-3.5 mt-[18px] w-fit max-[640px]:grid-cols-2">
              {info.map((x) => (
                <div key={x.label}>
                  <div className="flex items-center gap-1.5 text-ink-400 text-xs font-semibold uppercase tracking-[.05em]">
                    <Icon name={x.icon} size={14} />{x.label}
                  </div>
                  <div className="text-[14.5px] font-semibold text-ink-800 mt-[5px]">{x.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[250px] max-[640px]:w-full">
            <ZoomPanel c={c} notify={notify} />
          </div>
        </div>
      </div>

      <div className={`${card} overflow-hidden`}>
        <div className="flex gap-1 p-3 border-b border-line">
          {(['roster', 'materials'] as const).map((tk) => (
            <button
              key={tk}
              type="button"
              onClick={() => setTab(tk)}
              className={[
                'px-3.5 py-2 rounded-sm font-head font-semibold text-[13.5px] capitalize',
                tab === tk ? 'bg-a-50 text-a-700' : 'text-ink-500 hover:bg-surface-2',
              ].join(' ')}
            >
              {tk === 'roster' ? `Roster (${roster.length})` : `Materials (${mats.length})`}
            </button>
          ))}
        </div>

        {tab === 'roster' ? (
          <div className="divide-y divide-line-soft">
            {roster.map((s) => (
              <div key={s!.id} className="flex items-center gap-3 px-5 py-3">
                <Avatar name={s!.name} short={s!.short} color={s!.color} size={34} />
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-semibold text-ink-900 truncate">{s!.name}</div>
                  <div className="text-xs text-ink-500">{s!.year}</div>
                </div>
                <Button variant="ghost" size="sm" iconOnly onClick={() => navigate(`/admin/students/${s!.id}`)}>
                  <Icon name="chevR" size={16} />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-line-soft">
            {mats.map((m) => (
              <div key={m.id} className="flex items-center gap-3 px-5 py-3">
                <FileIcon type={m.type} size={38} />
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-semibold text-ink-900 truncate">{m.title}</div>
                  <div className="text-xs text-ink-500">{m.session} · {m.size} · {m.date}</div>
                </div>
                <Button variant="ghost" size="sm" iconOnly onClick={() => notify('Downloading ' + m.title, 'download')}>
                  <Icon name="download" size={16} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassDetail;
