import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { LandingButton } from './LandingButton';
import { NAV_LINKS } from './landing-data';

/** Sticky landing nav with blur, desktop links and a mobile hamburger menu. */
export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-l-line-soft">
      <div className="max-w-wrap mx-auto px-7 max-[560px]:px-5">
        <div className="flex items-center gap-5 h-[74px] max-[560px]:h-16">
          <a href="#top" aria-label="EduNex">
            <Logo size={40} textSize={23} />
          </a>
          <nav className="flex items-center gap-1 ml-3.5 max-[980px]:hidden">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-head font-semibold text-[14.5px] text-l-ink-2 px-[13px] py-[9px] rounded-[9px] transition-colors hover:bg-gold-tint hover:text-gold-700"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2.5 max-[980px]:hidden">
            <Link
              to="/login"
              className="font-head font-semibold text-[14.5px] text-l-ink px-3 py-2.5 rounded-[10px] hover:text-gold-700"
            >
              Đăng nhập
            </Link>
            <LandingButton href="#lien-he">Tư vấn miễn phí</LandingButton>
          </div>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="hidden max-[980px]:flex ml-auto w-11 h-11 border border-l-line rounded-[11px] bg-paper items-center justify-center"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22252E" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="hidden max-[980px]:flex flex-col gap-1 px-7 pt-3 pb-[22px] border-b border-l-line-soft bg-cream max-[560px]:px-5">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-head font-semibold text-base text-l-ink px-1.5 py-3 border-b border-l-line-soft"
            >
              {l.label}
            </a>
          ))}
          <div className="flex gap-2.5 mt-3.5">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex-1 inline-flex items-center justify-center font-head font-semibold rounded-[14px] border border-l-line bg-paper text-l-ink px-[22px] py-[13px] text-[15px]"
            >
              Đăng nhập
            </Link>
            <LandingButton href="#lien-he" className="flex-1" onClick={() => setOpen(false)}>
              Tư vấn miễn phí
            </LandingButton>
          </div>
        </div>
      )}
    </header>
  );
}

export default Nav;
