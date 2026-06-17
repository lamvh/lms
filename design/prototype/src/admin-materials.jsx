/* Vina NZ — Materials library (standalone) */

function MaterialsLibrary({ notify }){
  const [cls, setCls] = React.useState('all');
  const [q, setQ] = React.useState('');
  const [sendOpen, setSendOpen] = React.useState(null);
  const [uploadOpen, setUploadOpen] = React.useState(false);

  let mats = VZ.materials;
  if(cls!=='all') mats = mats.filter(m=>m.class===cls);
  if(q) mats = mats.filter(m=>m.title.toLowerCase().includes(q.toLowerCase()));

  // group by class then session
  const byClass = {};
  mats.forEach(m=>{ (byClass[m.class]=byClass[m.class]||[]).push(m); });

  const classesWithMats = VZ.classes.filter(c=>VZ.materials.some(m=>m.class===c.id));

  return (
    <div style={{ display:'flex', gap:20, maxWidth:1180, alignItems:'flex-start' }}>
      {/* Filter rail */}
      <div className="card" style={{ width:230, flexShrink:0, padding:'14px 12px', position:'sticky', top:0 }}>
        <div className="kicker" style={{ padding:'4px 8px 10px' }}>Classes</div>
        <button onClick={()=>setCls('all')} style={navItemStyle(cls==='all')}>
          <Icon name="materials" size={17} /><span style={{ flex:1, textAlign:'left' }}>All materials</span><span style={{ fontSize:12, color:'var(--ink-400)' }}>{VZ.materials.length}</span></button>
        {classesWithMats.map(c=>(
          <button key={c.id} onClick={()=>setCls(c.id)} style={navItemStyle(cls===c.id)}>
            <span style={{ width:9, height:9, borderRadius:3, background:c.color, flexShrink:0 }}></span>
            <span style={{ flex:1, textAlign:'left', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.name}</span>
            <span style={{ fontSize:12, color:'var(--ink-400)' }}>{VZ.materials.filter(m=>m.class===c.id).length}</span></button>
        ))}
      </div>

      {/* Main */}
      <div style={{ flex:1, minWidth:0, display:'flex', flexDirection:'column', gap:18 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
          <div>
            <h1 style={{ fontSize:23, fontWeight:700 }}>Materials</h1>
            <p style={{ fontSize:14, color:'var(--ink-500)', marginTop:4 }}>Organised by class and session — upload once, send to a class or an individual.</p>
          </div>
          <div style={{ flex:1 }}></div>
          <div style={{ display:'flex', alignItems:'center', gap:8, background:'var(--surface)', border:'1px solid var(--line)', borderRadius:'var(--r-sm)', padding:'0 12px', height:38, width:200 }}>
            <Icon name="search" size={16} style={{ color:'var(--ink-400)' }} />
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search files…" style={{ border:'none', background:'transparent', flex:1, outline:'none', fontSize:13.5 }} />
          </div>
          <button className="btn btn-primary btn-sm" onClick={()=>setUploadOpen(true)}><Icon name="upload" size={16} />Upload</button>
        </div>

        {Object.keys(byClass).map(cid=>{
          const c = VZ.classById(cid);
          const list = byClass[cid];
          const bySession = {}; list.forEach(m=>{ (bySession[m.session]=bySession[m.session]||[]).push(m); });
          return (
            <div key={cid} className="card" style={{ padding:'18px 20px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                <span style={{ width:10, height:10, borderRadius:3, background:c.color }}></span>
                <h3 style={{ fontSize:16, fontWeight:700 }}>{c.name}</h3>
                <span className="tag">{list.length} files</span>
              </div>
              {Object.keys(bySession).map(sess=>(
                <div key={sess} style={{ marginBottom:14 }}>
                  <div className="kicker" style={{ marginBottom:9 }}>{sess}</div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:9 }}>
                    {bySession[sess].map(m=>(
                      <div key={m.id} style={{ display:'flex', alignItems:'center', gap:11, padding:'10px 11px', border:'1px solid var(--line)', borderRadius:'var(--r-md)' }}>
                        <FileIcon type={m.type} size={38} />
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontSize:13, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{m.title}</div>
                          <div style={{ fontSize:11.5, color:'var(--ink-400)' }}>{m.size} · {m.date} · {m.to==='class'?'Whole class':m.to}</div>
                        </div>
                        <button className="btn btn-icon btn-soft btn-sm" onClick={()=>setSendOpen(m)}><Icon name="send" size={15} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {sendOpen && <SendMaterialSheet material={sendOpen} c={VZ.classById(sendOpen.class)} onClose={()=>setSendOpen(null)} notify={notify} />}
      <Modal open={uploadOpen} onClose={()=>setUploadOpen(false)} width={460} title="Upload material" sub="Add a file to a class session">
        <UploadForm onClose={()=>setUploadOpen(false)} notify={notify} />
      </Modal>
    </div>
  );
}

function navItemStyle(on){
  return { display:'flex', alignItems:'center', gap:10, width:'100%', padding:'9px 10px', borderRadius:'var(--r-sm)',
    fontSize:13.5, fontWeight:600, color: on?'var(--brand)':'var(--ink-600)', background: on?'var(--p-50)':'transparent',
    marginBottom:2, transition:'background .15s' };
}

function UploadForm({ onClose, notify }){
  const [cls, setCls] = React.useState(VZ.classes[0].id);
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      <div style={{ border:'2px dashed var(--line)', borderRadius:'var(--r-md)', padding:'28px', textAlign:'center', color:'var(--ink-400)' }}>
        <div style={{ width:46, height:46, borderRadius:12, background:'var(--p-50)', color:'var(--brand)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}><Icon name="upload" size={22} /></div>
        <div style={{ fontSize:14, fontWeight:600, color:'var(--ink-700)' }}>Drag a file here or click to browse</div>
        <div style={{ fontSize:12.5, marginTop:4 }}>PDF, DOC, slides, audio or video</div>
      </div>
      <div>
        <label style={{ fontSize:13, fontWeight:600, color:'var(--ink-700)', display:'block', marginBottom:7 }}>Class</label>
        <select value={cls} onChange={e=>setCls(e.target.value)} className="field">
          {VZ.classes.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div>
        <label style={{ fontSize:13, fontWeight:600, color:'var(--ink-700)', display:'block', marginBottom:7 }}>Session label</label>
        <input className="field" placeholder="e.g. Buổi 15 · Reading" />
      </div>
      <button className="btn btn-primary" style={{ padding:'12px', marginTop:4 }} onClick={()=>{notify('Material uploaded','upload'); onClose();}}>Upload & continue</button>
    </div>
  );
}

window.MaterialsLibrary = MaterialsLibrary;
