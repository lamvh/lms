/* Vina NZ — Zalo Notifications (ZNS) add-on · clearly separate, toggleable */

function ZaloView({ znsOn, setZnsOn, notify }){
  const [tpls, setTpls] = React.useState(VZ.templates);
  const [edit, setEdit] = React.useState(null);
  function toggleTpl(id){ setTpls(t=>t.map(x=>x.id===id?{...x,on:!x.on}:x)); }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20, maxWidth:1120 }}>
      {/* Add-on banner */}
      <div style={{ display:'flex', alignItems:'center', gap:18, padding:'20px 24px', borderRadius:'var(--r-xl)',
        background: znsOn?'linear-gradient(120deg,#063, #0068FF11)':'var(--surface)', border:'1px solid '+(znsOn?'transparent':'var(--line)'),
        backgroundColor: znsOn?'var(--zalo-bg)':'var(--surface)' }}>
        <div style={{ width:54, height:54, borderRadius:15, background:'var(--zalo)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <Icon name="zalo" size={28} /></div>
        <div style={{ flex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <h1 style={{ fontSize:20, fontWeight:700 }}>Zalo Notifications</h1>
            <span className="tag" style={{ background:'var(--p-50)', color:'var(--brand)' }}>Optional add-on</span>
          </div>
          <p style={{ fontSize:13.5, color:'var(--ink-500)', marginTop:5, maxWidth:560 }}>
            Automatically send lesson reminders, new-material alerts and cancellations to your Zalo groups (ZNS).
            This module is separate from the core LMS — turn it on only if your centre needs it.</p>
        </div>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:7 }}>
          <Toggle on={znsOn} onChange={v=>{ setZnsOn(v); notify(v?'Zalo notifications enabled':'Zalo notifications disabled','zalo'); }} size={30} />
          <span style={{ fontSize:12, fontWeight:700, color: znsOn?'var(--a-600)':'var(--ink-400)' }}>{znsOn?'ENABLED':'DISABLED'}</span>
        </div>
      </div>

      {!znsOn ? (
        <div className="card" style={{ padding:'40px', textAlign:'center' }}>
          <div style={{ width:60, height:60, borderRadius:16, background:'var(--surface-3)', color:'var(--ink-300)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}><Icon name="bell" size={28} /></div>
          <h3 style={{ fontSize:17, fontWeight:700 }}>This add-on is turned off</h3>
          <p style={{ fontSize:14, color:'var(--ink-500)', marginTop:8, maxWidth:420, margin:'8px auto 0' }}>Enable Zalo Notifications above to configure message templates and review the send log. The core LMS works fully without it.</p>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:20, alignItems:'start' }}>
          {/* Templates */}
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <h3 style={{ fontSize:16, fontWeight:700 }}>Message templates</h3>
            {tpls.map(t=>(
              <div key={t.id} className="card" style={{ padding:'16px 18px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:38, height:38, borderRadius:10, background:'var(--zalo-bg)', color:'var(--zalo)', display:'flex', alignItems:'center', justifyContent:'center' }}><Icon name="msg" size={18} /></div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14.5, fontWeight:700 }}>{t.name}</div>
                    <div style={{ fontSize:12, color:'var(--ink-400)' }}>{t.on?'Active':'Paused'}</div>
                  </div>
                  <button className="btn btn-sm btn-ghost" onClick={()=>setEdit(t)}><Icon name="edit" size={14} />Edit</button>
                  <Toggle on={t.on} onChange={()=>toggleTpl(t.id)} size={24} />
                </div>
                <div style={{ marginTop:12, padding:'11px 13px', background:'var(--surface-2)', borderRadius:'var(--r-sm)', fontSize:13, color:'var(--ink-600)', lineHeight:1.5 }}>
                  {t.preview.split(/(\{[^}]+\})/).map((part,i)=> part.startsWith('{')
                    ? <span key={i} style={{ color:'var(--zalo)', fontWeight:600, background:'var(--zalo-bg)', padding:'1px 5px', borderRadius:5 }}>{part}</span>
                    : <span key={i}>{part}</span>)}
                </div>
              </div>
            ))}
          </div>

          {/* Log */}
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <div className="card" style={{ padding:'15px 16px' }}>
                <div style={{ fontFamily:'var(--font-head)', fontSize:26, fontWeight:700, color:'var(--a-600)' }}>40</div>
                <div style={{ fontSize:12.5, color:'var(--ink-500)' }}>Sent today</div>
              </div>
              <div className="card" style={{ padding:'15px 16px' }}>
                <div style={{ fontFamily:'var(--font-head)', fontSize:26, fontWeight:700, color:'var(--danger)' }}>1</div>
                <div style={{ fontSize:12.5, color:'var(--ink-500)' }}>Failed</div>
              </div>
            </div>
            <div className="card" style={{ padding:'4px 0' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 18px 10px' }}>
                <h3 style={{ fontSize:15, fontWeight:700 }}>Send log</h3>
                <button className="btn btn-sm btn-zalo" onClick={()=>notify('Test message sent','zalo')}><Icon name="send" size={14} />Send test</button>
              </div>
              {VZ.znsLog.map((z,i)=>(
                <div key={z.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 18px', borderTop:'1px solid var(--line-soft)' }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background: z.status==='sent'?'var(--a-500)':'var(--danger)', flexShrink:0 }}></div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13.5, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{z.tpl}</div>
                    <div style={{ fontSize:12, color:'var(--ink-400)' }}>{z.class} · {z.recipients} recipients</div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <span className={'badge '+(z.status==='sent'?'badge-active':'badge-warn')} style={{ fontSize:11 }}>
                      <span className="dot"></span>{z.status==='sent'?'Delivered':'Failed'}</span>
                    <div style={{ fontSize:11, color:'var(--ink-400)', marginTop:3 }}>{z.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Modal open={!!edit} onClose={()=>setEdit(null)} width={500} title={edit&&('Edit · '+edit.name)} sub="Use variables like {student}, {class}, {time}, {room}.">
        {edit && (
          <div>
            <textarea className="field" defaultValue={edit.preview} style={{ minHeight:120, resize:'vertical', lineHeight:1.5 }} />
            <div style={{ display:'flex', gap:7, flexWrap:'wrap', marginTop:12 }}>
              {['{student}','{class}','{time}','{room}','{date}','{material}','{zalo}'].map(v=><span key={v} className="tag" style={{ background:'var(--zalo-bg)', color:'var(--zalo)', cursor:'pointer' }}>{v}</span>)}
            </div>
            <button className="btn btn-primary" style={{ width:'100%', marginTop:18, padding:'12px' }} onClick={()=>{notify('Template saved','check'); setEdit(null);}}>Save template</button>
          </div>
        )}
      </Modal>
    </div>
  );
}

window.ZaloView = ZaloView;
