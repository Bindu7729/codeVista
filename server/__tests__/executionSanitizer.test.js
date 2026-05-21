const { sanitizeCodeSubmission } = require('../utils/executionSanitizer');

describe('Code Execution Sandbox Sanitizer', () => {
  it('approves standard data structures and loop algorithms', () => {
    const code = `arr = [1, 2, 3]\nfor i in range(len(arr)):\n    print(arr[i])`;
    const res = sanitizeCodeSubmission(code);
    expect(res.isSafe).toBe(true);
  });

  it('detects and rejects filesystem access attempts', () => {
    const code = `const fs = require('fs'); fs.readFileSync('/etc/passwd');`;
    const res = sanitizeCodeSubmission(code);
    expect(res.isSafe).toBe(false);
    expect(res.reason).toContain('Forbidden token');
  });

  it('detects and rejects process termination or subprocess commands', () => {
    const code = `import subprocess; subprocess.run(['ls'])`;
    const res = sanitizeCodeSubmission(code);
    expect(res.isSafe).toBe(false);
  });
});
