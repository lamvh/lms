import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import { LandingPage } from './landing/LandingPage';
import { Login } from './app/Login';
import { AdminShell } from './app/admin/AdminShell';
import { Dashboard } from './app/admin/Dashboard';
import { Classes } from './app/admin/Classes';
import { ClassDetail } from './app/admin/ClassDetail';
import { Calendar } from './app/admin/Calendar';
import { Materials } from './app/admin/Materials';
import { People } from './app/admin/People';
import { StudentDetail } from './app/admin/StudentDetail';
import { Settings } from './app/admin/Settings';
import { StudentApp } from './app/student/StudentApp';
import { TeacherApp } from './app/teacher/TeacherApp';

/** Route table shared by the browser router (app) and memory router (tests). */
export const routes: RouteObject[] = [
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <Login /> },
  {
    path: '/admin',
    element: <AdminShell />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'classes', element: <Classes /> },
      { path: 'classes/:classId', element: <ClassDetail /> },
      { path: 'calendar', element: <Calendar /> },
      { path: 'materials', element: <Materials /> },
      { path: 'teachers', element: <People kind="teachers" /> },
      { path: 'students', element: <People kind="students" /> },
      { path: 'students/:studentId', element: <StudentDetail /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
  { path: '/student/*', element: <StudentApp /> },
  { path: '/teacher/*', element: <TeacherApp /> },
];

export const router = createBrowserRouter(routes);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
