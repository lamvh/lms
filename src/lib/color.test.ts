import { describe, it, expect } from 'vitest';
import { shade } from './color';

describe('shade', () => {
  it('darkens a hex by the given negative amount', () => {
    // F2->D4 (-18 each channel), B4->A2, 00->00
    expect(shade('#F2B400', -18)).toBe('#e0a200');
  });

  it('lightens a hex by a positive amount', () => {
    expect(shade('#101010', 16)).toBe('#202020');
  });

  it('clamps channels at 0 and 255', () => {
    expect(shade('#000000', -50)).toBe('#000000');
    expect(shade('#FFFFFF', 50)).toBe('#ffffff');
  });

  it('always returns a 7-char hex', () => {
    expect(shade('#010203', 0)).toMatch(/^#[0-9a-f]{6}$/);
  });
});
