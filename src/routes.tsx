import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';

/* Stub screens — replaced in later phases (landing P5, login/shell P6, role apps P7–P9). */
const LandingStub = () => <div data-testid="landing-stub">EduNex landing</div>;
const LoginStub = () => <div data-testid="login-stub">EduNex login</div>;
const AdminStub = () => <div data-testid="admin-stub">Admin app</div>;
const StudentStub = () => <div data-testid="student-stub">Student app</div>;
const TeacherStub = () => <div data-testid="teacher-stub">Teacher app</div>;

/** Route table shared by the browser router (app) and memory router (tests). */
export const routes: RouteObject[] = [
  { path: '/', element: <LandingStub /> },
  { path: '/login', element: <LoginStub /> },
  { path: '/admin/*', element: <AdminStub /> },
  { path: '/student/*', element: <StudentStub /> },
  { path: '/teacher/*', element: <TeacherStub /> },
];

export const router = createBrowserRouter(routes);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
