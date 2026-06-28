import { useExecutionStore } from '../store/useExecutionStore';
import { ZoomIn, ZoomOut, Maximize2, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function VisualizationCanvas() {
  const {
    code,
    timeline,
    currentStepIndex,
    editorZoomScale,
    setZoomScale
  } = useExecutionStore();

  const currentStep = timeline[currentStepIndex];

  // --- REUSED AST OPERATORS POSITIONING ENGINE ---
  const generateGraph = () => {
    if (!currentStep) return { nodes: [], edges: [] };

    const lines = code.split('\n');
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

        // Check if it is a compound expression math equation operator logic (e.g. speed + complexity)
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

    return { nodes, edges };
  };

  const { nodes, edges } = generateGraph();

  // Filter nodes & edges to match the current step execution playhead
  const currentLineNum = currentStep ? currentStep.lineNum : 1;
  const currentVisibleNodes = nodes.filter(n => n.line <= currentLineNum);
  const currentVisibleEdges = edges.filter((_, eIdx) => {
    const matchingNode = nodes.find(n => n.line === currentLineNum);
    return matchingNode ? matchingNode.line <= currentLineNum : true;
  });

  return (
    <div className="p-6 space-y-6 flex flex-col flex-grow border-b border-white/[0.04] font-sans">
      
      {/* Canvas Header */}
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 rounded bg-violet-950/80 border border-violet-500/30 text-[10px] uppercase font-bold tracking-widest text-violet-300">
          Dynamic Mathematical Abstract Tree
        </span>
        <div className="flex items-center gap-1.5 text-slate-400">
          <button onClick={() => setZoomScale(Math.min(editorZoomScale + 0.1, 1.4))} className="p-1.5 hover:text-white rounded bg-white/[0.02] hover:bg-white/[0.05] transition-all"><ZoomIn className="w-4 h-4" /></button>
          <button onClick={() => setZoomScale(Math.max(editorZoomScale - 0.1, 0.7))} className="p-1.5 hover:text-white rounded bg-white/[0.02] hover:bg-white/[0.05] transition-all"><ZoomOut className="w-4 h-4" /></button>
          <button onClick={() => setZoomScale(1)} className="p-1.5 hover:text-white rounded bg-white/[0.02] hover:bg-white/[0.05] transition-all"><Maximize2 className="w-4 h-4" /></button>
        </div>
      </div>

      {/* SVG Canvas Viewport */}
      <div className="relative bg-[#07060f]/60 rounded-xl border border-white/[0.03] p-4 flex items-center justify-center min-h-[240px] overflow-hidden flex-grow select-none">
        
        <div className="w-full flex justify-center transition-transform duration-300" style={{ transform: `scale(${editorZoomScale})` }}>
          
          {currentVisibleNodes.length === 0 ? (
            <div className="p-6 text-center space-y-2 max-w-xs text-slate-500 animate-pulse">
              <Terminal className="w-7 h-7 text-slate-600 mx-auto" />
              <p className="text-xs font-mono">Staging trace thread active. Run code or step next to propagate visual tree mappings dynamically.</p>
            </div>
          ) : (
            <svg width="340" height="150" viewBox="0 0 340 150" className="overflow-visible">
              <g>
                
                {/* 1. Draw dynamic linkage edges */}
                {currentVisibleEdges.map((edge, eIdx) => (
                  <line 
                    key={`edge_${eIdx}`}
                    x1={edge.fromX} y1={edge.fromY} x2={edge.toX} y2={edge.toY}
                    stroke="#8b5cf6" strokeWidth="2"
                    className="transition-all duration-500"
                  />
                ))}

                {/* 2. Draw dynamic interactive node blocks */}
                <AnimatePresence>
                  {currentVisibleNodes.map((node) => {
                    const isLineActiveNow = node.line === currentLineNum;
                    const isOperatorNode = node.type === 'operator';
                    
                    // Live variable value lookup from execution environment state!
                    let liveValue = node.value;
                    if (node.type === 'variable' && currentStep && currentStep.variables[node.label] !== undefined) {
                      liveValue = JSON.stringify(currentStep.variables[node.label]);
                    }

                    // Pulse/scale when variable updates in this step
                    const isUpdatedNow = currentStep && currentStep.changedVariables.includes(node.label);

                    return (
                      <g key={node.id} className="transition-all duration-500">
                        
                        {/* Node Bubble Base */}
                        <motion.circle 
                          cx={node.x} 
                          cy={node.cy} 
                          r={isOperatorNode ? "14" : "12"}
                          fill="#0f0e1b"
                          stroke={isLineActiveNow ? "#10b981" : isOperatorNode ? "#8b5cf6" : "#2d2a45"}
                          strokeWidth={isLineActiveNow ? "2.5" : "1.5"}
                          animate={{
                            scale: isUpdatedNow ? [1, 1.25, 1] : 1,
                            borderColor: isUpdatedNow ? "#10b981" : undefined
                          }}
                          transition={{ duration: 0.4 }}
                          className="shadow-xl"
                        />
                        
                        {/* Label Tag inside bubble */}
                        <text 
                          x={node.x} 
                          y={node.cy + 3.5} 
                          fill={isLineActiveNow ? "#10b981" : isOperatorNode ? "#c084fc" : "#64748b"} 
                          fontSize={isOperatorNode ? "11" : "8"} 
                          textAnchor="middle" 
                          className="font-bold font-mono"
                        >
                          {node.label.substring(0, 3)}
                        </text>

                        {/* Value Flag tag */}
                        <motion.g 
                          transform={`translate(${node.x - 24}, ${isOperatorNode ? node.cy - 26 : node.cy + 16})`}
                          animate={{
                            scale: isUpdatedNow ? [1, 1.1, 1] : 1
                          }}
                        >
                          <rect width="48" height="12" rx="3" fill="#040309" stroke={isUpdatedNow ? "#10b981" : "#1c1b2c"} strokeWidth="1"/>
                          <text x="24" y="9" fill={isUpdatedNow ? "#10b981" : "#c084fc"} fontSize="7" textAnchor="middle" className="font-mono font-bold truncate">
                            {liveValue.substring(0, 7)}
                          </text>
                        </motion.g>

                      </g>
                    );
                  })}
                </AnimatePresence>

              </g>
            </svg>
          )}

        </div>
      </div>

    </div>
  );
}
