import { describe, it, expect } from 'vitest';
import { buildCallGraph } from '../callGraphBuilder';

describe('Call Graph Builder Utility', () => {
  it('constructs caller-to-callee directed invocation graph', () => {
    const code = `
def helper():
    pass

def main():
    helper()
`;
    const graph = buildCallGraph(code);
    expect(graph.has('main')).toBe(true);
    expect(graph.has('helper')).toBe(true);
    expect(graph.get('main')?.calls).toContain('helper');
    expect(graph.get('helper')?.calls).toHaveLength(0);
  });
});
