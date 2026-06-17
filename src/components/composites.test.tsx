import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ClassCard } from './ClassCard';
import { SessionCard, type SessionView } from './SessionCard';
import { ZoomPanel } from './ZoomPanel';
import { classes } from '../data/edunex';
import { to12 } from '../lib/time';

const C = classes[0];
const noop = () => {};

describe('to12', () => {
  it('formats 24h to 12h', () => {
    expect(to12('18:30')).toBe('6:30pm');
    expect(to12('09:00')).toBe('9:00am');
    expect(to12('00:05')).toBe('12:05am');
  });
});

describe('ClassCard', () => {
  it('shows the class name and a status badge', () => {
    render(<ClassCard c={C} openClass={noop} notify={noop} />);
    expect(screen.getByText(C.name)).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders the paused badge for a paused class', () => {
    const paused = classes.find((c) => c.status === 'paused')!;
    render(<ClassCard c={paused} openClass={noop} notify={noop} />);
    expect(screen.getByText('Paused')).toBeInTheDocument();
  });
});

describe('SessionCard', () => {
  const s: SessionView = { ...C.schedule[0], class: C };
  it('flags "Next up" when i=0', () => {
    render(<SessionCard s={s} i={0} open={noop} />);
    expect(screen.getByText('Next up')).toBeInTheDocument();
  });
  it('does not flag "Next up" when i>0', () => {
    render(<SessionCard s={s} i={1} open={noop} />);
    expect(screen.queryByText('Next up')).not.toBeInTheDocument();
  });
});

describe('ZoomPanel', () => {
  beforeEach(() => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn() } });
  });
  it('calls notify when the link is copied', async () => {
    const notify = vi.fn();
    render(<ZoomPanel c={C} notify={notify} />);
    await userEvent.click(screen.getByText('Copy'));
    expect(notify).toHaveBeenCalledWith('Zoom link copied', 'link');
  });
});
