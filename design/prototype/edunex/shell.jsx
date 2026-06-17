/* EduNex — Admin shell: sidebar + topbar + router (Zalo add-on removed) */

function AdminApp({ onSignOut, dashVariant, setDashVariant, initialView='dashboard', initialClassId=null, initialStudentId=null }) {
  const [view, setView] = React.useState(initialView);
  const [classId, setClassId] = React.useState(initialClassId);
  const [studentId, setStudentId] = React.useState(initialStudentId);
  const [toasts, setToasts] = React.useState([]);

  const notify = React.useCallback((msg, icon='check') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, msg, icon }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  }, []);

  function go(v, cid=null, sid=null){ setView(v); setClassId(cid); setStudentId(sid); }
  const openClass = (id) => go('class', id);
  const openStudent = (id) => go('studentDetail', null, id);

  const NAV = [
    { group:'Main', items:[
      { id:'dashboard', label:'Dashboard', icon:'dashboard' },
      { id:'classes',   label:'Classes',   icon:'classes' },
      { id:'calendar',  label:'Timetable', icon:'calendar' },
      { id:'materials', label:'Materials', icon:'materials' },
    ]},
    { group:'People', items:[
      { id:'teachers', label:'Teachers', icon:'teachers' },
      { id:'students', label:'Students', icon:'students' },
    ]},
  ];

  const titles = {
    dashboard:'Dashboard', classes:'Classes', class:'Class details',
    calendar:'Timetable', materials:'Materials', teachers:'Teachers',
    students:'Students', settings:'Settings', studentDetail:'Student details',
  };

  let content;
  if (view==='dashboard') content = <AdminDashboard variant={dashVariant} setVariant={setDashVariant} go={go} openClass={openClass} notify={notify} />;
  else if (view==='classes') content = <ClassList openClass={openClass} notify={notify} />;
  else if (view==='class') content = <ClassDetail classId={classId} go={go} notify={notify} />;
  else if (view==='calendar') content = <CalendarView openClass={openClass} notify={notify} />;
  else if (view==='materials') content = <MaterialsLibrary notify={notify} />;
  else if (view==='teachers') content = <PeopleView kind="teachers" openClass={openClass} />;
  else if (view==='students') content = <PeopleView kind="students" openStudent={openStudent} />;
  else if (view==='studentDetail') content = <StudentDetail studentId={studentId} go={go} notify={notify} />;
  else if (view==='settings') content = <SettingsView notify={notify} />;

  return (
    <div className="app-scope" style={{ height:'100%', display:'flex', background:'var(--bg)', overflow:'hidden', fontFamily:'var(--font-body)' }}>
      {/* Sidebar */}
      <aside style={{
        width:250, flexShrink:0, background:'linear-gradient(180deg, var(--p-800), var(--p-900))',
        display:'flex', flexDirection:'column', padding:'20px 14px', gap:6,
      }}>
        <div style={{ padding:'4px 8px 14px' }}><Logo size={32} light textSize={20} /></div>

        <button className="btn" style={{ background:'var(--accent)', color:'var(--ink-900)', justifyContent:'flex-start',
          margin:'0 2px 8px', padding:'10px 12px' }}
          onClick={()=>notify('New class form opened','plus')}>
          <Icon name="plus" size={18} /> New class
        </button>

        <div style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:4 }}>
          {NAV.map(grp=>(
            <div key={grp.group} style={{ marginBottom:6 }}>
              <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase',
                color:'var(--p-300)', padding:'8px 12px 6px', opacity:.8 }}>{grp.group}</div>
              {grp.items.map(it=>(
                <div key={it.id} className={'navlink'+((view===it.id||(it.id==='classes'&&view==='class')||(it.id==='students'&&view==='studentDetail'))?' is-active':'')}
                  onClick={()=>go(it.id)}>
                  <Icon name={it.icon} size={19} />{it.label}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="navlink" onClick={()=>go('settings')} style={{ color: view==='settings'?'#fff':'var(--p-100)' }}>
          <Icon name="settings" size={19} /> Settings
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 8px 4px', borderTop:'1px solid rgba(255,255,255,.10)', marginTop:4 }}>
          <Avatar name="Vũ Lan Phương" short="LP" color="var(--accent)" size={34} />
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ color:'#fff', fontSize:13.5, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>Vũ Lan Phương</div>
            <div style={{ color:'var(--p-300)', fontSize:11.5 }}>EduNex admin</div>
          </div>
          <button onClick={onSignOut} title="Sign out" style={{ color:'var(--p-200)', padding:6, borderRadius:7 }}>
            <Icon name="logout" size={17} />
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div style={{ flex:1, minWidth:0, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <header style={{
          height:64, flexShrink:0, background:'var(--surface)', borderBottom:'1px solid var(--line)',
          display:'flex', alignItems:'center', padding:'0 26px', gap:16,
        }}>
          <h2 style={{ fontSize:19, fontWeight:700 }}>{titles[view]}</h2>
          <div style={{ flex:1 }}></div>
          <div style={{ display:'flex', alignItems:'center', gap:8,
            background:'var(--surface-3)', borderRadius:'var(--r-sm)', padding:'0 12px', height:38, width:240 }}>
            <Icon name="search" size={17} style={{ color:'var(--ink-400)' }} />
            <input placeholder="Search classes, students…" style={{ border:'none', background:'transparent', fontSize:13.5, flex:1, outline:'none', color:'var(--ink-700)' }} />
          </div>
          <button className="btn btn-icon btn-ghost" style={{ position:'relative' }} onClick={()=>notify('3 new notifications','bell')}>
            <Icon name="bell" size={19} />
            <span style={{ position:'absolute', top:7, right:8, width:7, height:7, borderRadius:'50%', background:'var(--danger)', border:'1.5px solid #fff' }}></span>
          </button>
        </header>

        <main className="scroll-y" style={{ flex:1, minHeight:0, padding:'26px 28px 40px' }}>
          <div key={view+(classId||'')+(studentId||'')}>{content}</div>
        </main>
      </div>

      {/* Toasts */}
      <div style={{ position:'absolute', bottom:22, left:'50%', transform:'translateX(-50%)', zIndex:200,
        display:'flex', flexDirection:'column', gap:10, alignItems:'center', pointerEvents:'none' }}>
        {toasts.map(t=>(
          <div key={t.id} className="rise" style={{
            display:'flex', alignItems:'center', gap:10, background:'var(--ink-900)', color:'#fff',
            padding:'11px 16px', borderRadius:'var(--r-pill)', boxShadow:'var(--sh-pop)', fontSize:13.5, fontWeight:500,
          }}>
            <span style={{ display:'flex', color:'var(--a-400)' }}><Icon name={t.icon} size={17} /></span>{t.msg}
          </div>
        ))}
      </div>
    </div>
  );
}
window.AdminApp = AdminApp;
