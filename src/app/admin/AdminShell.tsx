import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/Logo';
import { Icon } from '../../components/Icon';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { ToastProvider, useNotify } from '../useToasts';
import { ADMIN_NAV, ADMIN_TITLES } from './admin-nav';

/** First path segment after /admin (e.g. "classes" from /admin/classes/c1). */
function useActiveSegment(): string {
  const { pathname } = useLocation();
  const seg = pathname.replace(/^\/admin\/?/, '').split('/')[0];
  return seg || 'dashboard';
}

function Sidebar() {
  const navigate = useNavigate();
  const notify = useNotify();
  const active = useActiveSegment();

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    [
      'flex items-center gap-[11px] px-3 py-2.5 rounded-sm font-head font-semibold text-sm cursor-pointer transition-colors',
      isActive ? 'bg-white/[.14] text-white' : 'text-p-100 hover:bg-white/[.08] hover:text-white',
    ].join(' ');

  return (
    <aside
      className="w-[250px] shrink-0 flex flex-col p-[20px_14px] gap-1.5"
      style={{ background: 'linear-gradient(180deg, #1C1F26, #15171C)' }}
    >
      <div className="px-2 pt-1 pb-3.5">
        <Logo size={32} light textSize={20} />
      </div>

      <Button className="justify-start mx-0.5 mb-2 px-3 py-2.5" onClick={() => notify('New class form opened', 'plus')}>
        <Icon name="plus" size={18} /> New class
      </Button>

      <div className="flex-1 overflow-y-auto flex flex-col gap-1">
        {ADMIN_NAV.map((grp) => (
          <div key={grp.group} className="mb-1.5">
            <div className="text-[10.5px] font-bold tracking-[.12em] uppercase text-p-300 px-3 pt-2 pb-1.5 opacity-80">
              {grp.group}
            </div>
            {grp.items.map((it) => (
              <NavLink key={it.id} to={it.id} className={navItemClass}>
                <Icon name={it.icon} size={19} />
                {it.label}
              </NavLink>
            ))}
          </div>
        ))}
      </div>

      <NavLink to="settings" className={navItemClass}>
        <Icon name="settings" size={19} /> Settings
      </NavLink>
      <div className="flex items-center gap-2.5 px-2 pt-2.5 pb-1 border-t border-white/10 mt-1">
        <Avatar name="Vũ Lan Phương" short="LP" color="#F2B400" size={34} />
        <div className="flex-1 min-w-0">
          <div className="text-white text-[13.5px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">Vũ Lan Phương</div>
          <div className="text-p-300 text-[11.5px]">EduNex admin</div>
        </div>
        <button
          type="button"
          onClick={() => navigate('/login')}
          aria-label="Sign out"
          className="text-p-200 p-1.5 rounded-[7px] hover:text-white"
        >
          <Icon name="logout" size={17} />
        </button>
      </div>
      {/* active segment retained for potential aria use */}
      <span className="sr-only">{active}</span>
    </aside>
  );
}

function Topbar() {
  const notify = useNotify();
  const active = useActiveSegment();
  const title = ADMIN_TITLES[active] ?? 'Dashboard';
  return (
    <header className="h-16 shrink-0 bg-surface border-b border-line flex items-center px-[26px] gap-4">
      <h2 className="font-head text-[19px] font-bold text-ink-900">{title}</h2>
      <div className="flex-1" />
      <div className="flex items-center gap-2 bg-surface-3 rounded-sm px-3 h-[38px] w-60">
        <Icon name="search" size={17} className="text-ink-400" />
        <input
          placeholder="Search classes, students…"
          className="border-none bg-transparent text-[13.5px] flex-1 outline-none text-ink-700"
        />
      </div>
      <Button variant="ghost" iconOnly className="relative" onClick={() => notify('3 new notifications', 'bell')}>
        <Icon name="bell" size={19} />
        <span className="absolute top-[7px] right-2 w-[7px] h-[7px] rounded-full bg-danger border-[1.5px] border-white" />
      </Button>
    </header>
  );
}

/** Admin desktop shell: sidebar + topbar + routed outlet, wrapped in a toast provider. */
export function AdminShell() {
  return (
    <ToastProvider>
      <div className="h-full flex bg-bg overflow-hidden font-body relative">
        <Sidebar />
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          <Topbar />
          <main className="flex-1 min-h-0 overflow-y-auto px-7 pt-[26px] pb-10">
            <Outlet />
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}

export default AdminShell;
