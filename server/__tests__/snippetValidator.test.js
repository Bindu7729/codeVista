const { validateSnippet } = require('../utils/snippetValidator');

describe('Algorithm Snippet Schema Validator', () => {
  it('validates compliant algorithm metadata object', () => {
    const snippet = {
      id: 'quick_sort',
      title: 'Quick Sort',
      category: 'Sorting',
      difficulty: 'Medium'
    };

    const res = validateSnippet(snippet);
    expect(res.isValid).toBe(true);
    expect(res.errors).toHaveLength(0);
  });

  it('rejects snippet with missing title or invalid difficulty tier', () => {
    const snippet = {
      id: 'test',
      title: '',
      category: 'Math',
      difficulty: 'Extreme'
    };

    const res = validateSnippet(snippet);
    expect(res.isValid).toBe(false);
    expect(res.errors).toContain('Snippet title is required');
    expect(res.errors).toContain('Valid difficulty (Easy, Medium, Hard) is required');
  });
});
