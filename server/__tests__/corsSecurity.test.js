const { validateAllowedOrigin } = require('../middleware/corsSecurity');

describe('CORS Security Origin Validator', () => {
  it('allows exact matches in allowed origins list', () => {
    const list = ['https://codevista.dev', 'http://localhost:5173'];
    expect(validateAllowedOrigin('https://codevista.dev', list)).toBe(true);
    expect(validateAllowedOrigin('http://localhost:5173', list)).toBe(true);
    expect(validateAllowedOrigin('https://malicious.com', list)).toBe(false);
  });

  it('allows all origins when wildcard is present', () => {
    expect(validateAllowedOrigin('https://anywhere.org', ['*'])).toBe(true);
  });

  it('allows requests with empty origin (server-side curl or health check)', () => {
    expect(validateAllowedOrigin(undefined, ['https://codevista.dev'])).toBe(true);
  });
});
