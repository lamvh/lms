/* ============================================================
   Vina NZ LMS — sample data (realistic VN names & subjects)
   Small tutoring centre in NZ · < 20 classes
   ============================================================ */
(function () {
  // Calm, brand-harmonious accent colours for class identity
  const C = {
    blue:'#2A6298', navy:'#15406B', green:'#1F8C68', teal:'#1E8A8A',
    indigo:'#4C5FB0', amber:'#C9821F', plum:'#8A5A86', rust:'#B96A4B',
    slate:'#56708A', moss:'#5E8A4A',
  };

  const teachers = [
    { id:'t1', name:'Cô Nguyễn Thu Hà',   short:'Hà',   color:C.blue,   subject:'IELTS · Academic English', email:'ha.nguyen@vinanz.school', phone:'021 555 0142' },
    { id:'t2', name:'Thầy Trần Minh Quân', short:'Quân', color:C.green,  subject:'NCEA Mathematics',          email:'quan.tran@vinanz.school',  phone:'021 555 0187' },
    { id:'t3', name:'Cô Lê Phương Anh',    short:'Anh',  color:C.plum,   subject:'English · ESOL',            email:'anh.le@vinanz.school',     phone:'021 555 0119' },
    { id:'t4', name:'Thầy Phạm Đức Huy',   short:'Huy',  color:C.indigo, subject:'NCEA Physics & Chemistry',  email:'huy.pham@vinanz.school',   phone:'021 555 0166' },
    { id:'t5', name:'Cô Đỗ Mai Linh',      short:'Linh', color:C.amber,  subject:'Tiếng Việt · Primary',      email:'linh.do@vinanz.school',    phone:'021 555 0173' },
  ];

  // schedule day index: 0=Mon … 6=Sun
  const classes = [
    { id:'c1', name:'IELTS 6.5 Intensive',     subject:'IELTS',            teacher:'t1', color:C.blue,   status:'active', room:'Room A', level:'Upper-Int', students:12,
      schedule:[{d:1,s:'17:30',e:'19:00'},{d:3,s:'17:30',e:'19:00'}], zalo:'zalo.me/g/ielts65', materials:14 },
    { id:'c2', name:'NCEA L2 Mathematics',     subject:'Mathematics',      teacher:'t2', color:C.green,  status:'active', room:'Room B', level:'Year 12', students:9,
      schedule:[{d:1,s:'16:00',e:'17:30'},{d:4,s:'16:00',e:'17:30'}], zalo:'zalo.me/g/nceamath2', materials:9 },
    { id:'c3', name:'English Conversation A2', subject:'English',          teacher:'t3', color:C.plum,   status:'active', room:'Room A', level:'Elementary', students:8,
      schedule:[{d:2,s:'18:00',e:'19:30'}], zalo:'zalo.me/g/engconva2', materials:6 },
    { id:'c4', name:'NCEA L3 Physics',         subject:'Physics',          teacher:'t4', color:C.indigo, status:'active', room:'Room C', level:'Year 13', students:7,
      schedule:[{d:2,s:'16:00',e:'17:30'},{d:4,s:'18:00',e:'19:30'}], zalo:'zalo.me/g/ncealphys3', materials:11 },
    { id:'c5', name:'IELTS Foundation 5.0',    subject:'IELTS',            teacher:'t1', color:C.teal,   status:'active', room:'Room B', level:'Pre-Int', students:11,
      schedule:[{d:0,s:'17:30',e:'19:00'},{d:2,s:'17:30',e:'19:00'}], zalo:'zalo.me/g/ieltsfound', materials:8 },
    { id:'c6', name:'Tiếng Việt cho trẻ em',   subject:'Tiếng Việt',       teacher:'t5', color:C.amber,  status:'active', room:'Room A', level:'Primary', students:14,
      schedule:[{d:5,s:'09:30',e:'11:00'}], zalo:'zalo.me/g/tiengviet', materials:5 },
    { id:'c7', name:'NCEA L1 Mathematics',     subject:'Mathematics',      teacher:'t2', color:C.moss,   status:'active', room:'Room C', level:'Year 11', students:10,
      schedule:[{d:0,s:'16:00',e:'17:30'},{d:3,s:'16:00',e:'17:30'}], zalo:'zalo.me/g/nceamath1', materials:7 },
    { id:'c8', name:'Chemistry Bootcamp',      subject:'Chemistry',        teacher:'t4', color:C.rust,   status:'soon',   room:'Room B', level:'Year 12', students:6,
      schedule:[{d:5,s:'13:00',e:'15:00'}], zalo:'zalo.me/g/chembootcamp', materials:3 },
    { id:'c9', name:'IELTS Writing Clinic',    subject:'IELTS',            teacher:'t3', color:C.slate,  status:'soon',   room:'Room A', level:'Intermediate', students:5,
      schedule:[{d:6,s:'10:00',e:'11:30'}], zalo:'zalo.me/g/ieltswriting', materials:2 },
    { id:'c10', name:'Year 8 English Booster', subject:'English',          teacher:'t3', color:C.blue,   status:'paused', room:'Room C', level:'Year 8', students:7,
      schedule:[{d:4,s:'15:30',e:'16:30'}], zalo:'zalo.me/g/y8english', materials:4 },
  ];

  // Roster sample (names reused across classes)
  const firstPool = ['An','Bảo','Châu','Dũng','Giang','Hân','Khôi','Linh','Minh','Ngọc','Phúc','Quỳnh','Sơn','Trang','Vy','Yến','Đạt','Hương','Nam','Thảo'];
  const lastPool  = ['Nguyễn','Trần','Lê','Phạm','Hoàng','Vũ','Đặng','Bùi','Đỗ','Ngô'];
  const pcolors = [C.blue,C.green,C.plum,C.indigo,C.teal,C.amber,C.rust,C.moss,C.slate,C.navy];

  function makeStudents() {
    const out = [];
    let n = 0;
    for (let i=0;i<lastPool.length;i++){
      for (let j=0;j<2;j++){
        const f = firstPool[(i*2+j) % firstPool.length];
        const l = lastPool[i];
        out.push({
          id:'s'+(++n),
          name:`${l} ${firstPool[(i*3+j)%firstPool.length]} ${f}`,
          short:f.slice(0,1)+l.slice(0,1),
          color:pcolors[n % pcolors.length],
          year:['Year 8','Year 11','Year 12','Year 13','Primary'][n%5],
        });
      }
    }
    return out;
  }
  const students = makeStudents();

  // Attach class membership
  classes.forEach((cl, idx) => {
    cl.roster = students.slice(idx, idx + Math.min(cl.students, 8)).map(s => s.id);
  });

  const focusStudent = students[3]; // the logged-in student in the portal
  focusStudent.name = 'Trần Gia Bảo';
  focusStudent.short = 'GB';
  focusStudent.color = C.blue;
  focusStudent.year = 'Year 12';
  focusStudent.classes = ['c1','c2','c4']; // IELTS, Maths, Physics

  const materials = [
    { id:'m1',  class:'c1', session:'Buổi 14 · Writing Task 2', title:'Task 2 — Opinion essays (model answers).pdf', type:'pdf',   size:'2.4 MB', date:'12 Jun', to:'class' },
    { id:'m2',  class:'c1', session:'Buổi 14 · Writing Task 2', title:'Band 7 vocabulary list.pdf',                type:'pdf',   size:'480 KB', date:'12 Jun', to:'class' },
    { id:'m3',  class:'c1', session:'Buổi 13 · Speaking',       title:'Speaking Part 2 cue cards.docx',            type:'doc',   size:'320 KB', date:'05 Jun', to:'class' },
    { id:'m4',  class:'c1', session:'Buổi 13 · Speaking',       title:'Bảo — feedback recording.m4a',              type:'audio', size:'8.1 MB', date:'05 Jun', to:'Trần Gia Bảo' },
    { id:'m5',  class:'c2', session:'Tuần 9 · Calculus',        title:'Differentiation practice set.pdf',          type:'pdf',   size:'1.1 MB', date:'11 Jun', to:'class' },
    { id:'m6',  class:'c2', session:'Tuần 9 · Calculus',        title:'Worked solutions — derivatives.pdf',        type:'pdf',   size:'900 KB', date:'11 Jun', to:'class' },
    { id:'m7',  class:'c2', session:'Tuần 8 · Algebra',         title:'Quadratics summary slides.pptx',            type:'slides',size:'3.2 MB', date:'04 Jun', to:'class' },
    { id:'m8',  class:'c4', session:'Week 9 · Electricity',     title:'Circuits — exam questions.pdf',             type:'pdf',   size:'1.5 MB', date:'10 Jun', to:'class' },
    { id:'m9',  class:'c4', session:'Week 9 · Electricity',     title:'Lab demo — Ohm\u2019s law.mp4',             type:'video', size:'42 MB',  date:'10 Jun', to:'class' },
    { id:'m10', class:'c4', session:'Week 8 · Mechanics',       title:'Projectile motion notes.pdf',               type:'pdf',   size:'780 KB', date:'03 Jun', to:'class' },
    { id:'m11', class:'c3', session:'Unit 5 · Travel',          title:'Dialogue worksheet.pdf',                    type:'pdf',   size:'410 KB', date:'09 Jun', to:'class' },
    { id:'m12', class:'c5', session:'Buổi 8 · Listening',       title:'Listening Section 1 audio.mp3',             type:'audio', size:'6.4 MB', date:'08 Jun', to:'class' },
  ];

  const templates = [
    { id:'tpl1', key:'reminder',   name:'Lesson reminder',        on:true,  preview:'Xin chào {student}! Lớp {class} sẽ học lúc {time} ngày mai tại {room}. Hẹn gặp em nhé.' },
    { id:'tpl2', key:'material',   name:'New material',           on:true,  preview:'Lớp {class} vừa có tài liệu mới: “{material}”. Em đăng nhập Vina NZ để tải về nhé.' },
    { id:'tpl3', key:'cancel',     name:'Class cancellation',     on:true,  preview:'Thông báo: Buổi học {class} ngày {date} tạm nghỉ. Trung tâm sẽ sắp lịch bù và báo lại sớm.' },
    { id:'tpl4', key:'enrol',      name:'Enrolment confirmation', on:false, preview:'Chúc mừng {student} đã ghi danh lớp {class}! Lịch học: {schedule}. Link nhóm Zalo: {zalo}.' },
  ];

  const znsLog = [
    { id:'z1', tpl:'Lesson reminder', class:'IELTS 6.5 Intensive', recipients:12, time:'Today · 16:02', status:'sent' },
    { id:'z2', tpl:'New material',    class:'NCEA L2 Mathematics', recipients:9,  time:'Today · 15:40', status:'sent' },
    { id:'z3', tpl:'Lesson reminder', class:'NCEA L3 Physics',     recipients:7,  time:'Today · 15:10', status:'sent' },
    { id:'z4', tpl:'New material',    class:'IELTS 6.5 Intensive', recipients:12, time:'Yesterday · 19:20', status:'sent' },
    { id:'z5', tpl:'Class cancellation', class:'Year 8 English Booster', recipients:7, time:'Yesterday · 12:05', status:'failed' },
    { id:'z6', tpl:'Enrolment confirmation', class:'Chemistry Bootcamp', recipients:1, time:'2 days ago · 10:30', status:'sent' },
  ];

  const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const DAYS_FULL = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const todayIndex = 1; // Tuesday

  window.VZ = {
    C, teachers, classes, students, materials, templates, znsLog,
    DAYS, DAYS_FULL, todayIndex, focusStudent,
    teacherById: id => teachers.find(t => t.id === id),
    classById:   id => classes.find(c => c.id === id),
    studentById: id => students.find(s => s.id === id),
    stats: {
      classes: classes.filter(c=>c.status!=='paused').length,
      students: 79,
      teachers: teachers.length,
      sessionsToday: classes.filter(c=>c.schedule.some(x=>x.d===todayIndex)).length,
    },
  };
})();
