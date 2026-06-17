import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Icon, ICON_NAMES } from './Icon';

describe('Icon', () => {
  it('renders an svg with a path for a known name', () => {
    const { container } = render(<Icon name="dashboard" />);
    const svg = container.querySelector('svg');
    const path = container.querySelector('path');
    expect(svg).not.toBeNull();
    expect(path?.getAttribute('d')).toBe('M4 4h7v7H4zM13 4h7v4h-7zM13 11h7v9h-7zM4 13h7v7H4z');
  });

  it('falls back to the file glyph for an unknown name', () => {
    const fileGlyph = render(<Icon name="file" />).container.querySelector('path')?.getAttribute('d');
    const unknown = render(<Icon name="totally-unknown" />).container.querySelector('path')?.getAttribute('d');
    expect(unknown).toBe(fileGlyph);
  });

  it('applies size to width and height', () => {
    const { container } = render(<Icon name="check" size={32} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('exposes all glyph names via ICON_NAMES', () => {
    expect(ICON_NAMES).toContain('dashboard');
    expect(ICON_NAMES).toContain('zalo');
    expect(ICON_NAMES.length).toBeGreaterThanOrEqual(51);
  });
});
