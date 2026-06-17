import { useState } from 'react';
import { Icon } from '../../components/Icon';
import { FileIcon } from '../../components/FileIcon';
import { Button } from '../../components/Button';
import { useNotify } from '../useToasts';
import { materials, classById } from '../../data/edunex';

const card = 'bg-surface border border-line rounded-lg shadow-sh-card';

/** Materials library: searchable list of all attachments across classes. */
export function Materials() {
  const notify = useNotify();
  const [q, setQ] = useState('');
  const rows = q ? materials.filter((m) => m.title.toLowerCase().includes(q.toLowerCase())) : materials;

  return (
    <div className="flex flex-col gap-[18px] max-w-[1180px]">
      <div className="flex items-center gap-3 flex-wrap">
        <div>
          <h1 className="font-head text-[23px] font-bold text-ink-900">Materials</h1>
          <p className="text-sm text-ink-500 mt-1">{materials.length} resources shared across all programs.</p>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2 bg-surface border border-line rounded-sm px-3 h-[38px] w-[220px]">
          <Icon name="search" size={16} className="text-ink-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search materials…" className="border-none bg-transparent flex-1 outline-none text-[13.5px]" />
        </div>
        <Button size="sm" onClick={() => notify('Upload material dialog opened', 'upload')}>
          <Icon name="upload" size={16} />Upload
        </Button>
      </div>

      <div className={`${card} overflow-hidden divide-y divide-line-soft`}>
        {rows.map((m) => {
          const c = classById(m.class);
          return (
            <div key={m.id} className="flex items-center gap-3 px-5 py-3">
              <FileIcon type={m.type} size={40} />
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold text-ink-900 truncate">{m.title}</div>
                <div className="text-xs text-ink-500">{c?.name} · {m.session} · {m.size} · {m.date}</div>
              </div>
              <span className="text-[11.5px] text-ink-400 mr-1 max-[640px]:hidden">{m.to === 'class' ? 'Whole class' : m.to}</span>
              <Button variant="ghost" size="sm" iconOnly onClick={() => notify('Downloading ' + m.title, 'download')}>
                <Icon name="download" size={16} />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Materials;
