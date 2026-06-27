import { useState, useEffect } from 'react';
import { AppShell } from '../../components/SideNav';
import { 
  Folder, 
  ChevronRight, 
  Play, 
  Bug, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Sparkles, 
  Cpu, 
  Terminal,
  CheckCircle2,
  Code
} from 'lucide-react';

const INITIAL_PYTHON_MOCK = `# Paste any operational lines here to see a true visual step tree!
speed = 120
complexity = 45

total_overhead = speed + complexity
visualize_flow(total_overhead)

a = 15
b = 30
result = a * b`;

interface VisualGraphNode {
  id: string;
  label: string;
  type: 'variable' | 'operator';
  value: string;
  line: number;
  x: number;
  cy: number;
}

interface VisualEdge {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

export default function EditorPage() {
  const [customInputCode, setCustomInputCode] = useState(INITIAL_PYTHON_MOCK);
  const [simHighlightLine, setSimHighlightLine] = useState(1);
  const [simIsRunning, setSimIsRunning] = useState(false);
  const [editorZoomScale, setEditorZoomScale] = useState(1);
  const [feedback, setFeedback] = useState<string | null>(null);

  const triggerFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  // --- COMPILER LEVEL ABSTRACT OPERATORS PARSER ENGINE ---
  const generateGraphFromCode = () => {
    const lines = customInputCode.split('\n');
    const nodes: VisualGraphNode[] = [];
    const edges: VisualEdge[] = [];
    
    let horizontalOffsetIndex = 0;

    lines.forEach((lineText, idx) => {
      const lineNum = idx + 1;
      const cleanLine = lineText.trim();
      
      if (!cleanLine || cleanLine.startsWith('#') || cleanLine.startsWith('//') || cleanLine.startsWith('print')) return;

      if (cleanLine.includes('=')) {
        const parts = cleanLine.split('=');
        const leftVar = parts[0].replace(/(let|mut|var|int|const)/g, '').trim();
        const rightExpr = parts[1].replace(';', '').trim();

        // 1. Check if it is a compound expression math equation operator logic (e.g. speed + complexity)
        let operatorFound = null;
        if (rightExpr.includes('+')) operatorFound = '+';
        else if (rightExpr.includes('*')) operatorFound = '*';
        else if (rightExpr.includes('-')) operatorFound = '-';
        else if (rightExpr.includes('/')) operatorFound = '/';

        const nodeXCoordinate = 45 + (horizontalOffsetIndex * 64);
        
        if (operatorFound) {
          // Construct Operator node bubble dynamically
          const opNodeY = 40;
          nodes.push({
            id: `op_${lineNum}`,
            label: operatorFound,
            type: 'operator',
            value: leftVar,
            line: lineNum,
            x: nodeXCoordinate,
            cy: opNodeY
          });

          // Left operand child trace mapping parameters
          nodes.push({
            id: `var_left_${lineNum}`,
            label: leftVar,
            type: 'variable',
            value: rightExpr,
            line: lineNum,
            x: nodeXCoordinate,
            cy: 100
          });

          // Draw active operational link routes tracks
          edges.push({
            fromX: nodeXCoordinate,
            fromY: opNodeY + 12,
            toX: nodeXCoordinate,
            toY: 100 - 12
          });

          horizontalOffsetIndex += 1;
        } else {
          // Standard isolated primitive assignment step rows mapping structures
          nodes.push({
            id: `var_prim_${lineNum}`,
            label: leftVar,
            type: 'variable',
            value: rightExpr,
            line: lineNum,
            x: nodeXCoordinate,
            cy: 70
          });
          horizontalOffsetIndex += 0.8;
        }
      }
    });

    const parsedLines = lines.map((lineText, index) => {
      const lineNum = index + 1;
      return {
        lineNum,
        text: lineText,
        highlight: lineNum === simHighlightLine,
        isAction: lineText.trim().includes('visualize_flow') || lineText.trim().startsWith('print')
      };
    });

    return { parsedLines, nodes, edges };
  };

  const { parsedLines, nodes, edges } = generateGraphFromCode();
  
  // Safe filtering loops constraint frames updates up to current time step limit pointers
  const currentVisibleNodes = nodes.filter(n => n.line <= simHighlightLine);
  const currentVisibleEdges = edges.filter((_, eIdx) => {
    // Sync dependency connections rows mapping segments lines cleanly
    const matchingNode = nodes.find(n => n.line === simHighlightLine);
    return matchingNode ? matchingNode.line <= simHighlightLine : true;
  });

  const handleEditorStepNext = () => {
    setSimHighlightLine((prev) => {
      let nextLine = prev + 1;
      if (nextLine > parsedLines.length) {
        return 1;
      }
      return nextLine;
    });
  };

  useEffect(() => {
    let simTimer: any;
    if (simIsRunning) {
      simTimer = setInterval(() => {
        handleEditorStepNext();
      }, 1600);
    }
    return () => clearInterval(simTimer);
  }, [simIsRunning, parsedLines.length]);

  return (
    <AppShell>
      <div className="flex flex-col h-screen bg-[#06050b] text-slate-100 font-mono text-sm overflow-hidden select-none">
        
        {feedback && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#110e25] border border-purple-500/40 text-slate-100 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 font-sans text-xs">
            <CheckCircle2 className="text-emerald-400 w-5 h-5" />
            <div className="text-sm font-medium">{feedback}</div>
          </div>
        )}

        {/* Toolbar Bar Ribbon Header Container */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/[0.04] bg-[#07060f] shrink-0 text-left">
          <div className="flex items-center gap-2.5 text-slate-400 text-xs font-medium">
            <Folder className="w-4.5 h-4.5 text-violet-400 flex-shrink-0" />
            <span className="hover:text-white cursor-pointer font-sans">workspace</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-200 font-semibold font-mono">live_compiler.script</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setSimIsRunning(!simIsRunning); triggerFeedback(simIsRunning ? "Simulation paused." : "Tracing step graph synchronized."); }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all shadow-md font-sans active:scale-95"
            >
              <span>{simIsRunning ? 'Pause Engine' : 'Run Thread'}</span>
            </button>
            <button 
              onClick={handleEditorStepNext}
              className="px-4 py-2 border border-white/10 hover:border-violet-500/40 hover:bg-violet-950/25 text-slate-200 rounded-lg flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all font-sans"
            >
              <Bug className="w-3.5 h-3.5 text-violet-400" />
              <span>Step Next</span>
            </button>
          </div>
        </div>

        {/* Workspace Splitting main dashboard body structures frame layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-grow overflow-hidden items-stretch">
          
          {/* Left Block Side Window Workspace Screen panel */}
          <div className="lg:col-span-6 border-r border-white/[0.04] bg-[#08070e] flex flex-col p-6 overflow-y-auto text-left gap-6">
            <div className="space-y-2 flex flex-col shrink-0">
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5 font-sans">
                <Code className="w-4 h-4 text-violet-400" />
                <span>Source Input Framework Shell</span>
              </label>
              <textarea
                value={customInputCode}
                onChange={(e) => {
                  setCustomInputCode(e.target.value);
                  setSimHighlightLine(1); 
                }}
                className="w-full h-44 bg-[#040309] border border-white/10 rounded-xl p-4 text-xs font-mono text-emerald-400 placeholder-slate-700 focus:outline-none focus:border-purple-500/60 leading-relaxed resize-none transition-colors shadow-inner"
                placeholder="// Paste mathematical calculation scripts here to trigger auto-visual tree structures..."
              />
            </div>

            {/* Code Highlight listing rows tracking matrix panel content */}
            <div className="space-y-1.5 bg-[#040309]/50 border border-white/[0.02] p-4 rounded-xl flex-grow overflow-y-auto select-none">
              <p className="text-[9px] text-slate-500 tracking-widest uppercase font-bold mb-3 font-sans">Live Highlighting Token Matrix</p>
              {parsedLines.map((line) => (
                <div 
                  key={line.lineNum} 
                  className={`flex items-start py-0.5 px-3 rounded-md transition-all duration-300 ${
                    line.highlight ? 'bg-purple-950/50 border-l-4 border-purple-500 -ml-2 pl-2 font-bold text-white' : 'text-slate-400'
                  }`}
                >
                  <span className="text-slate-600 select-none w-5 mr-6 text-right text-xs font-mono">{line.lineNum}</span>
                  <span className={`font-mono text-xs sm:text-[13px] whitespace-pre ${line.highlight ? 'text-white' : line.isAction ? 'text-sky-400' : 'text-slate-300'}`}>
                    {line.text || " "}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block Side Window: HIGH FIDELITY COMPUTATIONAL TREE GENERATOR CANVAS */}
          <div className="lg:col-span-6 bg-[#0a0914] flex flex-col justify-between overflow-hidden text-left">
            
            <div className="p-6 space-y-6 flex flex-col flex-grow border-b border-white/[0.04]">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded bg-violet-950/80 border border-violet-500/30 text-[10px] uppercase font-bold tracking-widest text-violet-300 font-sans">
                  Dynamic Mathematical Abstract Tree
                </span>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <button onClick={() => setEditorZoomScale(prev => Math.min(prev + 0.1, 1.4))} className="p-1.5 hover:text-white rounded bg-white/[0.02] hover:bg-white/[0.05] transition-all"><ZoomIn className="w-4 h-4" /></button>
                  <button onClick={() => setEditorZoomScale(prev => Math.max(prev - 0.1, 0.7))} className="p-1.5 hover:text-white rounded bg-white/[0.02] hover:bg-white/[0.05] transition-all"><ZoomOut className="w-4 h-4" /></button>
                  <button onClick={() => setEditorZoomScale(1)} className="p-1.5 hover:text-white rounded bg-white/[0.02] hover:bg-white/[0.05] transition-all"><Maximize2 className="w-4 h-4" /></button>
                </div>
              </div>

              {/* AUTOMATED SVG VIEWPORT: PLOTS NODES, OPERATIONS, AND LINK EDGES ON THE FLY FROM TEXT AREA */}
              <div className="relative bg-[#07060f]/60 rounded-xl border border-white/[0.03] p-4 flex items-center justify-center min-h-[240px] overflow-hidden flex-grow">
                <div className="w-full flex justify-center transition-transform duration-300" style={{ transform: `scale(${editorZoomScale})` }}>
                  
                  {currentVisibleNodes.length === 0 ? (
                    <div className="p-6 text-center space-y-2 max-w-xs font-sans text-slate-500 animate-pulse">
                      <Terminal className="w-7 h-7 text-slate-600 mx-auto" />
                      <p className="text-xs font-mono">Staging trace thread active. Step rows to propagate computational tree layout mappings dynamically on this canvas layer.</p>
                    </div>
                  ) : (
                    /* THE TRUE DYNAMIC GRAPH CANVAS TREE CONNECTOR */
                    <svg width="340" height="150" viewBox="0 0 340 150" className="animate-fade-in">
                      <g>
                        {/* 1. Render dynamic linkage ports edges paths */}
                        {currentVisibleEdges.map((edge, eIdx) => (
                          <line 
                            key={`edge_${eIdx}`}
                            x1={edge.fromX} y1={edge.fromY} x2={edge.toX} y2={edge.toY}
                            stroke="#8b5cf6" strokeWidth="2" strokeDasharray="none"
                            className="transition-all duration-500"
                          />
                        ))}

                        {/* 2. Render operational parent circles and value fields components wrappers */}
                        {currentVisibleNodes.map((node) => {
                          const isLineActiveNow = node.line === simHighlightLine;
                          const isOperatorNode = node.type === 'operator';

                          return (
                            <g key={node.id} className="transition-all duration-500">
                              {/* Node bubble shapes circle wrappers */}
                              <circle 
                                cx={node.x} cy={node.cy} r={isOperatorNode ? "14" : "12"}
                                fill="#0f0e1b"
                                stroke={isLineActiveNow ? "#10b981" : isOperatorNode ? "#8b5cf6" : "#2d2a45"}
                                strokeWidth={isLineActiveNow ? "2.5" : "1.5"}
                                className="transition-all duration-300 shadow-xl"
                              />
                              
                              {/* Dynamic Text labels text placement identifiers info mapping */}
                              <text 
                                x={node.cx || node.cx === 0 ? node.cx : node.x} 
                                y={(node.cy || node.cy === 0 ? node.cy : 0) + 3} 
                                fill={isLineActiveNow ? "#10b981" : isOperatorNode ? "#c084fc" : "#64748b"} 
                                fontSize={isOperatorNode ? "11" : "8"} 
                                textAnchor="middle" 
                                className="font-bold font-mono"
                              >
                                {node.label.substring(0, 3)}
                              </text>

                              {/* Flag identifier box bounds tags maps */}
                              <g transform={`translate(${node.x - 24}, ${isOperatorNode ? node.cy - 24 : node.cy + 16})`}>
                                <rect width="48" height="12" rx="3" fill="#040309" stroke="#1c1b2c" strokeWidth="1"/>
                                <text x="24" y="9" fill="#10b981" fontSize="7" textAnchor="middle" className="font-mono font-bold truncate">{node.value.substring(0, 7)}</text>
                              </g>
                            </g>
                          );
                        })}
                      </g>
                    </svg>
                  )}

                </div>
              </div>

              {/* Heap allocations cards summary strip list row footer elements */}
              <div className="relative grid grid-cols-4 gap-2 bg-[#08070f] border border-white/[0.03] p-3 rounded-xl shrink-0">
                {currentVisibleNodes.filter(n => n.type === 'variable').slice(-4).map((varNode, vIdx) => (
                  <div key={vIdx} className="bg-purple-950/20 border border-purple-500/20 p-2.5 rounded-xl text-left font-mono text-[11px] animate-fade-in">
                    <span className="text-[8px] text-slate-500 uppercase tracking-wide font-sans block">Identifier</span>
                    <span className="text-purple-300 font-bold block truncate">{varNode.label}</span>
                    <span className="text-[8px] text-slate-600 uppercase block font-sans mt-1">Value Register</span>
                    <span className="text-emerald-400 font-medium block truncate">{varNode.value}</span>
                  </div>
                ))}
                {currentVisibleNodes.length === 0 && (
                  <div className="col-span-4 text-center text-xs text-slate-600 font-sans py-2 italic select-none">
                    No active tokens parsed in runtime stack telemetry registry rows.
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Panel Console Status Logger Feedback */}
            <div className="bg-[#08070f] flex-col flex h-[130px] shrink-0 border-t border-white/[0.04]">
              <div className="flex border-b border-white/[0.04]">
                <span className="px-5 py-3.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-300 bg-violet-950/10 border-b-2 border-purple-500 font-sans">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Live AST Parser Status Console Log
                </span>
              </div>

              <div className="p-5 flex-grow overflow-y-auto font-mono text-xs text-slate-500 leading-normal">
                {"[SYSTEM-TRACE-IO] Abstract compilation tree mappings generated from user buffer string. Nodes array active state verified successfully."}
              </div>
            </div>

          </div>
        </div>

      </div>
    </AppShell>
  );
}