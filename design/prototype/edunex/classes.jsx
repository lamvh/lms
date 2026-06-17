/* EduNex — Class list & class detail (Zalo removed · Zoom link management added) */

function ClassList({ openClass, notify }){
  const [layout, setLayout] = React.useState('grid');
  const [tab, setTab] = React.useState('all');
  const [q, setQ] = React.useState('');
  let rows = VZ.classes;
  if(tab!=='all') rows=rows.filter(c=>c.status===tab);
  if(q) rows=rows.filter(c=>c.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:18, maxWidth:1180 }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
        <div>
          <h1 style={{ fontSize:23, fontWeight:700 }}>Classes</h1>
          <p style={{ fontSize:14, color:'var(--ink-500)', marginTop:4 }}>All {VZ.classes.length} programs in one place. Filter, open and export.</p>
        </div>
        <div style={{ flex:1 }}></div>
        <div style={{ display:'flex', alignItems:'center', gap:8, background:'var(--surface)', border:'1px solid var(--line)', borderRadius:'var(--r-sm)', padding:'0 12px', height:38, width:220 }}>
          <Icon name="search" size={16} style={{ color:'var(--ink-400)' }} />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search programs…" style={{ border:'none', background:'transparent', flex:1, outline:'none', fontSize:13.5 }} />
        </div>
        <Segmented value={layout} onChange={setLayout} options={[{value:'grid',icon:'grid'},{value:'list',icon:'list'}]} size="sm" />
        <button className="btn btn-primary btn-sm" onClick={()=>notify('New class form opened','plus')}><Icon name="plus" size={16} />New class</button>
      </div>

      <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
        {[['all','All programs'],['active','Active'],['soon','Starting soon'],['paused','Paused']].map(([v,l])=>(
          <button key={v} className={'chip'+(tab===v?' is-on':'')} onClick={()=>setTab(v)}>{l}
            <span style={{ opacity:.7 }}>{v==='all'?VZ.classes.length:VZ.classes.filter(c=>c.status===v).length}</span></button>
        ))}
      </div>

      {layout==='grid'
        ? <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>{rows.map(c=><ClassCard key={c.id} c={c} openClass={openClass} notify={notify} />)}</div>
        : <ClassTable openClass={openClass} notify={notify} />}
    </div>
  );
}

/* ---- Zoom link management (per class) ---- */
function ZoomPanel({ c, notify }){
  const [url, setUrl] = React.useState(c.zoom.url);
  const [pass, setPass] = React.useState(c.zoom.pass);
  const [open, setOpen] = React.useState(false);
  const [draftUrl, setDraftUrl] = React.useState(url);
  const [draftPass, setDraftPass] = React.useState(pass);

  function copy(){ try{ navigator.clipboard && navigator.clipboard.writeText(url); }catch(e){} notify('Zoom link copied','link'); }
  function openEdit(){ setDraftUrl(url); setDraftPass(pass); setOpen(true); }
  function save(){ setUrl(draftUrl); setPass(draftPass); setOpen(false); notify('Zoom link updated','check'); }

  return (
    <div className="card" style={{ padding:'15px 16px', display:'flex', flexDirection:'column', gap:12 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <div style={{ width:36, height:36, borderRadius:10, background:'#E5EEFF', color:'#2A6298', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <Icon name="video" size={19} /></div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:14, fontWeight:700 }}>Zoom meeting</div>
          <div style={{ fontSize:11.5, color:'var(--ink-400)' }}>Meeting ID {c.zoom.id}</div>
        </div>
        <button className="btn btn-icon btn-ghost btn-sm" onClick={openEdit} title="Edit link"><Icon name="edit" size={15} /></button>
      </div>

      <button className="btn btn-primary btn-sm" onClick={()=>notify('Starting Zoom meeting: '+c.name,'video')}>
        <Icon name="video" size={16} />Start meeting</button>

      <div style={{ display:'flex', alignItems:'center', gap:8, padding:'9px 11px', background:'var(--surface-3)', borderRadius:'var(--r-sm)' }}>
        <Icon name="link" size={15} style={{ color:'var(--ink-400)', flexShrink:0 }} />
        <span style={{ fontSize:12.5, color:'var(--ink-600)', flex:1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{url.replace('https://','')}</span>
        <button onClick={copy} style={{ fontSize:12, fontWeight:700, color:'var(--a-700)', flexShrink:0 }}>Copy</button>
      </div>

      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:12, color:'var(--ink-500)' }}>
        <span>Passcode <b style={{ color:'var(--ink-700)' }}>{pass}</b></span>
        <span style={{ display:'flex', alignItems:'center', gap:5, color:'var(--success)', fontWeight:600 }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--success)' }}></span>Link active</span>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} width={460} title="Edit Zoom link" sub={c.name}>
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div>
            <label style={{ fontSize:13, fontWeight:600, color:'var(--ink-700)', display:'block', marginBottom:7 }}>Meeting link</label>
            <input className="field" value={draftUrl} onChange={e=>setDraftUrl(e.target.value)} placeholder="https://zoom.us/j/…" />
          </div>
          <div>
            <label style={{ fontSize:13, fontWeight:600, color:'var(--ink-700)', display:'block', marginBottom:7 }}>Passcode</label>
            <input className="field" value={draftPass} onChange={e=>setDraftPass(e.target.value)} />
          </div>
          <div style={{ display:'flex', gap:10, marginTop:4 }}>
            <button className="btn btn-ghost" style={{ flex:1 }} onClick={()=>setOpen(false)}>Cancel</button>
            <button className="btn btn-primary" style={{ flex:1 }} onClick={save}><Icon name="check" size={16} />Save link</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function ClassDetail({ classId, go, notify }){
  const c = VZ.classById(classId);
  const t = VZ.teacherById(c.teacher);
  const [tab, setTab] = React.useState('roster');
  const [exportOpen, setExportOpen] = React.useState(false);
  const roster = c.roster.map(id=>VZ.studentById(id));
  const mats = VZ.materials.filter(m=>m.class===c.id);

  const info = [
    { icon:'teachers', label:'Teacher', value:t.name.replace('Thầy ','').replace('Cô ','').replace('Ms. ','') },
    { icon:'calendar', label:'Schedule', value:c.schedule.map(s=>VZ.DAYS[s.d]+' '+to12(s.s)).join(' · ') },
    { icon:'pin', label:'Room', value:c.room },
    { icon:'students', label:'Students', value:c.students+' enrolled' },
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20, maxWidth:1100 }}>
      <button onClick={()=>go('classes')} style={{ display:'flex', alignItems:'center', gap:6, color:'var(--ink-500)', fontSize:13.5, fontWeight:600, width:'fit-content' }}>
        <Icon name="chevL" size={16} />Back to classes</button>

      {/* Header */}
      <div className="card" style={{ padding:0, overflow:'hidden' }}>
        <div style={{ height:6, background:c.color }}></div>
        <div style={{ padding:'22px 24px', display:'flex', alignItems:'flex-start', gap:20, flexWrap:'wrap' }}>
          <div style={{ flex:1, minWidth:240 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:8 }}>
              <h1 style={{ fontSize:25, fontWeight:700 }}>{c.name}</h1>
              <StatusBadge status={c.status} />
            </div>
            <p style={{ fontSize:14, color:'var(--ink-500)' }}>{c.subject} · {c.level} · since Term 1, 2026</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,auto)', gap:'14px 34px', marginTop:18, width:'fit-content' }}>
              {info.map(x=>(
                <div key={x.label}>
                  <div style={{ display:'flex', alignItems:'center', gap:6, color:'var(--ink-400)', fontSize:12, fontWeight:600, textTransform:'uppercase', letterSpacing:'.05em' }}>
                    <Icon name={x.icon} size={14} />{x.label}</div>
                  <div style={{ fontSize:14.5, fontWeight:600, color:'var(--ink-800)', marginTop:5 }}>{x.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:9, width:250 }}>
            <ZoomPanel c={c} notify={notify} />
            <button className="btn btn-ghost" onClick={()=>setExportOpen(true)}><Icon name="printer" size={16} />Export timetable</button>
            <button className="btn btn-ghost" onClick={()=>notify('Edit class','edit')}><Icon name="edit" size={16} />Edit class</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:4, borderBottom:'1px solid var(--line)' }}>
        {[['roster','Roster '+roster.length],['schedule','Schedule'],['materials','Materials '+mats.length]].map(([v,l])=>(
          <button key={v} onClick={()=>setTab(v)} style={{
            padding:'11px 16px', fontFamily:'var(--font-head)', fontWeight:600, fontSize:14,
            color: tab===v?'var(--brand)':'var(--ink-500)', borderBottom:'2px solid '+(tab===v?'var(--brand)':'transparent'), marginBottom:-1 }}>{l}</button>
        ))}
      </div>

      {tab==='roster' && (
        <div className="card" style={{ padding:'8px 4px' }}>
          {roster.map((s,i)=>(
            <div key={s.id} style={{ display:'flex', alignItems:'center', gap:13, padding:'12px 18px', borderTop:i?'1px solid var(--line-soft)':'none' }}>
              <Avatar name={s.name} short={s.short} color={s.color} size={38} />
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14.5, fontWeight:600 }}>{s.name}</div>
                <div style={{ fontSize:12.5, color:'var(--ink-400)' }}>{s.year}</div>
              </div>
              <div style={{ width:130, display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ flex:1, height:6, borderRadius:99, background:'var(--surface-3)', overflow:'hidden' }}>
                  <div style={{ width:(78+i*2)+'%', height:'100%', background:'var(--accent)' }}></div>
                </div>
                <span style={{ fontSize:12, color:'var(--ink-500)', fontWeight:600 }}>{78+i*2}%</span>
              </div>
              <button className="btn btn-sm btn-soft" onClick={()=>notify('Material sent to '+s.name,'send')}><Icon name="send" size={14} />Send</button>
            </div>
          ))}
        </div>
      )}

      {tab==='schedule' && (
        <div className="card" style={{ padding:'20px 22px' }}>
          <h3 style={{ fontSize:15.5, fontWeight:700, marginBottom:14 }}>Weekly sessions</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {c.schedule.map((s,i)=>(
              <div key={i} style={{ display:'flex', alignItems:'center', gap:14, padding:'13px 16px', background:'var(--surface-2)', borderRadius:'var(--r-md)' }}>
                <div style={{ width:44, height:44, borderRadius:11, background:c.color+'1a', color:c.color, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-head)', fontWeight:700 }}>
                  <span style={{ fontSize:13 }}>{VZ.DAYS[s.d]}</span></div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14.5, fontWeight:600 }}>{VZ.DAYS_FULL[s.d]}</div>
                  <div style={{ fontSize:13, color:'var(--ink-500)' }}>{to12(s.s)} – {to12(s.e)} · {c.room}</div>
                </div>
                <button className="btn btn-sm btn-ghost" onClick={()=>notify('Edit session','edit')}><Icon name="edit" size={14} />Edit</button>
              </div>
            ))}
          </div>
          <button className="btn btn-soft btn-sm" style={{ marginTop:14 }} onClick={()=>notify('Add session','plus')}><Icon name="plus" size={15} />Add a session</button>
        </div>
      )}

      {tab==='materials' && <ClassMaterials c={c} notify={notify} />}

      <Modal open={exportOpen} onClose={()=>setExportOpen(false)} width={620} title="Export timetable" sub={'A clean '+c.name+' timetable, ready to print or share'}>
        <TimetableExport c={c} notify={notify} />
      </Modal>
    </div>
  );
}

function ClassMaterials({ c, notify }){
  const mats = VZ.materials.filter(m=>m.class===c.id);
  const bySession = {};
  mats.forEach(m=>{ (bySession[m.session]=bySession[m.session]||[]).push(m); });
  const [sendOpen, setSendOpen] = React.useState(null);
  return (
    <div className="card" style={{ padding:'18px 20px' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
        <h3 style={{ fontSize:15.5, fontWeight:700 }}>Materials by session</h3>
        <button className="btn btn-primary btn-sm" onClick={()=>notify('Upload material','upload')}><Icon name="upload" size={15} />Upload</button>
      </div>
      {Object.keys(bySession).map(sess=>(
        <div key={sess} style={{ marginBottom:18 }}>
          <div className="kicker" style={{ marginBottom:10 }}>{sess}</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {bySession[sess].map(m=>(
              <div key={m.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 12px', border:'1px solid var(--line)', borderRadius:'var(--r-md)' }}>
                <FileIcon type={m.type} size={40} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13.5, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{m.title}</div>
                  <div style={{ fontSize:12, color:'var(--ink-400)' }}>{m.size} · {m.date} · {m.to==='class'?'Whole class':'Sent to '+m.to}</div>
                </div>
                {m.to!=='class' && <span className="tag" style={{ background:'var(--a-50)', color:'var(--a-700)' }}>Individual</span>}
                <button className="btn btn-sm btn-soft" onClick={()=>setSendOpen(m)}><Icon name="send" size={14} />Send</button>
              </div>
            ))}
          </div>
        </div>
      ))}
      <SendMaterialSheet material={sendOpen} c={c} onClose={()=>setSendOpen(null)} notify={notify} />
    </div>
  );
}

function SendMaterialSheet({ material, c, onClose, notify }){
  const [mode, setMode] = React.useState('class');
  const [picked, setPicked] = React.useState([]);
  if(!material) return null;
  const roster = c.roster.map(id=>VZ.studentById(id));
  function toggle(id){ setPicked(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]); }
  function send(){ notify(mode==='class'?'Sent to whole class ('+c.students+')':'Sent to '+picked.length+' student(s)','send'); onClose(); }
  return (
    <Modal open={!!material} onClose={onClose} width={460} title="Send material" sub={material.title}>
      <Segmented value={mode} onChange={setMode} options={[{value:'class',label:'Whole class',icon:'students'},{value:'individual',label:'Individuals',icon:'user'}]} />
      {mode==='individual' && (
        <div style={{ marginTop:16, maxHeight:230, overflowY:'auto', display:'flex', flexDirection:'column', gap:4 }}>
          {roster.map(s=>(
            <label key={s.id} style={{ display:'flex', alignItems:'center', gap:11, padding:'8px 8px', borderRadius:'var(--r-sm)', cursor:'pointer', background:picked.includes(s.id)?'var(--a-50)':'transparent' }}>
              <input type="checkbox" checked={picked.includes(s.id)} onChange={()=>toggle(s.id)} style={{ width:17, height:17, accentColor:'var(--accent)' }} />
              <Avatar name={s.name} short={s.short} color={s.color} size={30} />
              <span style={{ fontSize:14, fontWeight:500, flex:1 }}>{s.name}</span>
              <span style={{ fontSize:12, color:'var(--ink-400)' }}>{s.year}</span>
            </label>
          ))}
        </div>
      )}
      <button className="btn btn-primary" style={{ width:'100%', marginTop:18, padding:'12px' }} onClick={send}
        disabled={mode==='individual'&&!picked.length}>
        <Icon name="send" size={16} />{mode==='class'?'Send to whole class':'Send to '+picked.length+' selected'}</button>
    </Modal>
  );
}

Object.assign(window, { ClassList, ClassDetail, ClassMaterials, SendMaterialSheet, ZoomPanel });
