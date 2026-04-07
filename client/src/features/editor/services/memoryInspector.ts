export interface MemoryInspection {
  totalEstimatedBytes: number;
  variableCount: number;
  pointerCount: number;
  breakdown: Record<string, { type: string; estimatedBytes: number; isReference: boolean }>;
}

export function inspectMemorySnapshot(env: Record<string, any>): MemoryInspection {
  let totalEstimatedBytes = 0;
  let pointerCount = 0;
  let variableCount = 0;
  const breakdown: MemoryInspection['breakdown'] = {};

  for (const [key, val] of Object.entries(env)) {
    variableCount++;
    if (val === null || val === undefined) {
      breakdown[key] = { type: 'null/undefined', estimatedBytes: 8, isReference: false };
      totalEstimatedBytes += 8;
    } else if (typeof val === 'number') {
      breakdown[key] = { type: 'number', estimatedBytes: 8, isReference: false };
      totalEstimatedBytes += 8;
    } else if (typeof val === 'boolean') {
      breakdown[key] = { type: 'boolean', estimatedBytes: 4, isReference: false };
      totalEstimatedBytes += 4;
    } else if (typeof val === 'string') {
      const bytes = 16 + val.length * 2;
      breakdown[key] = { type: 'string', estimatedBytes: bytes, isReference: false };
      totalEstimatedBytes += bytes;
    } else if (Array.isArray(val)) {
      pointerCount++;
      const bytes = 32 + val.length * 8;
      breakdown[key] = { type: 'array', estimatedBytes: bytes, isReference: true };
      totalEstimatedBytes += bytes;
    } else if (typeof val === 'object') {
      pointerCount++;
      const bytes = 48 + Object.keys(val).length * 16;
      breakdown[key] = { type: 'object', estimatedBytes: bytes, isReference: true };
      totalEstimatedBytes += bytes;
    }
  }

  return {
    totalEstimatedBytes,
    variableCount,
    pointerCount,
    breakdown
  };
}
