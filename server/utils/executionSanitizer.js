const FORBIDDEN_PATTERNS = [
  /\bprocess\.exit\b/,
  /\bchild_process\b/,
  /\brequire\s*\(\s*['"]fs['"]\s*\)/,
  /\bimport\s+.*\s+from\s+['"]fs['"]/,
  /\b__dirname\b/,
  /\b__filename\b/,
  /\bos\.system\b/,
  /\bsubprocess\b/
];

function sanitizeCodeSubmission(code = '') {
  if (typeof code !== 'string') return { isSafe: false, reason: 'Invalid code input' };

  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(code)) {
      return {
        isSafe: false,
        reason: `Forbidden token detected: ${pattern.toString()}`
      };
    }
  }

  return { isSafe: true };
}

module.exports = { sanitizeCodeSubmission };
