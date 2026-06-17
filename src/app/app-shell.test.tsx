import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../routes';

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  return { router, ...render(<RouterProvider router={router} />) };
}

describe('Login', () => {
  it('updates the email when a role is picked', async () => {
    renderAt('/login');
    await userEvent.click(screen.getByRole('button', { name: 'coach' }));
    expect(screen.getByDisplayValue('jane@edunex.co.nz')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in as Coach/ })).toBeInTheDocument();
  });

  it('routes a coach to /teacher on sign in', async () => {
    const { router } = renderAt('/login');
    await userEvent.click(screen.getByRole('button', { name: 'coach' }));
    await userEvent.click(screen.getByRole('button', { name: /Sign in as/ }));
    expect(router.state.location.pathname).toBe('/teacher');
  });

  it('routes admin to the dashboard by default', async () => {
    const { router } = renderAt('/login');
    await userEvent.click(screen.getByRole('button', { name: /Sign in as/ }));
    // /admin index redirects to /admin/dashboard
    expect(router.state.location.pathname).toBe('/admin/dashboard');
  });
});

describe('AdminShell', () => {
  it('shows the topbar title for the active route', () => {
    renderAt('/admin/classes');
    // Topbar h2 title + the Classes screen h1 both read "Classes".
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Classes');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Classes');
  });

  it('redirects /admin to the dashboard', () => {
    const { router } = renderAt('/admin');
    expect(router.state.location.pathname).toBe('/admin/dashboard');
  });

  it('signs out to /login', async () => {
    const { router } = renderAt('/admin/dashboard');
    await userEvent.click(screen.getByRole('button', { name: 'Sign out' }));
    expect(router.state.location.pathname).toBe('/login');
  });
});
