import { describe, it, expect } from 'vitest';
import { inspectMemorySnapshot } from '../memoryInspector';

describe('Memory Inspector Service', () => {
  it('calculates memory footprint for primitive variables', () => {
    const env = { count: 42, active: true, title: 'CodeVista' };
    const result = inspectMemorySnapshot(env);

    expect(result.variableCount).toBe(3);
    expect(result.pointerCount).toBe(0);
    expect(result.breakdown.count.type).toBe('number');
    expect(result.breakdown.active.type).toBe('boolean');
    expect(result.breakdown.title.type).toBe('string');
    expect(result.totalEstimatedBytes).toBeGreaterThan(0);
  });

  it('tracks pointers and reference structures for heap arrays and objects', () => {
    const env = {
      numbers: [10, 20, 30, 40],
      treeNode: { val: 50, left: null, right: null }
    };
    const result = inspectMemorySnapshot(env);

    expect(result.variableCount).toBe(2);
    expect(result.pointerCount).toBe(2);
    expect(result.breakdown.numbers.isReference).toBe(true);
    expect(result.breakdown.treeNode.isReference).toBe(true);
    expect(result.breakdown.numbers.estimatedBytes).toBe(32 + 4 * 8);
  });
});
