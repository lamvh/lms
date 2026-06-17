import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ImageSlot } from './ImageSlot';

describe('ImageSlot wrapper', () => {
  it('renders an <image-slot> element with passed id and src', () => {
    const { container } = render(
      <ImageSlot id="hero" src="/assets/ms-jane.png" />,
    );
    const el = container.querySelector('image-slot');
    expect(el).not.toBeNull();
    expect(el).toHaveAttribute('id', 'hero');
    expect(el).toHaveAttribute('src', '/assets/ms-jane.png');
  });

  it('applies className and defaults shape to rounded', () => {
    const { container } = render(
      <ImageSlot className="w-40 h-40" />,
    );
    const el = container.querySelector('image-slot');
    expect(el).toHaveClass('w-40', 'h-40');
    expect(el).toHaveAttribute('shape', 'rounded');
  });
});
