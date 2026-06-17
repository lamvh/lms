import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../../routes';
import { classById } from '../../data/edunex';

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  return { router, ...render(<RouterProvider router={router} />) };
}

describe('admin screens', () => {
  it('Dashboard shows KPI labels and today schedule', () => {
    renderAt('/admin/dashboard');
    expect(screen.getByText('Active programs')).toBeInTheDocument();
    expect(screen.getByText('Today’s schedule')).toBeInTheDocument();
  });

  it('Classes lists program cards', () => {
    renderAt('/admin/classes');
    expect(screen.getAllByText('VIP Career Program').length).toBeGreaterThan(0);
  });

  it('ClassDetail renders the class name from the route param', () => {
    const c = classById('c1')!;
    renderAt('/admin/classes/c1');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(c.name);
  });

  it('Teachers list shows coaches', () => {
    renderAt('/admin/teachers');
    expect(screen.getByText('Ms. Jane Trần')).toBeInTheDocument();
  });

  it('Settings shows message templates', () => {
    renderAt('/admin/settings');
    expect(screen.getByText('Session reminder')).toBeInTheDocument();
    expect(screen.getAllByRole('switch').length).toBeGreaterThan(0);
  });
});
