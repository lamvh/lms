import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../routes';

/**
 * End-to-end nav loop: landing → login → student app → sign out → login.
 * Exercises the real cross-links and role routing.
 */
describe('nav loop', () => {
  it('landing → login → student → sign out → login', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    // Landing: click "Đăng nhập" (nav link) → /login
    await userEvent.click(screen.getAllByRole('link', { name: 'Đăng nhập' })[0]);
    expect(router.state.location.pathname).toBe('/login');
    expect(screen.getByRole('heading', { name: 'Welcome back' })).toBeInTheDocument();

    // Login: pick student, sign in → /student
    await userEvent.click(screen.getByRole('button', { name: 'student' }));
    await userEvent.click(screen.getByRole('button', { name: /Sign in as/ }));
    expect(router.state.location.pathname).toBe('/student');
    expect(screen.getByText(/Xin chào/)).toBeInTheDocument();

    // Student: go to Profile tab, sign out → /login
    await userEvent.click(screen.getByRole('button', { name: /Profile/ }));
    await userEvent.click(screen.getByRole('button', { name: /Sign out/ }));
    expect(router.state.location.pathname).toBe('/login');
  });

  it('admin loop: login as admin → dashboard → sign out', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/login'] });
    render(<RouterProvider router={router} />);

    await userEvent.click(screen.getByRole('button', { name: /Sign in as/ }));
    expect(router.state.location.pathname).toBe('/admin/dashboard');

    await userEvent.click(screen.getByRole('button', { name: 'Sign out' }));
    expect(router.state.location.pathname).toBe('/login');
  });
});
