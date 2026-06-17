/* Vina NZ — logo mark + login screen */

function Logo({ size = 34, light = false, showText = true, textSize }) {
  const ts = textSize || size * 0.52;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:size*0.32 }}>
      <div style={{
        width:size, height:size, borderRadius:size*0.29,
        background: light ? '#fff' : 'linear-gradient(145deg, var(--p-600), var(--p-800))',
        display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
        boxShadow:'0 2px 8px rgba(16,40,64,.25)',
      }}>
        <svg width={size*0.62} height={size*0.62} viewBox="0 0 24 24" fill="none"
          stroke={light ? 'var(--p-700)' : '#fff'} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4 21.5 8 12 12 2.5 8z" />
          <path d="M6.5 10v3.2c0 1.5 2.5 2.8 5.5 2.8s5.5-1.3 5.5-2.8V10" />
          <path d="M21.5 8v4.2" />
        </svg>
      </div>
      {showText && (
        <span style={{ fontFamily:'var(--font-head)', fontWeight:800, fontSize:ts,
          letterSpacing:'-0.02em', color: light ? '#fff' : 'var(--ink-900)', lineHeight:1 }}>
          Vina<span style={{ color: light ? 'var(--a-400)' : 'var(--accent)' }}> NZ</span>
        </span>
      )}
    </div>
  );
}

function LoginScreen({ onSignIn }) {
  const [role, setRole] = React.useState('admin');
  const [email, setEmail] = React.useState('admin@vinanz.school');
  const roleMeta = {
    admin:   { email:'admin@vinanz.school',     label:'Administrator' },
    teacher: { email:'ha.nguyen@vinanz.school', label:'Teacher' },
    student: { email:'bao.tran@vinanz.school',  label:'Student' },
  };
  function pick(r){ setRole(r); setEmail(roleMeta[r].email); }

  return (
    <div className="app-scope" style={{
      width:'100%', height:'100%', display:'flex', background:'var(--surface)',
      fontFamily:'var(--font-body)', overflow:'hidden',
    }}>
      {/* Brand panel */}
      <div style={{
        flex:'1 1 50%', minWidth:0, position:'relative', overflow:'hidden',
        background:'linear-gradient(160deg, var(--p-700) 0%, var(--p-900) 100%)',
        display:'flex', flexDirection:'column', justifyContent:'space-between',
        padding:'46px 48px', color:'#fff',
      }} className="login-brand">
        <div style={{ position:'absolute', inset:0, opacity:.5,
          backgroundImage:'radial-gradient(circle at 1px 1px, rgba(255,255,255,.10) 1px, transparent 0)',
          backgroundSize:'22px 22px' }}></div>
        <div style={{ position:'absolute', top:-80, right:-80, width:320, height:320, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(46,163,122,.30), transparent 70%)' }}></div>

        <div style={{ position:'relative' }}><Logo size={40} light textSize={24} /></div>

        <div style={{ position:'relative', maxWidth:420 }}>
          <h1 style={{ color:'#fff', fontSize:38, fontWeight:700, lineHeight:1.12, letterSpacing:'-0.02em' }}>
            One place for every class, schedule&nbsp;and lesson.
          </h1>
          <p style={{ color:'var(--p-200)', fontSize:16, lineHeight:1.6, marginTop:18 }}>
            No more scattered Zalo groups and timetable files. Vina NZ keeps your
            centre organised — for staff, teachers and students alike.
          </p>
          <div style={{ display:'flex', gap:26, marginTop:34 }}>
            {[['10','Active classes'],['79','Students'],['5','Teachers']].map(([n,l])=>(
              <div key={l}>
                <div style={{ fontFamily:'var(--font-head)', fontSize:28, fontWeight:700 }}>{n}</div>
                <div style={{ color:'var(--p-200)', fontSize:13, marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position:'relative', color:'var(--p-300)', fontSize:13 }}>
          Vina NZ Tutoring Centre · Auckland, New Zealand
        </div>
      </div>

      {/* Form panel */}
      <div style={{ flex:'1 1 50%', minWidth:0, display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 32px' }}>
        <div style={{ width:'100%', maxWidth:380 }}>
          <div className="login-form-logo" style={{ display:'none', marginBottom:28 }}><Logo size={36} /></div>
          <h2 style={{ fontSize:26, fontWeight:700 }}>Welcome back</h2>
          <p style={{ fontSize:14.5, color:'var(--ink-500)', marginTop:7 }}>Sign in to your Vina NZ account.</p>

          <div style={{ marginTop:26, display:'flex', flexDirection:'column', gap:16 }}>
            <div>
              <label style={{ fontSize:13, fontWeight:600, color:'var(--ink-700)', display:'block', marginBottom:7 }}>Email address</label>
              <input className="field" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:7 }}>
                <label style={{ fontSize:13, fontWeight:600, color:'var(--ink-700)' }}>Password</label>
                <a style={{ fontSize:13, fontWeight:600, color:'var(--brand)' }}>Forgot?</a>
              </div>
              <input className="field" type="password" defaultValue="vinanz123" />
            </div>

            <div>
              <div style={{ fontSize:12.5, fontWeight:600, color:'var(--ink-400)', marginBottom:8, textTransform:'uppercase', letterSpacing:'.06em' }}>Preview the prototype as</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
                {['admin','teacher','student'].map(r=>(
                  <button key={r} onClick={()=>pick(r)} style={{
                    padding:'9px 6px', borderRadius:'var(--r-sm)', fontFamily:'var(--font-head)',
                    fontWeight:600, fontSize:13, textTransform:'capitalize',
                    border:'1px solid '+(role===r?'var(--brand)':'var(--line)'),
                    background: role===r?'var(--p-50)':'var(--surface)',
                    color: role===r?'var(--brand)':'var(--ink-600)', transition:'all .15s',
                  }}>{r}</button>
                ))}
              </div>
            </div>

            <button className="btn btn-primary" style={{ padding:'13px', fontSize:15, marginTop:4 }}
              onClick={()=>onSignIn(role)}>
              Sign in as {roleMeta[role].label}
              <Icon name="arrowR" size={18} />
            </button>
          </div>

          <p style={{ fontSize:12.5, color:'var(--ink-400)', marginTop:22, textAlign:'center', lineHeight:1.6 }}>
            Works on any device — phone, tablet or computer.<br/>Need access? Ask your centre administrator.
          </p>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Logo, LoginScreen });
