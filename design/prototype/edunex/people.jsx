/* EduNex — People (teachers / students) + Settings (forked) */

function PeopleView({ kind, openClass, openStudent }){
  if(kind==='teachers') return <TeachersView openClass={openClass} />;
  return <StudentsView openStudent={openStudent} />;
}

function TeachersView({ openClass }){
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:18, maxWidth:1100 }}>
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <div>
          <h1 style={{ fontSize:23, fontWeight:700 }}>Teachers &amp; coaches</h1>
          <p style={{ fontSize:14, color:'var(--ink-500)', marginTop:4 }}>{VZ.teachers.length} teachers · tap a program to view details</p>
        </div>
        <div style={{ flex:1 }}></div>
        <button className="btn btn-primary btn-sm"><Icon name="plus" size={16} />Add teacher</button>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16 }}>
        {VZ.teachers.map(t=>{
          const cls = VZ.classes.filter(c=>c.teacher===t.id);
          return (
            <div key={t.id} className="card" style={{ padding:'18px 20px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:13 }}>
                <Avatar name={t.name} short={t.short} color={t.color} size={48} />
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:16, fontWeight:700 }}>{t.name}</div>
                  <div style={{ fontSize:13, color:'var(--ink-500)' }}>{t.subject}</div>
                </div>
                <button className="btn btn-icon btn-ghost btn-sm"><Icon name="more" size={16} /></button>
              </div>
              <div style={{ display:'flex', gap:18, marginTop:14, fontSize:12.5, color:'var(--ink-500)', flexWrap:'wrap' }}>
                <span style={{ display:'flex', alignItems:'center', gap:6 }}><Icon name="mail" size={14} />{t.email}</span>
                <span style={{ display:'flex', alignItems:'center', gap:6 }}><Icon name="phone" size={14} />{t.phone}</span>
              </div>
              <div style={{ borderTop:'1px solid var(--line-soft)', marginTop:14, paddingTop:14 }}>
                <div className="kicker" style={{ marginBottom:9 }}>{cls.length} programs</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
                  {cls.map(c=>(
                    <button key={c.id} onClick={()=>openClass(c.id)} className="chip" style={{ fontSize:12.5 }}>
                      <span style={{ width:8, height:8, borderRadius:2, background:c.color }}></span>{c.name}</button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StudentsView({ openStudent }){
  const [q, setQ] = React.useState('');
  const [focus, setFocus] = React.useState('all');
  let rows = VZ.students;
  if(focus!=='all') rows = rows.filter(s=>s.year===focus);
  if(q) rows = rows.filter(s=>s.name.toLowerCase().includes(q.toLowerCase()));
  const focuses = ['all',...Array.from(new Set(VZ.students.map(s=>s.year)))];

  const enrolledOf = (s)=> VZ.classes.filter(c=>c.roster && c.roster.includes(s.id));

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:18, maxWidth:1100 }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
        <div>
          <h1 style={{ fontSize:23, fontWeight:700 }}>Students</h1>
          <p style={{ fontSize:14, color:'var(--ink-500)', marginTop:4 }}>{VZ.stats.students} students learning with EduNex</p>
        </div>
        <div style={{ flex:1 }}></div>
        <div style={{ display:'flex', alignItems:'center', gap:8, background:'var(--surface)', border:'1px solid var(--line)', borderRadius:'var(--r-sm)', padding:'0 12px', height:38, width:200 }}>
          <Icon name="search" size={16} style={{ color:'var(--ink-400)' }} />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search students…" style={{ border:'none', background:'transparent', flex:1, outline:'none', fontSize:13.5 }} />
        </div>
        <button className="btn btn-primary btn-sm"><Icon name="plus" size={16} />Add student</button>
      </div>

      <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
        {focuses.map(y=><button key={y} className={'chip'+(focus===y?' is-on':'')} onClick={()=>setFocus(y)}>{y==='all'?'All focuses':y}</button>)}
      </div>

      <div className="card" style={{ overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13.5 }}>
          <thead>
            <tr style={{ textAlign:'left', color:'var(--ink-400)', fontSize:11.5, textTransform:'uppercase', letterSpacing:'.06em' }}>
              <th style={{ padding:'12px 20px', fontWeight:700 }}>Student</th>
              <th style={{ padding:'12px', fontWeight:700 }}>Focus</th>
              <th style={{ padding:'12px', fontWeight:700 }}>Enrolled in</th>
              <th style={{ padding:'12px 20px', fontWeight:700, textAlign:'right' }}>Progress</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0,12).map((s,i)=>{
              const ce = enrolledOf(s).slice(0,2);
              const cs = ce.length?ce:[VZ.classes[i%VZ.classes.length]];
              return (
                <tr key={s.id} onClick={()=>openStudent&&openStudent(s.id)} style={{ borderTop:'1px solid var(--line-soft)', cursor:'pointer' }}
                  onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <td style={{ padding:'12px 20px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:11 }}>
                      <Avatar name={s.name} short={s.short} color={s.color} size={34} />
                      <span style={{ fontWeight:600, color:'var(--ink-900)' }}>{s.name}</span>
                    </div>
                  </td>
                  <td style={{ padding:'12px', color:'var(--ink-600)' }}>{s.year}</td>
                  <td style={{ padding:'12px' }}>
                    <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                      {cs.map(c=><span key={c.id} className="tag" style={{ background:c.color+'14', color:c.color }}>{c.name}</span>)}
                    </div>
                  </td>
                  <td style={{ padding:'12px 20px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, justifyContent:'flex-end' }}>
                      <div style={{ width:90, height:6, borderRadius:99, background:'var(--surface-3)', overflow:'hidden' }}>
                        <div style={{ width:(74+i*2)+'%', height:'100%', background: (74+i*2)>85?'var(--accent)':'var(--warn)' }}></div>
                      </div>
                      <span style={{ fontSize:12.5, fontWeight:600, color:'var(--ink-600)', width:34 }}>{74+i*2}%</span>
                      <Icon name="chevR" size={16} style={{ color:'var(--ink-300)' }} />
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

function SettingsView({ notify }){
  return (
    <div style={{ maxWidth:720 }}>
      <h1 style={{ fontSize:23, fontWeight:700 }}>Settings</h1>
      <p style={{ fontSize:14, color:'var(--ink-500)', marginTop:4, marginBottom:20 }}>EduNex profile and preferences.</p>
      <div className="card" style={{ padding:'20px 22px', display:'flex', flexDirection:'column', gap:18 }}>
        {[['Organisation','EduNex · English & Career Coaching'],['Location','New Zealand'],['Default timezone','Pacific/Auckland (NZST)'],['Contact email','team@edunex.co.nz']].map(([l,v])=>(
          <div key={l} style={{ display:'flex', alignItems:'center', gap:16 }}>
            <div style={{ width:160, fontSize:13.5, fontWeight:600, color:'var(--ink-600)' }}>{l}</div>
            <input className="field" defaultValue={v} style={{ flex:1 }} />
          </div>
        ))}
        <button className="btn btn-primary" style={{ width:'fit-content' }} onClick={()=>notify('Settings saved','check')}>Save changes</button>
      </div>
    </div>
  );
}

function StudentDetail({ studentId, go, notify }){
  const s = VZ.studentById(studentId);
  if(!s) return null;
  const num = parseInt(s.id.slice(1)) || 1;
  const enrolled = VZ.classes.filter(c=>c.roster && c.roster.includes(s.id));
  const list = enrolled.length?enrolled:[VZ.classes[num%VZ.classes.length]];
  const att = 72 + (num*4)%26;
  const joined = ['Jan','Feb','Mar','Apr','May'][num%5] + ' 2026';
  const phone = '021 5' + String(500+num*7).slice(-3);
  const mats = VZ.materials.filter(m=>list.some(c=>c.id===m.class)).slice(0,5);
  const meta = [
    ['Focus', s.year],
    ['Member since', joined],
    ['Attendance', att+'%'],
    ['Programs', String(list.length)],
  ];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20, maxWidth:1000 }}>
      <button onClick={()=>go('students')} style={{ display:'flex', alignItems:'center', gap:6, color:'var(--ink-500)', fontSize:13.5, fontWeight:600, width:'fit-content' }}>
        <Icon name="chevL" size={16} />Back to students</button>

      {/* Profile header */}
      <div className="card" style={{ padding:0, overflow:'hidden' }}>
        <div style={{ height:6, background:s.color }}></div>
        <div style={{ padding:'22px 24px', display:'flex', alignItems:'flex-start', gap:18, flexWrap:'wrap' }}>
          <Avatar name={s.name} short={s.short} color={s.color} size={64} />
          <div style={{ flex:1, minWidth:220 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <h1 style={{ fontSize:24, fontWeight:700 }}>{s.name}</h1>
              <span className="badge badge-active"><span className="dot"></span>Active</span>
            </div>
            <div style={{ display:'flex', gap:18, marginTop:9, fontSize:13, color:'var(--ink-500)', flexWrap:'wrap' }}>
              <span style={{ display:'flex', alignItems:'center', gap:6 }}><Icon name="target" size={14} />{s.year}</span>
              <span style={{ display:'flex', alignItems:'center', gap:6 }}><Icon name="phone" size={14} />{phone}</span>
              <span style={{ display:'flex', alignItems:'center', gap:6 }}><Icon name="user" size={14} />EDX-{1000+num}</span>
            </div>
          </div>
          <div style={{ display:'flex', gap:9 }}>
            <button className="btn btn-ghost btn-sm" onClick={()=>notify('Messaging '+s.name,'msg')}><Icon name="msg" size={15} />Message</button>
            <button className="btn btn-primary btn-sm" onClick={()=>notify('Send material to '+s.name,'send')}><Icon name="send" size={15} />Send material</button>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderTop:'1px solid var(--line)' }}>
          {meta.map(([l,v],i)=>(
            <div key={l} style={{ padding:'16px 20px', borderLeft:i?'1px solid var(--line-soft)':'none' }}>
              <div style={{ fontSize:11.5, fontWeight:700, color:'var(--ink-400)', textTransform:'uppercase', letterSpacing:'.05em' }}>{l}</div>
              <div style={{ fontFamily:'var(--font-head)', fontSize:19, fontWeight:700, color:'var(--ink-900)', marginTop:5 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Enrolled programs */}
      <div>
        <h3 style={{ fontSize:16.5, fontWeight:700, marginBottom:13 }}>Enrolled programs <span style={{ color:'var(--ink-400)', fontWeight:600 }}>· {list.length}</span></h3>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:14 }}>
          {list.map((c,i)=>{
            const t=VZ.teacherById(c.teacher); const prog=68+(num+i*3)%30;
            return (
              <div key={c.id} className="card" onClick={()=>go('class', c.id)} style={{ padding:0, overflow:'hidden', cursor:'pointer' }}
                onMouseEnter={e=>e.currentTarget.style.boxShadow='var(--sh-2)'} onMouseLeave={e=>e.currentTarget.style.boxShadow='var(--sh-card)'}>
                <div style={{ display:'flex', alignItems:'stretch' }}>
                  <div style={{ width:5, background:c.color }}></div>
                  <div style={{ flex:1, padding:'15px 16px' }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
                      <div style={{ fontSize:14.5, fontWeight:700 }}>{c.name}</div>
                      <StatusBadge status={c.status} />
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:9 }}>
                      <Avatar name={t.name} short={t.short} color={t.color} size={24} />
                      <span style={{ fontSize:12.5, color:'var(--ink-500)' }}>{t.name.replace('Thầy ','').replace('Cô ','').replace('Ms. ','')} · {c.schedule.map(x=>VZ.DAYS[x.d]).join(', ')}</span>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:9, marginTop:12 }}>
                      <div style={{ flex:1, height:6, borderRadius:99, background:'var(--surface-3)', overflow:'hidden' }}>
                        <div style={{ width:prog+'%', height:'100%', background:'var(--accent)' }}></div>
                      </div>
                      <span style={{ fontSize:12, fontWeight:700, color:'var(--ink-600)' }}>{prog}%</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Materials shared */}
      <div>
        <h3 style={{ fontSize:16.5, fontWeight:700, marginBottom:13 }}>Materials shared</h3>
        <div className="card" style={{ padding:'8px 6px' }}>
          {mats.map((m,i)=>(
            <div key={m.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 14px', borderTop:i?'1px solid var(--line-soft)':'none' }}>
              <FileIcon type={m.type} size={38} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13.5, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{m.title}</div>
                <div style={{ fontSize:12, color:'var(--ink-400)' }}>{VZ.classById(m.class).name} · {m.date}</div>
              </div>
              {m.to!=='class' ? <span className="tag" style={{ background:'var(--a-50)', color:'var(--a-700)' }}>For this student</span> : <span className="tag">Whole class</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PeopleView, SettingsView, StudentDetail });
