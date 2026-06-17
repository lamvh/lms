import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../../routes';

function renderStudent() {
  const router = createMemoryRouter(routes, { initialEntries: ['/student'] });
  return { router, ...render(<RouterProvider router={router} />) };
}

describe('StudentApp', () => {
  it('opens on the home tab with a greeting', () => {
    renderStudent();
    expect(screen.getByText(/Xin chào/)).toBeInTheDocument();
    expect(screen.getByText('Today’s sessions')).toBeInTheDocument();
  });

  it('switches to the Courses tab', async () => {
    renderStudent();
    // Both a home quick-action and the bottom nav read "Courses"; the nav tab is last.
    const courses = screen.getAllByRole('button', { name: /Courses/ });
    await userEvent.click(courses[courses.length - 1]);
    expect(screen.getByText('Programs you’re enrolled in')).toBeInTheDocument();
  });

  it('switches to the Homework tab with filter chips', async () => {
    renderStudent();
    await userEvent.click(screen.getByRole('button', { name: /Homework/ }));
    expect(screen.getByText('Assignments from your coaches')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'To do' })).toBeInTheDocument();
  });

  it('signs out from the profile tab', async () => {
    const { router } = renderStudent();
    await userEvent.click(screen.getByRole('button', { name: /Profile/ }));
    await userEvent.click(screen.getByRole('button', { name: /Sign out/ }));
    expect(router.state.location.pathname).toBe('/login');
  });
});
