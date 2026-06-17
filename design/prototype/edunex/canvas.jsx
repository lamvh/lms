/* EduNex · Screen map: every live screen laid out on a design canvas,
   grouped by role and form factor.
   Login · Admin (desktop) · Teacher (desktop) · Student (mobile). */

const VZ = window.VZ;
const FIRST_CLASS = (VZ.classes[0] || {}).id || 'c1';
const FOCUS_STUDENT = (VZ.focusStudent || {}).id || 's4';

const DESK_W = 1300, DESK_H = 904, LOGIN_H = 820;
const PH_W = 390, PH_H = 844;

function admTitle(v){
  return ({ dashboard:'Dashboard', classes:'Classes', class:'Class details', calendar:'Timetable',
    materials:'Materials', teachers:'Teachers', students:'Students', studentDetail:'Student details' })[v] || v;
}

/* ---- Admin desktop board ---- */
function AdminBoard({ view, classId, studentId }){
  const [dash, setDash] = React.useState('a');
  return (
    <ChromeWindow width={DESK_W} height={DESK_H} url={'app.edunex.co.nz/'+view} tabs={[{ title:'EduNex · '+admTitle(view) }]}>
      <AdminApp initialView={view} initialClassId={classId} initialStudentId={studentId}
        dashVariant={dash} setDashVariant={setDash} onSignOut={()=>{}} />
    </ChromeWindow>
  );
}

/* ---- Teacher desktop board ---- */
function TeacherBoard({ view, label }){
  return (
    <ChromeWindow width={DESK_W} height={DESK_H} url={'app.edunex.co.nz/coach/'+view} tabs={[{ title:'EduNex · Coach · '+label }]}>
      <TeacherApp initialView={view} onSignOut={()=>{}} />
    </ChromeWindow>
  );
}

/* ---- Login desktop board ---- */
function LoginBoard(){
  return (
    <ChromeWindow width={DESK_W} height={LOGIN_H} url="app.edunex.co.nz/login" tabs={[{ title:'EduNex · Sign in' }]}>
      <LoginScreen onSignIn={()=>{}} />
    </ChromeWindow>
  );
}

/* ---- Student mobile board ---- */
function StudentBoard({ tab, page }){
  return (
    <IOSDevice width={PH_W} height={PH_H}>
      <StudentApp initialTab={tab||'home'} initialPage={page||null} onSignOut={()=>{}} />
    </IOSDevice>
  );
}

/* ---- Student mobile login board ---- */
function StudentLoginBoard(){
  return (
    <IOSDevice width={PH_W} height={PH_H}>
      <StudentLogin onSignIn={()=>{}} />
    </IOSDevice>
  );
}

/* ---- Public website landing board (desktop) ---- */
function LandingBoard(){
  return (
    <ChromeWindow width={1280} height={DESK_H} url="edunex.co.nz" tabs={[{ title:'EduNex · Learn More · Achieve More' }]}>
      <iframe src="EduNex Landing.html" title="EduNex Landing" style={{ width:'100%', height:'100%', border:'none', display:'block' }}></iframe>
    </ChromeWindow>
  );
}

/* ---- Public website landing board (mobile) ---- */
function LandingMobileBoard(){
  return (
    <IOSDevice width={PH_W} height={PH_H}>
      <div style={{ height:'100%', paddingTop:50, boxSizing:'border-box', background:'#FBF6EA' }}>
        <iframe src="EduNex Landing.html" title="EduNex Landing · mobile" style={{ width:'100%', height:'100%', border:'none', display:'block' }}></iframe>
      </div>
    </IOSDevice>
  );
}

function ScreenCanvas(){
  return (
    <DesignCanvas>
      <DCSection id="site" title="Website · Public" subtitle="Marketing landing · the public entry point">
        <DCArtboard id="landing" label="Landing · desktop" width={1280} height={DESK_H}><LandingBoard /></DCArtboard>
        <DCArtboard id="landing-mobile" label="Landing · mobile" width={PH_W} height={PH_H}><LandingMobileBoard /></DCArtboard>
      </DCSection>

      <DCSection id="auth" title="Login" subtitle="Shared entry point · one sign-in, role-aware">
        <DCArtboard id="login" label="Sign in · desktop" width={DESK_W} height={LOGIN_H}><LoginBoard /></DCArtboard>
      </DCSection>

      <DCSection id="admin" title="Admin · Desktop" subtitle="Centre administrator · the full management console">
        <DCArtboard id="a-dashboard"  label="Dashboard"      width={DESK_W} height={DESK_H}><AdminBoard view="dashboard" /></DCArtboard>
        <DCArtboard id="a-classes"    label="Classes"        width={DESK_W} height={DESK_H}><AdminBoard view="classes" /></DCArtboard>
        <DCArtboard id="a-class"      label="Class detail"   width={DESK_W} height={DESK_H}><AdminBoard view="class" classId={FIRST_CLASS} /></DCArtboard>
        <DCArtboard id="a-calendar"   label="Timetable"      width={DESK_W} height={DESK_H}><AdminBoard view="calendar" /></DCArtboard>
        <DCArtboard id="a-materials"  label="Materials"      width={DESK_W} height={DESK_H}><AdminBoard view="materials" /></DCArtboard>
        <DCArtboard id="a-teachers"   label="Teachers"       width={DESK_W} height={DESK_H}><AdminBoard view="teachers" /></DCArtboard>
        <DCArtboard id="a-students"   label="Students"       width={DESK_W} height={DESK_H}><AdminBoard view="students" /></DCArtboard>
        <DCArtboard id="a-studentdet" label="Student detail" width={DESK_W} height={DESK_H}><AdminBoard view="studentDetail" studentId={FOCUS_STUDENT} /></DCArtboard>
      </DCSection>

      <DCSection id="teacher" title="Teacher · Desktop" subtitle="Coach workspace · scoped to the signed-in teacher">
        <DCArtboard id="t-today"      label="Today's Classes"   width={DESK_W} height={DESK_H}><TeacherBoard view="today" label="Today" /></DCArtboard>
        <DCArtboard id="t-myclasses"  label="My Classes"        width={DESK_W} height={DESK_H}><TeacherBoard view="myclasses" label="My Classes" /></DCArtboard>
        <DCArtboard id="t-homework"   label="Homework to Mark"  width={DESK_W} height={DESK_H}><TeacherBoard view="homework" label="Homework" /></DCArtboard>
        <DCArtboard id="t-attendance" label="Attendance"        width={DESK_W} height={DESK_H}><TeacherBoard view="attendance" label="Attendance" /></DCArtboard>
        <DCArtboard id="t-progress"   label="Student Progress"  width={DESK_W} height={DESK_H}><TeacherBoard view="progress" label="Progress" /></DCArtboard>
      </DCSection>

      <DCSection id="student" title="Student · Mobile" subtitle="Student portal · native-feeling iOS app">
        <DCArtboard id="s-login"      label="Sign in"      width={PH_W} height={PH_H}><StudentLoginBoard /></DCArtboard>
        <DCArtboard id="s-home"       label="Home"         width={PH_W} height={PH_H}><StudentBoard tab="home" /></DCArtboard>
        <DCArtboard id="s-courses"    label="Courses"      width={PH_W} height={PH_H}><StudentBoard tab="courses" /></DCArtboard>
        <DCArtboard id="s-homework"   label="Homework"     width={PH_W} height={PH_H}><StudentBoard tab="homework" /></DCArtboard>
        <DCArtboard id="s-profile"    label="Profile"      width={PH_W} height={PH_H}><StudentBoard tab="profile" /></DCArtboard>
        <DCArtboard id="s-class"      label="Class detail" width={PH_W} height={PH_H}><StudentBoard page={{ kind:'class', id:'c2' }} /></DCArtboard>
        <DCArtboard id="s-attendance" label="Attendance"   width={PH_W} height={PH_H}><StudentBoard page={{ kind:'attendance' }} /></DCArtboard>
        <DCArtboard id="s-results"    label="Results"      width={PH_W} height={PH_H}><StudentBoard page={{ kind:'results' }} /></DCArtboard>
        <DCArtboard id="s-payments"   label="Payments"     width={PH_W} height={PH_H}><StudentBoard page={{ kind:'payments' }} /></DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ScreenCanvas />);
