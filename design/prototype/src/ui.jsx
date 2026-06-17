/* Vina NZ — shared UI primitives (exported to window) */

function Avatar({ name, short, color = '#2A6298', size = 38, ring = false, style }) {
  const initials = short || (name || '?').split(' ').slice(-2).map(w => w[0]).join('').toUpperCase();
  return (
    <div className="avatar" style={{
      width:size, height:size, fontSize:size*0.38,
      background:`linear-gradient(140deg, ${color}, ${shade(color,-18)})`,
      boxShadow: ring ? '0 0 0 3px #fff, 0 0 0 4px '+color+'33' : 'none',
      ...style,
    }}>{initials}</div>
  );
}

function shade(hex, amt) {
  const n = parseInt(hex.slice(1),16);
  let r=(n>>16)+amt, g=((n>>8)&255)+amt, b=(n&255)+amt;
  r=Math.max(0,Math.min(255,r)); g=Math.max(0,Math.min(255,g)); b=Math.max(0,Math.min(255,b));
  return '#'+(r<<16|g<<8|b).toString(16).padStart(6,'0');
}

const STATUS = {
  active: { cls:'badge-active', label:'Active' },
  soon:   { cls:'badge-soon',   label:'Starting soon' },
  paused: { cls:'badge-paused', label:'Paused' },
};
function StatusBadge({ status }) {
  const s = STATUS[status] || STATUS.active;
  return <span className={'badge '+s.cls}><span className="dot"></span>{s.label}</span>;
}

const FILE_META = {
  pdf:   { c:'#CF5742', bg:'#FBE9E5', label:'PDF',  icon:'file' },
  doc:   { c:'#2A6298', bg:'#E1ECF6', label:'DOC',  icon:'file' },
  slides:{ c:'#C9821F', bg:'#FBF1E0', label:'PPT',  icon:'image' },
  audio: { c:'#8A5A86', bg:'#F2E9F1', label:'AUDIO',icon:'audio' },
  video: { c:'#4C5FB0', bg:'#E8EAF6', label:'VIDEO',icon:'video' },
  image: { c:'#1E8A8A', bg:'#DCF0F0', label:'IMG',  icon:'image' },
  link:  { c:'#0068FF', bg:'#E5F0FF', label:'LINK', icon:'link' },
};
function FileIcon({ type = 'pdf', size = 42 }) {
  const m = FILE_META[type] || FILE_META.pdf;
  return (
    <div style={{
      width:size, height:size, borderRadius:'calc(11px * var(--radius-scale))',
      background:m.bg, color:m.c, display:'flex', alignItems:'center', justifyContent:'center',
      flexShrink:0,
    }}>
      <Icon name={m.icon} size={size*0.5} />
    </div>
  );
}

function Segmented({ options, value, onChange, size = 'md' }) {
  return (
    <div style={{
      display:'inline-flex', background:'var(--surface-3)', borderRadius:'var(--r-sm)',
      padding:3, gap:2,
    }}>
      {options.map(o => {
        const val = (o && typeof o === 'object') ? o.value : o;
        const lab = (o && typeof o === 'object') ? (o.label ?? '') : o;
        const on = val === value;
        return (
          <button key={val} onClick={() => onChange(val)} style={{
            display:'inline-flex', alignItems:'center', gap:6,
            padding: size==='sm' ? '5px 10px' : '7px 13px',
            fontSize: size==='sm' ? 12.5 : 13.5, fontWeight:600, fontFamily:'var(--font-head)',
            borderRadius:'calc(7px * var(--radius-scale))',
            background: on ? 'var(--surface)' : 'transparent',
            color: on ? 'var(--brand)' : 'var(--ink-500)',
            boxShadow: on ? 'var(--sh-1)' : 'none',
            transition:'all .15s', whiteSpace:'nowrap',
          }}>{o.icon && <Icon name={o.icon} size={15} />}{lab}</button>
        );
      })}
    </div>
  );
}

function Toggle({ on, onChange, size = 26 }) {
  return (
    <button onClick={() => onChange(!on)} style={{
      width:size*1.75, height:size, borderRadius:99,
      background: on ? 'var(--accent)' : '#CdD6E0', position:'relative',
      transition:'background .2s', flexShrink:0,
    }}>
      <span style={{
        position:'absolute', top:3, left: on ? size*1.75-size+3 : 3,
        width:size-6, height:size-6, borderRadius:'50%', background:'#fff',
        boxShadow:'0 1px 3px rgba(0,0,0,.25)', transition:'left .2s',
      }}></span>
    </button>
  );
}

function Stat({ icon, label, value, sub, tone = 'brand' }) {
  const tones = {
    brand:{ c:'var(--brand)', bg:'var(--p-50)' },
    green:{ c:'var(--a-600)', bg:'var(--a-50)' },
    amber:{ c:'var(--warn)',  bg:'var(--warn-bg)' },
    plum: { c:'#8A5A86',      bg:'#F2E9F1' },
  };
  const tn = tones[tone] || tones.brand;
  return (
    <div className="card" style={{ padding:'18px 20px', display:'flex', flexDirection:'column', gap:14 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ width:40, height:40, borderRadius:'var(--r-md)', background:tn.bg, color:tn.c,
          display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Icon name={icon} size={21} />
        </div>
        {sub && <span style={{ fontSize:12.5, fontWeight:600, color:'var(--a-600)' }}>{sub}</span>}
      </div>
      <div>
        <div style={{ fontFamily:'var(--font-head)', fontSize:32, fontWeight:700, color:'var(--ink-900)', lineHeight:1 }}>{value}</div>
        <div style={{ fontSize:13.5, color:'var(--ink-500)', marginTop:6, fontWeight:500 }}>{label}</div>
      </div>
    </div>
  );
}

/* Centered modal (desktop) */
function Modal({ open, onClose, children, width = 480, title, sub }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position:'absolute', inset:0, zIndex:120, background:'rgba(20,32,43,.42)',
      backdropFilter:'blur(2px)', display:'flex', alignItems:'center', justifyContent:'center', padding:24,
    }}>
      <div onClick={e=>e.stopPropagation()} className="rise" style={{
        width, maxWidth:'100%', maxHeight:'90%', overflow:'auto', background:'var(--surface)',
        borderRadius:'var(--r-xl)', boxShadow:'var(--sh-pop)',
      }}>
        {(title || onClose) && (
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between',
            padding:'22px 24px 0' }}>
            <div>
              {title && <h3 style={{ fontSize:19, fontWeight:700 }}>{title}</h3>}
              {sub && <p style={{ fontSize:13.5, color:'var(--ink-500)', marginTop:4 }}>{sub}</p>}
            </div>
            <button className="btn btn-icon btn-ghost" onClick={onClose} style={{ border:'none', background:'var(--surface-3)' }}><Icon name="x" size={18} /></button>
          </div>
        )}
        <div style={{ padding:24 }}>{children}</div>
      </div>
    </div>
  );
}

/* Bottom sheet (mobile) */
function Sheet({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position:'absolute', inset:0, zIndex:120, background:'rgba(20,32,43,.4)',
      display:'flex', alignItems:'flex-end',
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        width:'100%', background:'var(--surface)', borderRadius:'24px 24px 0 0',
        padding:'10px 20px calc(20px + env(safe-area-inset-bottom))', maxHeight:'82%', overflow:'auto',
        animation:'vz-rise .28s cubic-bezier(.2,.7,.3,1) both',
      }}>
        <div style={{ width:38, height:5, borderRadius:99, background:'var(--line)', margin:'4px auto 14px' }}></div>
        {title && <h3 style={{ fontSize:18, fontWeight:700, marginBottom:14 }}>{title}</h3>}
        {children}
      </div>
    </div>
  );
}

function Tip({ children, label }) {
  const [show, setShow] = React.useState(false);
  return (
    <span style={{ position:'relative', display:'inline-flex' }}
      onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}>
      {children}
      {show && <span style={{
        position:'absolute', bottom:'calc(100% + 8px)', left:'50%', transform:'translateX(-50%)',
        background:'var(--ink-900)', color:'#fff', fontSize:12, fontWeight:500,
        padding:'5px 9px', borderRadius:7, whiteSpace:'nowrap', zIndex:50, boxShadow:'var(--sh-2)',
      }}>{label}</span>}
    </span>
  );
}

Object.assign(window, { Avatar, shade, StatusBadge, FileIcon, FILE_META, Segmented, Toggle, Stat, Modal, Sheet, Tip });
