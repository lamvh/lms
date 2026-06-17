import { useState } from 'react';
import { Icon } from './Icon';
import { Button } from './Button';
import { Field } from './Field';
import { Modal } from './Modal';
import type { ClassItem } from '../types/edunex';

export interface ZoomPanelProps {
  c: ClassItem;
  notify: (msg: string, icon?: string) => void;
}

/** Per-class Zoom management: editable meeting URL + passcode with copy-to-clipboard. */
export function ZoomPanel({ c, notify }: ZoomPanelProps) {
  const zoom = c.zoom;
  const [url, setUrl] = useState(zoom?.url ?? '');
  const [pass, setPass] = useState(zoom?.pass ?? '');
  const [open, setOpen] = useState(false);
  const [draftUrl, setDraftUrl] = useState(url);
  const [draftPass, setDraftPass] = useState(pass);

  function copy() {
    try {
      navigator.clipboard?.writeText(url);
    } catch {
      /* clipboard may be unavailable */
    }
    notify('Zoom link copied', 'link');
  }
  function openEdit() {
    setDraftUrl(url);
    setDraftPass(pass);
    setOpen(true);
  }
  function save() {
    setUrl(draftUrl);
    setPass(draftPass);
    setOpen(false);
    notify('Zoom link updated', 'check');
  }

  return (
    <div className="bg-surface border border-line rounded-lg shadow-sh-card px-4 py-[15px] flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-md flex items-center justify-center shrink-0 bg-[#E5EEFF] text-[#2A6298]">
          <Icon name="video" size={19} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-ink-900">Zoom meeting</div>
          <div className="text-[11.5px] text-ink-400">Meeting ID {zoom?.id}</div>
        </div>
        <Button variant="ghost" size="sm" iconOnly onClick={openEdit} aria-label="Edit link">
          <Icon name="edit" size={15} />
        </Button>
      </div>

      <Button size="sm" onClick={() => notify('Starting Zoom meeting: ' + c.name, 'video')}>
        <Icon name="video" size={16} />
        Start meeting
      </Button>

      <div className="flex items-center gap-2 px-[11px] py-[9px] bg-surface-3 rounded-sm">
        <Icon name="link" size={15} className="text-ink-400 shrink-0" />
        <span className="text-[12.5px] text-ink-600 flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
          {url.replace('https://', '')}
        </span>
        <button type="button" onClick={copy} className="text-xs font-bold text-a-700 shrink-0">
          Copy
        </button>
      </div>

      <div className="flex items-center justify-between text-xs text-ink-500">
        <span>
          Passcode <b className="text-ink-700">{pass}</b>
        </span>
        <span className="flex items-center gap-[5px] text-success font-semibold">
          <span className="w-[7px] h-[7px] rounded-full bg-success" />
          Link active
        </span>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} width={460} title="Edit Zoom link" sub={c.name}>
        <div className="flex flex-col gap-3.5">
          <div>
            <label className="text-[13px] font-semibold text-ink-700 block mb-[7px]">Meeting link</label>
            <Field value={draftUrl} onChange={(e) => setDraftUrl(e.target.value)} placeholder="https://zoom.us/j/…" />
          </div>
          <div>
            <label className="text-[13px] font-semibold text-ink-700 block mb-[7px]">Passcode</label>
            <Field value={draftPass} onChange={(e) => setDraftPass(e.target.value)} />
          </div>
          <div className="flex gap-2.5 mt-1">
            <Button variant="ghost" className="flex-1" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={save}>
              <Icon name="check" size={16} />
              Save link
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ZoomPanel;
