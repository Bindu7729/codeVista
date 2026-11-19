const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json({ limit: '1mb' }));

// Starter Algorithm Snippets Catalog
const ALGORITHM_SNIPPETS = {
  binary_search: {
    id: 'binary_search',
    title: 'Binary Search',
    category: 'Searching',
    difficulty: 'Easy',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    description: 'Efficient search algorithm on sorted arrays utilizing divide-and-conquer.'
  },
  bubble_sort: {
    id: 'bubble_sort',
    title: 'Bubble Sort',
    category: 'Sorting',
    difficulty: 'Easy',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(1)',
    description: 'Simple comparison-based sorting algorithm swapping adjacent elements in multiple passes.'
  },
  linked_list: {
    id: 'linked_list',
    title: 'Singly Linked List',
    category: 'Data Structures',
    difficulty: 'Medium',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Linear dynamic collection where each node references the subsequent element.'
  },
  bst_operations: {
    id: 'bst_operations',
    title: 'Binary Search Tree',
    category: 'Data Structures',
    difficulty: 'Medium',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(n)',
    description: 'Hierarchical node structure where left subtrees hold lesser values and right hold greater.'
  }
};

// Heartbeat status checking endpoint
app.get('/api/trace-status', (req, res) => {
  res.json({ 
    status: 'ONLINE', 
    message: 'CodeVista Execution Engine Core Active',
    version: '2.1.0-beta',
    runtimes: ['python', 'javascript', 'cpp', 'c', 'java', 'go', 'csharp'],
    timestamp: new Date().toISOString()
  });
});

// Snippets catalog list
app.get('/api/snippets', (req, res) => {
  const list = Object.values(ALGORITHM_SNIPPETS);
  res.json({
    success: true,
    count: list.length,
    snippets: list
  });
});

// Single snippet details
app.get('/api/snippets/:id', (req, res) => {
  const snippet = ALGORITHM_SNIPPETS[req.params.id];
  if (!snippet) {
    return res.status(404).json({ error: `Snippet with id '${req.params.id}' not found.` });
  }
  res.json({
    success: true,
    snippet
  });
});

// Code execution endpoint - compiles code into trace snapshots on the backend
app.post('/api/execute', (req, res) => {
  const { code, language = 'python', templateId } = req.body;

  if (!code || typeof code !== 'string' || !code.trim()) {
    return res.status(400).json({ error: 'Code buffer cannot be empty.' });
  }

  const supportedLanguages = ['python', 'javascript', 'java', 'cpp', 'c', 'go', 'csharp'];
  if (language && !supportedLanguages.includes(language.toLowerCase())) {
    return res.status(400).json({ 
      error: `Unsupported language '${language}'. Supported languages: ${supportedLanguages.join(', ')}` 
    });
  }

  // Simple backend interpreter simulation that parses simple variables and prints
  const lines = code.split('\n');
  const env = {};
  const steps = [];
  let stdout = '';

  lines.forEach((lineText, idx) => {
    const trimmed = lineText.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('//')) return;

    // Detect print statements
    const printMatch = trimmed.match(/^(?:print|console\.log|System\.out\.println)\((.+)\);?$/);
    if (printMatch) {
      let valExpr = printMatch[1].trim();
      let val = valExpr;
      if (valExpr.startsWith('"') && valExpr.endsWith('"')) {
        val = valExpr.slice(1, -1);
      } else if (!isNaN(Number(valExpr))) {
        val = Number(valExpr);
      } else if (env[valExpr] !== undefined) {
        val = env[valExpr];
      }
      stdout += val + '\n';
      steps.push({
        lineNum: idx + 1,
        variables: { ...env },
        explanation: `Print value: ${val}`,
        stdout: stdout
      });
      return;
    }

    // Detect assignment variable
    const assignMatch = trimmed.match(/^([\w_]+)\s*=\s*(.+);?$/);
    if (assignMatch) {
      const varName = assignMatch[1];
      const expr = assignMatch[2].trim();
      let val = expr;
      if (!isNaN(Number(expr))) {
        val = Number(expr);
      } else if (expr.startsWith('"') && expr.endsWith('"')) {
        val = expr.slice(1, -1);
      }
      env[varName] = val;
      steps.push({
        lineNum: idx + 1,
        variables: { ...env },
        explanation: `Assign value ${JSON.stringify(val)} to variable '${varName}'`,
        stdout: stdout
      });
      return;
    }

    // General step fallback
    steps.push({
      lineNum: idx + 1,
      variables: { ...env },
      explanation: 'Execute instruction',
      stdout: stdout
    });
  });

  if (steps.length === 0) {
    steps.push({
      lineNum: 1,
      variables: {},
      explanation: 'Initialize runtime context.',
      stdout: ''
    });
  }

  res.json({
    language,
    templateId,
    success: true,
    steps: steps
  });
});

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: 'API endpoint not found.' });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error occurred.' });
});

module.exports = app;
