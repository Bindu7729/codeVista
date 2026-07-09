import { describe, it, expect } from 'vitest';
import { estimateExecutionTokens } from '../tokenCounter';

describe('Token Counter Utility', () => {
  it('counts code tokens and detects iterative loop statements', () => {
    const code = 'arr = [1, 2, 3]\nfor i in range(3):\n    print(arr[i])';
    const stats = estimateExecutionTokens(code);

    expect(stats.statementCount).toBe(3);
    expect(stats.loopCount).toBe(1);
    expect(stats.totalTokens).toBeGreaterThan(5);
  });

  it('handles empty code input gracefully', () => {
    expect(estimateExecutionTokens('')).toEqual({ totalTokens: 0, statementCount: 0, loopCount: 0 });
  });
});
