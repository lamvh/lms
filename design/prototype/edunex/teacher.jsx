/* EduNex — Teacher portal (desktop): Today · My Classes · Homework to Mark · Attendance · Progress
   Scoped to the signed-in coach (Ms. Jane). Reuses ClassDetail for the class view. */

function TeacherApp({ onSignOut, initialView='today', initialClassId=null }){
  const me = VZ.teacherById('t1'); // Ms. Jane
  const [view, setView] = React.useState(initialView);
  const [classId, setClassId] = React.useState(initialClassId);
  const [toasts, setToasts] = React.useState([]);
  const notify = React.useCallback((msg, icon='check') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, msg, icon }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);
  function go(v, cid=null){ if(v==='classes'){ setView('myclasses'); setClassId(null); } else if(v==='class'){ setView('class'); setClassId(cid); } else { setView(v); setClassId(null); } }
  const openClass = (id)=> go('class', id);

  const myClasses = VZ.classes.filter(c=>c.teacher===me.id);
  const todaySes = [];
  myClasses.forEach(c=>c.schedule.forEach(s=>{ if(s.d===VZ.todayIndex) todaySes.push({ ...s, class:c }); }));
  todaySes.sort((a,b)=>a.s.localeCompare(b.s));
  const studentIds = Array.from(new Set([].concat(...myClasses.map(c=>c.roster||[]))));
  const toMark = VZ.submissions.filter(s=>myClasses.some(c=>c.id===s.class));

  const NAV = [
    { id:'today',      label:"Today's Classes", icon:'calendar', badge:String(todaySes.length) },
    { id:'myclasses',  label:'My Classes',      icon:'classes' },
    { id:'homework',   label:'Homework to Mark',icon:'materials', badge:String(toMark.length) },
    { id:'attendance', label:'Attendance',      icon:'checkSquare' },
    { id:'progress',   label:'Student Progress',icon:'students' },
  ];
  const titles = { today:"Today's Classes", myclasses:'My Classes', class:'Class details', homework:'Homework to Mark', attendance:'Attendance', progress:'Student Progress' };

  let content;
  if(view==='today') content = <TeacherToday sessions={todaySes} openClass={openClass} go={go} notify={notify} />;
  else if(view==='myclasses') content = <TeacherClasses classes={myClasses} openClass={openClass} />;
  else if(view==='class') content = <ClassDetail classId={classId} go={go} notify={notify} />;
  else if(view==='homework') content = <TeacherHomework subs={toMark} notify={notify} />;
  else if(view==='attendance') content = <TeacherAttendance classes={myClasses} notify={notify} />;
  else if(view==='progress') content = <TeacherProgress classes={myClasses} studentIds={studentIds} notify={notify} />;

  return (
    <div className="app-scope" style={{ height:'100%', display:'flex', background:'var(--bg)', overflow:'hidden', fontFamily:'var(--font-body)' }}>
      {/* Sidebar */}
      <aside style={{ width:252, flexShrink:0, background:'linear-gradient(180deg, var(--p-800), var(--p-900))', display:'flex', flexDirection:'column', padding:'20px 14px', gap:6 }}>
        <div style={{ padding:'4px 8px 8px' }}><Logo size={32} light textSize={20} /></div>
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 10px 14px', marginBottom:6, borderBottom:'1px solid rgba(255,255,255,.10)' }}>
          <Avatar name={me.name} short={me.short} color={me.color} size={38} />
          <div style={{ minWidth:0 }}>
            <div style={{ color:'#fff', fontSize:13.5, fontWeight:700, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{me.name}</div>
            <div style={{ color:'var(--p-300)', fontSize:11.5 }}>Coach workspace</div>
          </div>
        </div>
        <div style={{ flex:1, display:'flex', flexDirection:'column', gap:4 }}>
          {NAV.map(it=>(
            <div key={it.id} className={'navlink'+((view===it.id||(it.id==='myclasses'&&view==='class'))?' is-active':'')} onClick={()=>go(it.id)}>
              <Icon name={it.icon} size={19} /><span style={{ flex:1 }}>{it.label}</span>
              {it.badge && it.badge!=='0' && <span style={{ fontSize:10.5, fontWeight:700, padding:'1px 7px', borderRadius:99, background:'var(--accent)', color:'var(--ink-900)' }}>{it.badge}</span>}
            </div>
          ))}
        </div>
        <div className="navlink" onClick={onSignOut} style={{ color:'var(--p-100)' }}>
          <Icon name="logout" size={19} /> Sign out
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex:1, minWidth:0, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <header style={{ height:64, flexShrink:0, background:'var(--surface)', borderBottom:'1px solid var(--line)', display:'flex', alignItems:'center', padding:'0 26px', gap:16 }}>
          <h2 style={{ fontSize:19, fontWeight:700 }}>{titles[view]}</h2>
          <div style={{ flex:1 }}></div>
          <div style={{ display:'flex', alignItems:'center', gap:8, background:'var(--surface-3)', borderRadius:'var(--r-sm)', padding:'0 12px', height:38, width:230 }}>
            <Icon name="search" size={17} style={{ color:'var(--ink-400)' }} />
            <input placeholder="Search students…" style={{ border:'none', background:'transparent', fontSize:13.5, flex:1, outline:'none', color:'var(--ink-700)' }} />
          </div>
          <button className="btn btn-icon btn-ghost" style={{ position:'relative' }} onClick={()=>notify('You have 3 new submissions','bell')}>
            <Icon name="bell" size={19} /><span style={{ position:'absolute', top:7, right:8, width:7, height:7, borderRadius:'50%', background:'var(--danger)', border:'1.5px solid #fff' }}></span>
          </button>
        </header>
        <main className="scroll-y" style={{ flex:1, minHeight:0, padding:'26px 28px 40px' }}>
          <div key={view+(classId||'')}>{content}</div>
        </main>
      </div>

      <div style={{ position:'absolute', bottom:22, left:'calc(50% + 126px)', transform:'translateX(-50%)', zIndex:200, display:'flex', flexDirection:'column', gap:10, alignItems:'center', pointerEvents:'none' }}>
        {toasts.map(t=>(
          <div key={t.id} className="rise" style={{ display:'flex', alignItems:'center', gap:10, background:'var(--ink-900)', color:'#fff', padding:'11px 16px', borderRadius:'var(--r-pill)', boxShadow:'var(--sh-pop)', fontSize:13.5, fontWeight:500 }}>
            <span style={{ display:'flex', color:'var(--a-400)' }}><Icon name={t.icon} size={17} /></span>{t.msg}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Today's Classes ---- */
function TeacherToday({ sessions, openClass, go, notify }){
  const now = 17*60+10;
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20, maxWidth:1000 }}>
      <div>
        <div className="eyebrow" style={{ color:'var(--brand)', marginBottom:6 }}>{VZ.DAYS_FULL[VZ.todayIndex]}, 14 June 2026</div>
        <h1 style={{ fontSize:27, fontWeight:700 }}>Good afternoon, Jane 👋</h1>
        <p style={{ fontSize:15, color:'var(--ink-500)', marginTop:7 }}>You have <b style={{ color:'var(--ink-800)' }}>{sessions.length} sessions</b> today. Next one starts soon.</p>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {sessions.length===0 && <div className="card" style={{ padding:'30px', textAlign:'center', color:'var(--ink-400)' }}>No classes scheduled today 🎉</div>}
        {sessions.map((s,i)=>{ const c=s.class; const [h,m]=s.s.split(':').map(Number); const start=h*60+m; const live = now>=start && now<parseInt(s.e)*60; return (
          <div key={i} className="card" style={{ padding:0, overflow:'hidden', display:'flex' }}>
            <div style={{ width:6, background:c.color }}></div>
            <div style={{ flex:1, padding:'18px 20px', display:'flex', alignItems:'center', gap:20, flexWrap:'wrap' }}>
              <div style={{ minWidth:96 }}>
                <div style={{ fontFamily:'var(--font-head)', fontWeight:700, fontSize:18, color: live?'var(--a-700)':'var(--ink-900)' }}>{to12(s.s)}</div>
                <div style={{ fontSize:12.5, color:'var(--ink-400)' }}>{to12(s.e)}</div>
              </div>
              <div style={{ flex:1, minWidth:180 }}>
                <div style={{ display:'flex', alignItems:'center', gap:9 }}>
                  <span style={{ fontSize:16, fontWeight:700 }}>{c.name}</span>
                  {live && <span className="badge badge-active" style={{ fontSize:10.5 }}><span className="dot"></span>Now</span>}
                </div>
                <div style={{ fontSize:13, color:'var(--ink-500)', marginTop:4 }}>{c.room} · {c.students} students · {c.subject}</div>
              </div>
              <div style={{ display:'flex', gap:9 }}>
                <button className="btn btn-ghost btn-sm" onClick={()=>go('attendance')}><Icon name="checkSquare" size={15} />Attendance</button>
                <button className="btn btn-ghost btn-sm" onClick={()=>openClass(c.id)}><Icon name="materials" size={15} />Open</button>
                <button className="btn btn-primary btn-sm" onClick={()=>notify('Starting Zoom: '+c.name,'video')}><Icon name="video" size={15} />Start Zoom</button>
              </div>
            </div>
          </div>
        ); })}
      </div>
    </div>
  );
}

/* ---- My Classes ---- */
function TeacherClasses({ classes, openClass }){
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:18, maxWidth:1100 }}>
      <p style={{ fontSize:14, color:'var(--ink-500)' }}>{classes.length} programs you teach. Open one to see the roster, schedule and materials.</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16 }}>
        {classes.map(c=>(
          <div key={c.id} className="card" onClick={()=>openClass(c.id)} style={{ padding:0, overflow:'hidden', cursor:'pointer' }}
            onMouseEnter={e=>e.currentTarget.style.boxShadow='var(--sh-2)'} onMouseLeave={e=>e.currentTarget.style.boxShadow='var(--sh-card)'}>
            <div style={{ height:6, background:c.color }}></div>
            <div style={{ padding:'18px 20px' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}>
                <h3 style={{ fontSize:17, fontWeight:700 }}>{c.name}</h3>
                <StatusBadge status={c.status} />
              </div>
              <div style={{ fontSize:13, color:'var(--ink-400)', marginTop:5 }}>{c.subject} · {c.level}</div>
              <div style={{ display:'flex', gap:18, marginTop:16, fontSize:13, color:'var(--ink-600)' }}>
                <span style={{ display:'flex', alignItems:'center', gap:6 }}><Icon name="students" size={15} />{c.students} students</span>
                <span style={{ display:'flex', alignItems:'center', gap:6 }}><Icon name="calendar" size={15} />{c.schedule.map(s=>VZ.DAYS[s.d]).join(', ')}</span>
                <span style={{ display:'flex', alignItems:'center', gap:6 }}><Icon name="materials" size={15} />{c.materials}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Homework to Mark ---- */
function TeacherHomework({ subs, notify }){
  const [done, setDone] = React.useState([]);
  const pending = subs.filter(s=>!done.includes(s.id));
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:18, maxWidth:920 }}>
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <p style={{ fontSize:14, color:'var(--ink-500)' }}><b style={{ color:'var(--ink-800)' }}>{pending.length}</b> submissions waiting for your feedback.</p>
        <div style={{ flex:1 }}></div>
        {pending.length>0 && <button className="btn btn-ghost btn-sm" onClick={()=>notify('Opening grading queue')}><Icon name="checkSquare" size={15} />Grade all</button>}
      </div>
      <div className="card" style={{ padding:'8px 6px' }}>
        {pending.length===0 && <div style={{ padding:'30px', textAlign:'center', color:'var(--ink-400)' }}>All caught up — nothing to mark 🎉</div>}
        {subs.map((s,i)=>{ const st=VZ.studentById(s.student); const c=VZ.classById(s.class); const isDone=done.includes(s.id); return (
          <div key={s.id} style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 14px', borderTop:i?'1px solid var(--line-soft)':'none', opacity:isDone?.5:1 }}>
            <FileIcon type={s.type} size={42} />
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:14, fontWeight:700 }}>{s.title}</div>
              <div style={{ fontSize:12.5, color:'var(--ink-500)', marginTop:2, display:'flex', alignItems:'center', gap:7 }}>
                <span style={{ width:8, height:8, borderRadius:2, background:c.color }}></span>{c.name} · {st?st.name:'Student'} · {s.when}</div>
            </div>
            {isDone
              ? <span className="badge badge-active"><span className="dot"></span>Graded</span>
              : <button className="btn btn-primary btn-sm" onClick={()=>{ setDone(d=>[...d,s.id]); notify('Graded: '+s.title); }}><Icon name="pen" size={14} />Grade</button>}
          </div>
        ); })}
      </div>
    </div>
  );
}

/* ---- Attendance ---- */
function TeacherAttendance({ classes, notify }){
  const [cid, setCid] = React.useState(classes[0] && classes[0].id);
  const c = VZ.classById(cid) || classes[0];
  const roster = (c.roster||[]).map(id=>VZ.studentById(id)).filter(Boolean);
  const [marks, setMarks] = React.useState({});
  React.useEffect(()=>{ const init={}; roster.forEach(s=>init[s.id]='present'); setMarks(init); }, [cid]);
  const set = (id,v)=> setMarks(m=>({ ...m, [id]:v }));
  const opt = [['present','Present','var(--success)'],['late','Late','var(--warn)'],['absent','Absent','var(--danger)']];
  const present = Object.values(marks).filter(v=>v==='present').length;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:18, maxWidth:920 }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
        <select value={cid} onChange={e=>setCid(e.target.value)} style={{ border:'1px solid var(--line)', borderRadius:'var(--r-sm)', padding:'9px 13px', fontSize:14, fontWeight:600, color:'var(--ink-700)', background:'var(--surface)', fontFamily:'var(--font-body)' }}>
          {classes.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}
        </select>
        <span style={{ fontSize:13.5, color:'var(--ink-500)' }}>{VZ.DAYS_FULL[VZ.todayIndex]}, 14 June · {present}/{roster.length} present</span>
        <div style={{ flex:1 }}></div>
        <button className="btn btn-primary btn-sm" onClick={()=>notify('Attendance saved for '+c.name)}><Icon name="check" size={15} />Save attendance</button>
      </div>
      <div className="card" style={{ padding:'8px 6px' }}>
        {roster.map((s,i)=>(
          <div key={s.id} style={{ display:'flex', alignItems:'center', gap:13, padding:'12px 14px', borderTop:i?'1px solid var(--line-soft)':'none' }}>
            <Avatar name={s.name} short={s.short} color={s.color} size={36} />
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:14, fontWeight:600 }}>{s.name}</div>
              <div style={{ fontSize:12, color:'var(--ink-400)' }}>{s.year}</div>
            </div>
            <div style={{ display:'inline-flex', background:'var(--surface-3)', borderRadius:'var(--r-sm)', padding:3, gap:2 }}>
              {opt.map(([v,l,col])=>{ const on=marks[s.id]===v; return (
                <button key={v} onClick={()=>set(s.id,v)} style={{ padding:'6px 12px', fontSize:12.5, fontWeight:700, borderRadius:'calc(7px * var(--radius-scale))', background:on?'var(--surface)':'transparent', color:on?col:'var(--ink-400)', boxShadow:on?'var(--sh-1)':'none' }}>{l}</button>
              ); })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Student Progress ---- */
function TeacherProgress({ classes, studentIds, notify }){
  const [cid, setCid] = React.useState('all');
  let ids = studentIds;
  if(cid!=='all'){ const c=VZ.classById(cid); ids = c.roster||[]; }
  const rows = ids.map(id=>VZ.studentById(id)).filter(Boolean);
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:18, maxWidth:1000 }}>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
        <button className={'chip'+(cid==='all'?' is-on':'')} onClick={()=>setCid('all')}>All my students <span style={{ opacity:.7 }}>{studentIds.length}</span></button>
        {classes.map(c=><button key={c.id} className={'chip'+(cid===c.id?' is-on':'')} onClick={()=>setCid(c.id)}><span style={{ width:8, height:8, borderRadius:2, background:c.color }}></span>{c.name}</button>)}
      </div>
      <div className="card" style={{ overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13.5 }}>
          <thead>
            <tr style={{ textAlign:'left', color:'var(--ink-400)', fontSize:11.5, textTransform:'uppercase', letterSpacing:'.06em' }}>
              <th style={{ padding:'12px 20px', fontWeight:700 }}>Student</th>
              <th style={{ padding:'12px', fontWeight:700 }}>Focus</th>
              <th style={{ padding:'12px', fontWeight:700 }}>Attendance</th>
              <th style={{ padding:'12px 20px', fontWeight:700 }}>Progress</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s,i)=>{ const att=78+(i*3)%20; const prog=64+(i*7)%34; return (
              <tr key={s.id} style={{ borderTop:'1px solid var(--line-soft)' }}>
                <td style={{ padding:'12px 20px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:11 }}>
                    <Avatar name={s.name} short={s.short} color={s.color} size={34} />
                    <span style={{ fontWeight:600, color:'var(--ink-900)' }}>{s.name}</span>
                  </div>
                </td>
                <td style={{ padding:'12px', color:'var(--ink-600)' }}>{s.year}</td>
                <td style={{ padding:'12px' }}>
                  <span style={{ fontWeight:600, color: att>=85?'var(--success)':'var(--warn)' }}>{att}%</span>
                </td>
                <td style={{ padding:'12px 20px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:9, maxWidth:220 }}>
                    <div style={{ flex:1, height:6, borderRadius:99, background:'var(--surface-3)', overflow:'hidden' }}>
                      <div style={{ width:prog+'%', height:'100%', background: prog>=70?'var(--accent)':'var(--warn)' }}></div>
                    </div>
                    <span style={{ fontSize:12.5, fontWeight:600, color:'var(--ink-600)', width:34 }}>{prog}%</span>
                  </div>
                </td>
              </tr>
            ); })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Object.assign(window, { TeacherApp });
