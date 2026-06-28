export interface ExecutionStep {
  lineNum: number;
  variables: Record<string, any>;
  stack: { name: string; value: any }[];
  heap: { id: string; label: string; value: any }[];
  explanation: string;
  stdout: string;
  isAction: boolean;
  changedVariables: string[];
}

/**
 * A stateful interpreter for a subset of Python-like code.
 * It parses and executes assignments, simple loops, print statement and conditionals,
 * returning a step-by-step timeline of the execution.
 */
export function generateExecutionTimeline(code: string): ExecutionStep[] {
  const timeline: ExecutionStep[] = [];
  const lines = code.split('\n');

  // Pre-process: Clean up lines but preserve original 1-indexed line numbers
  const parsedLines = lines.map((text, idx) => ({
    lineNum: idx + 1,
    text: text,
    trimmed: text.trim(),
    indent: text.length - text.trimStart().length,
  }));

  // Environment state
  const env: Record<string, any> = {};
  let stdoutAccumulator = '';

  // Helpers to evaluate expressions using current env safely
  const evalExpr = (expr: string): any => {
    // Basic Python range parsing range(N) -> [0..N-1]
    const rangeMatch = expr.match(/range\((.+)\)/);
    if (rangeMatch) {
      try {
        const limit = evalExpr(rangeMatch[1]);
        return Array.from({ length: Number(limit) }, (_, i) => i);
      } catch {
        return [];
      }
    }

    // Python-style list literal parsing e.g. [1, 2, 3]
    if (expr.startsWith('[') && expr.endsWith(']')) {
      const items = expr.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
      return items.map(item => evalExpr(item));
    }

    // Replace Python terms with JS equivalents
    let jsExpr = expr
      .replace(/\band\b/g, '&&')
      .replace(/\bor\b/g, '||')
      .replace(/\bTrue\b/g, 'true')
      .replace(/\bFalse\b/g, 'false')
      .replace(/\bNone\b/g, 'null');

    // Run custom eval in environment context
    try {
      const keys = Object.keys(env);
      const values = Object.values(env);
      const fn = new Function(...keys, `return (${jsExpr});`);
      return fn(...values);
    } catch {
      // Fallback: If it's a raw string literal, return it
      if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
        return expr.slice(1, -1);
      }
      // If it's a number, return it
      if (!isNaN(Number(expr))) {
        return Number(expr);
      }
      return expr;
    }
  };

  // Stack/Heap visualization mapper helpers
  const mapStackAndHeap = (currentEnv: Record<string, any>) => {
    const stack: { name: string; value: any }[] = [];
    const heap: { id: string; label: string; value: any }[] = [];

    Object.entries(currentEnv).forEach(([key, val]) => {
      if (Array.isArray(val) || (val && typeof val === 'object')) {
        // Heap reference object
        const refId = `ref_${key}_${JSON.stringify(val).substring(0, 10)}`;
        stack.push({ name: key, value: `[Pointer: ${refId.substring(0, 8)}]` });
        heap.push({ id: refId, label: key, value: val });
      } else {
        // Stack reference primitive
        stack.push({ name: key, value: val });
      }
    });

    return { stack, heap };
  };

  // Structured Statement AST Compiler
  interface Statement {
    type: 'assign' | 'print' | 'visualize' | 'if' | 'for' | 'while' | 'pass';
    lineNum: number;
    text: string;
    // Assignment fields
    varName?: string;
    expr?: string;
    // Loop / Conditional fields
    cond?: string;
    iterator?: string;
    rangeExpr?: string;
    body?: Statement[];
    elseBody?: Statement[];
  }

  // Parse structured blocks recursively based on indentation
  const parseBlocks = (startIndex: number, parentIndent: number): { statements: Statement[]; nextIndex: number } => {
    const statements: Statement[] = [];
    let i = startIndex;

    while (i < parsedLines.length) {
      const line = parsedLines[i];
      
      // Skip empty lines and comments
      if (!line.trimmed || line.trimmed.startsWith('#') || line.trimmed.startsWith('//')) {
        i++;
        continue;
      }

      // If indentation decreases, we exit this block
      if (line.indent <= parentIndent) {
        break;
      }

      const trimmed = line.trimmed;

      // 1. FOR loop parsing: for i in range(3): or for item in items:
      const forMatch = trimmed.match(/^for\s+(\w+)\s+in\s+(.+):$/);
      if (forMatch) {
        const iterator = forMatch[1];
        const rangeExpr = forMatch[2].trim();
        const { statements: body, nextIndex } = parseBlocks(i + 1, line.indent);
        statements.push({
          type: 'for',
          lineNum: line.lineNum,
          text: line.text,
          iterator,
          rangeExpr,
          body,
        });
        i = nextIndex;
        continue;
      }

      // 2. IF condition parsing: if x > 5:
      const ifMatch = trimmed.match(/^if\s+(.+):$/);
      if (ifMatch) {
        const cond = ifMatch[1].trim();
        const { statements: body, nextIndex } = parseBlocks(i + 1, line.indent);
        
        let elseBody: Statement[] = [];
        let nextI = nextIndex;
        
        // Peek if next statement is 'else:'
        while (nextI < parsedLines.length) {
          const peekLine = parsedLines[nextI];
          if (!peekLine.trimmed || peekLine.trimmed.startsWith('#') || peekLine.trimmed.startsWith('//')) {
            nextI++;
            continue;
          }
          if (peekLine.indent === line.indent && peekLine.trimmed === 'else:') {
            const elseResult = parseBlocks(nextI + 1, peekLine.indent);
            elseBody = elseResult.statements;
            nextI = elseResult.nextIndex;
          }
          break;
        }

        statements.push({
          type: 'if',
          lineNum: line.lineNum,
          text: line.text,
          cond,
          body,
          elseBody,
        });
        i = nextI;
        continue;
      }

      // 3. WHILE loop parsing: while x < 5:
      const whileMatch = trimmed.match(/^while\s+(.+):$/);
      if (whileMatch) {
        const cond = whileMatch[1].trim();
        const { statements: body, nextIndex } = parseBlocks(i + 1, line.indent);
        statements.push({
          type: 'while',
          lineNum: line.lineNum,
          text: line.text,
          cond,
          body,
        });
        i = nextIndex;
        continue;
      }

      // 4. PRINT statement: print("...") or print(x)
      const printMatch = trimmed.match(/^print\((.+)\)$/);
      if (printMatch) {
        statements.push({
          type: 'print',
          lineNum: line.lineNum,
          text: line.text,
          expr: printMatch[1].trim(),
        });
        i++;
        continue;
      }

      // 5. VISUALIZE flow check: visualize_flow(...)
      const visMatch = trimmed.match(/^visualize_flow\((.+)\)$/);
      if (visMatch) {
        statements.push({
          type: 'visualize',
          lineNum: line.lineNum,
          text: line.text,
          expr: visMatch[1].trim(),
        });
        i++;
        continue;
      }

      // 6. Variable assignment: x = 10
      const assignMatch = trimmed.match(/^([\w_]+)\s*=\s*(.+)$/);
      if (assignMatch) {
        statements.push({
          type: 'assign',
          lineNum: line.lineNum,
          text: line.text,
          varName: assignMatch[1],
          expr: assignMatch[2].trim(),
        });
        i++;
        continue;
      }

      // 7. Fallback: standard statement execution
      statements.push({
        type: 'pass',
        lineNum: line.lineNum,
        text: line.text,
      });
      i++;
    }

    return { statements, nextIndex: i };
  }

  // Parse starting from root level indentation (indent = -1)
  const { statements } = parseBlocks(0, -1);

  // Execution engine run visitor loop
  const executeStatements = (stmts: Statement[]) => {
    let stepCount = 0;
    const maxSteps = 1000; // prevent infinite loops

    const runList = (list: Statement[]) => {
      for (const stmt of list) {
        if (stepCount++ > maxSteps) return;

        // Snapshot current environment variables list
        const snapshotEnv = () => ({ ...env });

        if (stmt.type === 'assign') {
          const name = stmt.varName!;
          const val = evalExpr(stmt.expr!);
          const prevVal = env[name];
          env[name] = val;

          const { stack, heap } = mapStackAndHeap(env);
          timeline.push({
            lineNum: stmt.lineNum,
            variables: snapshotEnv(),
            stack,
            heap,
            explanation: prevVal !== undefined 
              ? `Update variable '${name}' from ${JSON.stringify(prevVal)} to ${JSON.stringify(val)}.`
              : `Create variable '${name}' with value ${JSON.stringify(val)}.`,
            stdout: stdoutAccumulator,
            isAction: false,
            changedVariables: [name],
          });
        } 
        else if (stmt.type === 'print') {
          const val = evalExpr(stmt.expr!);
          stdoutAccumulator += JSON.stringify(val) + '\n';

          const { stack, heap } = mapStackAndHeap(env);
          timeline.push({
            lineNum: stmt.lineNum,
            variables: snapshotEnv(),
            stack,
            heap,
            explanation: `Print value: ${JSON.stringify(val)}.`,
            stdout: stdoutAccumulator,
            isAction: true,
            changedVariables: [],
          });
        } 
        else if (stmt.type === 'visualize') {
          const val = evalExpr(stmt.expr!);
          const { stack, heap } = mapStackAndHeap(env);
          timeline.push({
            lineNum: stmt.lineNum,
            variables: snapshotEnv(),
            stack,
            heap,
            explanation: `Trigger flow visualization with value: ${JSON.stringify(val)}.`,
            stdout: stdoutAccumulator,
            isAction: true,
            changedVariables: [],
          });
        } 
        else if (stmt.type === 'pass') {
          const { stack, heap } = mapStackAndHeap(env);
          timeline.push({
            lineNum: stmt.lineNum,
            variables: snapshotEnv(),
            stack,
            heap,
            explanation: `Execute line.`,
            stdout: stdoutAccumulator,
            isAction: false,
            changedVariables: [],
          });
        } 
        else if (stmt.type === 'if') {
          const condVal = !!evalExpr(stmt.cond!);
          const { stack, heap } = mapStackAndHeap(env);
          
          timeline.push({
            lineNum: stmt.lineNum,
            variables: snapshotEnv(),
            stack,
            heap,
            explanation: `Check condition: '${stmt.cond}' evaluates to ${condVal}.`,
            stdout: stdoutAccumulator,
            isAction: false,
            changedVariables: [],
          });

          if (condVal) {
            runList(stmt.body || []);
          } else if (stmt.elseBody && stmt.elseBody.length > 0) {
            runList(stmt.elseBody);
          }
        } 
        else if (stmt.type === 'for') {
          const iterator = stmt.iterator!;
          const listVal = evalExpr(stmt.rangeExpr!);
          
          if (Array.isArray(listVal)) {
            for (const item of listVal) {
              env[iterator] = item;
              const { stack, heap } = mapStackAndHeap(env);
              timeline.push({
                lineNum: stmt.lineNum,
                variables: snapshotEnv(),
                stack,
                heap,
                explanation: `Loop iteration: Set '${iterator}' to ${JSON.stringify(item)} from sequence.`,
                stdout: stdoutAccumulator,
                isAction: false,
                changedVariables: [iterator],
              });

              runList(stmt.body || []);
            }
          }
        } 
        else if (stmt.type === 'while') {
          while (true) {
            if (stepCount++ > maxSteps) return;
            const condVal = !!evalExpr(stmt.cond!);
            const { stack, heap } = mapStackAndHeap(env);
            
            timeline.push({
              lineNum: stmt.lineNum,
              variables: snapshotEnv(),
              stack,
              heap,
              explanation: `Check loop condition: '${stmt.cond}' is ${condVal}.`,
              stdout: stdoutAccumulator,
              isAction: false,
              changedVariables: [],
            });

            if (!condVal) break;
            runList(stmt.body || []);
          }
        }
      }
    };

    runList(stmts);
  };

  executeStatements(statements);

  // If code is empty or has no steps, append a fallback default start step
  if (timeline.length === 0) {
    timeline.push({
      lineNum: 1,
      variables: {},
      stack: [],
      heap: [],
      explanation: 'Initialize sandbox environment thread.',
      stdout: '',
      isAction: false,
      changedVariables: [],
    });
  }

  return timeline;
}
