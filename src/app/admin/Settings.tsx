import { useState } from 'react';
import { Toggle } from '../../components/Toggle';
import { useNotify } from '../useToasts';
import { templates } from '../../data/edunex';

const card = 'bg-surface border border-line rounded-lg shadow-sh-card';

/** Admin settings: Zalo/notification message templates with on/off toggles. */
export function Settings() {
  const notify = useNotify();
  const [state, setState] = useState<Record<string, boolean>>(
    Object.fromEntries(templates.map((t) => [t.id, t.on])),
  );

  const toggle = (id: string, name: string) => {
    setState((s) => {
      const next = { ...s, [id]: !s[id] };
      notify(`${name} ${next[id] ? 'enabled' : 'disabled'}`, 'check');
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-[18px] max-w-[760px]">
      <div>
        <h1 className="font-head text-[23px] font-bold text-ink-900">Settings</h1>
        <p className="text-sm text-ink-500 mt-1">Automated message templates sent to students.</p>
      </div>

      <div className={`${card} overflow-hidden divide-y divide-line-soft`}>
        {templates.map((t) => (
          <div key={t.id} className="flex items-start gap-4 px-5 py-4">
            <div className="flex-1 min-w-0">
              <div className="text-[14.5px] font-semibold text-ink-900">{t.name}</div>
              <div className="text-[12.5px] text-ink-500 mt-1 leading-relaxed">{t.preview}</div>
            </div>
            <Toggle on={state[t.id]} onChange={() => toggle(t.id, t.name)} size={24} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Settings;
