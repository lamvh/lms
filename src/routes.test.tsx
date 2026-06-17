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

  it('mounts the login stub at /login', () => {
    renderAt('/login');
    expect(screen.getByTestId('login-stub')).toBeInTheDocument();
  });

  it('mounts role apps under /admin, /student, /teacher', () => {
    renderAt('/admin/dashboard');
    expect(screen.getByTestId('admin-stub')).toBeInTheDocument();
  });
});
