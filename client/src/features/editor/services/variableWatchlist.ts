export interface WatchEntry {
  variableName: string;
  history: { stepIndex: number; value: any }[];
}

export function updateWatchlist(
  watchlist: string[],
  currentStepIndex: number,
  env: Record<string, any>,
  existingEntries: Map<string, WatchEntry> = new Map()
): Map<string, WatchEntry> {
  const result = new Map(existingEntries);

  for (const varName of watchlist) {
    const val = env[varName];
    if (val !== undefined) {
      const entry = result.get(varName) || { variableName: varName, history: [] };
      const lastVal = entry.history[entry.history.length - 1]?.value;
      if (JSON.stringify(lastVal) !== JSON.stringify(val)) {
        entry.history.push({ stepIndex: currentStepIndex, value: val });
      }
      result.set(varName, entry);
    }
  }

  return result;
}
