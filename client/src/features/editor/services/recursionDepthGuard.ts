export function checkRecursionLimit(currentDepth: number, maxAllowedDepth: number = 250): { safe: boolean; error?: string } {
  if (currentDepth > maxAllowedDepth) {
    return {
      safe: false,
      error: `Maximum call stack depth of ${maxAllowedDepth} exceeded. Execution aborted to avoid browser unresponsiveness.`
    };
  }
  return { safe: true };
}
