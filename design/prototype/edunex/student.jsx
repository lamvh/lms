/* EduNex — Student mobile portal
   Home · Courses · Homework · Results · Attendance · Payments · Profile */

function studentSessions(stu){
  const out = [];
  stu.classes.forEach(cid=>{ const c=VZ.classById(cid); c.schedule.forEach(s=>out.push({ ...s, class:c })); });
  return out;
}
const firstNameOf = (n)=> n.trim().split(' ').slice(-1)[0];
const shortTeacher = (n)=> n.replace('Thầy ','').replace('Cô ','').replace('Ms. ','');

/* ---------------- STUDENT LOGIN (mobile) ---------------- */
function StudentLogin({ onSignIn }){
  const [email, setEmail] = React.useState('my.nguyen@edunex.co.nz');
  const [show, setShow] = React.useState(false);
  const [remember, setRemember] = React.useState(true);
  const submit = (e)=>{ if(e&&e.preventDefault) e.preventDefault(); onSignIn && onSignIn(); };

  const field = { width:'100%', height:48, border:'1px solid var(--line)', borderRadius:'var(--r-md)',
    background:'var(--surface)', padding:'0 14px 0 42px', fontSize:14.5, fontFamily:'var(--font-body)',
    color:'var(--ink-800)', outline:'none' };
  const iconWrap = { position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--ink-400)', display:'flex' };

  return (
    <div className="app-scope" style={{ height:'100%', display:'flex', flexDirection:'column', background:'var(--surface)',
      fontFamily:'var(--font-body)', overflowY:'auto' }}>
      {/* Hero */}
      <div style={{ background:'linear-gradient(155deg, var(--p-700) 0%, var(--p-900) 100%)', color:'#fff',
        padding:'74px 24px 64px', position:'relative', overflow:'hidden', flexShrink:0 }}>
        <div style={{ position:'absolute', inset:0, opacity:.5,
          backgroundImage:'radial-gradient(circle at 1px 1px, rgba(255,255,255,.10) 1px, transparent 0)', backgroundSize:'20px 20px' }}></div>
        <div style={{ position:'absolute', top:-70, right:-50, width:240, height:240, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(242,180,0,.36), transparent 70%)' }}></div>
        <div style={{ position:'relative' }}>
          <Logo size={36} light textSize={22} />
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 11px', borderRadius:999, whiteSpace:'nowrap',
            background:'rgba(242,180,0,.16)', color:'var(--a-400)', fontSize:11.5, fontWeight:700, marginTop:26 }}>
            <Icon name="sparkle" size={13} /> Student app
          </div>
          <h1 style={{ color:'#fff', fontSize:26, fontWeight:700, lineHeight:1.18, letterSpacing:'-0.02em', marginTop:12 }}>
            Welcome back 👋</h1>
          <p style={{ color:'var(--p-200)', fontSize:14.5, lineHeight:1.55, marginTop:8, maxWidth:280 }}>
            Sign in to see today’s classes, homework and your progress.</p>
        </div>
      </div>

      {/* Form sheet */}
      <form onSubmit={submit} style={{ flex:1, background:'var(--surface)', borderTopLeftRadius:24, borderTopRightRadius:24,
        marginTop:-28, position:'relative', zIndex:2, padding:'26px 22px 30px', display:'flex', flexDirection:'column', gap:15,
        boxShadow:'0 -8px 24px rgba(25,27,32,.06)' }}>
        <div>
          <label style={{ fontSize:12.5, fontWeight:700, color:'var(--ink-600)', display:'block', marginBottom:7 }}>Email or phone</label>
          <div style={{ position:'relative' }}>
            <span style={iconWrap}><Icon name="mail" size={18} /></span>
            <input style={field} value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@edunex.co.nz" />
          </div>
        </div>
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:7 }}>
            <label style={{ fontSize:12.5, fontWeight:700, color:'var(--ink-600)' }}>Password</label>
            <a style={{ fontSize:12.5, fontWeight:700, color:'var(--a-700)' }}>Forgot?</a>
          </div>
          <div style={{ position:'relative' }}>
            <span style={iconWrap}><Icon name="lock" size={18} /></span>
            <input style={{ ...field, paddingRight:46 }} type={show?'text':'password'} defaultValue="edunex123" />
            <button type="button" onClick={()=>setShow(s=>!s)} style={{ position:'absolute', right:8, top:'50%', transform:'translateY(-50%)',
              width:32, height:32, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center',
              color: show?'var(--a-700)':'var(--ink-400)' }}><Icon name="eye" size={18} /></button>
          </div>
        </div>

        <button type="button" onClick={()=>setRemember(r=>!r)} style={{ display:'flex', alignItems:'center', gap:9, width:'fit-content', padding:'2px 0' }}>
          <span style={{ width:20, height:20, borderRadius:6, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center',
            border:'1.5px solid '+(remember?'var(--accent)':'var(--line)'), background: remember?'var(--accent)':'var(--surface)',
            color:'var(--ink-900)' }}>{remember && <Icon name="check" size={13} stroke={3} />}</span>
          <span style={{ fontSize:13, color:'var(--ink-600)', fontWeight:500, whiteSpace:'nowrap' }}>Keep me signed in</span>
        </button>

        <button type="submit" className="btn btn-primary" style={{ padding:'14px', fontSize:15.5, marginTop:4 }}>
          Sign in <Icon name="arrowR" size={18} />
        </button>

        <div style={{ display:'flex', alignItems:'center', gap:12, margin:'4px 0' }}>
          <div style={{ flex:1, height:1, background:'var(--line)' }}></div>
          <span style={{ fontSize:12, color:'var(--ink-400)', fontWeight:600 }}>or</span>
          <div style={{ flex:1, height:1, background:'var(--line)' }}></div>
        </div>

        <button type="button" className="btn btn-ghost" style={{ padding:'13px', fontSize:14.5 }} onClick={()=>onSignIn&&onSignIn()}>
          <Icon name="book" size={18} /> Join with a class code
        </button>

        <p style={{ fontSize:12.5, color:'var(--ink-400)', textAlign:'center', lineHeight:1.6, marginTop:6 }}>
          New to EduNex? Ask your coach for an invite,<br/>or contact the EduNex team.
        </p>
      </form>
    </div>
  );
}

function StudentApp({ onSignOut, initialTab='home', initialPage=null, initialAuthed=true }){
  const [authed, setAuthed] = React.useState(initialAuthed);
  const [tab, setTab] = React.useState(initialTab);
  const [page, setPage] = React.useState(initialPage);
  const [toast, setToast] = React.useState(null);
  const stu = VZ.focusStudent;
  const tRef = React.useRef();
  const notify = React.useCallback((msg)=>{ setToast(msg); clearTimeout(tRef.current); tRef.current=setTimeout(()=>setToast(null),2200); },[]);
  const openClass = (id)=> setPage({ kind:'class', id });
  const openPage = (kind)=> setPage({ kind });
  const goTab = (id)=>{ setPage(null); setTab(id); };

  const TABS = [['home','Home','home'],['courses','Courses','classes'],['homework','Homework','materials'],['profile','Profile','user']];

  if(!authed) return <StudentLogin onSignIn={()=>setAuthed(true)} />;

  let body;
  if(page){
    if(page.kind==='class') body = <StuClassDetail stu={stu} classId={page.id} back={()=>setPage(null)} notify={notify} />;
    else if(page.kind==='attendance') body = <StuAttendance stu={stu} back={()=>setPage(null)} />;
    else if(page.kind==='results') body = <StuResults stu={stu} back={()=>setPage(null)} />;
    else if(page.kind==='payments') body = <StuPayments stu={stu} back={()=>setPage(null)} notify={notify} />;
  } else {
    if(tab==='home') body = <StuHome stu={stu} go={goTab} open={openClass} openPage={openPage} />;
    else if(tab==='courses') body = <StuCourses stu={stu} open={openClass} />;
    else if(tab==='homework') body = <StuHomework stu={stu} notify={notify} />;
    else if(tab==='profile') body = <StuProfile stu={stu} onSignOut={onSignOut} open={openClass} openPage={openPage} notify={notify} />;
  }

  return (
    <div className="app-scope" style={{ height:'100%', display:'flex', flexDirection:'column', background:'var(--bg)', fontFamily:'var(--font-body)', position:'relative' }}>
      <div key={(page&&page.kind+page.id)||tab} style={{ flex:1, minHeight:0, width:'100%', overflowY:'auto', overflowX:'hidden', WebkitOverflowScrolling:'touch' }}>
        {body}
      </div>

      {toast && (
        <div style={{ position:'absolute', left:'50%', bottom:96, transform:'translateX(-50%)', zIndex:60,
          background:'var(--ink-900)', color:'#fff', fontSize:13, fontWeight:600, padding:'10px 16px',
          borderRadius:'var(--r-pill)', boxShadow:'var(--sh-pop)', display:'flex', alignItems:'center', gap:8, maxWidth:'88%' }}>
          <span style={{ color:'var(--a-400)', display:'flex' }}><Icon name="check" size={16} /></span>{toast}
        </div>
      )}

      <div style={{ flexShrink:0, display:'flex', background:'var(--surface)', borderTop:'1px solid var(--line)',
        padding:'8px 8px 26px', position:'relative', zIndex:30 }}>
        {TABS.map(([id,label,icon])=>{
          const on = !page && tab===id;
          return (
            <button key={id} onClick={()=>goTab(id)} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4, padding:'6px 0', color: on?'var(--a-700)':'var(--ink-400)' }}>
              <Icon name={icon} size={23} stroke={on?2:1.7} />
              <span style={{ fontSize:11, fontWeight:600 }}>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StuHeader({ stu, title, sub }){
  return (
    <div style={{ background:'linear-gradient(150deg, var(--p-700), var(--p-900))', padding:'58px 20px 22px', color:'#fff', position:'relative' }}>
      <div style={{ position:'absolute', top:-40, right:-30, width:170, height:170, borderRadius:'50%', background:'radial-gradient(circle, rgba(242,180,0,.32), transparent 70%)' }}></div>
      <div style={{ display:'flex', alignItems:'center', gap:12, position:'relative' }}>
        <Avatar name={stu.name} short={stu.short} color={stu.color} size={44} style={{ boxShadow:'0 0 0 2px rgba(255,255,255,.3)' }} />
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, color:'var(--p-200)' }}>{sub}</div>
          <div style={{ fontSize:19, fontWeight:700, fontFamily:'var(--font-head)', color:'#fff' }}>{title}</div>
        </div>
        <button style={{ width:40, height:40, borderRadius:12, background:'rgba(255,255,255,.14)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
          <Icon name="bell" size={20} />
          <span style={{ position:'absolute', top:9, right:10, width:7, height:7, borderRadius:'50%', background:'var(--a-400)', border:'1.5px solid var(--p-800)' }}></span>
        </button>
      </div>
    </div>
  );
}

function PageHeader({ back, title, sub }){
  return (
    <div style={{ background:'linear-gradient(150deg, var(--p-700), var(--p-900))', padding:'46px 16px 22px', color:'#fff', position:'relative' }}>
      <div style={{ position:'absolute', top:-40, right:-30, width:160, height:160, borderRadius:'50%', background:'radial-gradient(circle, rgba(242,180,0,.28), transparent 70%)' }}></div>
      <button onClick={back} style={{ display:'flex', alignItems:'center', gap:5, color:'#fff', fontSize:13.5, fontWeight:600, background:'rgba(255,255,255,.12)', padding:'7px 12px', borderRadius:'var(--r-pill)' }}>
        <Icon name="chevL" size={16} />Back</button>
      <div style={{ position:'relative', marginTop:14 }}>
        <h2 style={{ fontSize:22, fontWeight:700, fontFamily:'var(--font-head)', color:'#fff' }}>{title}</h2>
        {sub && <div style={{ fontSize:13, color:'var(--p-200)', marginTop:4 }}>{sub}</div>}
      </div>
    </div>
  );
}

const hwMeta = { pending:['badge-warn','Pending'], submitted:['badge-soon','Submitted'], graded:['badge-active','Graded'] };

/* ---------------- HOME ---------------- */
function StuHome({ stu, go, open, openPage }){
  const today = studentSessions(stu).filter(s=>s.d===VZ.todayIndex).sort((a,b)=>a.s.localeCompare(b.s));
  const upcoming = studentSessions(stu).filter(s=>s.d>VZ.todayIndex).sort((a,b)=>a.d-b.d||a.s.localeCompare(b.s)).slice(0,3);
  const hwPending = VZ.homework.filter(h=>stu.classes.includes(h.class) && h.status!=='graded');
  const quick = [['attendance','checkSquare','Attendance'],['results','award','Results'],['payments','file','Payments']];

  return (
    <div>
      <StuHeader stu={stu} sub={VZ.DAYS_FULL[VZ.todayIndex]+', 14 June'} title={`Xin chào, ${firstNameOf(stu.name)} 👋`} />
      <div style={{ padding:'18px 16px 26px', display:'flex', flexDirection:'column', gap:22 }}>
        <div style={{ display:'flex', gap:10 }}>
          {quick.map(([k,ic,l])=>(
            <button key={k} onClick={()=>openPage(k)} className="card" style={{ flex:1, padding:'13px 8px', display:'flex', flexDirection:'column', alignItems:'center', gap:7 }}>
              <span style={{ width:36, height:36, borderRadius:10, background:'var(--a-50)', color:'var(--a-700)', display:'flex', alignItems:'center', justifyContent:'center' }}><Icon name={ic} size={18} /></span>
              <span style={{ fontSize:12, fontWeight:600, color:'var(--ink-700)' }}>{l}</span>
            </button>
          ))}
        </div>

        <section>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
            <h3 style={{ fontSize:16, fontWeight:700 }}>Today’s sessions</h3>
            <span className="tag">{today.length}</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
            {today.length===0 && <div className="card" style={{ padding:'20px', textAlign:'center', color:'var(--ink-400)', fontSize:14 }}>No sessions today 🎉</div>}
            {today.map((s,i)=><SessionCard key={i} s={s} i={i} open={open} />)}
          </div>
        </section>

        {hwPending.length>0 && (
          <section>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
              <h3 style={{ fontSize:16, fontWeight:700 }}>Homework due</h3>
              <button onClick={()=>go('homework')} style={{ fontSize:13, fontWeight:600, color:'var(--a-700)' }}>All</button>
            </div>
            <div className="card" style={{ padding:'6px 4px' }}>
              {hwPending.slice(0,3).map((h,i)=>{ const c=VZ.classById(h.class); return (
                <div key={h.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 13px', borderTop:i?'1px solid var(--line-soft)':'none' }}>
                  <span style={{ width:9, height:9, borderRadius:3, background:c.color, flexShrink:0 }}></span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13.5, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{h.title}</div>
                    <div style={{ fontSize:11.5, color:'var(--ink-400)' }}>{c.name} · due {h.due}</div>
                  </div>
                  <span className={'badge '+hwMeta[h.status][0]} style={{ fontSize:10.5 }}><span className="dot"></span>{hwMeta[h.status][1]}</span>
                </div>
              ); })}
            </div>
          </section>
        )}

        <section>
          <h3 style={{ fontSize:16, fontWeight:700, marginBottom:12 }}>Upcoming this week</h3>
          <div className="card" style={{ padding:'6px 4px' }}>
            {upcoming.map((s,i)=>(
              <div key={i} onClick={()=>open(s.class.id)} style={{ display:'flex', alignItems:'center', gap:13, padding:'11px 13px', borderTop:i?'1px solid var(--line-soft)':'none', cursor:'pointer' }}>
                <div style={{ width:44, height:44, borderRadius:11, background:s.class.color+'18', color:s.class.color, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontSize:11, fontWeight:700 }}>{VZ.DAYS[s.d]}</span>
                  <span style={{ fontSize:11, fontWeight:600, opacity:.8 }}>{9+s.d}</span>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s.class.name}</div>
                  <div style={{ fontSize:12.5, color:'var(--ink-500)' }}>{to12(s.s)} · {s.class.room}</div>
                </div>
                <Icon name="chevR" size={16} style={{ color:'var(--ink-300)' }} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function SessionCard({ s, i, open }){
  return (
    <div className="card" onClick={()=>open(s.class.id)} style={{ padding:0, overflow:'hidden', display:'flex', cursor:'pointer' }}>
      <div style={{ width:5, background:s.class.color }}></div>
      <div style={{ flex:1, padding:'14px 15px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ fontFamily:'var(--font-head)', fontWeight:700, fontSize:15, color:'var(--a-700)' }}>{to12(s.s)} – {to12(s.e)}</span>
          {i===0 && <span className="badge badge-soon" style={{ fontSize:11 }}><span className="dot"></span>Next up</span>}
        </div>
        <div style={{ fontSize:15.5, fontWeight:600, marginTop:6 }}>{s.class.name}</div>
        <div style={{ display:'flex', alignItems:'center', gap:14, marginTop:7, fontSize:12.5, color:'var(--ink-500)' }}>
          <span style={{ display:'flex', alignItems:'center', gap:5 }}><Icon name="teachers" size={14} />{VZ.teacherById(s.class.teacher).short}</span>
          <span style={{ display:'flex', alignItems:'center', gap:5 }}><Icon name="pin" size={14} />{s.class.room}</span>
          <span style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:4, color:'var(--a-700)', fontWeight:700 }}><Icon name="video" size={14} />Zoom</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COURSES ---------------- */
function StuCourses({ stu, open }){
  return (
    <div>
      <StuHeader stu={stu} sub="Programs you’re enrolled in" title="Courses" />
      <div style={{ padding:'18px 16px 26px', display:'flex', flexDirection:'column', gap:13 }}>
        {stu.classes.map((cid,idx)=>{ const c=VZ.classById(cid); const t=VZ.teacherById(c.teacher); const prog=68+(idx*11)%28; return (
          <div key={cid} onClick={()=>open(cid)} className="card" style={{ padding:0, overflow:'hidden', cursor:'pointer', display:'flex' }}>
            <div style={{ width:6, background:c.color }}></div>
            <div style={{ flex:1, padding:'15px 16px' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
                <div style={{ fontSize:15.5, fontWeight:700 }}>{c.name}</div>
                <Icon name="chevR" size={17} style={{ color:'var(--ink-300)' }} />
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:9 }}>
                <Avatar name={t.name} short={t.short} color={t.color} size={26} />
                <span style={{ fontSize:13, color:'var(--ink-500)' }}>{shortTeacher(t.name)}</span>
                <span style={{ marginLeft:'auto', fontSize:12, color:'var(--ink-400)' }}>{c.schedule.map(s=>VZ.DAYS[s.d]).join(', ')}</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:9, marginTop:13 }}>
                <div style={{ flex:1, height:7, borderRadius:99, background:'var(--surface-3)', overflow:'hidden' }}>
                  <div style={{ width:prog+'%', height:'100%', background:'var(--accent)' }}></div>
                </div>
                <span style={{ fontSize:12, fontWeight:700, color:'var(--ink-600)' }}>{prog}%</span>
              </div>
            </div>
          </div>
        ); })}
      </div>
    </div>
  );
}

/* ---------------- HOMEWORK ---------------- */
function StuHomework({ stu, notify }){
  const [filter, setFilter] = React.useState('all');
  let hw = VZ.homework.filter(h=>stu.classes.includes(h.class));
  if(filter==='todo') hw = hw.filter(h=>h.status!=='graded');
  if(filter==='done') hw = hw.filter(h=>h.status==='graded');
  return (
    <div>
      <StuHeader stu={stu} sub="Assignments from your coaches" title="Homework" />
      <div style={{ padding:'16px 16px 26px', display:'flex', flexDirection:'column', gap:14 }}>
        <div style={{ display:'flex', gap:8 }}>
          {[['all','All'],['todo','To do'],['done','Done']].map(([v,l])=>(
            <button key={v} className={'chip'+(filter===v?' is-on':'')} onClick={()=>setFilter(v)}>{l}</button>
          ))}
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
          {hw.map(h=>{ const c=VZ.classById(h.class); return (
            <div key={h.id} className="card" style={{ padding:'14px 15px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:8 }}>
                <span style={{ width:9, height:9, borderRadius:3, background:c.color }}></span>
                <span style={{ fontSize:12, color:'var(--ink-400)', fontWeight:600, flex:1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.name}</span>
                <span className={'badge '+hwMeta[h.status][0]} style={{ fontSize:10.5 }}><span className="dot"></span>{hwMeta[h.status][1]}</span>
              </div>
              <div style={{ fontSize:15, fontWeight:600 }}>{h.title}</div>
              <div style={{ display:'flex', alignItems:'center', gap:14, marginTop:10 }}>
                <span style={{ fontSize:12.5, color:'var(--ink-500)', display:'flex', alignItems:'center', gap:5 }}><Icon name="calendar" size={14} />Due {h.due}</span>
                {h.grade && <span style={{ fontSize:12.5, fontWeight:700, color:'var(--success)', display:'flex', alignItems:'center', gap:5 }}><Icon name="award" size={14} />Grade {h.grade}</span>}
                <div style={{ flex:1 }}></div>
                {h.status==='pending'
                  ? <button className="btn btn-primary btn-sm" onClick={()=>notify('Opening submission for: '+h.title)}><Icon name="upload" size={14} />Submit</button>
                  : h.status==='submitted'
                  ? <span style={{ fontSize:12.5, color:'var(--ink-400)', fontWeight:600 }}>Awaiting feedback</span>
                  : <button className="btn btn-ghost btn-sm" onClick={()=>notify('Opening feedback for: '+h.title)}>View feedback</button>}
              </div>
            </div>
          ); })}
        </div>
      </div>
    </div>
  );
}

/* ---------------- ATTENDANCE ---------------- */
function attendanceFor(stu){
  const marks = ['present','present','present','present','late','present','absent','present'];
  return stu.classes.map((cid,idx)=>{
    const c = VZ.classById(cid);
    const total = 10+idx*2;
    const sessions = [];
    for(let i=0;i<5;i++){ sessions.push(marks[(idx*3+i)%marks.length]); }
    const present = total - (idx+1);
    const rate = Math.round(present/total*100);
    return { c, total, present, rate, sessions };
  });
}
function StuAttendance({ stu, back }){
  const data = attendanceFor(stu);
  const overall = Math.round(data.reduce((a,x)=>a+x.rate,0)/data.length);
  const dotC = { present:'var(--success)', late:'var(--warn)', absent:'var(--danger)' };
  return (
    <div>
      <PageHeader back={back} title="Attendance" sub="Your check-ins across all courses" />
      <div style={{ padding:'18px 16px 26px', display:'flex', flexDirection:'column', gap:18 }}>
        <div className="card" style={{ padding:'18px', display:'flex', alignItems:'center', gap:16 }}>
          <div style={{ width:64, height:64, borderRadius:'50%', background:'conic-gradient(var(--accent) '+overall+'%, var(--surface-3) 0)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <div style={{ width:48, height:48, borderRadius:'50%', background:'var(--surface)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-head)', fontWeight:700, fontSize:16 }}>{overall}%</div>
          </div>
          <div>
            <div style={{ fontSize:15, fontWeight:700 }}>Overall attendance</div>
            <div style={{ fontSize:13, color:'var(--ink-500)', marginTop:3 }}>Great consistency, keep it up!</div>
          </div>
        </div>
        {data.map(({c,total,present,rate,sessions})=>(
          <div key={c.id} className="card" style={{ padding:'15px 16px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:9 }}>
              <span style={{ width:9, height:9, borderRadius:3, background:c.color }}></span>
              <div style={{ flex:1, fontSize:14.5, fontWeight:700 }}>{c.name}</div>
              <div style={{ fontSize:13, fontWeight:700, color: rate>=80?'var(--success)':'var(--warn)' }}>{rate}%</div>
            </div>
            <div style={{ fontSize:12.5, color:'var(--ink-400)', marginTop:5 }}>{present} of {total} sessions attended</div>
            <div style={{ display:'flex', gap:6, marginTop:12 }}>
              {sessions.map((m,i)=>(
                <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
                  <div style={{ width:'100%', height:7, borderRadius:99, background:dotC[m] }}></div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:14, marginTop:9, fontSize:11, color:'var(--ink-400)' }}>
              <span style={{ display:'flex', alignItems:'center', gap:5 }}><span style={{ width:8, height:8, borderRadius:2, background:'var(--success)' }}></span>Present</span>
              <span style={{ display:'flex', alignItems:'center', gap:5 }}><span style={{ width:8, height:8, borderRadius:2, background:'var(--warn)' }}></span>Late</span>
              <span style={{ display:'flex', alignItems:'center', gap:5 }}><span style={{ width:8, height:8, borderRadius:2, background:'var(--danger)' }}></span>Absent</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- RESULTS ---------------- */
function StuResults({ stu, back }){
  const gradeColor = (g)=> /A/.test(g)||parseFloat(g)>=7 ? 'var(--success)' : /B/.test(g)||parseFloat(g)>=6 ? 'var(--warn)' : 'var(--ink-500)';
  return (
    <div>
      <PageHeader back={back} title="Results" sub="Grades and scores by course" />
      <div style={{ padding:'18px 16px 26px', display:'flex', flexDirection:'column', gap:16 }}>
        <div className="card" style={{ padding:'18px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontSize:13, color:'var(--ink-500)' }}>Overall standing</div>
            <div style={{ fontFamily:'var(--font-head)', fontSize:24, fontWeight:700, marginTop:3 }}>Excellent</div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:7, color:'var(--success)', fontWeight:700, fontSize:14 }}><Icon name="award" size={20} />On track</div>
        </div>
        {VZ.results.map(r=>{ const c=VZ.classById(r.class); return (
          <div key={r.class} className="card" style={{ padding:'16px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:12 }}>
              <span style={{ width:9, height:9, borderRadius:3, background:c.color }}></span>
              <div style={{ flex:1, fontSize:14.5, fontWeight:700 }}>{c.name}</div>
              <span style={{ fontFamily:'var(--font-head)', fontSize:17, fontWeight:700, color:gradeColor(r.overall) }}>{r.overall}</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
              {r.items.map(([name,score],i)=>(
                <div key={i} style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ fontSize:13.5, color:'var(--ink-700)', flex:1 }}>{name}</span>
                  <span style={{ fontSize:13.5, fontWeight:700, color:gradeColor(score) }}>{score}</span>
                </div>
              ))}
            </div>
          </div>
        ); })}
        <div className="card" style={{ padding:'15px 16px', display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ width:42, height:42, borderRadius:11, background:'var(--a-50)', color:'var(--a-700)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Icon name="award" size={22} /></span>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:700 }}>1 certificate earned</div>
            <div style={{ fontSize:12.5, color:'var(--ink-500)' }}>CV & Interview Jumpstart</div>
          </div>
          <button className="btn btn-ghost btn-sm"><Icon name="download" size={14} />PDF</button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- PAYMENTS ---------------- */
function StuPayments({ stu, back, notify }){
  const paid = VZ.payments.filter(p=>p.status==='paid').reduce((a,p)=>a+p.amount,0);
  const due = VZ.payments.filter(p=>p.status==='due').reduce((a,p)=>a+p.amount,0);
  return (
    <div>
      <PageHeader back={back} title="Payments" sub="Invoices and payment history" />
      <div style={{ padding:'18px 16px 26px', display:'flex', flexDirection:'column', gap:16 }}>
        <div style={{ display:'flex', gap:12 }}>
          <div className="card" style={{ flex:1, padding:'16px' }}>
            <div style={{ fontSize:12.5, color:'var(--ink-500)' }}>Total paid</div>
            <div style={{ fontFamily:'var(--font-head)', fontSize:23, fontWeight:700, marginTop:4 }}>${paid.toLocaleString()}</div>
          </div>
          <div className="card" style={{ flex:1, padding:'16px' }}>
            <div style={{ fontSize:12.5, color:'var(--ink-500)' }}>Outstanding</div>
            <div style={{ fontFamily:'var(--font-head)', fontSize:23, fontWeight:700, marginTop:4, color: due?'var(--warn)':'var(--ink-900)' }}>${due.toLocaleString()}</div>
          </div>
        </div>

        {due>0 && (
          <div className="card" style={{ padding:'16px', borderColor:'var(--warn)', background:'var(--warn-bg)' }}>
            <div style={{ fontSize:14, fontWeight:700 }}>You have an outstanding balance</div>
            <div style={{ fontSize:12.5, color:'var(--ink-600)', marginTop:3, marginBottom:12 }}>Pay ${due} to keep your access uninterrupted.</div>
            <button className="btn btn-primary" style={{ width:'100%' }} onClick={()=>notify('Opening secure checkout')}><Icon name="check" size={16} />Pay now</button>
          </div>
        )}

        <section>
          <h3 style={{ fontSize:15, fontWeight:700, marginBottom:11 }}>Invoices</h3>
          <div className="card" style={{ padding:'4px 4px' }}>
            {VZ.payments.map((p,i)=>(
              <div key={p.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 13px', borderTop:i?'1px solid var(--line-soft)':'none' }}>
                <div style={{ width:40, height:40, borderRadius:11, background:'var(--surface-3)', color:'var(--ink-500)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Icon name="file" size={19} /></div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{p.item}</div>
                  <div style={{ fontSize:11.5, color:'var(--ink-400)' }}>{p.id} · {p.date} · {p.method}</div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontSize:14, fontWeight:700 }}>${p.amount}</div>
                  <span className={'badge '+(p.status==='paid'?'badge-active':'badge-warn')} style={{ fontSize:10.5, marginTop:2 }}><span className="dot"></span>{p.status==='paid'?'Paid':'Due'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------------- CLASS DETAIL ---------------- */
function StuClassDetail({ stu, classId, back, notify }){
  const c = VZ.classById(classId);
  const t = VZ.teacherById(c.teacher);
  const mats = VZ.materials.filter(m=>m.class===c.id);
  const sessions = c.schedule.slice().sort((a,b)=>a.d-b.d||a.s.localeCompare(b.s));
  function copy(){ try{ navigator.clipboard && navigator.clipboard.writeText(c.zoom.url); }catch(e){} notify('Zoom link copied'); }
  return (
    <div>
      <div style={{ background:'linear-gradient(150deg, var(--p-700), var(--p-900))', padding:'46px 16px 22px', color:'#fff', position:'relative' }}>
        <div style={{ position:'absolute', top:-40, right:-30, width:160, height:160, borderRadius:'50%', background:'radial-gradient(circle, '+c.color+'66, transparent 70%)' }}></div>
        <button onClick={back} style={{ display:'flex', alignItems:'center', gap:5, color:'#fff', fontSize:13.5, fontWeight:600, background:'rgba(255,255,255,.12)', padding:'7px 12px', borderRadius:'var(--r-pill)' }}>
          <Icon name="chevL" size={16} />Back</button>
        <div style={{ position:'relative', marginTop:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
            <span style={{ width:9, height:9, borderRadius:3, background:c.color }}></span>
            <span style={{ fontSize:12.5, color:'var(--p-200)', fontWeight:600 }}>{c.subject}</span>
          </div>
          <h2 style={{ fontSize:23, fontWeight:700, fontFamily:'var(--font-head)', lineHeight:1.15, color:'#fff' }}>{c.name}</h2>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:12 }}>
            <Avatar name={t.name} short={t.short} color={t.color} size={32} />
            <div style={{ fontSize:13.5, fontWeight:600 }}>{shortTeacher(t.name)}<span style={{ color:'var(--p-200)', fontWeight:400 }}> · {c.level}</span></div>
          </div>
        </div>
      </div>

      <div style={{ padding:'18px 16px 26px', display:'flex', flexDirection:'column', gap:22 }}>
        <div className="card" style={{ padding:'16px 16px', display:'flex', flexDirection:'column', gap:13 }}>
          <div style={{ display:'flex', alignItems:'center', gap:11 }}>
            <div style={{ width:40, height:40, borderRadius:11, background:'#E5EEFF', color:'#2A6298', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Icon name="video" size={21} /></div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:15, fontWeight:700 }}>Online class · Zoom</div>
              <div style={{ fontSize:12, color:'var(--ink-400)' }}>Meeting ID {c.zoom.id}</div>
            </div>
            <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:11.5, color:'var(--success)', fontWeight:700 }}><span style={{ width:7, height:7, borderRadius:'50%', background:'var(--success)' }}></span>Active</span>
          </div>
          <button className="btn btn-primary" style={{ padding:'12px' }} onClick={()=>notify('Opening Zoom: '+c.name)}><Icon name="video" size={17} />Join Zoom meeting</button>
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 12px', background:'var(--surface-3)', borderRadius:'var(--r-sm)' }}>
            <Icon name="link" size={15} style={{ color:'var(--ink-400)', flexShrink:0 }} />
            <span style={{ fontSize:12.5, color:'var(--ink-600)', flex:1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.zoom.url.replace('https://','')}</span>
            <button onClick={copy} style={{ fontSize:12.5, fontWeight:700, color:'var(--a-700)', flexShrink:0 }}>Copy</button>
          </div>
          <div style={{ fontSize:12.5, color:'var(--ink-500)' }}>Passcode <b style={{ color:'var(--ink-800)' }}>{c.zoom.pass}</b></div>
        </div>

        <section>
          <h3 style={{ fontSize:15.5, fontWeight:700, marginBottom:11 }}>Schedule</h3>
          <div className="card" style={{ padding:'6px 4px' }}>
            {sessions.map((s,i)=>(
              <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 13px', borderTop:i?'1px solid var(--line-soft)':'none' }}>
                <div style={{ width:42, height:42, borderRadius:11, background:c.color+'18', color:c.color, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-head)', fontWeight:700, fontSize:13, flexShrink:0 }}>{VZ.DAYS[s.d]}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:600 }}>{VZ.DAYS_FULL[s.d]}</div>
                  <div style={{ fontSize:12.5, color:'var(--ink-500)' }}>{to12(s.s)} – {to12(s.e)} · {c.room}</div>
                </div>
                {s.d===VZ.todayIndex && <span className="badge badge-active" style={{ fontSize:10.5 }}><span className="dot"></span>Today</span>}
              </div>
            ))}
          </div>
        </section>

        <section>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:11 }}>
            <h3 style={{ fontSize:15.5, fontWeight:700 }}>Class materials</h3>
            <span className="tag">{mats.length}</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
            {mats.length===0 && <div className="card" style={{ padding:'18px', textAlign:'center', color:'var(--ink-400)', fontSize:13.5 }}>No materials yet</div>}
            {mats.map(m=>(
              <div key={m.id} className="card" style={{ padding:'11px 13px', display:'flex', alignItems:'center', gap:12 }}>
                <FileIcon type={m.type} size={42} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13.5, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{m.title}</div>
                  <div style={{ fontSize:11.5, color:'var(--ink-400)' }}>{m.session}</div>
                </div>
                <button onClick={()=>notify('Downloading '+m.title)} style={{ width:38, height:38, borderRadius:10, background:'var(--a-50)', color:'var(--a-700)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Icon name="download" size={18} /></button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------------- PROFILE (hub) ---------------- */
function StuProfile({ stu, onSignOut, open, openPage, notify }){
  const menu = [['checkSquare','Attendance','attendance'],['award','Results','results'],['file','Payments','payments']];
  const settings = [['bell','Notifications'],['sun','Language · English'],['lock','Privacy'],['msg','Help & support']];
  return (
    <div>
      <StuHeader stu={stu} sub={stu.year} title={stu.name} />
      <div style={{ padding:'18px 16px 26px', display:'flex', flexDirection:'column', gap:20 }}>
        <div className="card" style={{ padding:'6px 4px' }}>
          {menu.map(([ic,l,k],i)=>(
            <div key={k} onClick={()=>openPage(k)} style={{ display:'flex', alignItems:'center', gap:13, padding:'14px 13px', borderTop:i?'1px solid var(--line-soft)':'none', cursor:'pointer' }}>
              <span style={{ width:34, height:34, borderRadius:9, background:'var(--a-50)', color:'var(--a-700)', display:'flex', alignItems:'center', justifyContent:'center' }}><Icon name={ic} size={17} /></span>
              <span style={{ flex:1, fontSize:14.5, fontWeight:600 }}>{l}</span>
              <Icon name="chevR" size={16} style={{ color:'var(--ink-300)' }} />
            </div>
          ))}
        </div>

        <section>
          <h3 style={{ fontSize:14.5, fontWeight:700, marginBottom:11 }}>My programs</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
            {stu.classes.map(cid=>{ const c=VZ.classById(cid); return (
              <div key={cid} onClick={()=>open(cid)} className="card" style={{ padding:'13px 14px', display:'flex', alignItems:'center', gap:12, cursor:'pointer' }}>
                <div style={{ width:40, height:40, borderRadius:11, background:c.color+'18', color:c.color, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Icon name="classes" size={19} /></div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:600 }}>{c.name}</div>
                  <div style={{ fontSize:12, color:'var(--ink-500)' }}>{shortTeacher(VZ.teacherById(c.teacher).name)}</div>
                </div>
                <button className="btn btn-sm btn-soft" onClick={e=>{e.stopPropagation(); notify('Opening Zoom: '+c.name);}}><Icon name="video" size={15} />Join</button>
              </div>
            ); })}
          </div>
        </section>

        <section>
          <h3 style={{ fontSize:14.5, fontWeight:700, marginBottom:11 }}>Settings</h3>
          <div className="card" style={{ padding:'4px 4px' }}>
            {settings.map(([ic,l],i)=>(
              <div key={l} style={{ display:'flex', alignItems:'center', gap:13, padding:'13px 13px', borderTop:i?'1px solid var(--line-soft)':'none' }}>
                <Icon name={ic} size={19} style={{ color:'var(--ink-500)' }} />
                <span style={{ flex:1, fontSize:14, fontWeight:500 }}>{l}</span>
                <Icon name="chevR" size={16} style={{ color:'var(--ink-300)' }} />
              </div>
            ))}
          </div>
        </section>
        <button className="btn btn-ghost" style={{ color:'var(--danger)', borderColor:'var(--danger-bg)' }} onClick={onSignOut}><Icon name="logout" size={17} />Sign out</button>
      </div>
    </div>
  );
}

Object.assign(window, { StudentApp, StudentLogin });
