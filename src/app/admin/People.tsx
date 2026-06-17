import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { teachers, students } from '../../data/edunex';

const card = 'bg-surface border border-line rounded-lg shadow-sh-card';

/** Teachers or students list, depending on `kind`. Students open a detail route. */
export function People({ kind }: { kind: 'teachers' | 'students' }) {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const isTeachers = kind === 'teachers';
  const all = isTeachers ? teachers : students;
  const rows = q ? all.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())) : all;

  return (
    <div className="flex flex-col gap-[18px] max-w-[1100px]">
      <div className="flex items-center gap-3 flex-wrap">
        <div>
          <h1 className="font-head text-[23px] font-bold text-ink-900 capitalize">{kind}</h1>
          <p className="text-sm text-ink-500 mt-1">{all.length} {isTeachers ? 'coaches on the team' : 'learners enrolled'}.</p>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2 bg-surface border border-line rounded-sm px-3 h-[38px] w-[220px]">
          <Icon name="search" size={16} className="text-ink-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${kind}…`} className="border-none bg-transparent flex-1 outline-none text-[13.5px]" />
        </div>
      </div>

      <div className={`${card} overflow-hidden divide-y divide-line-soft`}>
        {rows.map((p) => (
          <div
            key={p.id}
            onClick={isTeachers ? undefined : () => navigate(`/admin/students/${p.id}`)}
            className={`flex items-center gap-3 px-5 py-3 ${isTeachers ? '' : 'cursor-pointer hover:bg-surface-2'}`}
          >
            <Avatar name={p.name} short={p.short} color={p.color} size={38} />
            <div className="flex-1 min-w-0">
              <div className="text-[14.5px] font-semibold text-ink-900 truncate">{p.name}</div>
              <div className="text-xs text-ink-500 truncate">{'subject' in p ? p.subject : p.year}</div>
            </div>
            {'email' in p && <span className="text-[12.5px] text-ink-500 mr-1 max-[640px]:hidden">{p.email}</span>}
            {!isTeachers && (
              <Button variant="ghost" size="sm" iconOnly>
                <Icon name="chevR" size={16} />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default People;
