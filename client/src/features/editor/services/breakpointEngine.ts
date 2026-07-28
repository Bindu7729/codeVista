export interface Breakpoint {
  lineNum: number;
  condition?: string; // Optional expression e.g. "i == 3"
  enabled: boolean;
}

export function shouldPauseAtStep(
  currentLineNum: number,
  env: Record<string, any>,
  breakpoints: Breakpoint[]
): boolean {
  const bp = breakpoints.find(b => b.lineNum === currentLineNum && b.enabled);
  if (!bp) return false;
  if (!bp.condition || !bp.condition.trim()) return true;

  // Simple condition evaluator
  const m = bp.condition.match(/^(\w+)\s*(===|==|>=|<=|>|<|!=)\s*(.+)$/);
  if (!m) return true;

  const [, varName, op, expectedStr] = m;
  const currentVal = env[varName];
  const expectedVal = Number(expectedStr) || expectedStr.replace(/['"]/g, '');

  switch (op) {
    case '==':
    case '===':
      return currentVal == expectedVal;
    case '!=':
      return currentVal != expectedVal;
    case '>':
      return Number(currentVal) > Number(expectedVal);
    case '>=':
      return Number(currentVal) >= Number(expectedVal);
    case '<':
      return Number(currentVal) < Number(expectedVal);
    case '<=':
      return Number(currentVal) <= Number(expectedVal);
    default:
      return true;
  }
}
