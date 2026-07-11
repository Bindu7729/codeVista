import { useState, useEffect } from 'react';
import { AppShell } from '../../components/SideNav';
import { 
  Search, 
  ArrowUpDown, 
  GitBranch, 
  Braces, 
  RotateCcw, 
  PlayCircle, 
  CheckCircle2 
} from 'lucide-react';
import { motion } from 'framer-motion';

const LIBRARY_ALGORITHMS = [
  {
    id: 'binary-search',
    title: 'Binary Search',
    difficulty: 'EASY',
    difficultyColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    description: 'Master the fundamental divide-and-conquer algorithm for finding elements in sorted arrays.',
    complexity: 'O(log n)',
    gradient: 'from-blue-600/20 via-indigo-900/10 to-transparent',
    icon: <Search className="w-8 h-8 text-blue-400" />
  },
  {
    id: 'merge-sort',
    title: 'Merge Sort',
    difficulty: 'MEDIUM',
    difficultyColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    description: 'Visualize recursive sorting. Understand how dividing arrays leads to predictable performance.',
    complexity: 'O(n log n)',
    gradient: 'from-emerald-600/20 via-teal-900/10 to-transparent',
    icon: <ArrowUpDown className="w-8 h-8 text-emerald-400" />
  },
  {
    id: 'dijkstra',
    title: "Dijkstra's Algorithm",
    difficulty: 'HARD',
    difficultyColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    description: 'Find the shortest path through a weighted graph with priority queues.',
    complexity: 'O(E log V)',
    gradient: 'from-rose-600/20 via-purple-900/10 to-transparent',
    icon: <GitBranch className="w-8 h-8 text-rose-400" />
  },
  {
    id: 'hash-table',
    title: 'Hash Tables',
    difficulty: 'EASY',
    difficultyColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    description: 'Understand how collisions, load factor, and rehashing actually work in practice.',
    complexity: 'O(1)',
    gradient: 'from-violet-600/20 via-blue-900/10 to-transparent',
    icon: <Braces className="w-8 h-8 text-violet-400" />
  }
];

export default function LibraryPage() {
  const [selectedAlgo, setSelectedAlgo] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [userRole, setUserRole] = useState('Systems Ninja 🦀');

  useEffect(() => {
    const savedData = localStorage.getItem('codevista_user');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.role) setUserRole(parsed.role);
    }
  }, []);

  const triggerFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 4000);
  };

  // --- 1. BINARY SEARCH INTERACTIVE STATE ---
  const [bsArray] = useState([4, 12, 19, 24, 31, 45, 50, 63, 72, 85, 90, 99]);
  const [bsTarget, setBsTarget] = useState(63);
  const [bsLow, setBsLow] = useState(-1);
  const [bsHigh, setBsHigh] = useState(-1);
  const [bsMid, setBsMid] = useState(-1);
  const [bsStep, setBsStep] = useState(0);
  const [bsStatus, setBsStatus] = useState("Click 'Step Visualizer' to track range partitioning.");
  const [bsTraceHistory, setBsTraceHistory] = useState<any[]>([]);

  const handleBsReset = () => {
    setBsLow(0);
    setBsHigh(bsArray.length - 1);
    setBsMid(-1);
    setBsStep(0);
    setBsStatus(`Search initialized: target index range [0, ${bsArray.length - 1}]`);
    setBsTraceHistory([{ note: "Initialized search memory tracking loop." }]);
  };

  const handleBsStep = () => {
    if (bsLow === -1) {
      handleBsReset();
      return;
    }
    if (bsLow > bsHigh) {
      setBsStatus(`Target ${bsTarget} not found in sorted boundary context.`);
      return;
    }

    const mid = Math.floor((bsLow + bsHigh) / 2);
    setBsMid(mid);
    const midValue = bsArray[mid];

    if (midValue === bsTarget) {
      setBsStatus(`Match found! Element at index ${mid} is exactly equal to ${bsTarget}.`);
      setBsTraceHistory(prev => [...prev, { note: `Found target ${bsTarget} at index ${mid}!` }]);
      setBsLow(-1);
      return;
    }

    if (midValue < bsTarget) {
      const nextLow = mid + 1;
      setBsStatus(`Value ${midValue} at index ${mid} is < Target ${bsTarget}. Pruning left span.`);
      setBsTraceHistory(prev => [...prev, { note: `${midValue} < ${bsTarget} → Moved left boundary to ${nextLow}.` }]);
      setBsLow(nextLow);
    } else {
      const nextHigh = mid - 1;
      setBsStatus(`Value ${midValue} at index ${mid} is > Target ${bsTarget}. Pruning right span.`);
      setBsTraceHistory(prev => [...prev, { note: `${midValue} > ${bsTarget} → Moved right boundary to ${nextHigh}.` }]);
      setBsHigh(nextHigh);
    }
    setBsStep(prev => prev + 1);
  };

  // --- 2. MERGE SORT SIMULATION DATA TRACE ---
  const [msArray, setMsArray] = useState([34, 12, 89, 5, 52, 21, 74, 43]);
  const [msCurrentStepIdx, setMsCurrentStepIdx] = useState(-1);
  const [msIsSorting, setMsIsSorting] = useState(false);
  
  const msSteps = [
    { arr: [34, 12, 89, 5, 52, 21, 74, 43], active: [0, 1], text: 'Splitting initial heap arrays into subarrays.' },
    { arr: [12, 34, 89, 5, 52, 21, 74, 43], active: [0, 1], text: 'Sorted sub-sequence partition block [12, 34]' },
    { arr: [12, 34, 5, 89, 52, 21, 74, 43], active: [2, 3], text: 'Sorted sub-sequence partition block [5, 89]' },
    { arr: [5, 12, 34, 89, 52, 21, 74, 43], active: [0, 1, 2, 3], text: 'Left stack branch fully sorted: [5, 12, 34, 89]' },
    { arr: [5, 12, 34, 89, 21, 52, 74, 43], active: [4, 5], text: 'Sorted sub-sequence partition block [21, 52]' },
    { arr: [5, 12, 34, 89, 21, 43, 52, 74], active: [4, 5, 6, 7], text: 'Right stack branch fully sorted: [21, 43, 52, 74]' },
    { arr: [5, 12, 21, 34, 43, 52, 74, 89], active: [0, 1, 2, 3, 4, 5, 6, 7], text: 'Merge Sort complete! Resolved in O(n log n).' }
  ];

  const runMergeSort = () => {
    setMsIsSorting(true);
    setMsCurrentStepIdx(0);
  };

  useEffect(() => {
    let timer: any;
    if (msIsSorting && msCurrentStepIdx >= 0 && msCurrentStepIdx < msSteps.length) {
      timer = setTimeout(() => {
        setMsArray(msSteps[msCurrentStepIdx].arr);
        if (msCurrentStepIdx < msSteps.length - 1) {
          setMsCurrentStepIdx(prev => prev + 1);
        } else {
          setMsIsSorting(false);
          triggerFeedback("Array sort execution compiled successfully.");
        }
      }, 1200);
    }
    return () => clearTimeout(timer);
  }, [msIsSorting, msCurrentStepIdx]);

  // --- 3. DIJKSTRA SYSTEM CORE (FIXED MISSING STATE CRASH BUG) ---
  const [dijkstraNodes] = useState<any>({
    A: { B: 4, C: 2 }, B: { C: 1, D: 5 }, C: { B: 1, D: 8, E: 10 }, D: { E: 2 }, E: {}
  });
  const [dijkstraDistances, setDijkstraDistances] = useState<any>({ A: 0, B: '∞', C: '∞', D: '∞', E: '∞' });
  const [dijkstraVisited, setDijkstraVisited] = useState<string[]>([]);
  const [dijkstraQueue, setDijkstraQueue] = useState<string[]>(['A']);
  const [dijkstraLog, setDijkstraLog] = useState<string[]>(['Dijkstra tracer loaded. Target root source: Node A.']);
  const [dijkstraActiveNode, setDijkstraActiveNode] = useState<string | null>(null);

  const handleDijkstraStep = () => {
    const queue = [...dijkstraQueue];
    if (queue.length === 0) {
      triggerFeedback("Shortest paths from root evaluation resolved.");
      return;
    }

    queue.sort((a, b) => {
      const dA = dijkstraDistances[a] === '∞' ? Infinity : dijkstraDistances[a];
      const dB = dijkstraDistances[b] === '∞' ? Infinity : dijkstraDistances[b];
      return dA - dB;
    });

    const active = queue.shift()!;
    setDijkstraActiveNode(active);
    setDijkstraQueue(queue);

    const neighbors = dijkstraNodes[active];
    const nextDists = { ...dijkstraDistances };
    const curActiveDist = nextDists[active] === '∞' ? Infinity : nextDists[active];

    const currentLogs = [...dijkstraLog];
    currentLogs.push(`Inspecting memory links for edge node: ${active} (Distance: ${curActiveDist})`);

    const updatedQueue = [...queue];

    Object.keys(neighbors).forEach(nbr => {
      const weight = neighbors[nbr];
      const tentative = curActiveDist + weight;
      const existing = nextDists[nbr] === '∞' ? Infinity : nextDists[nbr];

      if (tentative < existing) {
        nextDists[nbr] = tentative;
        currentLogs.push(`  ↳ Shorter trace route to ${nbr}: ${curActiveDist} + ${weight} = ${tentative}`);
        if (!dijkstraVisited.includes(nbr) && !updatedQueue.includes(nbr)) {
          updatedQueue.push(nbr);
        }
      }
    });

    setDijkstraVisited(prev => [...prev, active]);
    setDijkstraDistances(nextDists);
    setDijkstraQueue(updatedQueue);
    setDijkstraLog(currentLogs);
  };

  const resetDijkstra = () => {
    setDijkstraDistances({ A: 0, B: '∞', C: '∞', D: '∞', E: '∞' });
    setDijkstraVisited([]);
    setDijkstraQueue(['A']);
    setDijkstraActiveNode(null);
    setDijkstraLog(['Tracer scope refreshed. Path sequence reset onto source Node A.']);
  };

  // --- 4. HASH TABLE VIEW ---
  const [hashTable, setHashTable] = useState<any[][]>(Array(8).fill(null).map(() => []));
  const [hashKey, setHashInputKey] = useState('');
  const [hashVal, setHashInputValue] = useState('');
  const [hashLogs, setHashLogs] = useState<string[]>([]);

  const handleHashInsert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hashKey || !hashVal) return;

    let totalCodeSum = 0;
    for (let i = 0; i < hashKey.length; i++) {
      totalCodeSum += hashKey.charCodeAt(i);
    }
    const bucketIndex = totalCodeSum % 8;

    const updatedTable = [...hashTable];
    const targets = [...updatedTable[bucketIndex]];
    
    const existingIdx = targets.findIndex(item => item.key === hashKey);
    let executionNote = '';

    if (existingIdx !== -1) {
      executionNote = `Overwrote mapping target for key "${hashKey}" in slot ${bucketIndex}.`;
      targets[existingIdx] = { key: hashKey, val: hashVal };
    } else {
      if (targets.length > 0) {
        executionNote = `COLLISION TRACED at address slot ${bucketIndex}! Appending node linkage.`;
      } else {
        executionNote = `Secured clear index mapping for key "${hashKey}" at slot ${bucketIndex}.`;
      }
      targets.push({ key: hashKey, val: hashVal });
    }

    updatedTable[bucketIndex] = targets;
    setHashTable(updatedTable);
    setHashLogs(prev => [`[MEMORY] ${executionNote} (Key: "${hashKey}" → Sum ${totalCodeSum} % 8 = ${bucketIndex})`, ...prev]);
    setHashInputKey('');
    setHashInputValue('');
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-[#0F172A] text-slate-100 p-6 md:p-10 text-left relative overflow-y-auto">
        
        {feedback && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#1E293B] border border-blue-500/40 text-slate-100 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <CheckCircle2 className="text-emerald-400 w-5 h-5" />
            <div className="text-sm font-medium">{feedback}</div>
          </div>
        )}

        {!selectedAlgo ? (
          <>
            <header className="mb-8 flex justify-between items-center border-b border-white/5 pb-4">
              <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">Learning Library</h1>
                <p className="text-sm text-slate-400 mt-1">Master computer science concepts through structural algorithmic data traces.</p>
              </div>
              <div className="text-right hidden sm:block">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">Workspace Profile</span>
                <span className="text-xs font-mono font-bold text-purple-400">{userRole}</span>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LIBRARY_ALGORITHMS.map((algo, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  whileHover={{ scale: 1.015 }}
                  key={algo.id}
                  className="bg-[#1E293B] border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-blue-500/30 transition-all duration-300 group shadow-xl"
                >
                  <div className={`h-40 bg-gradient-to-br ${algo.gradient} flex items-center justify-center border-b border-slate-800/40 relative`}>
                    <div className="p-4 rounded-full bg-slate-950/50 border border-slate-800/40 relative z-10 group-hover:scale-110 transition-transform duration-300">
                      {algo.icon}
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">{algo.title}</h3>
                        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded border tracking-wider uppercase ${algo.difficultyColor}`}>
                          {algo.difficulty}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-3">
                        {algo.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-800/40 pt-4 mt-2">
                      <span className="font-mono text-xs text-sky-400 font-medium">{algo.complexity}</span>
                      <button
                        onClick={() => {
                          setSelectedAlgo(algo.id);
                          if (algo.id === 'binary-search') handleBsReset();
                          if (algo.id === 'dijkstra') resetDijkstra();
                        }}
                        className="text-blue-400 group-hover:text-blue-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-all"
                      >
                        Explore Tracers →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="animate-fade-in flex flex-col flex-grow">
            <button
              onClick={() => setSelectedAlgo(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest mb-6"
            >
              ← Back to Learning Library
            </button>

            {/* --- 1. BINARY SEARCH --- */}
            {selectedAlgo === 'binary-search' && (
              <div className="bg-[#0b0f19] border border-white/10 rounded-2xl p-6 flex flex-col gap-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <div>
                    <h2 className="text-xl font-bold text-white">Interactive Binary Search Tracer</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Visualize pivot calculation mechanics and search boundary reductions.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-medium font-mono">Target:</span>
                    <input 
                      type="number" value={bsTarget} onChange={(e) => { setBsTarget(Number(e.target.value)); handleBsReset(); }}
                      className="w-16 bg-[#07060f] border border-white/10 text-white rounded px-2 py-1 text-xs text-center font-mono focus:outline-none focus:border-purple-500/50"
                    />
                    <button onClick={handleBsReset} className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-all">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-2 py-4">
                  {bsArray.map((num, index) => {
                    const isMid = index === bsMid;
                    const inRange = index >= bsLow && index <= bsHigh;
                    const isFound = num === bsTarget && isMid;

                    let blockStyle = 'border-white/5 bg-slate-950/20 text-slate-600';
                    if (inRange) blockStyle = 'border-purple-500/20 bg-purple-950/10 text-slate-200';
                    if (isMid) blockStyle = 'border-amber-500 bg-amber-500/20 text-amber-300 font-extrabold';
                    if (isFound) blockStyle = 'border-emerald-500 bg-emerald-500/30 text-emerald-200 shadow-lg';

                    return (
                      <div key={index} className={`border rounded-xl p-3 flex flex-col items-center justify-center transition-all duration-300 relative min-h-[64px] ${blockStyle}`}>
                        <span className="text-[9px] text-slate-600 absolute top-1 font-mono">{index}</span>
                        <span className="text-sm font-bold mt-2">{num}</span>
                        {isMid && <span className="absolute -bottom-5 text-[8px] text-amber-400 font-mono font-extrabold">MID</span>}
                        {index === bsLow && <span className="absolute -bottom-5 text-[8px] text-blue-400 font-mono font-extrabold">LOW</span>}
                        {index === bsHigh && <span className="absolute -bottom-5 text-[8px] text-rose-400 font-mono font-extrabold">HIGH</span>}
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="bg-[#07060f] border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Tracer Controls</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Step through execution points to see interval scaling.</p>
                    </div>
                    <button onClick={handleBsStep} className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                      <PlayCircle className="w-4 h-4" />
                      Step Visualizer
                    </button>
                  </div>

                  <div className="md:col-span-2 bg-[#07060f] border border-white/5 rounded-xl p-4 font-mono text-xs flex flex-col">
                    <div className="text-slate-500 border-b border-white/[0.04] pb-2 mb-2 flex justify-between items-center">
                      <span>Execution Trace Log</span>
                      <span className="text-purple-400">Step {bsStep}</span>
                    </div>
                    <div className="bg-white/[0.01] rounded-lg p-3 border border-white/[0.03] text-slate-200 mb-3">{bsStatus}</div>
                    <div className="flex-grow overflow-y-auto space-y-1 max-h-[100px] text-slate-500 pr-1">
                      {bsTraceHistory.map((item, idx) => (
                        <div key={idx} className="text-[11px]">↳ {item.note}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- 2. MERGE SORT --- */}
            {selectedAlgo === 'merge-sort' && (
              <div className="bg-[#0b0f19] border border-white/10 rounded-2xl p-6 flex flex-col gap-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <div>
                    <h2 className="text-xl font-bold text-white">Merge Sort Recursion Playground</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Observe array splitting boundaries and concurrent sorted subarray merges.</p>
                  </div>
                  <button onClick={runMergeSort} disabled={msIsSorting} className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-widest transition-all">
                    {msIsSorting ? 'Sorting Subarrays...' : 'Animate Merge Sort'}
                  </button>
                </div>

                <div className="flex items-end justify-center gap-3 h-48 py-4 bg-[#07060f] border border-white/5 rounded-xl px-6">
                  {msArray.map((val, idx) => {
                    const isAct = msCurrentStepIdx >= 0 && msSteps[msCurrentStepIdx]?.active.includes(idx);
                    return (
                      <div key={idx} className="flex flex-col items-center flex-grow max-w-[48px] transition-all duration-300">
                        <span className="text-[10px] text-slate-400 mb-1 font-mono">{val}</span>
                        <div 
                          className={`w-full rounded-t-md transition-all duration-300 ${isAct ? 'bg-purple-500' : 'bg-slate-700/60'}`} 
                          style={{ height: `${val * 1.5}px` }} 
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="bg-[#07060f] p-4 rounded-xl font-mono text-xs text-purple-300 border border-white/5">
                  {msCurrentStepIdx >= 0 ? msSteps[msCurrentStepIdx].text : "Click 'Animate' to trace merge sorting intervals in O(n log n)."}
                </div>
              </div>
            )}

            {/* --- 3. DIJKSTRA GRAPH VIEW (FULLY BUILT & SAFE) --- */}
            {selectedAlgo === 'dijkstra' && (
              <div className="bg-[#0b0f19] border border-white/10 rounded-2xl p-6 space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <div>
                    <h3 className="text-xl font-bold text-white">Dijkstra Core Pathfinder</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Explore priority queue relaxation metrics live.</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={resetDijkstra} className="p-2 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-all"><RotateCcw className="w-4 h-4" /></button>
                    <button onClick={handleDijkstraStep} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold uppercase rounded-lg tracking-wider">Step Route</button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {Object.keys(dijkstraDistances).map(node => {
                    const dist = dijkstraDistances[node];
                    const isVisited = dijkstraVisited.includes(node);
                    const isActive = dijkstraActiveNode === node;
                    return (
                      <div key={node} className={`p-4 border rounded-xl flex flex-col items-center justify-center transition-all ${isActive ? 'border-amber-500 bg-amber-500/10' : isVisited ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-white/5 bg-[#07060f]'}`}>
                        <span className="text-lg font-black text-white">{node}</span>
                        <span className="text-[10px] text-slate-400 mt-1 uppercase">Distance</span>
                        <span className="text-sm font-bold text-sky-400 font-mono">{dist}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-[#07060f] border border-white/5 rounded-xl p-4 font-mono text-xs max-h-[160px] overflow-y-auto space-y-1 text-slate-300">
                  {dijkstraLog.map((l, i) => <div key={i} className="text-slate-400 border-b border-white/5 pb-1">{l}</div>)}
                </div>
              </div>
            )}

            {/* --- 4. HASH TABLE VIEW --- */}
            {selectedAlgo === 'hash-table' && (
              <div className="bg-[#0b0f19] border border-white/10 rounded-2xl p-6 space-y-6">
                <form onSubmit={handleHashInsert} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input type="text" placeholder="Key string" value={hashKey} onChange={(e) => setHashInputKey(e.target.value)} className="bg-[#07060f] border border-white/10 p-3 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500/50" required />
                  <input type="text" placeholder="Value array payload" value={hashVal} onChange={(e) => setHashInputValue(e.target.value)} className="bg-[#07060f] border border-white/10 p-3 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500/50" required />
                  <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-widest transition-all">Insert Node Mapping</button>
                </form>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                  {hashTable.map((slot, sIdx) => (
                    <div key={sIdx} className="bg-[#07060f] border border-white/10 p-3 rounded-xl">
                      <div className="text-slate-500 font-bold border-b border-white/5 pb-1 mb-2">Bucket {sIdx}</div>
                      {slot.length === 0 ? <span className="text-slate-600 italic">Empty</span> : slot.map((item, idx) => (
                        <div key={idx} className="text-purple-400 mt-1 overflow-hidden text-ellipsis whitespace-nowrap">"{item.key}": "{item.val}"</div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="bg-[#07060f] p-4 rounded-xl border border-white/5 max-h-[120px] overflow-y-auto font-mono text-xs text-slate-400">
                  {hashLogs.length === 0 ? <div className="text-slate-600 italic">No nodes logged yet.</div> : hashLogs.map((l, i) => <div key={i} className="mt-0.5">↳ {l}</div>)}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </AppShell>
  );
}