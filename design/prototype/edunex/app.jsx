/* EduNex · Prototype harness: tooling bar + scaling stage + tweaks */
const { useState, useRef, useLayoutEffect, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": ["#242832","#1C1F26","#15171C"],
  "accent": "#F2B400",
  "radius": 1,
  "headFont": "Bricolage Grotesque",
  "dash": "Balanced"
}/*EDITMODE-END*/;

const DASH_KEY = { Balanced:'a', 'Schedule-first':'b', 'Class grid':'c' };
const DASH_LABEL = { a:'Balanced', b:'Schedule-first', c:'Class grid' };

function Stage({ w, h, pad=56, children }){
  const ref = useRef(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(()=>{
    const el = ref.current; if(!el) return;
    const measure = ()=>{ const aw=el.clientWidth-pad, ah=el.clientHeight-pad; setScale(Math.max(0.2, Math.min(aw/w, ah/h, 1))); };
    measure();
    const ro = new ResizeObserver(measure); ro.observe(el);
    return ()=>ro.disconnect();
  },[w,h,pad]);
  return (
    <div ref={ref} style={{ flex:1, minHeight:0, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
      <div style={{ width:w, height:h, transform:`scale(${scale})`, flexShrink:0, transition:'transform .18s ease' }}>{children}</div>
    </div>
  );
}

function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = useState('landing');
  const [znsOn, setZnsOn] = useState(true);

  const dashVariant = DASH_KEY[t.dash] || 'a';
  const setDashVariant = (key)=> setTweak('dash', DASH_LABEL[key] || 'Balanced');

  const theme = Array.isArray(t.theme) ? t.theme : ['#242832','#1C1F26','#15171C'];
  const rootStyle = {
    '--p-700':theme[0], '--p-800':theme[1], '--p-900':theme[2],
    '--brand':theme[0], '--brand-strong':theme[1], '--accent':t.accent,
    '--radius-scale':t.radius,
    '--font-head':`'${t.headFont}', 'Plus Jakarta Sans', system-ui, sans-serif`,
  };

  const TABS = [['landing','Landing','home'],['login','Login','lock'],['admin','Admin · desktop','dashboard'],['teacher','Teacher · desktop','teachers'],['student','Student · mobile','user'],['wireframe','Wireframe','grid']];

  return (
    <div style={{ ...rootStyle, height:'100vh', display:'flex', flexDirection:'column', background:'#201E1A' }}>
      {/* Tooling bar */}
      <header style={{ flexShrink:0, height:54, background:'#16140F', borderBottom:'1px solid #2c2820',
        display:'flex', alignItems:'center', gap:18, padding:'0 18px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <Logo size={26} light textSize={15} />
          <span style={{ color:'#8a7f6a', fontSize:12, fontWeight:600, borderLeft:'1px solid #3a342a', paddingLeft:12, fontFamily:'var(--font-head)' }}>LMS Prototype</span>
        </div>
        <div style={{ flex:1 }}></div>
        <div style={{ display:'inline-flex', background:'#221f18', borderRadius:10, padding:4, gap:3 }}>
          {TABS.map(([id,label,icon])=>{
            const on = screen===id;
            return (
              <button key={id} onClick={()=>setScreen(id)} style={{
                display:'inline-flex', alignItems:'center', gap:7, padding:'7px 14px', borderRadius:7,
                fontFamily:'var(--font-head)', fontWeight:600, fontSize:13,
                background: on?'var(--a-600)':'transparent', color: on?'#15171C':'#9a8f78', transition:'all .15s' }}>
                <Icon name={icon} size={15} />{label}
              </button>
            );
          })}
        </div>
        <div style={{ flex:1 }}></div>
        <span style={{ color:'#8a7f6a', fontSize:12, display:'flex', alignItems:'center', gap:6 }}>
          <Icon name="sparkle" size={14} style={{ color:'#b8a984' }} />Tweaks: theme · layout</span>
      </header>

      {/* Stage */}
      {screen==='landing' && (
        <Stage w={1280} h={800} key="landing">
          <ChromeWindow width={1280} height={800} url="edunex.co.nz" tabs={[{title:'EduNex · Learn More · Achieve More'}]}>
            <iframe src="EduNex Landing.html" title="EduNex Landing" style={{ width:'100%', height:'100%', border:'none', display:'block' }}></iframe>
          </ChromeWindow>
        </Stage>
      )}
      {screen==='login' && (
        <Stage w={1180} h={720} key="login">
          <ChromeWindow width={1180} height={720} url="app.edunex.co.nz/login" tabs={[{title:'EduNex · Sign in'}]}>
            <LoginScreen onSignIn={(role)=> setScreen(role==='student'?'student':role==='coach'?'teacher':'admin')} />
          </ChromeWindow>
        </Stage>
      )}
      {screen==='admin' && (
        <Stage w={1320} h={840} key="admin">
          <ChromeWindow width={1320} height={840} url="app.edunex.co.nz/dashboard" tabs={[{title:'EduNex · Dashboard'}]}>
            <AdminApp onSignOut={()=>setScreen('login')} dashVariant={dashVariant} setDashVariant={setDashVariant} />
          </ChromeWindow>
        </Stage>
      )}
      {screen==='teacher' && (
        <Stage w={1320} h={840} key="teacher">
          <ChromeWindow width={1320} height={840} url="app.edunex.co.nz/teacher" tabs={[{title:'EduNex · Coach'}]}>
            <TeacherApp onSignOut={()=>setScreen('login')} />
          </ChromeWindow>
        </Stage>
      )}
      {screen==='student' && (
        <Stage w={402} h={860} key="student">
          <IOSDevice width={402} height={860}>
            <StudentApp onSignOut={()=>setScreen('login')} initialAuthed={false} />
          </IOSDevice>
        </Stage>
      )}
      {screen==='wireframe' && (
        <Stage w={1180} h={760} key="wire">
          <div style={{ width:1180, height:760, borderRadius:12, overflow:'hidden', boxShadow:'0 24px 70px rgba(0,0,0,.4)', border:'1px solid #cdd5dd', display:'flex', flexDirection:'column', background:'#dfe4e9' }}>
            <div style={{ height:34, background:'#cdd5dd', display:'flex', alignItems:'center', gap:7, padding:'0 14px' }}>
              <span style={{ width:11, height:11, borderRadius:99, background:'#aab4bf' }}></span>
              <span style={{ width:11, height:11, borderRadius:99, background:'#aab4bf' }}></span>
              <span style={{ width:11, height:11, borderRadius:99, background:'#aab4bf' }}></span>
              <span style={{ marginLeft:12, fontFamily:'ui-monospace,Menlo,monospace', fontSize:11.5, color:'#6b7884' }}>wireframes · structure exploration</span>
            </div>
            <div style={{ flex:1, minHeight:0 }}><WireframeView /></div>
          </div>
        </Stage>
      )}

      {/* Tweaks */}
      <TweaksPanel>
        <TweakSection label="Brand" />
        <TweakColor label="Theme" value={t.theme} onChange={v=>setTweak('theme',v)}
          options={[['#242832','#1C1F26','#15171C'],['#2A2620','#201D17','#15120D'],['#23303B','#1A2630','#101A22'],['#2E2A3A','#241F30','#181426']]} />
        <TweakColor label="Accent" value={t.accent} onChange={v=>setTweak('accent',v)}
          options={['#F2B400','#E0A200','#C9821F','#E8852E']} />
        <TweakSection label="Style" />
        <TweakSlider label="Corner radius" value={t.radius} min={0.5} max={1.5} step={0.1} onChange={v=>setTweak('radius',v)} />
        <TweakSelect label="Heading font" value={t.headFont} options={['Bricolage Grotesque','Plus Jakarta Sans','Manrope','Sora']} onChange={v=>setTweak('headFont',v)} />
        <TweakSection label="Dashboard" />
        <TweakRadio label="Layout" value={t.dash} options={['Balanced','Schedule-first','Class grid']} onChange={v=>setTweak('dash',v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
