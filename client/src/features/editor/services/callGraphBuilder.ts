export interface CallGraphNode {
  name: string;
  calls: string[];
}

export function buildCallGraph(code: string): Map<string, CallGraphNode> {
  const graph = new Map<string, CallGraphNode>();
  const lines = code.split('\n');

  let currentFunction: string | null = null;
  const functionDefs = new Set<string>();

  // Pass 1: find all declared function names
  for (const line of lines) {
    const defMatch = line.match(/(?:def|function)\s+(\w+)/);
    if (defMatch) {
      functionDefs.add(defMatch[1]);
      graph.set(defMatch[1], { name: defMatch[1], calls: [] });
    }
  }

  // Pass 2: find invocations within function bodies
  for (const line of lines) {
    const defMatch = line.match(/(?:def|function)\s+(\w+)/);
    if (defMatch) {
      currentFunction = defMatch[1];
      continue;
    }

    if (currentFunction) {
      for (const fnName of functionDefs) {
        if (fnName !== currentFunction && new RegExp(`\\b${fnName}\\s*\\(`).test(line)) {
          const node = graph.get(currentFunction);
          if (node && !node.calls.includes(fnName)) {
            node.calls.push(fnName);
          }
        }
      }
    }
  }

  return graph;
}
