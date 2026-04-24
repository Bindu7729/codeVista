import { describe, it, expect } from 'vitest';
import { estimateComplexity } from '../complexityEstimator';

describe('Complexity Estimator Service', () => {
  it('estimates O(1) for linear non-looping statements', () => {
    const code = `a = 10\nb = 20\nc = a + b`;
    const estimate = estimateComplexity(code, 'python');

    expect(estimate.timeComplexity).toBe('O(1)');
    expect(estimate.loopNestingLevel).toBe(0);
  });

  it('estimates O(N) for single loop iterations', () => {
    const code = `for i in range(n):\n    print(i)`;
    const estimate = estimateComplexity(code, 'python');

    expect(estimate.timeComplexity).toBe('O(N)');
    expect(estimate.loopNestingLevel).toBe(1);
  });

  it('estimates O(N^2) for nested 2-level loops like bubble sort', () => {
    const code = `for i in range(n):\n    for j in range(n):\n        pass`;
    const estimate = estimateComplexity(code, 'python');

    expect(estimate.timeComplexity).toBe('O(N^2)');
    expect(estimate.loopNestingLevel).toBe(2);
  });
});
