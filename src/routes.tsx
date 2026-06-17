import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import { LandingPage } from './landing/LandingPage';
import { Login } from './app/Login';
import { AdminShell } from './app/admin/AdminShell';
import {
  DashboardStub,
  ClassesStub,
  ClassDetailStub,
  CalendarStub,
  MaterialsStub,
  TeachersStub,
  StudentsStub,
  StudentDetailStub,
  SettingsStub,
} from './app/admin/admin-screen-stubs';

/* Role-app stubs — student P8, teacher P9. */
const StudentStub = () => <div data-testid="student-stub">Student app</div>;
const TeacherStub = () => <div data-testid="teacher-stub">Teacher app</div>;

/** Route table shared by the browser router (app) and memory router (tests). */
export const routes: RouteObject[] = [
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <Login /> },
  {
    path: '/admin',
    element: <AdminShell />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <DashboardStub /> },
      { path: 'classes', element: <ClassesStub /> },
      { path: 'classes/:classId', element: <ClassDetailStub /> },
      { path: 'calendar', element: <CalendarStub /> },
      { path: 'materials', element: <MaterialsStub /> },
      { path: 'teachers', element: <TeachersStub /> },
      { path: 'students', element: <StudentsStub /> },
      { path: 'students/:studentId', element: <StudentDetailStub /> },
      { path: 'settings', element: <SettingsStub /> },
    ],
  },
  { path: '/student/*', element: <StudentStub /> },
  { path: '/teacher/*', element: <TeacherStub /> },
];

export const router = createBrowserRouter(routes);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
