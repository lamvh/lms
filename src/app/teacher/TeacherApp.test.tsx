import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../../routes';

function renderTeacher() {
  const router = createMemoryRouter(routes, { initialEntries: ['/teacher'] });
  return { router, ...render(<RouterProvider router={router} />) };
}

describe('TeacherApp', () => {
  it("opens on Today's Classes with Jane's greeting", () => {
    renderTeacher();
    expect(screen.getByText('Good afternoon, Jane 👋')).toBeInTheDocument();
  });

  it('navigates to My Classes', async () => {
    renderTeacher();
    await userEvent.click(screen.getByRole('button', { name: /My Classes/ }));
    expect(screen.getByText(/programs you teach/)).toBeInTheDocument();
  });

  it('shows the attendance roster with present/late/absent options', async () => {
    renderTeacher();
    // Sidebar nav + Today session cards both have "Attendance"; the sidebar nav is first.
    await userEvent.click(screen.getAllByRole('button', { name: /Attendance/ })[0]);
    expect(screen.getByRole('button', { name: 'Save attendance' })).toBeInTheDocument();
    expect(screen.getAllByText('Present').length).toBeGreaterThan(0);
  });

  it('signs out to /login', async () => {
    const { router } = renderTeacher();
    await userEvent.click(screen.getByRole('button', { name: 'Sign out' }));
    expect(router.state.location.pathname).toBe('/login');
  });
});
