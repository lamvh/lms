/* EduNex — Timetable (weekly calendar) + export preview (forked) */

const DAY_START = 9, DAY_END = 20, HOUR_H = 54;

function CalendarView({ openClass, notify }){
  const [teacher, setTeacher] = React.useState('all');
  const [exportOpen, setExportOpen] = React.useState(false);
  const days = [0,1,2,3,4,5]; // Mon–Sat

  let classes = VZ.classes.filter(c=>c.status!=='paused');
  if(teacher!=='all') classes = classes.filter(c=>c.teacher===teacher);

  const blocks = [];
  classes.forEach(c=>c.schedule.forEach(s=>{ if(days.includes(s.d)) blocks.push({ ...s, class:c }); }));

  function topFor(t){ const [h,m]=t.split(':').map(Number); return ((h+m/60)-DAY_START)*HOUR_H; }
  function heightFor(s,e){ const a=s.split(':').map(Number), b=e.split(':').map(Number); return ((b[0]+b[1]/60)-(a[0]+a[1]/60))*HOUR_H; }

  const hours = []; for(let h=DAY_START;h<=DAY_END;h++) hours.push(h);

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:18, maxWidth:1180 }}>
      <div style={{ display:'flex', alignItems:'center', gap:14, flexWrap:'wrap' }}>
        <div>
          <h1 style={{ fontSize:23, fontWeight:700 }}>Timetable</h1>
          <p style={{ fontSize:14, color:'var(--ink-500)', marginTop:4 }}>All programs on one calendar · week of 9–14 June 2026</p>
        </div>
        <div style={{ flex:1 }}></div>
        <select value={teacher} onChange={e=>setTeacher(e.target.value)} style={{ border:'1px solid var(--line)', borderRadius:'var(--r-sm)', padding:'8px 12px', fontSize:13.5, color:'var(--ink-600)', background:'var(--surface)', fontFamily:'var(--font-body)' }}>
          <option value="all">All teachers</option>
          {VZ.teachers.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <button className="btn btn-ghost btn-sm"><Icon name="chevL" size={16} /></button>
        <button className="btn btn-ghost btn-sm">This week</button>
        <button className="btn btn-ghost btn-sm"><Icon name="chevR" size={16} /></button>
        <button className="btn btn-primary btn-sm" onClick={()=>setExportOpen(true)}><Icon name="printer" size={16} />Export</button>
      </div>

      {/* Legend */}
      <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
        {VZ.teachers.map(t=>(
          <span key={t.id} style={{ display:'flex', alignItems:'center', gap:7, fontSize:12.5, color:'var(--ink-500)' }}>
            <span style={{ width:10, height:10, borderRadius:3, background:t.color }}></span>{t.name.replace('Thầy ','').replace('Cô ','').replace('Ms. ','')}</span>
        ))}
      </div>

      <div className="card" style={{ padding:'0', overflow:'hidden' }}>
        <div style={{ display:'flex', borderBottom:'1px solid var(--line)' }}>
          <div style={{ width:56, flexShrink:0 }}></div>
          {days.map(d=>(
            <div key={d} style={{ flex:1, textAlign:'center', padding:'12px 0', borderLeft:'1px solid var(--line-soft)' }}>
              <div style={{ fontSize:12, color:'var(--ink-400)', fontWeight:600 }}>{VZ.DAYS[d]}</div>
              <div style={{ fontFamily:'var(--font-head)', fontSize:17, fontWeight:700, color: d===VZ.todayIndex?'var(--brand)':'var(--ink-800)', marginTop:2 }}>{9+d}</div>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', position:'relative', height:(DAY_END-DAY_START)*HOUR_H }}>
          <div style={{ width:56, flexShrink:0, position:'relative' }}>
            {hours.map((h,i)=>(
              <div key={h} style={{ position:'absolute', top:i*HOUR_H-7, right:8, fontSize:11.5, color:'var(--ink-400)' }}>{to12((h<10?'0':'')+h+':00')}</div>
            ))}
          </div>
          {days.map(d=>(
            <div key={d} style={{ flex:1, position:'relative', borderLeft:'1px solid var(--line-soft)', background: d===VZ.todayIndex?'rgba(242,180,0,.05)':'transparent' }}>
              {hours.map((h,i)=><div key={h} style={{ position:'absolute', top:i*HOUR_H, left:0, right:0, height:1, background:'var(--line-soft)' }}></div>)}
              {blocks.filter(b=>b.d===d).map((b,i)=>(
                <div key={i} onClick={()=>openClass(b.class.id)} style={{
                  position:'absolute', top:topFor(b.s)+2, height:heightFor(b.s,b.e)-4, left:4, right:4,
                  background:b.class.color, borderRadius:8, padding:'7px 8px', color:'#fff', cursor:'pointer',
                  overflow:'hidden', boxShadow:'0 1px 3px rgba(0,0,0,.15)',
                }}>
                  <div style={{ fontSize:11.5, fontWeight:700, opacity:.92 }}>{to12(b.s)}</div>
                  <div style={{ fontSize:12, fontWeight:600, lineHeight:1.2, marginTop:1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{b.class.name}</div>
                  <div style={{ fontSize:10.5, opacity:.85, marginTop:1 }}>{b.class.room}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Modal open={exportOpen} onClose={()=>setExportOpen(false)} width={640} title="Export timetable" sub="Clean layout, ready to print or share">
        <TimetableExport notify={notify} onClose={()=>setExportOpen(false)} />
      </Modal>
    </div>
  );
}

function TimetableExport({ c, notify, onClose }){
  const single = !!c;
  const rows = single ? c.schedule.map(s=>({ ...s, class:c })) : (()=>{
    const out=[]; VZ.classes.filter(x=>x.status!=='paused').forEach(x=>x.schedule.forEach(s=>out.push({ ...s, class:x }))); return out;
  })();
  const byDay = {};
  rows.forEach(r=>{ (byDay[r.d]=byDay[r.d]||[]).push(r); });
  const dayKeys = Object.keys(byDay).map(Number).sort();

  return (
    <div>
      <div style={{ borderRadius:'var(--r-lg)', overflow:'hidden', border:'1px solid var(--line)', boxShadow:'var(--sh-card)' }}>
        <div style={{ background:'linear-gradient(120deg, var(--p-700), var(--p-900))', padding:'18px 22px', color:'#fff', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <Logo size={26} light textSize={16} />
            <div style={{ fontSize:18, fontWeight:700, marginTop:10 }}>{single?c.name:'Weekly Timetable'}</div>
            <div style={{ fontSize:12.5, color:'var(--p-200)', marginTop:2 }}>Week of 9–14 June 2026{single?' · '+c.room:''}</div>
          </div>
          <div style={{ textAlign:'right', fontSize:11.5, color:'var(--p-200)' }}>EduNex · English &amp; Career Coaching<br/>New Zealand</div>
        </div>
        <div style={{ background:'#fff', padding:'6px 0' }}>
          {dayKeys.map(d=>(
            <div key={d} style={{ display:'flex', borderTop:'1px solid var(--line-soft)', padding:'11px 22px', alignItems:'flex-start', gap:16 }}>
              <div style={{ width:80, flexShrink:0, fontFamily:'var(--font-head)', fontWeight:700, fontSize:13.5, color:'var(--brand)' }}>{VZ.DAYS_FULL[d]}</div>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:8 }}>
                {byDay[d].sort((a,b)=>a.s.localeCompare(b.s)).map((r,i)=>(
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <span style={{ width:8, height:8, borderRadius:2, background:r.class.color }}></span>
                    <span style={{ fontSize:13, fontWeight:600, width:120, color:'var(--ink-800)' }}>{to12(r.s)}–{to12(r.e)}</span>
                    <span style={{ fontSize:13, color:'var(--ink-700)', flex:1 }}>{r.class.name}{single?'':' · '+r.class.room}</span>
                    <span style={{ fontSize:12, color:'var(--ink-400)' }}>{VZ.teacherById(r.class.teacher).short}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ background:'var(--surface-2)', padding:'10px 22px', fontSize:11.5, color:'var(--ink-400)', textAlign:'center', borderTop:'1px solid var(--line-soft)' }}>
          Generated by EduNex · edunex.co.nz
        </div>
      </div>

      <div style={{ display:'flex', gap:10, marginTop:18 }}>
        <button className="btn btn-ghost" style={{ flex:1 }} onClick={()=>notify('Timetable downloaded (PNG)','download')}><Icon name="image" size={16} />Download image</button>
        <button className="btn btn-primary" style={{ flex:1 }} onClick={()=>{notify('Timetable downloaded (PDF)','download'); onClose&&onClose();}}><Icon name="printer" size={16} />Download PDF</button>
      </div>
    </div>
  );
}

Object.assign(window, { CalendarView, TimetableExport });
