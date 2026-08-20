import { describe, it, expect } from 'vitest';
import { checkRecursionLimit } from '../recursionDepthGuard';

describe('Recursion Depth Watchdog Guard', () => {
  it('allows safe stack depths below threshold', () => {
    expect(checkRecursionLimit(10, 100).safe).toBe(true);
    expect(checkRecursionLimit(100, 100).safe).toBe(true);
  });

  it('aborts and returns descriptive error when threshold exceeded', () => {
    const res = checkRecursionLimit(101, 100);
    expect(res.safe).toBe(false);
    expect(res.error).toContain('Maximum call stack depth of 100 exceeded');
  });
});
