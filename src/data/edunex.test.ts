import { describe, it, expect } from 'vitest';
import { classById, focusStudent, stats, classes, teachers } from './edunex';

describe('edunex data', () => {
  it('looks up a class by id', () => {
    expect(classById('c1')?.name).toBe('VIP Career Program');
  });

  it('applies the focus-student overrides', () => {
    expect(focusStudent.name).toBe('Nguyễn Thảo My');
    expect(focusStudent.short).toBe('TM');
    expect(focusStudent.classes).toEqual(['c2', 'c5', 'c6']);
  });

  it('derives stats', () => {
    expect(stats.teachers).toBe(5);
    // 9 of 10 classes are not paused
    expect(stats.classes).toBe(9);
  });

  it('builds non-empty rosters and zoom meetings post-init', () => {
    expect(classById('c1')?.roster?.length).toBeGreaterThan(0);
    expect(classById('c1')?.zoom?.url).toContain('zoom.us/j/');
  });

  it('keeps teachers and classes intact', () => {
    expect(teachers).toHaveLength(5);
    expect(classes).toHaveLength(10);
  });
});
