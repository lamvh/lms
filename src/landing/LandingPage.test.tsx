import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { LandingPage } from './LandingPage';

function renderLanding() {
  return render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>,
  );
}

describe('LandingPage', () => {
  it('renders the hero headline', () => {
    renderLanding();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('chinh phục giấc mơ');
  });

  it('renders all four package tiers with their prices', () => {
    renderLanding();
    for (const price of ['$49', '$199', '$399', '$4,000']) {
      expect(screen.getByText(price)).toBeInTheDocument();
    }
    expect(screen.getByText('Phổ biến nhất')).toBeInTheDocument();
  });

  it('renders the section kickers (10-section structure)', () => {
    renderLanding();
    for (const kicker of ['Triết lý D.C.I', 'Chương trình Tiếng Anh', 'Nhà sáng lập', 'Khoá học nổi bật', 'Bài viết mới', 'Cảm nhận học viên']) {
      expect(screen.getByText(kicker)).toBeInTheDocument();
    }
  });

  it('links "Đăng nhập" to /login', () => {
    renderLanding();
    const signin = screen.getAllByRole('link', { name: 'Đăng nhập' })[0];
    expect(signin).toHaveAttribute('href', '/login');
  });

  it('contains no em dash in visible copy', () => {
    const { container } = renderLanding();
    expect(container.textContent).not.toContain('—');
  });
});

describe('Landing nav', () => {
  it('toggles the mobile menu when the hamburger is clicked', async () => {
    renderLanding();
    // Mobile menu links are hidden until the hamburger opens it.
    expect(screen.queryByRole('link', { name: 'Đăng nhập học viên' })).toBeInTheDocument(); // footer link always present
    const hamburger = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(hamburger);
    // After opening, the mobile menu duplicates the nav links — "Giới thiệu" now appears more than once.
    const intro = screen.getAllByRole('link', { name: 'Giới thiệu' });
    expect(intro.length).toBeGreaterThan(1);
  });
});
