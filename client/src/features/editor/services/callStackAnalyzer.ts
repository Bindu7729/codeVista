export interface StackFrame {
  functionName: string;
  arguments: Record<string, any>;
  line: number;
}

export interface CallStackAnalysis {
  maxDepth: number;
  totalCalls: number;
  detectedRecursion: boolean;
  framesSummary: string[];
}

export function analyzeCallStack(frames: StackFrame[]): CallStackAnalysis {
  const maxDepth = frames.length;
  const totalCalls = frames.length;
  const functionCounts: Record<string, number> = {};

  for (const frame of frames) {
    functionCounts[frame.functionName] = (functionCounts[frame.functionName] || 0) + 1;
  }

  const detectedRecursion = Object.values(functionCounts).some(count => count > 1);
  const framesSummary = frames.map(f => `${f.functionName}() at line ${f.line}`);

  return {
    maxDepth,
    totalCalls,
    detectedRecursion,
    framesSummary
  };
}
