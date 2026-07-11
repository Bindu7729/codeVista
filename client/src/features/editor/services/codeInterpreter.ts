export interface ExecutionStep {
  lineNum: number;
  variables: Record<string, any>;
  stack: { name: string; value: any }[];
  heap: { id: string; label: string; value: any }[];
  explanation: string;
  stdout: string;
  isAction: boolean;
  changedVariables: string[];
  widgetData?: {
    type: 'array' | 'linkedlist' | 'stack' | 'queue' | 'tree' | 'graph';
    values?: any[];
    pointers?: Record<string, number>;
    highlights?: number[];
    swaps?: number[];
    nodes?: { id: string; val: any; x: number; y: number; active?: boolean }[];
    edges?: { from: string; to: string; active?: boolean }[];
  };
}

export const CODE_TEMPLATES: Record<string, Record<string, string>> = {
  binary_search: {
    python: `arr = [12, 24, 32, 45, 57, 68, 79, 90]\ntarget = 45\nlow = 0\nhigh = len(arr) - 1\nwhile low <= high:\n    mid = (low + high) // 2\n    guess = arr[mid]\n    if guess == target:\n        print("Target found at index " + str(mid))\n        break\n    if guess > target:\n        high = mid - 1\n    else:\n        low = mid + 1`,
    javascript: `let arr = [12, 24, 32, 45, 57, 68, 79, 90];\nlet target = 45;\nlet low = 0;\nlet high = arr.length - 1;\nwhile (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    let guess = arr[mid];\n    if (guess === target) {\n        console.log("Target found at index " + mid);\n        break;\n    }\n    if (guess > target) {\n        high = mid - 1;\n    } else {\n        low = mid + 1;\n    }\n}`,
    java: `int[] arr = {12, 24, 32, 45, 57, 68, 79, 90};\nint target = 45;\nint low = 0;\nint high = arr.length - 1;\nwhile (low <= high) {\n    int mid = (low + high) / 2;\n    int guess = arr[mid];\n    if (guess == target) {\n        System.out.println("Target found at index " + mid);\n        break;\n    }\n    if (guess > target) {\n        high = mid - 1;\n    } else {\n        low = mid + 1;\n    }\n}`
  },
  bubble_sort: {
    python: `arr = [57, 12, 45, 24, 90, 32]\nn = len(arr)\nfor i in range(n):\n    for j in range(0, n - i - 1):\n        if arr[j] > arr[j + 1]:\n            temp = arr[j]\n            arr[j] = arr[j + 1]\n            arr[j + 1] = temp`,
    javascript: `let arr = [57, 12, 45, 24, 90, 32];\nlet n = arr.length;\nfor (let i = 0; i < n; i++) {\n    for (let j = 0; j < n - i - 1; j++) {\n        if (arr[j] > arr[j + 1]) {\n            let temp = arr[j];\n            arr[j] = arr[j + 1];\n            arr[j + 1] = temp;\n        }\n    }\n}`,
    java: `int[] arr = {57, 12, 45, 24, 90, 32};\nint n = arr.length;\nfor (int i = 0; i < n; i++) {\n    for (int j = 0; j < n - i - 1; j++) {\n        if (arr[j] > arr[j + 1]) {\n            int temp = arr[j];\n            arr[j] = arr[j + 1];\n            arr[j + 1] = temp;\n        }\n    }\n}`
  },
  linked_list: {
    python: `class Node:\n    def __init__(self, val):\n        self.val = val\n        self.next = None\n\nhead = Node(10)\nnodeB = Node(20)\nnodeC = Node(30)\nhead.next = nodeB\nnodeB.next = nodeC`,
    javascript: `class Node {\n    constructor(val) {\n        this.val = val;\n        this.next = null;\n    }\n}\n\nlet head = new Node(10);\nlet nodeB = new Node(20);\nlet nodeC = new Node(30);\nhead.next = nodeB;\nnodeB.next = nodeC;`,
    java: `class Node {\n    int val;\n    Node next;\n    Node(int val) {\n        this.val = val;\n    }\n}\n\nNode head = new Node(10);\nNode nodeB = new Node(20);\nNode nodeC = new Node(30);\nhead.next = nodeB;\nnodeB.next = nodeC;`
  },
  bst_operations: {
    python: `class TreeNode:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None\n\nroot = TreeNode(40)\nroot.left = TreeNode(20)\nroot.right = TreeNode(60)\nroot.left.left = TreeNode(10)\nroot.left.right = TreeNode(30)`,
    javascript: `class TreeNode {\n    constructor(val) {\n        this.val = val;\n        this.left = null;\n        this.right = null;\n    }\n}\n\nlet root = new TreeNode(40);\nroot.left = new TreeNode(20);\nroot.right = new TreeNode(60);\nroot.left.left = new TreeNode(10);\nroot.left.right = new TreeNode(30);`,
    java: `class TreeNode {\n    int val;\n    TreeNode left;\n    TreeNode right;\n    TreeNode(int val) {\n        this.val = val;\n    }\n}\n\nTreeNode root = new TreeNode(40);\nroot.left = new TreeNode(20);\nroot.right = new TreeNode(60);\nroot.left.left = new TreeNode(10);\nroot.left.right = new TreeNode(30);`
  }
};

function evaluateExpression(expr: string, env: Record<string, any>, language: string): any {
  // Strip comments depending on language
  let cleaned = expr;
  if (language === 'python') {
    cleaned = expr.split('#')[0].trim();
  } else {
    cleaned = expr.split('//')[0].trim();
  }

  // Strip trailing semicolons
  if (cleaned.endsWith(';')) {
    cleaned = cleaned.slice(0, -1).trim();
  }

  // Handle boolean/null literals
  if (cleaned === 'true') return true;
  if (cleaned === 'false') return false;
  if (cleaned === 'None' || cleaned === 'null') return null;

  // Handle String concatenation/literals
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    return cleaned.slice(1, -1);
  }

  // Handle Array definitions
  if (cleaned.startsWith('[') && cleaned.endsWith(']')) {
    const inner = cleaned.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(',').map(item => evaluateExpression(item, env, language));
  }

  // Handle Java array initializer { ... }
  if (cleaned.startsWith('{') && cleaned.endsWith('}')) {
    const inner = cleaned.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(',').map(item => evaluateExpression(item, env, language));
  }

  // Handle Node creation e.g. Node(10), new Node(10)
  const nodeMatch = cleaned.match(/^(?:new\s+)?(\w+)\((.+)\)$/);
  if (nodeMatch) {
    const arg = evaluateExpression(nodeMatch[2], env, language);
    return { val: arg, left: null, right: null, next: null };
  }

  // Detect Python floor division //
  const hasFloorDiv = cleaned.includes('//');
  let evalStr = cleaned.replace(/\/\//g, '/');

  // Replace variable names with their values
  const keys = Object.keys(env).sort((a, b) => b.length - a.length);
  keys.forEach(k => {
    const regex = new RegExp(`\\b${k}\\b`, 'g');
    let val = env[k];
    if (Array.isArray(val)) {
      val = JSON.stringify(val);
    } else if (val && typeof val === 'object') {
      val = JSON.stringify(val);
    }
    evalStr = evalStr.replace(regex, val);
  });

  try {
    evalStr = evalStr.replace(/\bNone\b/g, 'null');
    // Supply a len and str helper context
    let result = new Function("len", "str", `return (${evalStr})`)(
      (x: any) => Array.isArray(x) ? x.length : 0,
      (x: any) => String(x)
    );
    if (hasFloorDiv && typeof result === 'number') {
      result = Math.floor(result);
    }
    return result;
  } catch (e) {
    if (env[cleaned] !== undefined) {
      return env[cleaned];
    }
    if (!isNaN(Number(cleaned))) {
      return Number(cleaned);
    }
    return cleaned;
  }
}

// Tree node recursive visual positioning layout
function buildTreeStructure(obj: any, x: number, y: number, offset: number, nodes: any[], edges: any[], idRef = { val: 0 }) {
  if (!obj || obj.val === undefined) return;
  const currentId = `node_${idRef.val++}`;
  nodes.push({ id: currentId, val: obj.val, x, y });

  if (obj.left) {
    const childId = `node_${idRef.val}`;
    edges.push({ from: currentId, to: childId });
    buildTreeStructure(obj.left, x - offset, y + 45, offset / 2, nodes, edges, idRef);
  }
  if (obj.right) {
    const childId = `node_${idRef.val}`;
    edges.push({ from: currentId, to: childId });
    buildTreeStructure(obj.right, x + offset, y + 45, offset / 2, nodes, edges, idRef);
  }
}

// Linked list node visual chain alignment
function buildListStructure(obj: any, x: number, y: number, nodes: any[], edges: any[], idRef = { val: 0 }) {
  if (!obj || obj.val === undefined) return;
  const currentId = `node_${idRef.val++}`;
  nodes.push({ id: currentId, val: obj.val, x, y });

  if (obj.next) {
    const childId = `node_${idRef.val}`;
    edges.push({ from: currentId, to: childId });
    buildListStructure(obj.next, x + 120, y, nodes, edges, idRef);
  }
}

// ----------------------------------------------------
// FULL STATEFUL RUNTIME INTERPRETER VM
// ----------------------------------------------------

export function generateExecutionTimeline(code: string, language: string, templateId: string): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  const lines = code.split('\n');
  const env: Record<string, any> = {};
  let stdout = "";
  
  let pc = 0;
  let maxInstructions = 120; // safe loops limit
  let instructionCount = 0;

  // VM Jump and block frames stacks
  const loopStack: { type: 'while' | 'for'; startPc: number; indent: number; varName?: string; limitExpr?: string; limitVal?: number }[] = [];
  const ifStack: { indent: number; executed: boolean }[] = [];

  const getIndent = (str: string) => {
    const match = str.match(/^(\s*)/);
    return match ? match[1].length : 0;
  };

  const findActiveWidget = (currentEnv: Record<string, any>): ExecutionStep['widgetData'] => {
    // 1. Detect BST Trees
    for (const [key, val] of Object.entries(currentEnv)) {
      if (val && typeof val === 'object' && val.val !== undefined && (val.left !== undefined || val.right !== undefined)) {
        const nodes: any[] = [];
        const edges: any[] = [];
        buildTreeStructure(val, 170, 25, 70, nodes, edges);
        if (nodes.length > 0) return { type: 'tree', nodes, edges };
      }
    }

    // 2. Detect Linked Lists
    for (const [key, val] of Object.entries(currentEnv)) {
      if (val && typeof val === 'object' && val.val !== undefined && val.next !== undefined) {
        const nodes: any[] = [];
        const edges: any[] = [];
        buildListStructure(val, 50, 70, nodes, edges);
        if (nodes.length > 0) return { type: 'linkedlist', nodes, edges };
      }
    }

    // 3. Detect Stacks / Queues / Arrays
    for (const [key, val] of Object.entries(currentEnv)) {
      if (Array.isArray(val)) {
        if (key.toLowerCase().includes('stack')) {
          return { type: 'stack', values: val };
        }
        if (key.toLowerCase().includes('queue')) {
          return { type: 'queue', values: val };
        }
        const pointers: Record<string, number> = {};
        Object.entries(currentEnv).forEach(([k, v]) => {
          if (typeof v === 'number' && v >= 0 && v < val.length && k !== 'n' && k !== 'target') {
            pointers[k] = v;
          }
        });
        return { type: 'array', values: val, pointers };
      }
    }

    return undefined;
  };

  const mapStackAndHeap = (currentEnv: Record<string, any>) => {
    const stack: { name: string; value: any }[] = [];
    const heap: { id: string; label: string; value: any }[] = [];

    Object.entries(currentEnv).forEach(([key, val]) => {
      if (Array.isArray(val) || (val && typeof val === 'object')) {
        const refId = `ref_${key}_0x7f`;
        stack.push({ name: key, value: `[Pointer: ${refId}]` });
        heap.push({ id: refId, label: key, value: val });
      } else {
        stack.push({ name: key, value: val });
      }
    });

    return { stack, heap };
  };

  while (pc < lines.length && instructionCount < maxInstructions) {
    instructionCount++;
    const lineText = lines[pc];
    const trimmed = lineText.trim();
    const currentIndent = getIndent(lineText);

    // Skip blank and non-executable imports
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('//') || trimmed.startsWith('import ') || trimmed.startsWith('class ')) {
      pc++;
      continue;
    }

    // ----------------------------------------------------
    // CONTROL FLOW BLOCK EXITS
    // ----------------------------------------------------

    // Python block exits checking indentations
    if (language === 'python' && loopStack.length > 0) {
      const topLoop = loopStack[loopStack.length - 1];
      if (currentIndent <= topLoop.indent && trimmed !== '}' && !trimmed.startsWith('else:') && !trimmed.startsWith('elif ')) {
        const popped = loopStack.pop()!;
        // If it's a Python for loop, increment iteration variable
        if (popped.type === 'for' && popped.varName) {
          env[popped.varName] = (env[popped.varName] || 0) + 1;
        }
        pc = popped.startPc;
        continue;
      }
    }

    // JS/Java closing braces exits
    if (trimmed === '}') {
      if (loopStack.length > 0) {
        const popped = loopStack.pop()!;
        if (popped.type === 'for' && popped.varName) {
          env[popped.varName] = (env[popped.varName] || 0) + 1;
        }
        pc = popped.startPc;
      } else if (ifStack.length > 0) {
        ifStack.pop();
        pc++;
      } else {
        pc++;
      }
      continue;
    }

    // ----------------------------------------------------
    // CONDITIONALS (IF / ELIF / ELSE)
    // ----------------------------------------------------
    const ifMatch = trimmed.match(/^if\s+(.+):?$/) || trimmed.match(/^if\s*\((.+)\)\s*\{?$/);
    if (ifMatch) {
      const condExpr = ifMatch[1].replace(/\{$/, '').trim();
      const condition = evaluateExpression(condExpr, env, language);

      if (condition) {
        ifStack.push({ indent: currentIndent, executed: true });
        const { stack, heap } = mapStackAndHeap(env);
        steps.push({
          lineNum: pc + 1,
          variables: { ...env },
          stack,
          heap,
          explanation: `Conditional check: "${condExpr}" is true. Enter branch body.`,
          stdout,
          isAction: false,
          changedVariables: [],
          widgetData: findActiveWidget(env)
        });
        pc++;
      } else {
        ifStack.push({ indent: currentIndent, executed: false });
        // Jump past if branch body
        let targetPc = pc + 1;
        while (targetPc < lines.length) {
          const nextTrimmed = lines[targetPc].trim();
          const nextIndent = getIndent(lines[targetPc]);
          if (language === 'python') {
            if (nextTrimmed && nextIndent <= currentIndent) break;
          } else {
            if (nextTrimmed === '}' || nextTrimmed.startsWith('else')) break;
          }
          targetPc++;
        }
        pc = targetPc;
      }
      continue;
    }

    const elseMatch = trimmed.startsWith('else:') || trimmed.startsWith('else ') || trimmed.startsWith('elif ') || trimmed.startsWith('else{');
    if (elseMatch) {
      const topIf = ifStack[ifStack.length - 1];
      // If the preceding 'if' branch was executed, skip this else block
      if (topIf && topIf.executed) {
        let targetPc = pc + 1;
        while (targetPc < lines.length) {
          const nextTrimmed = lines[targetPc].trim();
          const nextIndent = getIndent(lines[targetPc]);
          if (language === 'python') {
            if (nextTrimmed && nextIndent <= currentIndent) break;
          } else {
            if (nextTrimmed === '}') break;
          }
          targetPc++;
        }
        pc = targetPc + (language === 'python' ? 0 : 1);
        ifStack.pop();
      } else {
        // Execute this else branch
        if (topIf) topIf.executed = true;
        const { stack, heap } = mapStackAndHeap(env);
        steps.push({
          lineNum: pc + 1,
          variables: { ...env },
          stack,
          heap,
          explanation: `Enter else/elif branch block.`,
          stdout,
          isAction: false,
          changedVariables: [],
          widgetData: findActiveWidget(env)
        });
        pc++;
      }
      continue;
    }

    // ----------------------------------------------------
    // LOOPS (WHILE / FOR)
    // ----------------------------------------------------
    const whileMatch = trimmed.match(/^while\s+(.+):?$/) || trimmed.match(/^while\s*\((.+)\)\s*\{?$/);
    if (whileMatch) {
      const condExpr = whileMatch[1].replace(/\{$/, '').trim();
      const condition = evaluateExpression(condExpr, env, language);

      if (condition) {
        loopStack.push({ type: 'while', startPc: pc, indent: currentIndent });
        const { stack, heap } = mapStackAndHeap(env);
        steps.push({
          lineNum: pc + 1,
          variables: { ...env },
          stack,
          heap,
          explanation: `Loop condition "${condExpr}" is true. Enter body.`,
          stdout,
          isAction: false,
          changedVariables: [],
          widgetData: findActiveWidget(env)
        });
        pc++;
      } else {
        // Jump past loop body
        let targetPc = pc + 1;
        while (targetPc < lines.length) {
          const nextTrimmed = lines[targetPc].trim();
          const nextIndent = getIndent(lines[targetPc]);
          if (language === 'python') {
            if (nextTrimmed && nextIndent <= currentIndent) break;
          } else {
            if (nextTrimmed === '}') break;
          }
          targetPc++;
        }
        pc = targetPc + (language === 'python' ? 0 : 1);
      }
      continue;
    }

    // Simple Python range loop parser e.g. for i in range(n)
    const pyForMatch = trimmed.match(/^for\s+([\w_]+)\s+in\s+range\((.+)\):$/);
    if (pyForMatch) {
      const iteratorVar = pyForMatch[1];
      const limitExpr = pyForMatch[2].trim();
      
      let startVal = 0;
      let endVal = 0;
      if (limitExpr.includes(',')) {
        const parts = limitExpr.split(',');
        startVal = evaluateExpression(parts[0], env, language);
        endVal = evaluateExpression(parts[1], env, language);
      } else {
        endVal = evaluateExpression(limitExpr, env, language);
      }

      if (env[iteratorVar] === undefined) {
        env[iteratorVar] = startVal;
      }

      if (env[iteratorVar] < endVal) {
        loopStack.push({ type: 'for', startPc: pc, indent: currentIndent, varName: iteratorVar, limitVal: endVal });
        const { stack, heap } = mapStackAndHeap(env);
        steps.push({
          lineNum: pc + 1,
          variables: { ...env },
          stack,
          heap,
          explanation: `For loop step: ${iteratorVar} = ${env[iteratorVar]} (limit: ${endVal})`,
          stdout,
          isAction: false,
          changedVariables: [iteratorVar],
          widgetData: findActiveWidget(env)
        });
        pc++;
      } else {
        // Exited loop, remove iterator
        delete env[iteratorVar];
        let targetPc = pc + 1;
        while (targetPc < lines.length) {
          const nextTrimmed = lines[targetPc].trim();
          const nextIndent = getIndent(lines[targetPc]);
          if (nextTrimmed && nextIndent <= currentIndent) break;
          targetPc++;
        }
        pc = targetPc;
      }
      continue;
    }

    // Simple JS/Java for loop parser e.g. for (let i = 0; i < n; i++)
    const jsForMatch = trimmed.match(/^for\s*\((?:let|int)?\s*([\w_]+)\s*=\s*(.+);\s*(.+);\s*(.+)\)\s*\{?$/);
    if (jsForMatch) {
      const iteratorVar = jsForMatch[1];
      const startExpr = jsForMatch[2].trim();
      const condExpr = jsForMatch[3].trim();
      const postExpr = jsForMatch[4].trim();

      if (env[iteratorVar] === undefined) {
        env[iteratorVar] = evaluateExpression(startExpr, env, language);
      } else {
        // Increment iterator var using postExpr context
        if (postExpr.includes('++')) env[iteratorVar]++;
        else if (postExpr.includes('--')) env[iteratorVar]--;
        else {
          const assignVal = postExpr.match(/=\s*(.+)$/);
          if (assignVal) env[iteratorVar] = evaluateExpression(assignVal[1], env, language);
        }
      }

      const condition = evaluateExpression(condExpr, env, language);
      if (condition) {
        loopStack.push({ type: 'for', startPc: pc, indent: currentIndent, varName: iteratorVar });
        const { stack, heap } = mapStackAndHeap(env);
        steps.push({
          lineNum: pc + 1,
          variables: { ...env },
          stack,
          heap,
          explanation: `For loop step: ${iteratorVar} = ${env[iteratorVar]}`,
          stdout,
          isAction: false,
          changedVariables: [iteratorVar],
          widgetData: findActiveWidget(env)
        });
        pc++;
      } else {
        delete env[iteratorVar];
        let targetPc = pc + 1;
        while (targetPc < lines.length) {
          const nextTrimmed = lines[targetPc].trim();
          if (nextTrimmed === '}') break;
          targetPc++;
        }
        pc = targetPc + 1;
      }
      continue;
    }

    // ----------------------------------------------------
    // STATEMENTS & COMMANDS
    // ----------------------------------------------------

    // Handle break/continue statements
    if (trimmed === 'break' || trimmed === 'break;') {
      if (loopStack.length > 0) {
        const popped = loopStack.pop()!;
        delete env[popped.varName || ''];
        let targetPc = pc + 1;
        while (targetPc < lines.length) {
          const nextTrimmed = lines[targetPc].trim();
          const nextIndent = getIndent(lines[targetPc]);
          if (language === 'python') {
            if (nextTrimmed && nextIndent <= popped.indent) break;
          } else {
            if (nextTrimmed === '}') break;
          }
          targetPc++;
        }
        pc = targetPc + (language === 'python' ? 0 : 1);
      } else {
        pc++;
      }
      continue;
    }

    // Handle print actions
    const printMatch = trimmed.match(/^(?:print|console\.log|System\.out\.println)\((.+)\);?$/);
    if (printMatch) {
      const valExpr = printMatch[1].trim();
      const val = evaluateExpression(valExpr, env, language);
      stdout += (val === null ? "null" : typeof val === 'object' ? JSON.stringify(val) : val) + "\n";
      const { stack, heap } = mapStackAndHeap(env);
      steps.push({
        lineNum: pc + 1,
        variables: { ...env },
        stack,
        heap,
        explanation: `Print output to console: ${JSON.stringify(val)}`,
        stdout,
        isAction: true,
        changedVariables: [],
        widgetData: findActiveWidget(env)
      });
      pc++;
      continue;
    }

    // Handle assignments
    const assignMatch = trimmed.match(/^(?:let|var|const|int|float|double|String|Node|TreeNode)?\s*([\w_]+(?:\.[\w_]+)?)\s*=\s*(.+);?$/);
    if (assignMatch) {
      const targetVar = assignMatch[1];
      const expr = assignMatch[2].trim();
      const val = evaluateExpression(expr, env, language);
      let changedVars = [targetVar];
      let expl = "";

      if (targetVar.includes('.')) {
        const parts = targetVar.split('.');
        const parentObj = env[parts[0]];
        if (parentObj && typeof parentObj === 'object') {
          parentObj[parts[1]] = val;
          expl = `Update node property: ${targetVar} = ${val && val.val !== undefined ? val.val : JSON.stringify(val)}`;
          changedVars = [parts[0]];
        }
      } else {
        const arrayIdxMatch = targetVar.match(/^([\w_]+)\[(.+)\]$/);
        if (arrayIdxMatch) {
          const arrName = arrayIdxMatch[1];
          const idxExpr = arrayIdxMatch[2];
          const arr = env[arrName];
          const idx = evaluateExpression(idxExpr, env, language);
          if (Array.isArray(arr) && idx >= 0) {
            arr[idx] = val;
            expl = `Update index element: ${arrName}[${idx}] = ${val}`;
            changedVars = [arrName];
          }
        } else {
          env[targetVar] = val;
          expl = `Set variable: ${targetVar} = ${val && val.val !== undefined ? val.val : JSON.stringify(val)}`;
        }
      }

      const { stack, heap } = mapStackAndHeap(env);
      steps.push({
        lineNum: pc + 1,
        variables: { ...env },
        stack,
        heap,
        explanation: expl,
        stdout,
        isAction: false,
        changedVariables: changedVars,
        widgetData: findActiveWidget(env)
      });
      pc++;
      continue;
    }

    // Method push/pop/append/shift mutations
    const methodMatch = trimmed.match(/^([\w_]+)\.(push|append|enqueue|pop|shift|pop_back)\((.*)\);?$/);
    if (methodMatch) {
      const objectName = methodMatch[1];
      const method = methodMatch[2];
      const argExpr = methodMatch[3].trim();
      const obj = env[objectName];

      if (Array.isArray(obj)) {
        let expl = "";
        if (method === 'push' || method === 'append' || method === 'enqueue') {
          const argVal = evaluateExpression(argExpr, env, language);
          obj.push(argVal);
          expl = `Push/Append ${argVal} into list '${objectName}'`;
        } else if (method === 'pop' || method === 'pop_back') {
          const popped = obj.pop();
          expl = `Pop/Remove value ${popped} from list '${objectName}'`;
        } else if (method === 'shift') {
          const shifted = obj.shift();
          expl = `Shift/Dequeue value ${shifted} from list '${objectName}'`;
        }

        const { stack, heap } = mapStackAndHeap(env);
        steps.push({
          lineNum: pc + 1,
          variables: { ...env },
          stack,
          heap,
          explanation: expl,
          stdout,
          isAction: true,
          changedVariables: [objectName],
          widgetData: findActiveWidget(env)
        });
      }
      pc++;
      continue;
    }

    // Step fallback
    const { stack, heap } = mapStackAndHeap(env);
    steps.push({
      lineNum: pc + 1,
      variables: { ...env },
      stack,
      heap,
      explanation: `Execute instruction: ${trimmed}`,
      stdout,
      isAction: false,
      changedVariables: [],
      widgetData: findActiveWidget(env)
    });
    pc++;
  }

  // Safety fallback
  if (steps.length === 0) {
    steps.push({
      lineNum: 1,
      variables: {},
      stack: [],
      heap: [],
      explanation: "Start execution trace timeline.",
      stdout: "",
      isAction: false,
      changedVariables: []
    });
  }

  return steps;
}
