import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  return render(<RouterProvider router={router} />);
}

describe('app routes', () => {
  it('mounts the landing page at /', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('chinh phục giấc mơ');
  });

  it('mounts the login page at /login', () => {
    renderAt('/login');
    expect(screen.getByRole('heading', { name: 'Welcome back' })).toBeInTheDocument();
  });

  it('mounts the admin shell + dashboard at /admin/dashboard', () => {
    renderAt('/admin/dashboard');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Good afternoon');
  });

  it('mounts the student app under /student', () => {
    renderAt('/student');
    expect(screen.getByText(/Xin chào/)).toBeInTheDocument();
  });

  it('mounts the teacher app under /teacher', () => {
    renderAt('/teacher');
    expect(screen.getByText('Good afternoon, Jane 👋')).toBeInTheDocument();
  });
});
