import { describe, it, expect } from 'vitest';
import { computeStepDiff } from '../stepDiff';

describe('Step Diff Service', () => {
  it('detects newly added variables in environment', () => {
    const prev = { a: 1 };
    const curr = { a: 1, b: 2 };
    const diffs = computeStepDiff(prev, curr);

    expect(diffs).toHaveLength(1);
    expect(diffs[0]).toEqual({
      variable: 'b',
      kind: 'added',
      currentValue: 2
    });
  });

  it('detects modified variable values', () => {
    const prev = { count: 5, list: [1, 2] };
    const curr = { count: 6, list: [1, 2, 3] };
    const diffs = computeStepDiff(prev, curr);

    expect(diffs).toHaveLength(2);
    expect(diffs.find(d => d.variable === 'count')?.kind).toBe('modified');
    expect(diffs.find(d => d.variable === 'list')?.kind).toBe('modified');
  });

  it('detects removed out-of-scope variables', () => {
    const prev = { temp: 'intermediate', persistent: 100 };
    const curr = { persistent: 100 };
    const diffs = computeStepDiff(prev, curr);

    expect(diffs).toHaveLength(1);
    expect(diffs[0]).toEqual({
      variable: 'temp',
      kind: 'removed',
      previousValue: 'intermediate'
    });
  });
});
