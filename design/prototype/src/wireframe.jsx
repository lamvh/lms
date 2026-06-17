/* EduNex — Low-fi wireframes (structure exploration)
   Screens: Login · Admin dashboard · Teacher desktop · Student mobile.
   Pure greyscale boxes so structure reads before visual design. */

/* ---- shared primitives ---- */
const WF = {
  ink:'#7e8b97', faint:'#9aa6b2', line:'#cdd5dd', soft:'#d4dae1',
  fill:'#fff', panel:'#e2e7ec', bg:'#eef1f4', chip:'#dde3e9', dark:'#c2cad3',
  mono:'ui-monospace, Menlo, Monaco, monospace',
};
const wfLine = (w='100%', c=WF.soft, h=10)=> <div style={{ width:w, height:h, borderRadius:4, background:c, flexShrink:0 }}></div>;
const wfBox = (h, label='', opts={})=> (
  <div style={{ border:'1.5px solid '+WF.line, borderRadius:8, background:opts.fill||WF.fill, height:h,
    display:'flex', alignItems:'center', justifyContent:'center', color:WF.faint,
    fontFamily:WF.mono, fontSize:12, ...opts.style }}>{label}</div>
);
const wfTag = (t)=> <div style={{ fontFamily:WF.mono, fontSize:12, color:'#56708a' }}>{t}</div>;
const wfDot = (c=WF.dark, s=9, r=2)=> <div style={{ width:s, height:s, borderRadius:r, background:c, flexShrink:0 }}></div>;

/* =========================================================
   1 · LOGIN
   ========================================================= */
function WFLogin(){
  return (
    <div style={{ display:'flex', height:'100%', fontFamily:WF.mono }}>
      {/* brand panel */}
      <div style={{ width:'46%', background:WF.panel, borderRight:'1.5px solid '+WF.line, padding:42,
        display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>{wfBox(32,'',{style:{width:32,borderRadius:8,background:WF.dark,border:'none'}})}{wfLine(90,WF.dark,14)}</div>
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {wfLine('80%',WF.dark,22)}{wfLine('62%',WF.dark,22)}
          <div style={{ height:6 }}></div>
          {wfLine('90%')}{wfLine('72%')}
          <div style={{ display:'flex', gap:10, marginTop:10 }}>{[0,1,2].map(i=>wfBox(48,'',{key:i,style:{flex:1,borderStyle:'dashed'}}))}</div>
        </div>
        <div style={{ fontSize:11, color:WF.faint }}>// illustration / value prop</div>
      </div>
      {/* form */}
      <div style={{ flex:1, background:WF.bg, display:'flex', alignItems:'center', justifyContent:'center', padding:42 }}>
        <div style={{ width:340, display:'flex', flexDirection:'column', gap:16 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>{wfLine(140,WF.dark,18)}{wfLine(200)}</div>
          {/* role switch */}
          <div style={{ display:'flex', gap:6, background:WF.chip, borderRadius:8, padding:4 }}>
            {['Admin','Coach','Student'].map((r,i)=>(
              <div key={r} style={{ flex:1, height:30, borderRadius:6, background:i===0?WF.fill:'transparent', border:i===0?'1.5px solid '+WF.line:'none',
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, color:i===0?WF.ink:WF.faint }}>{r}</div>
            ))}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>{wfLine(60,WF.soft,8)}{wfBox(40,'email',{style:{justifyContent:'flex-start',paddingLeft:12}})}</div>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>{wfLine(70,WF.soft,8)}{wfBox(40,'password',{style:{justifyContent:'flex-start',paddingLeft:12}})}</div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div style={{ display:'flex', alignItems:'center', gap:7 }}>{wfBox(16,'',{style:{width:16,borderRadius:4}})}{wfLine(70,WF.soft,8)}</div>
            {wfLine(80,WF.soft,8)}
          </div>
          {wfBox(44,'Sign in →',{style:{background:WF.dark,border:'none',color:'#fff'}})}
          <div style={{ textAlign:'center' }}>{wfLine(160,WF.soft,8)}</div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   2 · ADMIN DASHBOARD
   ========================================================= */
function WFAdmin(){
  return (
    <div style={{ width:'100%', height:'100%', background:WF.bg, display:'flex', fontFamily:WF.mono, color:WF.ink }}>
      {/* sidebar */}
      <div style={{ width:200, background:WF.panel, borderRight:'1.5px solid '+WF.line, padding:18, display:'flex', flexDirection:'column', gap:10 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>{wfDot(WF.dark,26,7)}{wfLine(70,WF.dark,12)}</div>
        <div style={{ height:34, borderRadius:7, border:'1.5px dashed #b9c2cb', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11 }}>+ New class</div>
        {['Dashboard','Classes','Timetable','Materials','Teachers','Students','Zalo · add-on'].map((t,i)=>(
          <div key={t} style={{ display:'flex', alignItems:'center', gap:9, padding:'7px 8px', borderRadius:6, background:i===0?'#cfd7df':'transparent', fontSize:12 }}>
            {wfDot(WF.dark,16,4)}{t}</div>
        ))}
      </div>
      {/* main */}
      <div style={{ flex:1, padding:24, display:'flex', flexDirection:'column', gap:18, overflow:'auto' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>{wfLine(120,WF.dark,16)}{wfLine(220)}</div>
          <div style={{ display:'flex', gap:10 }}>{wfBox(34,'',{style:{width:180}})}{wfBox(34,'',{style:{width:34,background:WF.soft,border:'none'}})}</div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
          {['Classes','Students','Teachers','Today'].map(s=>(
            <div key={s} style={{ border:'1.5px solid '+WF.line, borderRadius:10, background:WF.fill, padding:14, display:'flex', flexDirection:'column', gap:10 }}>
              {wfDot(WF.chip,30,8)}{wfLine(40,WF.dark,20)}<div style={{ fontSize:11 }}>{s}</div>
            </div>
          ))}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1.7fr 1fr', gap:16 }}>
          <div style={{ border:'1.5px solid '+WF.line, borderRadius:10, background:WF.fill, padding:16, display:'flex', flexDirection:'column', gap:11 }}>
            {wfTag('// Today’s schedule (timeline)')}
            {[0,1,2,3].map(i=>(
              <div key={i} style={{ display:'flex', alignItems:'center', gap:12 }}>
                {wfLine(46,WF.dark,12)}<div style={{ width:4, height:34, borderRadius:3, background:WF.line }}></div>
                <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>{wfLine('60%')}{wfLine('40%',WF.chip,8)}</div>
                {wfBox(26,'',{style:{width:90}})}
              </div>
            ))}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div style={{ border:'1.5px solid '+WF.line, borderRadius:10, background:WF.fill, padding:16, display:'flex', flexDirection:'column', gap:10 }}>
              {wfTag('// Quick actions')}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:9 }}>{[0,1,2,3].map(i=>wfBox(56,'',{key:i,style:{borderStyle:'dashed'}}))}</div>
            </div>
            <div style={{ border:'1.5px solid '+WF.line, borderRadius:10, background:WF.fill, padding:16, display:'flex', flexDirection:'column', gap:10 }}>
              {wfTag('// Starting soon')}
              {[0,1].map(i=><div key={i} style={{ display:'flex', gap:10, alignItems:'center' }}>{wfDot(WF.chip,34,8)}<div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>{wfLine('70%')}{wfLine('45%',WF.chip,8)}</div></div>)}
            </div>
          </div>
        </div>
        <div style={{ border:'1.5px solid '+WF.line, borderRadius:10, background:WF.fill, padding:16, display:'flex', flexDirection:'column', gap:12 }}>
          {wfTag('// All classes (filterable table)')}
          {[0,1,2,3].map(i=>(
            <div key={i} style={{ display:'flex', alignItems:'center', gap:14, paddingBottom:10, borderBottom:'1px solid '+WF.bg }}>
              {wfDot(WF.line)}{wfLine(160)}<div style={{ flex:1 }}></div>{wfLine(80,WF.chip)}{wfLine(50,WF.chip)}<div style={{ width:60, height:22, borderRadius:99, background:'#e6eaee' }}></div></div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   3 · TEACHER DESKTOP
   ========================================================= */
function WFTeacher(){
  return (
    <div style={{ width:'100%', height:'100%', background:WF.bg, display:'flex', fontFamily:WF.mono, color:WF.ink }}>
      {/* sidebar with avatar */}
      <div style={{ width:220, background:WF.panel, borderRight:'1.5px solid '+WF.line, padding:18, display:'flex', flexDirection:'column', gap:10 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>{wfDot(WF.dark,26,7)}{wfLine(80,WF.dark,12)}</div>
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 0 14px', borderBottom:'1.5px solid '+WF.line }}>
          {wfDot(WF.dark,36,99)}<div style={{ display:'flex', flexDirection:'column', gap:6 }}>{wfLine(80,WF.dark,11)}{wfLine(56,WF.soft,8)}</div>
        </div>
        {[['Today’s Classes','3'],['My Classes',''],['Homework to Mark','5'],['Attendance',''],['Student Progress','']].map(([t,b],i)=>(
          <div key={t} style={{ display:'flex', alignItems:'center', gap:9, padding:'8px', borderRadius:6, background:i===0?'#cfd7df':'transparent', fontSize:12 }}>
            {wfDot(WF.dark,16,4)}<span style={{ flex:1 }}>{t}</span>{b && <span style={{ fontSize:10, padding:'1px 7px', borderRadius:99, background:WF.dark, color:'#fff' }}>{b}</span>}</div>
        ))}
        <div style={{ flex:1 }}></div>
        <div style={{ display:'flex', alignItems:'center', gap:9, padding:'8px', fontSize:12 }}>{wfDot(WF.dark,16,4)}Sign out</div>
      </div>
      {/* main */}
      <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
        <div style={{ height:58, borderBottom:'1.5px solid '+WF.line, background:WF.fill, display:'flex', alignItems:'center', gap:14, padding:'0 24px' }}>
          {wfLine(150,WF.dark,16)}<div style={{ flex:1 }}></div>{wfBox(34,'',{style:{width:210}})}{wfBox(34,'',{style:{width:34,background:WF.soft,border:'none'}})}
        </div>
        <div style={{ flex:1, padding:24, display:'flex', flexDirection:'column', gap:16, overflow:'auto' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>{wfLine(90,WF.soft,8)}{wfLine(240,WF.dark,20)}{wfLine(300)}</div>
          {wfTag('// Today’s sessions (cards)')}
          {[0,1,2].map(i=>(
            <div key={i} style={{ border:'1.5px solid '+WF.line, borderRadius:10, background:WF.fill, padding:0, overflow:'hidden', display:'flex' }}>
              <div style={{ width:6, background:WF.dark }}></div>
              <div style={{ flex:1, padding:'16px 18px', display:'flex', alignItems:'center', gap:20 }}>
                <div style={{ display:'flex', flexDirection:'column', gap:6, minWidth:80 }}>{wfLine(60,WF.dark,16)}{wfLine(40,WF.soft,8)}</div>
                <div style={{ flex:1, display:'flex', flexDirection:'column', gap:7 }}>{wfLine('40%',WF.dark,14)}{wfLine('60%',WF.chip,8)}</div>
                <div style={{ display:'flex', gap:9 }}>{wfBox(30,'',{style:{width:90,borderStyle:'dashed'}})}{wfBox(30,'',{style:{width:90,borderStyle:'dashed'}})}{wfBox(30,'',{style:{width:90,background:WF.dark,border:'none'}})}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   4 · STUDENT MOBILE
   ========================================================= */
function WFStudent(){
  const phone = (
    <div style={{ width:300, height:'100%', maxHeight:620, background:WF.fill, border:'1.5px solid '+WF.line, borderRadius:30,
      overflow:'hidden', display:'flex', flexDirection:'column', boxShadow:'0 12px 36px rgba(120,135,150,.25)' }}>
      {/* status + header block */}
      <div style={{ background:WF.panel, padding:'20px 18px 18px', display:'flex', flexDirection:'column', gap:14 }}>
        <div style={{ display:'flex', alignItems:'center', gap:11 }}>
          {wfDot(WF.dark,40,99)}
          <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>{wfLine(70,WF.soft,8)}{wfLine(120,WF.dark,14)}</div>
          {wfDot(WF.soft,32,9)}
        </div>
      </div>
      {/* body */}
      <div style={{ flex:1, padding:'14px 16px', display:'flex', flexDirection:'column', gap:16, overflow:'auto' }}>
        {/* quick actions */}
        <div style={{ display:'flex', gap:10 }}>{['Attend','Results','Pay'].map((l,i)=>(
          <div key={l} style={{ flex:1, border:'1.5px solid '+WF.line, borderRadius:10, padding:'12px 6px', display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
            {wfDot(WF.chip,30,8)}<div style={{ fontFamily:WF.mono, fontSize:10, color:WF.faint }}>{l}</div></div>
        ))}</div>
        {wfTag('// Today’s sessions')}
        {[0,1].map(i=>(
          <div key={i} style={{ border:'1.5px solid '+WF.line, borderRadius:10, overflow:'hidden', display:'flex' }}>
            <div style={{ width:5, background:WF.dark }}></div>
            <div style={{ flex:1, padding:'12px 13px', display:'flex', flexDirection:'column', gap:8 }}>
              {wfLine(90,WF.dark,12)}{wfLine('70%',WF.soft,10)}
              <div style={{ display:'flex', gap:10 }}>{wfLine(50,WF.chip,8)}{wfLine(40,WF.chip,8)}</div>
            </div>
          </div>
        ))}
        {wfTag('// Upcoming this week')}
        <div style={{ border:'1.5px solid '+WF.line, borderRadius:10, padding:'6px 4px' }}>
          {[0,1,2].map(i=>(
            <div key={i} style={{ display:'flex', alignItems:'center', gap:11, padding:'10px 10px', borderTop:i?'1px solid '+WF.bg:'none' }}>
              {wfDot(WF.chip,38,10)}<div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>{wfLine('70%',WF.soft,9)}{wfLine('45%',WF.chip,8)}</div>{wfDot(WF.line,12,3)}</div>
          ))}
        </div>
      </div>
      {/* bottom nav */}
      <div style={{ borderTop:'1.5px solid '+WF.line, background:WF.fill, padding:'10px 18px 16px', display:'flex', justifyContent:'space-between' }}>
        {['Home','Courses','HW','Profile'].map((l,i)=>(
          <div key={l} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>{wfDot(i===0?WF.dark:WF.chip,22,6)}<div style={{ fontFamily:WF.mono, fontSize:9, color:i===0?WF.ink:WF.faint }}>{l}</div></div>
        ))}
      </div>
    </div>
  );
  return (
    <div style={{ width:'100%', height:'100%', background:WF.bg, display:'flex', alignItems:'center', justifyContent:'center', gap:46, fontFamily:WF.mono, padding:30 }}>
      {phone}
      <div style={{ width:240, display:'flex', flexDirection:'column', gap:16, color:WF.ink }}>
        {wfTag('// Mobile portal — annotations')}
        {[
          ['Header', 'avatar · greeting · notifications bell'],
          ['Quick actions', 'attendance · results · payments'],
          ['Sessions', 'today’s classes with Join Zoom CTA'],
          ['Upcoming', 'next sessions this week, tappable'],
          ['Tab bar', 'Home · Courses · Homework · Profile'],
        ].map(([t,d])=>(
          <div key={t} style={{ display:'flex', gap:10 }}>
            {wfDot(WF.dark,8,2)}
            <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
              <div style={{ fontSize:12, color:'#56708a', fontWeight:600 }}>{t}</div>
              <div style={{ fontSize:11, color:WF.faint, lineHeight:1.5 }}>{d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   SHELL — screen selector
   ========================================================= */
const WF_SCREENS = [
  ['login','Login', WFLogin],
  ['admin','Admin dashboard', WFAdmin],
  ['teacher','Teacher · desktop', WFTeacher],
  ['student','Student · mobile', WFStudent],
];

function WireframeView(){
  const [sel, setSel] = React.useState('admin');
  const Active = (WF_SCREENS.find(s=>s[0]===sel) || WF_SCREENS[1])[2];
  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', background:WF.bg }}>
      {/* selector strip */}
      <div style={{ flexShrink:0, height:46, background:'#dfe4e9', borderBottom:'1.5px solid '+WF.line,
        display:'flex', alignItems:'center', gap:8, padding:'0 16px', fontFamily:WF.mono }}>
        <span style={{ fontSize:11.5, color:WF.faint, marginRight:4 }}>wireframe ·</span>
        <div style={{ display:'inline-flex', background:'#cdd5dd', borderRadius:8, padding:3, gap:2 }}>
          {WF_SCREENS.map(([id,label])=>{
            const on = sel===id;
            return (
              <button key={id} onClick={()=>setSel(id)} style={{ padding:'6px 13px', borderRadius:6, fontFamily:WF.mono, fontSize:11.5,
                background:on?WF.fill:'transparent', color:on?'#56708a':'#7e8b97', fontWeight:on?700:500,
                boxShadow:on?'0 1px 2px rgba(120,135,150,.25)':'none', transition:'all .14s' }}>{label}</button>
            );
          })}
        </div>
        <div style={{ flex:1 }}></div>
        <span style={{ fontSize:11, color:WF.faint }}>{WF_SCREENS.findIndex(s=>s[0]===sel)+1} / {WF_SCREENS.length}</span>
      </div>
      <div style={{ flex:1, minHeight:0 }}><Active /></div>
    </div>
  );
}
window.WireframeView = WireframeView;
