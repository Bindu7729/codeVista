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
    python: `arr = [12, 24, 32, 45, 57, 68, 79, 90]\ntarget = 45\nlow = 0\nhigh = len(arr) - 1\nwhile low <= high:\n    mid = (low + high) // 2\n    guess = arr[mid]\n    if guess == target:\n        print("Target found!")\n        break\n    if guess > target:\n        high = mid - 1\n    else:\n        low = mid + 1`,
    javascript: `let arr = [12, 24, 32, 45, 57, 68, 79, 90];\nlet target = 45;\nlet low = 0;\nlet high = arr.length - 1;\nwhile (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    let guess = arr[mid];\n    if (guess === target) {\n        console.log("Target found!");\n        break;\n    }\n    if (guess > target) {\n        high = mid - 1;\n    } else {\n        low = mid + 1;\n    }\n}`,
    java: `int[] arr = {12, 24, 32, 45, 57, 68, 79, 90};\nint target = 45;\nint low = 0;\nint high = arr.length - 1;\nwhile (low <= high) {\n    int mid = (low + high) / 2;\n    int guess = arr[mid];\n    if (guess == target) {\n        System.out.println("Target found!");\n        break;\n    }\n    if (guess > target) {\n        high = mid - 1;\n    } else {\n        low = mid + 1;\n    }\n}`
  },
  bubble_sort: {
    python: `arr = [57, 12, 45, 24, 90, 32]\nn = len(arr)\nfor i in range(n):\n    for j in range(0, n - i - 1):\n        if arr[j] > arr[j + 1]:\n            temp = arr[j]\n            arr[j] = arr[j + 1]\n            arr[j + 1] = temp`,
    javascript: `let arr = [57, 12, 45, 24, 90, 32];\nlet n = arr.length;\nfor (let i = 0; i < n; i++) {\n    for (let j = 0; j < n - i - 1; j++) {\n        if (arr[j] > arr[j + 1]) {\n            let temp = arr[j];\n            arr[j] = arr[j + 1];\n            arr[j + 1] = temp;\n        }\n    }\n}`,
    java: `int[] arr = {57, 12, 45, 24, 90, 32};\nint n = arr.length;\nfor (int i = 0; i < n; i++) {\n    for (int j = 0; j < n - i - 1; j++) {\n        if (arr[j] > arr[j + 1]) {\n            int temp = arr[j];\n            arr[j] = arr[j + 1];\n            arr[j + 1] = temp;\n        }\n    }\n}`
  },
  linked_list: {
    python: `class Node:\n    def __init__(self, val):\n        self.val = val\n        self.next = None\n\nhead = Node(10)\nnodeB = Node(20)\nnodeC = Node(30)\nhead.next = nodeB\nnodeB.next = nodeC`,
    javascript: `class Node {\n    constructor(val) {\n        this.val = val;\n        this.next = null;\n    }\n}\n\nlet head = new Node(10);\nlet nodeB = new Node(20);\nlet nodeC = new Node(30);\nhead.next = nodeB;\nnodeB.next = nodeC;`,
    java: `class Node {\n    int val;\n    Node next;\n    Node(int val) {\n        this.val = val;\n    }\n}\n\nNode head = new Node(10);\nNode nodeB = new Node(20);\nNode nodeC = new Node(30);\nhead.next = nodeB;\nodeB.next = nodeC;`
  },
  bst_operations: {
    python: `class TreeNode:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None\n\nroot = TreeNode(40)\nroot.left = TreeNode(20)\nroot.right = TreeNode(60)\nroot.left.left = TreeNode(10)\nroot.left.right = TreeNode(30)`,
    javascript: `class TreeNode {\n    constructor(val) {\n        this.val = val;\n        this.left = null;\n        this.right = null;\n    }\n}\n\nlet root = new TreeNode(40);\nroot.left = new TreeNode(20);\nroot.right = new TreeNode(60);\nroot.left.left = new TreeNode(10);\nroot.left.right = new TreeNode(30);`,
    java: `class TreeNode {\n    int val;\n    TreeNode left;\n    TreeNode right;\n    TreeNode(int val) {\n        this.val = val;\n    }\n}\n\nTreeNode root = new TreeNode(40);\nroot.left = new TreeNode(20);\nroot.right = new TreeNode(60);\nroot.left.left = new TreeNode(10);\nroot.left.right = new TreeNode(30);`
  }
};

// Simple expression parser that resolves variables from environment context
function evaluateExpression(expr: string, env: Record<string, any>): any {
  let cleaned = expr.trim();

  // Strip trailing semicolons
  if (cleaned.endsWith(';')) {
    cleaned = cleaned.slice(0, -1);
  }

  // Handle boolean literals
  if (cleaned === 'true') return true;
  if (cleaned === 'false') return false;
  if (cleaned === 'None' || cleaned === 'null') return null;

  // Handle String literals
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    return cleaned.slice(1, -1);
  }

  // Handle Array definitions
  if (cleaned.startsWith('[') && cleaned.endsWith(']')) {
    const inner = cleaned.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(',').map(item => evaluateExpression(item, env));
  }

  // Handle Java array initializer { ... }
  if (cleaned.startsWith('{') && cleaned.endsWith('}')) {
    const inner = cleaned.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(',').map(item => evaluateExpression(item, env));
  }

  // Handle len(arr) or arr.length
  if (cleaned.startsWith('len(') && cleaned.endsWith(')')) {
    const varName = cleaned.slice(4, -1).trim();
    const arr = env[varName];
    return Array.isArray(arr) ? arr.length : 0;
  }
  if (cleaned.endsWith('.length')) {
    const varName = cleaned.slice(0, -7).trim();
    const arr = env[varName];
    return Array.isArray(arr) ? arr.length : 0;
  }

  // Handle Node creation e.g. Node(10), new Node(10), TreeNode(40), new TreeNode(40)
  const nodeMatch = cleaned.match(/^(?:new\s+)?(\w+)\((.+)\)$/);
  if (nodeMatch) {
    const arg = evaluateExpression(nodeMatch[2], env);
    return { val: arg, left: null, right: null, next: null };
  }

  // Handle basic arithmetic/relational operations by replacing variable names with values
  // e.g. "low + high" -> "0 + 7"
  let evalStr = cleaned;
  // Sorting keys descending by length to avoid partial replacements (e.g. "low" replacing inside "lowOffset")
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

  // Safe evaluations of simple math or logical statements
  try {
    // Replace Python terms with JS equivalents
    evalStr = evalStr.replace(/\/\/ /g, '/').replace(/\bNone\b/g, 'null');
    const result = new Function(`return (${evalStr})`)();
    return result;
  } catch (e) {
    // If it's a raw variable name, return it from env
    if (env[cleaned] !== undefined) {
      return env[cleaned];
    }
    // Return standard number/string evaluation fallback
    if (!isNaN(Number(cleaned))) {
      return Number(cleaned);
    }
    return cleaned;
  }
}

// Recursively builds the visual Node representation of a tree structure
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

// Recursively builds the visual Node representation of a linked list structure
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
// STATEFUL LINE-BY-LINE INTERPRETER ENGINE
// ----------------------------------------------------

export function generateExecutionTimeline(code: string, language: string, templateId: string): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  const lines = code.split('\n');
  const env: Record<string, any> = {};
  let stdout = "";
  
  // Track loop counters and execution states
  let pc = 0;
  let maxInstructions = 150; // Safety threshold to prevent infinite loops
  let instructionCount = 0;

  // Pre-scan for data structures: Arrays, Trees, Linked Lists
  const findActiveWidget = (currentEnv: Record<string, any>): ExecutionStep['widgetData'] => {
    // 1. Detect Trees
    for (const [key, val] of Object.entries(currentEnv)) {
      if (val && typeof val === 'object' && val.val !== undefined && (val.left !== undefined || val.right !== undefined)) {
        const nodes: any[] = [];
        const edges: any[] = [];
        buildTreeStructure(val, 170, 25, 70, nodes, edges);
        if (nodes.length > 0) {
          return { type: 'tree', nodes, edges };
        }
      }
    }

    // 2. Detect Linked Lists
    for (const [key, val] of Object.entries(currentEnv)) {
      if (val && typeof val === 'object' && val.val !== undefined && val.next !== undefined) {
        const nodes: any[] = [];
        const edges: any[] = [];
        buildListStructure(val, 50, 70, nodes, edges);
        if (nodes.length > 0) {
          return { type: 'linkedlist', nodes, edges };
        }
      }
    }

    // 3. Detect Stacks / Queues
    for (const [key, val] of Object.entries(currentEnv)) {
      if (Array.isArray(val)) {
        // Simple heuristic: if variable name contains 'stack', render as stack
        if (key.toLowerCase().includes('stack')) {
          return { type: 'stack', values: val };
        }
        // if name contains 'queue', render as queue
        if (key.toLowerCase().includes('queue')) {
          return { type: 'queue', values: val };
        }
        // Fallback: render as Array
        // Resolve pointers pointing to indices
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

  // State parser executing line-by-line
  while (pc < lines.length && instructionCount < maxInstructions) {
    instructionCount++;
    const lineText = lines[pc];
    const trimmed = lineText.trim();

    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('//') || trimmed.startsWith('import ') || trimmed.startsWith('class ')) {
      pc++;
      continue;
    }

    // Handle print operations
    // Python: print(...) | JS: console.log(...) | Java: System.out.println(...)
    const printMatch = trimmed.match(/^(?:print|console\.log|System\.out\.println)\((.+)\);?$/);
    if (printMatch) {
      const valExpr = printMatch[1].trim();
      const val = evaluateExpression(valExpr, env);
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

    // Handle variable declarations and assignments
    // Types e.g. let x = 5; int x = 5; x = 5; Node head = Node(10);
    const assignMatch = trimmed.match(/^(?:let|var|const|int|float|double|String|Node|TreeNode)?\s*([\w_]+(?:\.[\w_]+)?)\s*=\s*(.+);?$/);
    if (assignMatch) {
      const targetVar = assignMatch[1];
      const expr = assignMatch[2].trim();
      const val = evaluateExpression(expr, env);

      let explanation = "";
      let changedVars: string[] = [];

      // Handle nested object property assignments e.g. root.left = TreeNode(20)
      if (targetVar.includes('.')) {
        const parts = targetVar.split('.');
        const parentObj = env[parts[0]];
        if (parentObj && typeof parentObj === 'object') {
          parentObj[parts[1]] = val;
          explanation = `Assign child link: ${targetVar} = ${val && val.val !== undefined ? val.val : JSON.stringify(val)}`;
          changedVars = [parts[0]];
        }
      } else {
        // Handle array element assignments e.g. arr[j] = temp
        const arrayIdxMatch = targetVar.match(/^([\w_]+)\[(.+)\]$/);
        if (arrayIdxMatch) {
          const arrName = arrayIdxMatch[1];
          const idxExpr = arrayIdxMatch[2];
          const arr = env[arrName];
          const idx = evaluateExpression(idxExpr, env);
          if (Array.isArray(arr) && idx >= 0) {
            arr[idx] = val;
            explanation = `Update array element: ${arrName}[${idx}] = ${val}`;
            changedVars = [arrName];
          }
        } else {
          env[targetVar] = val;
          explanation = `Set variable: ${targetVar} = ${val && val.val !== undefined ? val.val : JSON.stringify(val)}`;
          changedVars = [targetVar];
        }
      }

      const { stack, heap } = mapStackAndHeap(env);
      steps.push({
        lineNum: pc + 1,
        variables: { ...env },
        stack,
        heap,
        explanation,
        stdout,
        isAction: false,
        changedVariables: changedVars,
        widgetData: findActiveWidget(env)
      });
      pc++;
      continue;
    }

    // Handle stack / queue append push enqueue actions
    // e.g. stack.push(x) / queue.push(x) / stack.append(x)
    const methodMatch = trimmed.match(/^([\w_]+)\.(push|append|enqueue|pop|shift|pop_back)\((.*)\);?$/);
    if (methodMatch) {
      const objectName = methodMatch[1];
      const method = methodMatch[2];
      const argExpr = methodMatch[3].trim();
      const obj = env[objectName];

      if (Array.isArray(obj)) {
        let expl = "";
        if (method === 'push' || method === 'append' || method === 'enqueue') {
          const argVal = evaluateExpression(argExpr, env);
          obj.push(argVal);
          expl = `Push/Append value ${argVal} into list '${objectName}'`;
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

    // Default line step fallback
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

  // Safety fallback if no steps generated
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
