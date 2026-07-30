import { describe, it, expect } from 'vitest';
import { shouldPauseAtStep } from '../breakpointEngine';

describe('Conditional Breakpoint Engine', () => {
  it('triggers on unconditional line breakpoints', () => {
    const bps = [{ lineNum: 5, enabled: true }];
    expect(shouldPauseAtStep(5, {}, bps)).toBe(true);
    expect(shouldPauseAtStep(4, {}, bps)).toBe(false);
  });

  it('triggers only when breakpoint condition evaluates to true', () => {
    const bps = [{ lineNum: 8, condition: 'i == 3', enabled: true }];
    expect(shouldPauseAtStep(8, { i: 2 }, bps)).toBe(false);
    expect(shouldPauseAtStep(8, { i: 3 }, bps)).toBe(true);
  });

  it('ignores disabled breakpoints', () => {
    const bps = [{ lineNum: 5, enabled: false }];
    expect(shouldPauseAtStep(5, {}, bps)).toBe(false);
  });
});
