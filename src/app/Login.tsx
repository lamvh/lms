import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Icon } from '../components/Icon';
import { Field } from '../components/Field';
import { Button } from '../components/Button';
import { stats } from '../data/edunex';

type Role = 'admin' | 'coach' | 'student';

const ROLE_META: Record<Role, { email: string; label: string; home: string }> = {
  admin: { email: 'team@edunex.co.nz', label: 'Administrator', home: '/admin' },
  coach: { email: 'jane@edunex.co.nz', label: 'Coach', home: '/teacher' },
  student: { email: 'my.nguyen@edunex.co.nz', label: 'Student', home: '/student' },
};

/** Two-panel login with a role picker. Each role routes to its own home. */
export function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('admin');
  const [email, setEmail] = useState(ROLE_META.admin.email);

  function pick(r: Role) {
    setRole(r);
    setEmail(ROLE_META[r].email);
  }

  return (
    <div className="w-full h-full flex bg-surface font-body overflow-hidden">
      {/* Brand panel */}
      <div
        className="flex-1 min-w-0 relative overflow-hidden flex flex-col justify-between px-12 py-[46px] text-white max-[860px]:hidden"
        style={{ background: 'linear-gradient(160deg, #242832 0%, #15171C 100%)' }}
      >
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,.10) 1px, transparent 0)', backgroundSize: '22px 22px' }} />
        <div className="absolute -top-[90px] -right-[70px] w-[340px] h-[340px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(242,180,0,.34), transparent 70%)' }} />

        <div className="relative">
          <Logo size={40} light textSize={24} />
        </div>

        <div className="relative max-w-[430px]">
          <div className="inline-flex items-center gap-[7px] px-3 py-[5px] rounded-pill bg-a-500/[.16] text-a-400 text-[12.5px] font-bold tracking-[.02em] mb-[18px]">
            <Icon name="sparkle" size={14} /> Learn More · Achieve More · Be Unstoppable
          </div>
          <h1 className="font-head text-white text-[37px] font-bold leading-[1.13] tracking-[-.02em]">
            Every lesson, coach and milestone, all in one place.
          </h1>
          <p className="text-p-200 text-base leading-[1.6] mt-[18px]">
            From Confident English to a job offer in New Zealand. EduNex keeps your learning organised for students, coaches and the team alike.
          </p>
          <div className="flex gap-[26px] mt-[34px]">
            {([[stats.classes, 'Programs'], [stats.students, 'Students'], [stats.teachers, 'Coaches']] as const).map(([n, l]) => (
              <div key={l}>
                <div className="font-head text-[28px] font-bold">{n}</div>
                <div className="text-p-200 text-[13px] mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-p-300 text-[13px]">EduNex · English &amp; Career Coaching · New Zealand</div>
      </div>

      {/* Form panel */}
      <div className="flex-1 min-w-0 flex items-center justify-center px-8 py-10">
        <div className="w-full max-w-[380px]">
          <h2 className="font-head text-[26px] font-bold text-ink-900">Welcome back</h2>
          <p className="text-[14.5px] text-ink-500 mt-[7px]">Sign in to your EduNex account.</p>

          <div className="mt-[26px] flex flex-col gap-4">
            <div>
              <label className="text-[13px] font-semibold text-ink-700 block mb-[7px]">Email address</label>
              <Field value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <div className="flex justify-between mb-[7px]">
                <label className="text-[13px] font-semibold text-ink-700">Password</label>
                <a className="text-[13px] font-semibold text-a-700 cursor-pointer">Forgot?</a>
              </div>
              <Field type="password" defaultValue="edunex123" />
            </div>

            <div>
              <div className="text-[12.5px] font-semibold text-ink-400 mb-2 uppercase tracking-[.06em]">Preview the prototype as</div>
              <div className="grid grid-cols-3 gap-2">
                {(['admin', 'coach', 'student'] as Role[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => pick(r)}
                    className={[
                      'px-1.5 py-[9px] rounded-sm font-head font-semibold text-[13px] capitalize border transition-all',
                      role === r ? 'border-a-600 bg-a-50 text-a-700' : 'border-line bg-surface text-ink-600',
                    ].join(' ')}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <Button className="py-[13px] text-[15px] mt-1" onClick={() => navigate(ROLE_META[role].home)}>
              Sign in as {ROLE_META[role].label}
              <Icon name="arrowR" size={18} />
            </Button>
          </div>

          <p className="text-[12.5px] text-ink-400 mt-[22px] text-center leading-[1.6]">
            Works on any device: phone, tablet or computer.
            <br />
            Need access? Ask the EduNex team.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
