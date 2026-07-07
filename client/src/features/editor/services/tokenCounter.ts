export function estimateExecutionTokens(code: string): { totalTokens: number; statementCount: number; loopCount: number } {
  if (!code || typeof code !== 'string') {
    return { totalTokens: 0, statementCount: 0, loopCount: 0 };
  }

  const lines = code.split('\n').map(l => l.trim()).filter(Boolean);
  let totalTokens = 0;
  let loopCount = 0;

  for (const line of lines) {
    if (line.startsWith('#') || line.startsWith('//')) continue;
    const words = line.split(/[\s,;()[\]{}]+/).filter(Boolean);
    totalTokens += words.length;

    if (/\b(for|while)\b/.test(line)) {
      loopCount++;
    }
  }

  return {
    totalTokens,
    statementCount: lines.length,
    loopCount
  };
}
