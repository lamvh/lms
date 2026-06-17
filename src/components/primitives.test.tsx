import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';
import { Toggle } from './Toggle';
import { Segmented } from './Segmented';
import { Field } from './Field';
import { Avatar } from './Avatar';
import { StatusBadge } from './StatusBadge';

describe('Button', () => {
  it('renders its label and fires onClick', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save class</Button>);
    await userEvent.click(screen.getByText('Save class'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('disables when disabled or loading and does not fire onClick', async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Saving
      </Button>,
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('Toggle', () => {
  it('fires onChange with the toggled value', async () => {
    const onChange = vi.fn();
    render(<Toggle on={false} onChange={onChange} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('reflects state via aria-checked', () => {
    render(<Toggle on onChange={() => {}} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });
});

describe('Segmented', () => {
  it('fires onChange with the clicked option value', async () => {
    const onChange = vi.fn();
    render(
      <Segmented
        value="week"
        onChange={onChange}
        options={[
          { value: 'day', label: 'Day' },
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Month' },
        ]}
      />,
    );
    await userEvent.click(screen.getByText('Month'));
    expect(onChange).toHaveBeenCalledWith('month');
  });
});

describe('Field', () => {
  it('marks aria-invalid when error', () => {
    render(<Field error defaultValue="bad@email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('blocks input when disabled', () => {
    render(<Field disabled defaultValue="Locked" />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});

describe('Avatar', () => {
  it('derives initials from the last two words of name', () => {
    render(<Avatar name="Nguyen Thi Mai" />);
    expect(screen.getByText('TM')).toBeInTheDocument();
  });

  it('uses explicit short over name', () => {
    render(<Avatar short="EN" name="Edu Nex" />);
    expect(screen.getByText('EN')).toBeInTheDocument();
  });
});

describe('StatusBadge', () => {
  it('renders the right label per status', () => {
    render(<StatusBadge status="soon" />);
    expect(screen.getByText('Starting soon')).toBeInTheDocument();
  });
});
