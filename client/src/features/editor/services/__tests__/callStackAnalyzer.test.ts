import { describe, it, expect } from 'vitest';
import { analyzeCallStack } from '../callStackAnalyzer';

describe('Call Stack Analyzer Service', () => {
  it('analyzes linear function call chains without recursion', () => {
    const frames = [
      { functionName: 'main', arguments: {}, line: 1 },
      { functionName: 'calculateSum', arguments: { a: 5, b: 10 }, line: 12 }
    ];
    const analysis = analyzeCallStack(frames);

    expect(analysis.maxDepth).toBe(2);
    expect(analysis.detectedRecursion).toBe(false);
    expect(analysis.framesSummary).toHaveLength(2);
  });

  it('detects recursive call patterns and records depth', () => {
    const frames = [
      { functionName: 'factorial', arguments: { n: 4 }, line: 5 },
      { functionName: 'factorial', arguments: { n: 3 }, line: 5 },
      { functionName: 'factorial', arguments: { n: 2 }, line: 5 },
      { functionName: 'factorial', arguments: { n: 1 }, line: 2 }
    ];
    const analysis = analyzeCallStack(frames);

    expect(analysis.maxDepth).toBe(4);
    expect(analysis.detectedRecursion).toBe(true);
    expect(analysis.totalCalls).toBe(4);
  });
});
