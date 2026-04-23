export interface ComplexityEstimate {
  timeComplexity: string;
  spaceComplexity: string;
  loopNestingLevel: number;
  hasRecursion: boolean;
  notes: string;
}

export function estimateComplexity(code: string, language: string = 'python'): ComplexityEstimate {
  const lines = code.split('\n');
  let maxLoopNesting = 0;
  let currentNesting = 0;
  let hasRecursion = false;

  const loopPatterns = [
    /\bfor\s+/,
    /\bwhile\s+/,
    /\bfor\s*\(/,
    /\bwhile\s*\(/
  ];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith('#') || line.startsWith('//')) continue;

    const isLoop = loopPatterns.some(p => p.test(line));
    if (isLoop) {
      currentNesting++;
      if (currentNesting > maxLoopNesting) {
        maxLoopNesting = currentNesting;
      }
    }

    if (line.includes('def ') || line.includes('function ')) {
      const match = line.match(/(?:def|function)\s+(\w+)/);
      if (match) {
        const fnName = match[1];
        const restOfCode = lines.slice(i + 1).join('\n');
        if (new RegExp(`\\b${fnName}\\s*\\(`).test(restOfCode)) {
          hasRecursion = true;
        }
      }
    }
  }

  let timeComplexity = 'O(1)';
  if (hasRecursion && maxLoopNesting > 0) {
    timeComplexity = 'O(N log N) or O(2^N)';
  } else if (maxLoopNesting === 1) {
    timeComplexity = 'O(N)';
  } else if (maxLoopNesting === 2) {
    timeComplexity = 'O(N^2)';
  } else if (maxLoopNesting >= 3) {
    timeComplexity = `O(N^${maxLoopNesting})`;
  } else if (hasRecursion) {
    timeComplexity = 'O(2^N) or O(N)';
  }

  const spaceComplexity = hasRecursion || /\[.*\]|\.append|\.push/i.test(code) ? 'O(N)' : 'O(1)';

  return {
    timeComplexity,
    spaceComplexity,
    loopNestingLevel: maxLoopNesting,
    hasRecursion,
    notes: `Detected loop nesting level ${maxLoopNesting}${hasRecursion ? ' with recursive patterns' : ''}.`
  };
}
