export function encodeSnippetToUrl(code: string, language: string = 'python'): string {
  if (!code) return '';
  const payload = JSON.stringify({ c: code, l: language, v: 1 });
  // Base64 encoding URL-safe
  if (typeof btoa !== 'undefined') {
    return encodeURIComponent(btoa(payload));
  }
  return encodeURIComponent(Buffer.from(payload).toString('base64'));
}

export function decodeSnippetFromUrl(encoded: string): { code: string; language: string } | null {
  if (!encoded) return null;
  try {
    const raw = decodeURIComponent(encoded);
    const jsonStr = typeof atob !== 'undefined'
      ? atob(raw)
      : Buffer.from(raw, 'base64').toString('utf-8');
    const parsed = JSON.parse(jsonStr);
    return { code: parsed.c, language: parsed.l };
  } catch {
    return null;
  }
}
