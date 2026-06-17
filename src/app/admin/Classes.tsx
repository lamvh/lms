import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { Button } from '../../components/Button';
import { ClassCard } from '../../components/ClassCard';
import { useNotify } from '../useToasts';
import { classes } from '../../data/edunex';
import type { ClassStatus } from '../../types/edunex';

const FILTERS: [string, string][] = [
  ['all', 'All programs'],
  ['active', 'Active'],
  ['soon', 'Starting soon'],
  ['paused', 'Paused'],
];

/** Admin class list: search, status filter chips, ClassCard grid. */
export function Classes() {
  const navigate = useNavigate();
  const notify = useNotify();
  const [tab, setTab] = useState<'all' | ClassStatus>('all');
  const [q, setQ] = useState('');

  const openClass = (id: string) => navigate(`/admin/classes/${id}`);
  const count = (v: string) => (v === 'all' ? classes.length : classes.filter((c) => c.status === v).length);

  let rows = classes;
  if (tab !== 'all') rows = rows.filter((c) => c.status === tab);
  if (q) rows = rows.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="flex flex-col gap-[18px] max-w-[1180px]">
      <div className="flex items-center gap-3 flex-wrap">
        <div>
          <h1 className="font-head text-[23px] font-bold text-ink-900">Classes</h1>
          <p className="text-sm text-ink-500 mt-1">All {classes.length} programs in one place. Filter, open and export.</p>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2 bg-surface border border-line rounded-sm px-3 h-[38px] w-[220px]">
          <Icon name="search" size={16} className="text-ink-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search programs…" className="border-none bg-transparent flex-1 outline-none text-[13.5px]" />
        </div>
        <Button size="sm" onClick={() => notify('New class form opened', 'plus')}>
          <Icon name="plus" size={16} />New class
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {FILTERS.map(([v, l]) => (
          <button
            key={v}
            type="button"
            onClick={() => setTab(v as typeof tab)}
            className={[
              'inline-flex items-center gap-1.5 text-[13px] font-semibold px-3 py-1.5 rounded-pill border transition-colors',
              tab === v ? 'bg-brand text-white border-brand' : 'bg-surface text-ink-600 border-line hover:bg-surface-2',
            ].join(' ')}
          >
            {l}
            <span className="opacity-70">{count(v)}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 max-[980px]:grid-cols-2 max-[640px]:grid-cols-1">
        {rows.map((c) => (
          <ClassCard key={c.id} c={c} openClass={openClass} notify={notify} />
        ))}
      </div>
    </div>
  );
}

export default Classes;
