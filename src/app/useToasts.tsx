import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { Icon, type IconName } from '../components/Icon';

export interface Toast {
  id: string;
  msg: string;
  icon: IconName;
}

export type Notify = (msg: string, icon?: IconName) => void;

const ToastCtx = createContext<Notify>(() => {});

/** Access the `notify(msg, icon)` function from any screen under ToastProvider. */
export function useNotify(): Notify {
  return useContext(ToastCtx);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback<Notify>((msg, icon = 'check') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, msg, icon }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  return (
    <ToastCtx.Provider value={notify}>
      {children}
      <div className="absolute bottom-[22px] left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2.5 items-center pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="rise flex items-center gap-2.5 bg-ink-900 text-white px-4 py-[11px] rounded-pill shadow-sh-pop text-[13.5px] font-medium"
          >
            <span className="flex text-a-400">
              <Icon name={t.icon} size={17} />
            </span>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
