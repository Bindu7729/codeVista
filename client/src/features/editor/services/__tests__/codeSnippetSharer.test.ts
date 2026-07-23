import { describe, it, expect } from 'vitest';
import { encodeSnippetToUrl, decodeSnippetFromUrl } from '../codeSnippetSharer';

describe('Code Snippet URL Sharer Utility', () => {
  it('round-trips code snippet through URL encoding and decoding', () => {
    const code = 'arr = [10, 20, 30]\nprint(sum(arr))';
    const encoded = encodeSnippetToUrl(code, 'python');
    expect(encoded).toBeTruthy();

    const decoded = decodeSnippetFromUrl(encoded);
    expect(decoded).not.toBeNull();
    expect(decoded?.code).toBe(code);
    expect(decoded?.language).toBe('python');
  });

  it('gracefully handles malformed or corrupt URL hash strings', () => {
    expect(decodeSnippetFromUrl('not_valid_base64!!!')).toBeNull();
    expect(decodeSnippetFromUrl('')).toBeNull();
  });
});
