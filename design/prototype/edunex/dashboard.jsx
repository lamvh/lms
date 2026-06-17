/* EduNex — Admin dashboard (3 layout variants, Zalo removed) */

function to12(t){ let [h,m]=t.split(':').map(Number); const ap=h>=12?'pm':'am'; h=h%12||12; return `${h}:${m.toString().padStart(2,'0')}${ap}`; }

function todaySessions(){
  const ti = VZ.todayIndex;
  const out = [];
  VZ.classes.forEach(c=>{
    if(c.status==='paused') return;
    c.schedule.forEach(s=>{ if(s.d===ti) out.push({ ...s, class:c }); });
  });
  return out.sort((a,b)=>a.s.localeCompare(b.s));
}

function Greeting({ compact }){
  const d = VZ.DAYS_FULL[VZ.todayIndex];
  return (
    <div>
      <div className="eyebrow" style={{ color:'var(--brand)', marginBottom:6 }}>{d}, 14 June 2026</div>
      <h1 style={{ fontSize: compact?24:28, fontWeight:700 }}>Good afternoon, Phương 👋</h1>
      {!compact && <p style={{ fontSize:15, color:'var(--ink-500)', marginTop:7 }}>
        You have <b style={{ color:'var(--ink-800)' }}>{todaySessions().length} sessions</b> scheduled today across 3 rooms.</p>}
    </div>
  );
}

function StatCards(){
  const s = VZ.stats;
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
      <Stat icon="classes"  tone="brand" value={s.classes}  label="Active programs" sub="+2 this term" />
      <Stat icon="students" tone="green" value={s.students} label="Enrolled students" sub="+7 this term" />
      <Stat icon="teachers" tone="plum"  value={s.teachers} label="Teachers" />
      <Stat icon="calendar" tone="amber" value={s.sessionsToday} label="Sessions today" />
    </div>
  );
}

function TodaySchedule({ openClass, dense }){
  const sessions = todaySessions();
  const nowMin = 17*60+10;
  return (
    <div className="card" style={{ padding:'20px 22px', display:'flex', flexDirection:'column', minHeight:0 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <h3 style={{ fontSize:16.5, fontWeight:700 }}>Today’s schedule</h3>
          <span className="tag">{sessions.length} sessions</span>
        </div>
        <span style={{ fontSize:13, color:'var(--ink-400)', fontWeight:500 }}>{VZ.DAYS_FULL[VZ.todayIndex]}</span>
      </div>
      <div style={{ display:'flex', flexDirection:'column' }}>
        {sessions.map((s,i)=>{
          const [h,m]=s.s.split(':').map(Number); const start=h*60+m;
          const isNow = nowMin>=start && nowMin < (parseInt(s.e)*60);
          const past = (parseInt(s.e.split(':')[0])*60+parseInt(s.e.split(':')[1])) < nowMin;
          return (
            <div key={i} onClick={()=>openClass(s.class.id)} style={{
              display:'flex', alignItems:'center', gap:14, padding:'12px 10px', borderRadius:'var(--r-md)',
              cursor:'pointer', opacity: past?.55:1, transition:'background .15s',
              background: isNow?'var(--a-50)':'transparent',
            }} onMouseEnter={e=>e.currentTarget.style.background=isNow?'var(--a-100)':'var(--surface-2)'}
               onMouseLeave={e=>e.currentTarget.style.background=isNow?'var(--a-50)':'transparent'}>
              <div style={{ width:62, textAlign:'right', flexShrink:0 }}>
                <div style={{ fontFamily:'var(--font-head)', fontWeight:700, fontSize:14, color: isNow?'var(--a-700)':'var(--ink-800)' }}>{to12(s.s)}</div>
                <div style={{ fontSize:11.5, color:'var(--ink-400)' }}>{to12(s.e)}</div>
              </div>
              <div style={{ width:4, alignSelf:'stretch', borderRadius:4, background:s.class.color, flexShrink:0 }}></div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontWeight:600, fontSize:14.5, color:'var(--ink-900)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s.class.name}</span>
                  {isNow && <span className="badge badge-active" style={{ fontSize:10.5 }}><span className="dot"></span>Now</span>}
                </div>
                <div style={{ fontSize:12.5, color:'var(--ink-500)', marginTop:2 }}>{VZ.teacherById(s.class.teacher).name} · {s.class.room} · {s.class.students} students</div>
              </div>
              {!dense && <button className="btn btn-sm btn-soft" onClick={e=>{e.stopPropagation();openClass(s.class.id);}}>
                <Icon name="checkSquare" size={15} />Attendance</button>}
              <Icon name="chevR" size={17} style={{ color:'var(--ink-300)' }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QuickActions({ go, notify }){
  const acts = [
    { icon:'plus', label:'Add a class', tone:'brand', fn:()=>notify('New class form opened','plus') },
    { icon:'printer', label:'Export timetable', tone:'green', fn:()=>go('calendar') },
    { icon:'materials', label:'Upload material', tone:'plum', fn:()=>go('materials') },
    { icon:'students', label:'Add a student', tone:'brand', fn:()=>notify('New student form opened','plus') },
  ];
  const toneC = { brand:['var(--a-50)','var(--a-700)'], green:['var(--a-50)','var(--a-600)'], plum:['#F2E9F1','#8A5A86'] };
  return (
    <div className="card" style={{ padding:'18px 20px' }}>
      <h3 style={{ fontSize:15.5, fontWeight:700, marginBottom:14 }}>Quick actions</h3>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
        {acts.map(a=>(
          <button key={a.label} onClick={a.fn} style={{
            display:'flex', flexDirection:'column', alignItems:'flex-start', gap:10, padding:'13px 13px',
            border:'1px solid var(--line)', borderRadius:'var(--r-md)', background:'var(--surface)', textAlign:'left',
            transition:'border-color .15s, background .15s',
          }} onMouseEnter={e=>{e.currentTarget.style.background='var(--surface-2)';e.currentTarget.style.borderColor='var(--ink-300)';}}
             onMouseLeave={e=>{e.currentTarget.style.background='var(--surface)';e.currentTarget.style.borderColor='var(--line)';}}>
            <span style={{ width:34, height:34, borderRadius:9, background:toneC[a.tone][0], color:toneC[a.tone][1],
              display:'flex', alignItems:'center', justifyContent:'center' }}><Icon name={a.icon} size={18} /></span>
            <span style={{ fontSize:13.5, fontWeight:600, color:'var(--ink-800)' }}>{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function StartingSoon({ openClass }){
  const soon = VZ.classes.filter(c=>c.status==='soon');
  return (
    <div className="card" style={{ padding:'18px 20px' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
        <h3 style={{ fontSize:15.5, fontWeight:700 }}>Starting soon</h3>
        <span className="tag">{soon.length}</span>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {soon.map(c=>(
          <div key={c.id} onClick={()=>openClass(c.id)} style={{ display:'flex', alignItems:'center', gap:11, cursor:'pointer' }}>
            <div style={{ width:38, height:38, borderRadius:10, flexShrink:0, background:c.color+'1a', color:c.color,
              display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-head)', fontWeight:700, fontSize:13 }}>
              {VZ.DAYS[c.schedule[0].d]}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:13.5, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.name}</div>
              <div style={{ fontSize:12, color:'var(--ink-500)' }}>{VZ.teacherById(c.teacher).short} · {to12(c.schedule[0].s)} · {c.students} enrolled</div>
            </div>
            <Icon name="chevR" size={16} style={{ color:'var(--ink-300)' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ClassTable({ openClass, notify, filter, compact }){
  const [tab, setTab] = React.useState('all');
  const [teacher, setTeacher] = React.useState('all');
  let rows = VZ.classes;
  if(tab!=='all') rows = rows.filter(c=>c.status===tab);
  if(teacher!=='all') rows = rows.filter(c=>c.teacher===teacher);

  return (
    <div className="card" style={{ overflow:'hidden' }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, padding:'16px 20px', borderBottom:'1px solid var(--line)', flexWrap:'wrap' }}>
        <h3 style={{ fontSize:16, fontWeight:700, marginRight:4 }}>All programs</h3>
        <Segmented size="sm" value={tab} onChange={setTab} options={[
          {value:'all',label:'All'},{value:'active',label:'Active'},{value:'soon',label:'Soon'},{value:'paused',label:'Paused'}]} />
        <div style={{ flex:1 }}></div>
        <select value={teacher} onChange={e=>setTeacher(e.target.value)} style={{
          border:'1px solid var(--line)', borderRadius:'var(--r-sm)', padding:'7px 12px', fontSize:13, color:'var(--ink-600)', background:'var(--surface)', fontFamily:'var(--font-body)' }}>
          <option value="all">All teachers</option>
          {VZ.teachers.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13.5, minWidth:680 }}>
          <thead>
            <tr style={{ textAlign:'left', color:'var(--ink-400)', fontSize:11.5, textTransform:'uppercase', letterSpacing:'.06em' }}>
              <th style={{ padding:'11px 20px', fontWeight:700 }}>Program</th>
              <th style={{ padding:'11px 12px', fontWeight:700 }}>Teacher</th>
              <th style={{ padding:'11px 12px', fontWeight:700 }}>Schedule</th>
              <th style={{ padding:'11px 12px', fontWeight:700 }}>Students</th>
              <th style={{ padding:'11px 12px', fontWeight:700 }}>Status</th>
              <th style={{ padding:'11px 20px', fontWeight:700, textAlign:'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(c=>{
              const t=VZ.teacherById(c.teacher);
              return (
                <tr key={c.id} style={{ borderTop:'1px solid var(--line-soft)', cursor:'pointer' }}
                  onClick={()=>openClass(c.id)}
                  onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <td style={{ padding:'13px 20px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:11 }}>
                      <span style={{ width:9, height:9, borderRadius:3, background:c.color, flexShrink:0 }}></span>
                      <div>
                        <div style={{ fontWeight:600, color:'var(--ink-900)' }}>{c.name}</div>
                        <div style={{ fontSize:12, color:'var(--ink-400)' }}>{c.subject} · {c.level}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding:'13px 12px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <Avatar name={t.name} short={t.short} color={t.color} size={26} />
                      <span style={{ color:'var(--ink-600)' }}>{t.name.replace('Thầy ','').replace('Cô ','').replace('Ms. ','')}</span>
                    </div>
                  </td>
                  <td style={{ padding:'13px 12px', color:'var(--ink-600)' }}>
                    {c.schedule.map(s=>VZ.DAYS[s.d]).join(', ')}<div style={{ fontSize:12, color:'var(--ink-400)' }}>{to12(c.schedule[0].s)}</div>
                  </td>
                  <td style={{ padding:'13px 12px', color:'var(--ink-700)', fontWeight:600 }}>{c.students}</td>
                  <td style={{ padding:'13px 12px' }}><StatusBadge status={c.status} /></td>
                  <td style={{ padding:'13px 20px' }}>
                    <div style={{ display:'flex', gap:6, justifyContent:'flex-end' }}>
                      <Tip label="Open program"><button className="btn btn-icon btn-soft btn-sm" onClick={e=>{e.stopPropagation();openClass(c.id);}}><Icon name="arrowR" size={16} /></button></Tip>
                      <Tip label="Export timetable"><button className="btn btn-icon btn-ghost btn-sm" onClick={e=>{e.stopPropagation();notify('Timetable exported for '+c.name,'download');}}><Icon name="printer" size={16} /></button></Tip>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminDashboard({ variant='a', setVariant, go, openClass, notify }){
  let body;
  if(variant==='b') body = <DashB {...{go,openClass,notify}} />;
  else if(variant==='c') body = <DashC {...{go,openClass,notify}} />;
  else body = <DashA {...{go,openClass,notify}} />;
  return (
    <div>
      {setVariant && (
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18, maxWidth:1180 }}>
          <span style={{ fontSize:12, fontWeight:700, color:'var(--ink-400)', textTransform:'uppercase', letterSpacing:'.06em' }}>Dashboard layout</span>
          <Segmented size="sm" value={variant} onChange={setVariant} options={[
            {value:'a',label:'Balanced'},{value:'b',label:'Schedule-first'},{value:'c',label:'Class grid'}]} />
          <span style={{ fontSize:12, color:'var(--ink-300)' }}>· three directions to compare</span>
        </div>
      )}
      {body}
    </div>
  );
}

function DashA({ go, openClass, notify }){
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:22, maxWidth:1180 }}>
      <Greeting />
      <StatCards />
      <div style={{ display:'grid', gridTemplateColumns:'1.7fr 1fr', gap:18, alignItems:'start' }}>
        <TodaySchedule openClass={openClass} />
        <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
          <QuickActions go={go} notify={notify} />
          <StartingSoon openClass={openClass} />
        </div>
      </div>
      <ClassTable openClass={openClass} notify={notify} />
    </div>
  );
}

function DashB({ go, openClass, notify }){
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20, maxWidth:1180 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:20, flexWrap:'wrap',
        background:'linear-gradient(120deg, var(--p-700), var(--p-800))', borderRadius:'var(--r-xl)', padding:'26px 30px', color:'#fff' }}>
        <div>
          <div className="eyebrow" style={{ color:'var(--p-200)' }}>{VZ.DAYS_FULL[VZ.todayIndex]}, 14 June 2026</div>
          <h1 style={{ color:'#fff', fontSize:27, fontWeight:700, marginTop:7 }}>Good afternoon, Phương</h1>
          <p style={{ color:'var(--p-200)', marginTop:6, fontSize:14.5 }}>{todaySessions().length} sessions today · all rooms in use after 4pm</p>
        </div>
        <div style={{ display:'flex', gap:26 }}>
          {[['Programs',VZ.stats.classes],['Students',VZ.stats.students],['Teachers',VZ.stats.teachers]].map(([l,n])=>(
            <div key={l} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'var(--font-head)', fontSize:30, fontWeight:700 }}>{n}</div>
              <div style={{ color:'var(--p-200)', fontSize:12.5 }}>{l}</div>
            </div>
          ))}
          <button className="btn btn-primary" style={{ alignSelf:'center' }} onClick={()=>go('calendar')}>
            <Icon name="printer" size={17} />Export timetable</button>
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:18, alignItems:'start' }}>
        <TodaySchedule openClass={openClass} />
        <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
          <QuickActions go={go} notify={notify} />
          <StartingSoon openClass={openClass} />
        </div>
      </div>
      <ClassTable openClass={openClass} notify={notify} />
    </div>
  );
}

function DashC({ go, openClass, notify }){
  const [tab, setTab] = React.useState('all');
  let rows = VZ.classes; if(tab!=='all') rows=rows.filter(c=>c.status===tab);
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20, maxWidth:1180 }}>
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:16, flexWrap:'wrap' }}>
        <Greeting compact />
        <div style={{ display:'flex', gap:12 }}>
          {[['classes',VZ.stats.classes,'Programs'],['students',VZ.stats.students,'Students'],['calendar',VZ.stats.sessionsToday,'Today']].map(([ic,n,l])=>(
            <div key={l} className="card" style={{ padding:'12px 16px', display:'flex', alignItems:'center', gap:11 }}>
              <span style={{ width:34, height:34, borderRadius:9, background:'var(--a-50)', color:'var(--a-700)', display:'flex', alignItems:'center', justifyContent:'center' }}><Icon name={ic} size={18} /></span>
              <div><div style={{ fontFamily:'var(--font-head)', fontWeight:700, fontSize:20 }}>{n}</div><div style={{ fontSize:11.5, color:'var(--ink-400)' }}>{l}</div></div>
            </div>
          ))}
        </div>
      </div>
      <TodayStrip openClass={openClass} />
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <h3 style={{ fontSize:16.5, fontWeight:700 }}>Programs</h3>
        <Segmented size="sm" value={tab} onChange={setTab} options={[
          {value:'all',label:'All'},{value:'active',label:'Active'},{value:'soon',label:'Soon'},{value:'paused',label:'Paused'}]} />
        <div style={{ flex:1 }}></div>
        <button className="btn btn-sm btn-primary" onClick={()=>notify('New class form opened','plus')}><Icon name="plus" size={16} />New class</button>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
        {rows.map(c=><ClassCard key={c.id} c={c} openClass={openClass} notify={notify} />)}
      </div>
    </div>
  );
}

function TodayStrip({ openClass }){
  const s = todaySessions();
  return (
    <div className="card" style={{ padding:'14px 18px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
        <Icon name="calendar" size={17} style={{ color:'var(--a-700)' }} />
        <h3 style={{ fontSize:14.5, fontWeight:700 }}>Today · {VZ.DAYS_FULL[VZ.todayIndex]}</h3>
        <span className="tag">{s.length} sessions</span>
      </div>
      <div style={{ display:'flex', gap:12, overflowX:'auto', paddingBottom:4 }}>
        {s.map((x,i)=>(
          <div key={i} onClick={()=>openClass(x.class.id)} style={{ minWidth:184, flexShrink:0, border:'1px solid var(--line)', borderRadius:'var(--r-md)', padding:'12px 13px', cursor:'pointer', borderLeft:'3px solid '+x.class.color }}>
            <div style={{ fontFamily:'var(--font-head)', fontWeight:700, fontSize:13.5, color:'var(--a-700)' }}>{to12(x.s)}-{to12(x.e)}</div>
            <div style={{ fontSize:13.5, fontWeight:600, marginTop:3, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{x.class.name}</div>
            <div style={{ fontSize:12, color:'var(--ink-500)', marginTop:2 }}>{x.class.room} · {VZ.teacherById(x.class.teacher).short}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClassCard({ c, openClass, notify }){
  const t=VZ.teacherById(c.teacher);
  return (
    <div className="card" onClick={()=>openClass(c.id)} style={{ padding:0, overflow:'hidden', cursor:'pointer', transition:'box-shadow .15s, transform .1s' }}
      onMouseEnter={e=>e.currentTarget.style.boxShadow='var(--sh-2)'} onMouseLeave={e=>e.currentTarget.style.boxShadow='var(--sh-card)'}>
      <div style={{ height:5, background:c.color }}></div>
      <div style={{ padding:'16px 17px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:10 }}>
          <div style={{ minWidth:0, flex:1 }}>
            <h4 style={{ fontSize:15, fontWeight:700, lineHeight:1.25 }}>{c.name}</h4>
            <div style={{ fontSize:12.5, color:'var(--ink-400)', marginTop:5 }}>{c.subject} · {c.level}</div>
          </div>
          <StatusBadge status={c.status} />
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:14 }}>
          <Avatar name={t.name} short={t.short} color={t.color} size={28} />
          <span style={{ fontSize:13, color:'var(--ink-600)', flex:1 }}>{t.name}</span>
        </div>
        <div style={{ display:'flex', gap:14, marginTop:14, fontSize:12.5, color:'var(--ink-500)' }}>
          <span style={{ display:'flex', alignItems:'center', gap:5 }}><Icon name="calendar" size={14} />{c.schedule.map(s=>VZ.DAYS[s.d]).join(', ')}</span>
          <span style={{ display:'flex', alignItems:'center', gap:5 }}><Icon name="students" size={14} />{c.students}</span>
          <span style={{ display:'flex', alignItems:'center', gap:5 }}><Icon name="pin" size={14} />{c.room}</span>
        </div>
        <div style={{ display:'flex', gap:8, marginTop:15 }}>
          <button className="btn btn-sm btn-soft" style={{ flex:1 }} onClick={e=>{e.stopPropagation();openClass(c.id);}}><Icon name="arrowR" size={15} />Open program</button>
          <button className="btn btn-sm btn-ghost" onClick={e=>{e.stopPropagation();notify('Timetable exported','download');}}><Icon name="printer" size={15} /></button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AdminDashboard, ClassTable, ClassCard, to12, todaySessions, TodaySchedule });
