/* Vina NZ — Student mobile portal (inside iOS frame) */

function studentSessions(stu){
  const out = [];
  stu.classes.forEach(cid=>{ const c=VZ.classById(cid); c.schedule.forEach(s=>out.push({ ...s, class:c })); });
  return out;
}

function StudentApp({ onSignOut, initialTab='home' }){
  const [tab, setTab] = React.useState(initialTab);
  const stu = VZ.focusStudent;
  const TABS = [['home','Home','home'],['timetable','Timetable','calendar'],['materials','Materials','materials'],['profile','Profile','user']];

  return (
    <div className="app-scope" style={{ height:'100%', display:'flex', flexDirection:'column', background:'var(--bg)', fontFamily:'var(--font-body)' }}>
      <div style={{ flex:1, minHeight:0, overflowY:'auto', WebkitOverflowScrolling:'touch' }}>
        {tab==='home' && <StuHome stu={stu} go={setTab} />}
        {tab==='timetable' && <StuTimetable stu={stu} />}
        {tab==='materials' && <StuMaterials stu={stu} />}
        {tab==='profile' && <StuProfile stu={stu} onSignOut={onSignOut} />}
      </div>
      {/* Bottom tab bar */}
      <div style={{ flexShrink:0, display:'flex', background:'var(--surface)', borderTop:'1px solid var(--line)',
        padding:'8px 8px 26px', position:'relative', zIndex:30 }}>
        {TABS.map(([id,label,icon])=>{
          const on = tab===id;
          return (
            <button key={id} onClick={()=>setTab(id)} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4, padding:'6px 0', color: on?'var(--brand)':'var(--ink-400)' }}>
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
      <div style={{ position:'absolute', top:-40, right:-30, width:160, height:160, borderRadius:'50%', background:'radial-gradient(circle, rgba(46,163,122,.3), transparent 70%)' }}></div>
      <div style={{ display:'flex', alignItems:'center', gap:12, position:'relative' }}>
        <Avatar name={stu.name} short={stu.short} color="#2EA37A" size={44} style={{ boxShadow:'0 0 0 2px rgba(255,255,255,.3)' }} />
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, color:'var(--p-200)' }}>{sub}</div>
          <div style={{ fontSize:19, fontWeight:700, fontFamily:'var(--font-head)' }}>{title}</div>
        </div>
        <button style={{ width:40, height:40, borderRadius:12, background:'rgba(255,255,255,.14)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
          <Icon name="bell" size={20} />
          <span style={{ position:'absolute', top:9, right:10, width:7, height:7, borderRadius:'50%', background:'var(--a-400)', border:'1.5px solid var(--p-800)' }}></span>
        </button>
      </div>
    </div>
  );
}

function StuHome({ stu, go }){
  const today = studentSessions(stu).filter(s=>s.d===VZ.todayIndex).sort((a,b)=>a.s.localeCompare(b.s));
  const upcoming = studentSessions(stu).filter(s=>s.d>VZ.todayIndex).sort((a,b)=>a.d-b.d||a.s.localeCompare(b.s)).slice(0,3);
  const mats = VZ.materials.filter(m=>stu.classes.includes(m.class)).slice(0,4);

  return (
    <div>
      <StuHeader stu={stu} sub={VZ.DAYS_FULL[VZ.todayIndex]+', 14 June'} title="Xin chào, Bảo 👋" />
      <div style={{ padding:'18px 16px 26px', display:'flex', flexDirection:'column', gap:22 }}>
        {/* Today */}
        <section>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
            <h3 style={{ fontSize:16, fontWeight:700 }}>Today’s classes</h3>
            <span className="tag">{today.length}</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
            {today.length===0 && <div className="card" style={{ padding:'20px', textAlign:'center', color:'var(--ink-400)', fontSize:14 }}>No classes today 🎉</div>}
            {today.map((s,i)=>(
              <div key={i} className="card" style={{ padding:0, overflow:'hidden', display:'flex' }}>
                <div style={{ width:5, background:s.class.color }}></div>
                <div style={{ flex:1, padding:'14px 15px' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <span style={{ fontFamily:'var(--font-head)', fontWeight:700, fontSize:15, color:'var(--brand)' }}>{to12(s.s)} – {to12(s.e)}</span>
                    {i===0 && <span className="badge badge-soon" style={{ fontSize:11 }}><span className="dot"></span>Next up</span>}
                  </div>
                  <div style={{ fontSize:15.5, fontWeight:600, marginTop:6 }}>{s.class.name}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:14, marginTop:7, fontSize:12.5, color:'var(--ink-500)' }}>
                    <span style={{ display:'flex', alignItems:'center', gap:5 }}><Icon name="teachers" size={14} />{VZ.teacherById(s.class.teacher).short}</span>
                    <span style={{ display:'flex', alignItems:'center', gap:5 }}><Icon name="pin" size={14} />{s.class.room}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming */}
        <section>
          <h3 style={{ fontSize:16, fontWeight:700, marginBottom:12 }}>Upcoming this week</h3>
          <div className="card" style={{ padding:'6px 4px' }}>
            {upcoming.map((s,i)=>(
              <div key={i} style={{ display:'flex', alignItems:'center', gap:13, padding:'11px 13px', borderTop:i?'1px solid var(--line-soft)':'none' }}>
                <div style={{ width:44, height:44, borderRadius:11, background:s.class.color+'18', color:s.class.color, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontSize:11, fontWeight:700 }}>{VZ.DAYS[s.d]}</span>
                  <span style={{ fontSize:11, fontWeight:600, opacity:.8 }}>{9+s.d}</span>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s.class.name}</div>
                  <div style={{ fontSize:12.5, color:'var(--ink-500)' }}>{to12(s.s)} · {s.class.room}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent materials */}
        <section>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
            <h3 style={{ fontSize:16, fontWeight:700 }}>Recent materials</h3>
            <button onClick={()=>go('materials')} style={{ fontSize:13, fontWeight:600, color:'var(--brand)' }}>See all</button>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
            {mats.map(m=>(
              <div key={m.id} className="card" style={{ padding:'11px 13px', display:'flex', alignItems:'center', gap:12 }}>
                <FileIcon type={m.type} size={42} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13.5, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{m.title}</div>
                  <div style={{ fontSize:11.5, color:'var(--ink-400)' }}>{VZ.classById(m.class).name} · {m.date}</div>
                </div>
                <button style={{ width:38, height:38, borderRadius:10, background:'var(--p-50)', color:'var(--brand)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Icon name="download" size={18} /></button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function StuTimetable({ stu }){
  const sessions = studentSessions(stu);
  const days = Array.from(new Set(sessions.map(s=>s.d))).sort();
  return (
    <div>
      <StuHeader stu={stu} sub="Your weekly schedule" title="Timetable" />
      <div style={{ padding:'18px 16px 26px', display:'flex', flexDirection:'column', gap:18 }}>
        {days.map(d=>{
          const ses = sessions.filter(s=>s.d===d).sort((a,b)=>a.s.localeCompare(b.s));
          const isToday = d===VZ.todayIndex;
          return (
            <section key={d}>
              <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:10 }}>
                <h3 style={{ fontSize:14.5, fontWeight:700, color: isToday?'var(--brand)':'var(--ink-800)' }}>{VZ.DAYS_FULL[d]}</h3>
                {isToday && <span className="badge badge-active" style={{ fontSize:10.5 }}><span className="dot"></span>Today</span>}
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                {ses.map((s,i)=>(
                  <div key={i} className="card" style={{ padding:'13px 14px', display:'flex', alignItems:'center', gap:13 }}>
                    <div style={{ width:4, height:38, borderRadius:4, background:s.class.color }}></div>
                    <div style={{ width:62 }}>
                      <div style={{ fontFamily:'var(--font-head)', fontWeight:700, fontSize:13.5 }}>{to12(s.s)}</div>
                      <div style={{ fontSize:11.5, color:'var(--ink-400)' }}>{to12(s.e)}</div>
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:14, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s.class.name}</div>
                      <div style={{ fontSize:12, color:'var(--ink-500)' }}>{VZ.teacherById(s.class.teacher).name.replace('Thầy ','').replace('Cô ','')} · {s.class.room}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function StuMaterials({ stu }){
  const mats = VZ.materials.filter(m=>stu.classes.includes(m.class));
  const byClass = {}; mats.forEach(m=>{ (byClass[m.class]=byClass[m.class]||[]).push(m); });
  return (
    <div>
      <StuHeader stu={stu} sub="Sent to you by your teachers" title="Materials" />
      <div style={{ padding:'18px 16px 26px', display:'flex', flexDirection:'column', gap:20 }}>
        {Object.keys(byClass).map(cid=>{
          const c=VZ.classById(cid);
          return (
            <section key={cid}>
              <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:11 }}>
                <span style={{ width:9, height:9, borderRadius:3, background:c.color }}></span>
                <h3 style={{ fontSize:14.5, fontWeight:700 }}>{c.name}</h3>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                {byClass[cid].map(m=>(
                  <div key={m.id} className="card" style={{ padding:'11px 13px', display:'flex', alignItems:'center', gap:12 }}>
                    <FileIcon type={m.type} size={42} />
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13.5, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{m.title}</div>
                      <div style={{ fontSize:11.5, color:'var(--ink-400)', display:'flex', alignItems:'center', gap:6 }}>
                        {m.size} · {m.date}
                        {m.to!=='class' && <span className="tag" style={{ background:'var(--a-50)', color:'var(--a-600)', fontSize:10.5 }}>For you</span>}
                      </div>
                    </div>
                    <button style={{ width:38, height:38, borderRadius:10, background:'var(--p-50)', color:'var(--brand)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Icon name="download" size={18} /></button>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function StuProfile({ stu, onSignOut }){
  const items = [['bell','Notifications'],['sun','Language · English'],['lock','Privacy'],['msg','Help & support']];
  return (
    <div>
      <StuHeader stu={stu} sub={stu.year} title={stu.name} />
      <div style={{ padding:'18px 16px 26px', display:'flex', flexDirection:'column', gap:20 }}>
        <section>
          <h3 style={{ fontSize:14.5, fontWeight:700, marginBottom:11 }}>My classes</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
            {stu.classes.map(cid=>{ const c=VZ.classById(cid); return (
              <div key={cid} className="card" style={{ padding:'13px 14px', display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:40, height:40, borderRadius:11, background:c.color+'18', color:c.color, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Icon name="classes" size={19} /></div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:600 }}>{c.name}</div>
                  <div style={{ fontSize:12, color:'var(--ink-500)' }}>{VZ.teacherById(c.teacher).name.replace('Thầy ','').replace('Cô ','')}</div>
                </div>
                <button className="btn btn-sm btn-zalo"><Icon name="zalo" size={15} />Group</button>
              </div>
            ); })}
          </div>
        </section>
        <section>
          <h3 style={{ fontSize:14.5, fontWeight:700, marginBottom:11 }}>Settings</h3>
          <div className="card" style={{ padding:'4px 4px' }}>
            {items.map(([ic,l],i)=>(
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

Object.assign(window, { StudentApp });
