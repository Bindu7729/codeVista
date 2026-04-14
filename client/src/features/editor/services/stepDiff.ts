export interface VariableDiff {
  variable: string;
  kind: 'added' | 'modified' | 'removed';
  previousValue?: any;
  currentValue?: any;
}

export function computeStepDiff(
  prevEnv: Record<string, any> = {},
  currEnv: Record<string, any> = {}
): VariableDiff[] {
  const diffs: VariableDiff[] = [];
  const prevKeys = new Set(Object.keys(prevEnv));
  const currKeys = new Set(Object.keys(currEnv));

  for (const key of currKeys) {
    if (!prevKeys.has(key)) {
      diffs.push({
        variable: key,
        kind: 'added',
        currentValue: currEnv[key]
      });
    } else if (JSON.stringify(prevEnv[key]) !== JSON.stringify(currEnv[key])) {
      diffs.push({
        variable: key,
        kind: 'modified',
        previousValue: prevEnv[key],
        currentValue: currEnv[key]
      });
    }
  }

  for (const key of prevKeys) {
    if (!currKeys.has(key)) {
      diffs.push({
        variable: key,
        kind: 'removed',
        previousValue: prevEnv[key]
      });
    }
  }

  return diffs;
}
