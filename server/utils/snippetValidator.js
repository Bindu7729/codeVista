function validateSnippet(snippet = {}) {
  const errors = [];

  if (!snippet.id || typeof snippet.id !== 'string') {
    errors.push('Snippet ID is required');
  }

  if (!snippet.title || typeof snippet.title !== 'string') {
    errors.push('Snippet title is required');
  }

  if (!snippet.category || typeof snippet.category !== 'string') {
    errors.push('Snippet category is required');
  }

  if (!snippet.difficulty || !['Easy', 'Medium', 'Hard'].includes(snippet.difficulty)) {
    errors.push('Valid difficulty (Easy, Medium, Hard) is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = { validateSnippet };
