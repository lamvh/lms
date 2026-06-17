/* Vina NZ — People (teachers / students) + Settings */

function PeopleView({ kind, openClass }){
  if(kind==='teachers') return <TeachersView openClass={openClass} />;
  return <StudentsView />;
}

function TeachersView({ openClass }){
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:18, maxWidth:1100 }}>
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <div>
          <h1 style={{ fontSize:23, fontWeight:700 }}>Teachers</h1>
          <p style={{ fontSize:14, color:'var(--ink-500)', marginTop:4 }}>{VZ.teachers.length} teachers · tap a class to view details</p>
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
              <div style={{ display:'flex', gap:18, marginTop:14, fontSize:12.5, color:'var(--ink-500)' }}>
                <span style={{ display:'flex', alignItems:'center', gap:6 }}><Icon name="mail" size={14} />{t.email}</span>
                <span style={{ display:'flex', alignItems:'center', gap:6 }}><Icon name="phone" size={14} />{t.phone}</span>
              </div>
              <div style={{ borderTop:'1px solid var(--line-soft)', marginTop:14, paddingTop:14 }}>
                <div className="kicker" style={{ marginBottom:9 }}>{cls.length} classes</div>
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

function StudentsView(){
  const [q, setQ] = React.useState('');
  const [year, setYear] = React.useState('all');
  let rows = VZ.students;
  if(year!=='all') rows = rows.filter(s=>s.year===year);
  if(q) rows = rows.filter(s=>s.name.toLowerCase().includes(q.toLowerCase()));
  const years = ['all',...Array.from(new Set(VZ.students.map(s=>s.year)))];

  // assign each student to a couple of classes deterministically
  const classOf = (i)=>[VZ.classes[i%VZ.classes.length], VZ.classes[(i*3+1)%VZ.classes.length]];

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:18, maxWidth:1100 }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
        <div>
          <h1 style={{ fontSize:23, fontWeight:700 }}>Students</h1>
          <p style={{ fontSize:14, color:'var(--ink-500)', marginTop:4 }}>{VZ.stats.students} students enrolled across the centre</p>
        </div>
        <div style={{ flex:1 }}></div>
        <div style={{ display:'flex', alignItems:'center', gap:8, background:'var(--surface)', border:'1px solid var(--line)', borderRadius:'var(--r-sm)', padding:'0 12px', height:38, width:200 }}>
          <Icon name="search" size={16} style={{ color:'var(--ink-400)' }} />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search students…" style={{ border:'none', background:'transparent', flex:1, outline:'none', fontSize:13.5 }} />
        </div>
        <button className="btn btn-primary btn-sm"><Icon name="plus" size={16} />Add student</button>
      </div>

      <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
        {years.map(y=><button key={y} className={'chip'+(year===y?' is-on':'')} onClick={()=>setYear(y)}>{y==='all'?'All years':y}</button>)}
      </div>

      <div className="card" style={{ overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13.5 }}>
          <thead>
            <tr style={{ textAlign:'left', color:'var(--ink-400)', fontSize:11.5, textTransform:'uppercase', letterSpacing:'.06em' }}>
              <th style={{ padding:'12px 20px', fontWeight:700 }}>Student</th>
              <th style={{ padding:'12px', fontWeight:700 }}>Year</th>
              <th style={{ padding:'12px', fontWeight:700 }}>Enrolled in</th>
              <th style={{ padding:'12px 20px', fontWeight:700, textAlign:'right' }}>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0,12).map((s,i)=>{
              const cs = classOf(i);
              return (
                <tr key={s.id} style={{ borderTop:'1px solid var(--line-soft)' }}>
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
      <p style={{ fontSize:14, color:'var(--ink-500)', marginTop:4, marginBottom:20 }}>Centre profile and preferences.</p>
      <div className="card" style={{ padding:'20px 22px', display:'flex', flexDirection:'column', gap:18 }}>
        {[['Centre name','Vina NZ Tutoring Centre'],['Location','Auckland, New Zealand'],['Default timezone','Pacific/Auckland (NZST)'],['Contact email','info@vinanz.school']].map(([l,v])=>(
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

Object.assign(window, { PeopleView, SettingsView });
