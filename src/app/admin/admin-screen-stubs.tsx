/**
 * Placeholder admin screens — replaced by real implementations in Phase 7.
 * Each renders its name so routing/active-state can be verified now.
 */
function Stub({ name }: { name: string }) {
  return (
    <div data-testid={`admin-${name}`} className="text-ink-500 font-body">
      {name} screen
    </div>
  );
}

export const DashboardStub = () => <Stub name="dashboard" />;
export const ClassesStub = () => <Stub name="classes" />;
export const ClassDetailStub = () => <Stub name="class-detail" />;
export const CalendarStub = () => <Stub name="calendar" />;
export const MaterialsStub = () => <Stub name="materials" />;
export const TeachersStub = () => <Stub name="teachers" />;
export const StudentsStub = () => <Stub name="students" />;
export const StudentDetailStub = () => <Stub name="student-detail" />;
export const SettingsStub = () => <Stub name="settings" />;
