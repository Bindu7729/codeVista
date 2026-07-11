const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Heartbeat status checking endpoint
app.get('/api/trace-status', (req, res) => {
  res.json({ 
    status: "ONLINE", 
    message: "CodeVista Execution Engine Core Active",
    version: "2.1.0-beta",
    runtimes: ["python", "javascript", "cpp", "c", "java", "go", "csharp"]
  });
});

// Code execution endpoint - compiles code into trace snapshots on the backend
app.post('/api/execute', (req, res) => {
  const { code, language, templateId } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Code buffer cannot be empty." });
  }

  // Simple backend interpreter simulation that parses simple variables and prints
  const lines = code.split('\n');
  const env = {};
  const steps = [];
  let stdout = "";

  lines.forEach((lineText, idx) => {
    const trimmed = lineText.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('//')) return;

    // Detect print statements
    const printMatch = trimmed.match(/^(?:print|console\.log)\((.+)\);?$/);
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
      stdout += val + "\n";
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
      explanation: `Execute instruction`,
      stdout: stdout
    });
  });

  if (steps.length === 0) {
    steps.push({
      lineNum: 1,
      variables: {},
      explanation: "Initialize runtime context.",
      stdout: ""
    });
  }

  res.json({
    language,
    templateId,
    success: true,
    steps: steps
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`CodeVista Core Engine pipeline running on port ${PORT}`);
});