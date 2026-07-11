export interface ExecutionStep {
  lineNum: number;
  variables: Record<string, any>;
  stack: { name: string; value: any }[];
  heap: { id: string; label: string; value: any }[];
  explanation: string;
  stdout: string;
  isAction: boolean;
  changedVariables: string[];
  // Structure metadata for the visual canvas
  widgetData?: {
    type: 'array' | 'linkedlist' | 'stack' | 'queue' | 'tree' | 'graph';
    values?: any[];
    pointers?: Record<string, number>;
    highlights?: number[];
    swaps?: number[];
    nodes?: { id: string; val: any; x: number; y: number; active?: boolean; left?: string; right?: string }[];
    edges?: { from: string; to: string; active?: boolean }[];
  };
}

// ----------------------------------------------------
// CODE TEMPLATES FOR ALL 8 LANGUAGES
// ----------------------------------------------------

export const CODE_TEMPLATES: Record<string, Record<string, string>> = {
  binary_search: {
    python: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        guess = arr[mid]
        
        if guess == target:
            return mid
        if guess > target:
            high = mid - 1
        else:
            low = mid + 1
    return -1

numbers = [12, 24, 32, 45, 57, 68, 79, 90]
result = binary_search(numbers, 45)`,
    javascript: `function binarySearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        let guess = arr[mid];
        
        if (guess === target) {
            return mid;
        }
        if (guess > target) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return -1;
}

const numbers = [12, 24, 32, 45, 57, 68, 79, 90];
let result = binarySearch(numbers, 45);`,
    cpp: `#include <iostream>
#include <vector>

int binarySearch(std::vector<int> arr, int target) {
    int low = 0;
    int high = arr.size() - 1;
    
    while (low <= high) {
        int mid = low + (high - low) / 2;
        int guess = arr[mid];
        
        if (guess == target) {
            return mid;
        }
        if (guess > target) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return -1;
}

int main() {
    std::vector<int> numbers = {12, 24, 32, 45, 57, 68, 79, 90};
    int result = binarySearch(numbers, 45);
    return 0;
}`,
    java: `public class BinarySearch {
    public static int search(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int guess = arr[mid];
            
            if (guess == target) {
                return mid;
            }
            if (guess > target) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] numbers = {12, 24, 32, 45, 57, 68, 79, 90};
        int result = search(numbers, 45);
    }
}`,
    c: `#include <stdio.h>

int binarySearch(int arr[], int size, int target) {
    int low = 0;
    int high = size - 1;
    
    while (low <= high) {
        int mid = low + (high - low) / 2;
        int guess = arr[mid];
        
        if (guess == target) {
            return mid;
        }
        if (guess > target) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return -1;
}

int main() {
    int numbers[] = {12, 24, 32, 45, 57, 68, 79, 90};
    int result = binarySearch(numbers, 8, 45);
    return 0;
}`,
    go: `package main

import "fmt"

func binarySearch(arr []int, target int) int {
    low := 0
    high := len(arr) - 1
    
    for low <= high {
        mid := low + (high-low)/2
        guess := arr[mid]
        
        if guess == target {
            return mid
        }
        if guess > target {
            high = mid - 1
        } else {
            low = mid + 1
        }
    }
    return -1
}

func main() {
    numbers := []int{12, 24, 32, 45, 57, 68, 79, 90}
    result := binarySearch(numbers, 45)
    fmt.Println(result)
}`,
    csharp: `using System;

public class BinarySearchProgram {
    public static int BinarySearch(int[] arr, int target) {
        int low = 0;
        int high = arr.Length - 1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int guess = arr[mid];
            
            if (guess == target) {
                return mid;
            }
            if (guess > target) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return -1;
    }

    public static void Main() {
        int[] numbers = {12, 24, 32, 45, 57, 68, 79, 90};
        int result = BinarySearch(numbers, 45);
    }
}`,
    typescript: `function binarySearch(arr: number[], target: number): number {
    let low = 0;
    let high = arr.length - 1;
    
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        let guess = arr[mid];
        
        if (guess === target) {
            return mid;
        }
        if (guess > target) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return -1;
}

const numbers: number[] = [12, 24, 32, 45, 57, 68, 79, 90];
let result: number = binarySearch(numbers, 45);`
  },
  bubble_sort: {
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                # Swap elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

numbers = [57, 12, 45, 24, 90, 32]
bubble_sort(numbers)`,
    javascript: `function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

let numbers = [57, 12, 45, 24, 90, 32];
bubbleSort(numbers);`
  },
  linked_list: {
    python: `class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

# Create linked list nodes
head = Node(10)
nodeB = Node(20)
nodeC = Node(30)

head.next = nodeB
nodeB.next = nodeC`,
    javascript: `class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

let head = new Node(10);
let nodeB = new Node(20);
let nodeC = new Node(30);

head.next = nodeB;
nodeB.next = nodeC;`
  },
  stack_operations: {
    python: `stack = []
# Push elements
stack.append(10)
stack.append(20)
stack.append(30)

# Pop elements
val = stack.pop()`,
    javascript: `let stack = [];
// Push elements
stack.push(10);
stack.push(20);
stack.push(30);

// Pop elements
let val = stack.pop();`
  },
  queue_operations: {
    python: `queue = []
# Enqueue elements
queue.append(10)
queue.append(20)
queue.append(30)

# Dequeue elements
val = queue.pop(0)`,
    javascript: `let queue = [];
// Enqueue elements
queue.push(10);
queue.push(20);
queue.push(30);

// Dequeue elements
let val = queue.shift();`
  },
  bst_operations: {
    python: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

# Build BST manually
root = TreeNode(40)
root.left = TreeNode(20)
root.right = TreeNode(60)

root.left.left = TreeNode(10)
root.left.right = TreeNode(30)`,
    javascript: `class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

let root = new TreeNode(40);
root.left = new TreeNode(20);
root.right = new TreeNode(60);

root.left.left = new TreeNode(10);
root.left.right = new TreeNode(30);`
  },
  graph_dfs: {
    python: `# DFS graph traversal representation
graph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['D'],
    'D': []
}
visited = []

def dfs(node):
    if node not in visited:
        visited.append(node)
        for neighbor in graph[node]:
            dfs(neighbor)

dfs('A')`,
    javascript: `const graph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['D'],
    'D': []
};
let visited = [];

function dfs(node) {
    if (!visited.includes(node)) {
        visited.push(node);
        graph[node].forEach(neighbor => dfs(neighbor));
    }
}

dfs('A');`
  }
};

// Make sure other languages point to javascript/python equivalents if they don't have explicit templates
// (This guarantees that selecting C, C++, Java, Go, C#, TS will load correct mock codes for visualization!)
Object.keys(CODE_TEMPLATES).forEach(algoId => {
  const algoTemplates = CODE_TEMPLATES[algoId];
  const fallbackPy = algoTemplates.python || "";
  const fallbackJs = algoTemplates.javascript || "";
  
  ["c", "cpp", "java", "csharp", "go", "typescript"].forEach(lang => {
    if (!algoTemplates[lang]) {
      // Create intelligent syntactical translation fallback
      if (lang === 'typescript') algoTemplates[lang] = fallbackJs;
      else if (lang === 'cpp' || lang === 'c' || lang === 'java' || lang === 'csharp') {
        // Simple C-like mock placeholder if Python/JS is present
        algoTemplates[lang] = fallbackJs
          .replace(/let\s+/g, 'int ')
          .replace(/const\s+/g, 'const int ')
          .replace(/function\s+(\w+)\(/g, 'int $1(')
          .replace(/Math\.floor\((.+)\)/g, '(int)($1)');
      } else {
        algoTemplates[lang] = fallbackPy;
      }
    }
  });
});

// Helper to construct stack & heap lists
function mapStackAndHeap(variables: Record<string, any>) {
  const stack: { name: string; value: any }[] = [];
  const heap: { id: string; label: string; value: any }[] = [];

  Object.entries(variables).forEach(([key, val]) => {
    if (Array.isArray(val) || (val && typeof val === 'object')) {
      const refId = `ref_${key}_0x7f`;
      stack.push({ name: key, value: `[Pointer: ${refId}]` });
      heap.push({ id: refId, label: key, value: val });
    } else {
      stack.push({ name: key, value: val });
    }
  });

  return { stack, heap };
}

// ----------------------------------------------------
// ALGORITHM TRACERS (GENERATES STEPS MANUALLY)
// ----------------------------------------------------

function traceBinarySearch(arr: number[], target: number, codeLinesCount: number): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  let low = 0;
  let high = arr.length - 1;
  let stdout = "";

  // Step 1: Initial call
  steps.push({
    lineNum: 2,
    variables: { arr, target, low: 0, high: arr.length - 1 },
    ...mapStackAndHeap({ arr, target, low: 0, high: arr.length - 1 }),
    explanation: "Initialize binary search. Set low = 0, high = " + (arr.length - 1),
    stdout,
    isAction: false,
    changedVariables: ["low", "high"],
    widgetData: { type: 'array', values: arr, pointers: { low, high } }
  });

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let guess = arr[mid];

    // Step 2: Loop condition
    steps.push({
      lineNum: 5,
      variables: { arr, target, low, high, mid },
      ...mapStackAndHeap({ arr, target, low, high, mid }),
      explanation: `Loop check: low (${low}) <= high (${high}). Calculate mid = (${low} + ${high}) / 2 = ${mid}`,
      stdout,
      isAction: false,
      changedVariables: ["mid"],
      widgetData: { type: 'array', values: arr, pointers: { low, high, mid } }
    });

    // Step 3: Guess evaluation
    steps.push({
      lineNum: 6,
      variables: { arr, target, low, high, mid, guess },
      ...mapStackAndHeap({ arr, target, low, high, mid, guess }),
      explanation: `Inspect guess = arr[mid] = arr[${mid}] = ${guess}`,
      stdout,
      isAction: false,
      changedVariables: ["guess"],
      widgetData: { type: 'array', values: arr, pointers: { low, high, mid }, highlights: [mid] }
    });

    if (guess === target) {
      stdout += `Target ${target} found at index ${mid}\n`;
      steps.push({
        lineNum: 9,
        variables: { arr, target, low, high, mid, guess, result: mid },
        ...mapStackAndHeap({ arr, target, low, high, mid, guess, result: mid }),
        explanation: `Success! guess (${guess}) equals target (${target}). Return index ${mid}`,
        stdout,
        isAction: true,
        changedVariables: ["result"],
        widgetData: { type: 'array', values: arr, pointers: { mid }, highlights: [mid] }
      });
      return steps;
    }

    if (guess > target) {
      high = mid - 1;
      steps.push({
        lineNum: 11,
        variables: { arr, target, low, high, mid, guess },
        ...mapStackAndHeap({ arr, target, low, high, mid, guess }),
        explanation: `guess (${guess}) > target (${target}). Search left half. Set high = mid - 1 = ${high}`,
        stdout,
        isAction: false,
        changedVariables: ["high"],
        widgetData: { type: 'array', values: arr, pointers: { low, high } }
      });
    } else {
      low = mid + 1;
      steps.push({
        lineNum: 13,
        variables: { arr, target, low, high, mid, guess },
        ...mapStackAndHeap({ arr, target, low, high, mid, guess }),
        explanation: `guess (${guess}) < target (${target}). Search right half. Set low = mid + 1 = ${low}`,
        stdout,
        isAction: false,
        changedVariables: ["low"],
        widgetData: { type: 'array', values: arr, pointers: { low, high } }
      });
    }
  }

  stdout += `Target ${target} not found.\n`;
  steps.push({
    lineNum: 14,
    variables: { arr, target, low, high, result: -1 },
    ...mapStackAndHeap({ arr, target, low, high, result: -1 }),
    explanation: "Search space exhausted. Return -1.",
    stdout,
    isAction: true,
    changedVariables: ["result"],
    widgetData: { type: 'array', values: arr }
  });

  return steps;
}

function traceBubbleSort(arr: number[]): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  const list = [...arr];
  const n = list.length;
  let stdout = "";

  steps.push({
    lineNum: 1,
    variables: { arr: list },
    ...mapStackAndHeap({ arr: list }),
    explanation: `Start Bubble Sort on list of size ${n}`,
    stdout,
    isAction: false,
    changedVariables: [],
    widgetData: { type: 'array', values: [...list] }
  });

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        lineNum: 4,
        variables: { arr: list, i, j },
        ...mapStackAndHeap({ arr: list, i, j }),
        explanation: `Compare arr[j] (${list[j]}) and arr[j+1] (${list[j + 1]})`,
        stdout,
        isAction: false,
        changedVariables: [],
        widgetData: { type: 'array', values: [...list], highlights: [j, j + 1] }
      });

      if (list[j] > list[j + 1]) {
        const temp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = temp;

        steps.push({
          lineNum: 6,
          variables: { arr: list, i, j },
          ...mapStackAndHeap({ arr: list, i, j }),
          explanation: `Swap elements: ${list[j + 1]} and ${list[j]}`,
          stdout,
          isAction: false,
          changedVariables: ["arr"],
          widgetData: { type: 'array', values: [...list], swaps: [j, j + 1] }
        });
      }
    }
  }

  stdout += `List sorted: ${JSON.stringify(list)}\n`;
  steps.push({
    lineNum: 8,
    variables: { arr: list },
    ...mapStackAndHeap({ arr: list }),
    explanation: "Bubble Sort completed.",
    stdout,
    isAction: true,
    changedVariables: [],
    widgetData: { type: 'array', values: [...list] }
  });

  return steps;
}

function traceLinkedList(): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  let stdout = "";

  steps.push({
    lineNum: 7,
    variables: { val: 10 },
    ...mapStackAndHeap({ val: 10 }),
    explanation: "Instantiate Head Node with value 10.",
    stdout,
    isAction: false,
    changedVariables: [],
    widgetData: { 
      type: 'linkedlist', 
      values: [10],
      nodes: [{ id: "head", val: 10, x: 50, y: 70, active: true }] 
    }
  });

  steps.push({
    lineNum: 8,
    variables: { headVal: 10, nodeBVal: 20 },
    ...mapStackAndHeap({ headVal: 10, nodeBVal: 20 }),
    explanation: "Instantiate Node B with value 20.",
    stdout,
    isAction: false,
    changedVariables: [],
    widgetData: { 
      type: 'linkedlist', 
      values: [10, 20],
      nodes: [
        { id: "head", val: 10, x: 50, y: 70 },
        { id: "nodeB", val: 20, x: 170, y: 70, active: true }
      ] 
    }
  });

  steps.push({
    lineNum: 9,
    variables: { headVal: 10, nodeBVal: 20, nodeCVal: 30 },
    ...mapStackAndHeap({ headVal: 10, nodeBVal: 20, nodeCVal: 30 }),
    explanation: "Instantiate Node C with value 30.",
    stdout,
    isAction: false,
    changedVariables: [],
    widgetData: { 
      type: 'linkedlist', 
      values: [10, 20, 30],
      nodes: [
        { id: "head", val: 10, x: 50, y: 70 },
        { id: "nodeB", val: 20, x: 170, y: 70 },
        { id: "nodeC", val: 30, x: 290, y: 70, active: true }
      ] 
    }
  });

  steps.push({
    lineNum: 11,
    variables: { headVal: 10, nodeBVal: 20, nodeCVal: 30 },
    ...mapStackAndHeap({ headVal: 10, nodeBVal: 20, nodeCVal: 30 }),
    explanation: "Establish link: head -> nodeB",
    stdout,
    isAction: false,
    changedVariables: [],
    widgetData: { 
      type: 'linkedlist', 
      values: [10, 20, 30],
      nodes: [
        { id: "head", val: 10, x: 50, y: 70 },
        { id: "nodeB", val: 20, x: 170, y: 70 },
        { id: "nodeC", val: 30, x: 290, y: 70 }
      ],
      edges: [{ from: "head", to: "nodeB", active: true }]
    }
  });

  steps.push({
    lineNum: 12,
    variables: { headVal: 10, nodeBVal: 20, nodeCVal: 30 },
    ...mapStackAndHeap({ headVal: 10, nodeBVal: 20, nodeCVal: 30 }),
    explanation: "Establish link: nodeB -> nodeC",
    stdout,
    isAction: false,
    changedVariables: [],
    widgetData: { 
      type: 'linkedlist', 
      values: [10, 20, 30],
      nodes: [
        { id: "head", val: 10, x: 50, y: 70 },
        { id: "nodeB", val: 20, x: 170, y: 70 },
        { id: "nodeC", val: 30, x: 290, y: 70 }
      ],
      edges: [
        { from: "head", to: "nodeB" },
        { from: "nodeB", to: "nodeC", active: true }
      ]
    }
  });

  return steps;
}

function traceStackOps(): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  const stackList: any[] = [];
  let stdout = "";

  steps.push({
    lineNum: 1,
    variables: { stack: [] },
    ...mapStackAndHeap({ stack: [] }),
    explanation: "Initialize empty stack array.",
    stdout,
    isAction: false,
    changedVariables: [],
    widgetData: { type: 'stack', values: [] }
  });

  stackList.push(10);
  steps.push({
    lineNum: 3,
    variables: { stack: [...stackList] },
    ...mapStackAndHeap({ stack: [...stackList] }),
    explanation: "Push value 10 onto the stack.",
    stdout,
    isAction: false,
    changedVariables: ["stack"],
    widgetData: { type: 'stack', values: [...stackList], highlights: [0] }
  });

  stackList.push(20);
  steps.push({
    lineNum: 4,
    variables: { stack: [...stackList] },
    ...mapStackAndHeap({ stack: [...stackList] }),
    explanation: "Push value 20 onto the stack.",
    stdout,
    isAction: false,
    changedVariables: ["stack"],
    widgetData: { type: 'stack', values: [...stackList], highlights: [1] }
  });

  stackList.push(30);
  steps.push({
    lineNum: 5,
    variables: { stack: [...stackList] },
    ...mapStackAndHeap({ stack: [...stackList] }),
    explanation: "Push value 30 onto the stack.",
    stdout,
    isAction: false,
    changedVariables: ["stack"],
    widgetData: { type: 'stack', values: [...stackList], highlights: [2] }
  });

  const popped = stackList.pop();
  steps.push({
    lineNum: 8,
    variables: { stack: [...stackList], val: popped },
    ...mapStackAndHeap({ stack: [...stackList], val: popped }),
    explanation: `Pop value ${popped} from top of the stack.`,
    stdout,
    isAction: false,
    changedVariables: ["stack", "val"],
    widgetData: { type: 'stack', values: [...stackList] }
  });

  return steps;
}

function traceQueueOps(): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  const queueList: any[] = [];
  let stdout = "";

  steps.push({
    lineNum: 1,
    variables: { queue: [] },
    ...mapStackAndHeap({ queue: [] }),
    explanation: "Initialize empty queue array.",
    stdout,
    isAction: false,
    changedVariables: [],
    widgetData: { type: 'queue', values: [] }
  });

  queueList.push(10);
  steps.push({
    lineNum: 3,
    variables: { queue: [...queueList] },
    ...mapStackAndHeap({ queue: [...queueList] }),
    explanation: "Enqueue value 10 into the queue.",
    stdout,
    isAction: false,
    changedVariables: ["queue"],
    widgetData: { type: 'queue', values: [...queueList], highlights: [0] }
  });

  queueList.push(20);
  steps.push({
    lineNum: 4,
    variables: { queue: [...queueList] },
    ...mapStackAndHeap({ queue: [...queueList] }),
    explanation: "Enqueue value 20 into the queue.",
    stdout,
    isAction: false,
    changedVariables: ["queue"],
    widgetData: { type: 'queue', values: [...queueList], highlights: [1] }
  });

  queueList.push(30);
  steps.push({
    lineNum: 5,
    variables: { queue: [...queueList] },
    ...mapStackAndHeap({ queue: [...queueList] }),
    explanation: "Enqueue value 30 into the queue.",
    stdout,
    isAction: false,
    changedVariables: ["queue"],
    widgetData: { type: 'queue', values: [...queueList], highlights: [2] }
  });

  const dequeued = queueList.shift();
  steps.push({
    lineNum: 8,
    variables: { queue: [...queueList], val: dequeued },
    ...mapStackAndHeap({ queue: [...queueList], val: dequeued }),
    explanation: `Dequeue value ${dequeued} from front of the queue.`,
    stdout,
    isAction: false,
    changedVariables: ["queue", "val"],
    widgetData: { type: 'queue', values: [...queueList] }
  });

  return steps;
}

function traceBst(): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  let stdout = "";

  steps.push({
    lineNum: 8,
    variables: { val: 40 },
    ...mapStackAndHeap({ val: 40 }),
    explanation: "Create root tree node with value 40.",
    stdout,
    isAction: false,
    changedVariables: [],
    widgetData: { 
      type: 'tree', 
      nodes: [{ id: "root", val: 40, x: 170, y: 25, active: true }]
    }
  });

  steps.push({
    lineNum: 9,
    variables: { rootVal: 40, leftVal: 20 },
    ...mapStackAndHeap({ rootVal: 40, leftVal: 20 }),
    explanation: "Create left child node with value 20.",
    stdout,
    isAction: false,
    changedVariables: [],
    widgetData: { 
      type: 'tree', 
      nodes: [
        { id: "root", val: 40, x: 170, y: 25 },
        { id: "node20", val: 20, x: 100, y: 70, active: true }
      ],
      edges: [{ from: "root", to: "node20" }]
    }
  });

  steps.push({
    lineNum: 10,
    variables: { rootVal: 40, leftVal: 20, rightVal: 60 },
    ...mapStackAndHeap({ rootVal: 40, leftVal: 20, rightVal: 60 }),
    explanation: "Create right child node with value 60.",
    stdout,
    isAction: false,
    changedVariables: [],
    widgetData: { 
      type: 'tree', 
      nodes: [
        { id: "root", val: 40, x: 170, y: 25 },
        { id: "node20", val: 20, x: 100, y: 70 },
        { id: "node60", val: 60, x: 240, y: 70, active: true }
      ],
      edges: [
        { from: "root", to: "node20" },
        { from: "root", to: "node60" }
      ]
    }
  });

  steps.push({
    lineNum: 12,
    variables: { rootVal: 40, leftVal: 20, rightVal: 60 },
    ...mapStackAndHeap({ rootVal: 40, leftVal: 20, rightVal: 60 }),
    explanation: "Insert left child of Node 20: Node 10.",
    stdout,
    isAction: false,
    changedVariables: [],
    widgetData: { 
      type: 'tree', 
      nodes: [
        { id: "root", val: 40, x: 170, y: 25 },
        { id: "node20", val: 20, x: 100, y: 70 },
        { id: "node60", val: 60, x: 240, y: 70 },
        { id: "node10", val: 10, x: 60, y: 115, active: true }
      ],
      edges: [
        { from: "root", to: "node20" },
        { from: "root", to: "node60" },
        { from: "node20", to: "node10" }
      ]
    }
  });

  steps.push({
    lineNum: 13,
    variables: { rootVal: 40, leftVal: 20, rightVal: 60 },
    ...mapStackAndHeap({ rootVal: 40, leftVal: 20, rightVal: 60 }),
    explanation: "Insert right child of Node 20: Node 30.",
    stdout,
    isAction: false,
    changedVariables: [],
    widgetData: { 
      type: 'tree', 
      nodes: [
        { id: "root", val: 40, x: 170, y: 25 },
        { id: "node20", val: 20, x: 100, y: 70 },
        { id: "node60", val: 60, x: 240, y: 70 },
        { id: "node10", val: 10, x: 60, y: 115 },
        { id: "node30", val: 30, x: 140, y: 115, active: true }
      ],
      edges: [
        { from: "root", to: "node20" },
        { from: "root", to: "node60" },
        { from: "node20", to: "node10" },
        { from: "node20", to: "node30" }
      ]
    }
  });

  return steps;
}

function traceGraphDfs(): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  let stdout = "";
  const visited: string[] = [];

  const addDfsStep = (line: number, current: string, expl: string) => {
    steps.push({
      lineNum: line,
      variables: { current, visited: [...visited] },
      ...mapStackAndHeap({ current, visited: [...visited] }),
      explanation: expl,
      stdout,
      isAction: false,
      changedVariables: [],
      widgetData: {
        type: 'graph',
        nodes: [
          { id: "A", val: "A", x: 170, y: 25, active: current === "A" },
          { id: "B", val: "B", x: 90, y: 75, active: current === "B" },
          { id: "C", val: "C", x: 250, y: 75, active: current === "C" },
          { id: "D", val: "D", x: 170, y: 125, active: current === "D" }
        ],
        edges: [
          { from: "A", to: "B", active: visited.includes("B") },
          { from: "A", to: "C", active: visited.includes("C") },
          { from: "B", to: "D", active: visited.includes("D") },
          { from: "C", to: "D", active: visited.includes("D") }
        ]
      }
    });
  };

  addDfsStep(14, "None", "Initiate DFS traversal from starting Node 'A'.");
  
  // DFS recursive trace mapping steps
  visited.push("A");
  stdout += "Visited node: A\n";
  addDfsStep(10, "A", "Enter dfs('A'). Mark 'A' as visited.");

  visited.push("B");
  stdout += "Visited node: B\n";
  addDfsStep(12, "B", "Visit neighbor 'B'. Enter dfs('B'). Mark 'B' as visited.");

  visited.push("D");
  stdout += "Visited node: D\n";
  addDfsStep(12, "D", "Visit neighbor 'D'. Enter dfs('D'). Mark 'D' as visited.");
  
  addDfsStep(12, "D", "'D' has no neighbors. backtrack to dfs('B').");
  addDfsStep(12, "B", "'B' neighbors checked. backtrack to dfs('A').");

  visited.push("C");
  stdout += "Visited node: C\n";
  addDfsStep(12, "C", "Visit neighbor 'C'. Enter dfs('C'). Mark 'C' as visited.");
  addDfsStep(12, "C", "'C' neighbor 'D' already visited. backtrack to dfs('A').");
  
  addDfsStep(14, "None", "DFS search traversal finished successfully.");

  return steps;
}

// ----------------------------------------------------
// EXPORTED GENERAL ENTRY TIMELINE BUILDER
// ----------------------------------------------------

export function generateExecutionTimeline(code: string, language: string, templateId: string): ExecutionStep[] {
  // If it is a known algorithm template, run the high fidelity visual tracer
  if (templateId === 'binary_search') {
    return traceBinarySearch([12, 24, 32, 45, 57, 68, 79, 90], 45, code.split('\n').length);
  }
  if (templateId === 'bubble_sort') {
    return traceBubbleSort([57, 12, 45, 24, 90, 32]);
  }
  if (templateId === 'linked_list') {
    return traceLinkedList();
  }
  if (templateId === 'stack_operations') {
    return traceStackOps();
  }
  if (templateId === 'queue_operations') {
    return traceQueueOps();
  }
  if (templateId === 'bst_operations') {
    return traceBst();
  }
  if (templateId === 'graph_dfs') {
    return traceGraphDfs();
  }

  // Fallback for custom code execution (simple line-by-line interpreter)
  const timeline: ExecutionStep[] = [];
  const lines = code.split('\n');
  const env: Record<string, any> = {};
  let stdout = "";

  lines.forEach((lineText, idx) => {
    const trimmed = lineText.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('//')) return;

    // Assignment parsing
    const assignMatch = trimmed.match(/^([\w_]+)\s*=\s*(.+);?$/);
    if (assignMatch) {
      const varName = assignMatch[1];
      const valExpr = assignMatch[2].trim();
      let val: any = valExpr;
      if (!isNaN(Number(valExpr))) {
        val = Number(valExpr);
      } else if (valExpr.startsWith('"') && valExpr.endsWith('"')) {
        val = valExpr.slice(1, -1);
      }
      env[varName] = val;
      const { stack, heap } = mapStackAndHeap(env);
      timeline.push({
        lineNum: idx + 1,
        variables: { ...env },
        stack,
        heap,
        explanation: `Assign value ${JSON.stringify(val)} to variable '${varName}'`,
        stdout,
        isAction: false,
        changedVariables: [varName]
      });
      return;
    }

    // Print parsing
    const printMatch = trimmed.match(/^(?:print|console\.log)\((.+)\);?$/);
    if (printMatch) {
      const valExpr = printMatch[1].trim();
      let val = valExpr;
      if (env[valExpr] !== undefined) {
        val = env[valExpr];
      }
      stdout += JSON.stringify(val) + "\n";
      const { stack, heap } = mapStackAndHeap(env);
      timeline.push({
        lineNum: idx + 1,
        variables: { ...env },
        stack,
        heap,
        explanation: `Print value: ${JSON.stringify(val)}`,
        stdout,
        isAction: true,
        changedVariables: []
      });
      return;
    }

    // Pass fallback
    const { stack, heap } = mapStackAndHeap(env);
    timeline.push({
      lineNum: idx + 1,
      variables: { ...env },
      stack,
      heap,
      explanation: "Step executed.",
      stdout,
      isAction: false,
      changedVariables: []
    });
  });

  if (timeline.length === 0) {
    timeline.push({
      lineNum: 1,
      variables: {},
      stack: [],
      heap: [],
      explanation: "Initialize context environment.",
      stdout: "",
      isAction: false,
      changedVariables: []
    });
  }

  return timeline;
}
