import { useExecutionStore } from '../store/useExecutionStore';
import { ZoomIn, ZoomOut, Maximize2, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VisualizationCanvas() {
  const {
    timeline,
    currentStepIndex,
    editorZoomScale,
    setZoomScale
  } = useExecutionStore();

  const currentStep = timeline[currentStepIndex];

  const renderWidget = () => {
    if (!currentStep || !currentStep.widgetData) {
      return (
        <div className="p-6 text-center space-y-2 max-w-xs text-slate-500 animate-pulse font-sans">
          <Terminal className="w-7 h-7 text-slate-600 mx-auto" />
          <p className="text-xs font-mono">Staging trace thread active. Run code or step next to propagate visual structure animations.</p>
        </div>
      );
    }

    const { type, values, pointers, highlights, swaps, nodes, edges } = currentStep.widgetData;

    // ----------------------------------------------------
    // WIDGET: ARRAY / STRING VISUALIZATION
    // ----------------------------------------------------
    if (type === 'array' && values) {
      return (
        <div className="flex flex-col items-center gap-8 w-full p-4 overflow-x-auto min-h-[160px] justify-center">
          <div className="flex gap-2.5 items-end">
            {values.map((val, idx) => {
              const isHighlight = highlights?.includes(idx);
              const isSwap = swaps?.includes(idx);
              
              // Resolve active pointers pointing to this index
              const activePointers = Object.entries(pointers || {})
                .filter(([_, ptrIdx]) => ptrIdx === idx)
                .map(([name]) => name);

              return (
                <div key={idx} className="flex flex-col items-center gap-2">
                  {/* Pointers showing from top */}
                  <div className="h-6 flex flex-col items-center justify-end">
                    {activePointers.map((ptrName) => (
                      <span key={ptrName} className="text-[9px] font-bold uppercase bg-blue-600 text-white px-1.5 py-0.5 rounded shadow-sm font-sans mb-1 scale-90">
                        {ptrName}
                      </span>
                    ))}
                    {activePointers.length > 0 && <span className="text-blue-500 font-bold -mb-1">↓</span>}
                  </div>

                  {/* Array Element block */}
                  <motion.div
                    layout
                    animate={{
                      scale: isSwap ? [1, 1.15, 1] : 1,
                      backgroundColor: isSwap ? "#7C3AED" : isHighlight ? "#06B6D4" : "#1E293B",
                      borderColor: isSwap ? "#8B5CF6" : isHighlight ? "#22D3EE" : "#334155"
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 rounded-xl border-2 flex items-center justify-center font-bold font-mono text-sm shadow-md"
                  >
                    {val}
                  </motion.div>

                  {/* Index indicator */}
                  <span className="text-[10px] text-slate-500 font-mono select-none">
                    [{idx}]
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // ----------------------------------------------------
    // WIDGET: LINKED LIST
    // ----------------------------------------------------
    if (type === 'linkedlist' && nodes) {
      return (
        <svg width="360" height="150" viewBox="0 0 360 150" className="overflow-visible">
          <g>
            {/* Draw nodes */}
            {nodes.map((node) => (
              <g key={node.id}>
                {/* Node Box */}
                <motion.rect
                  x={node.x}
                  y={node.y}
                  width="50"
                  height="36"
                  rx="8"
                  fill="#1E293B"
                  stroke={node.active ? "#06B6D4" : "#334155"}
                  strokeWidth="2"
                  animate={{ scale: node.active ? [1, 1.1, 1] : 1 }}
                  className="shadow-lg"
                />
                <text
                  x={node.x + 25}
                  y={node.y + 22}
                  fill={node.active ? "#06B6D4" : "#F8FAFC"}
                  fontSize="12"
                  textAnchor="middle"
                  className="font-bold font-mono"
                >
                  {node.val}
                </text>

                {/* Node Pointer Label */}
                {node.id === 'head' && (
                  <g transform={`translate(${node.x + 25}, ${node.y - 12})`}>
                    <text fontSize="8" fill="#2563EB" textAnchor="middle" className="font-bold uppercase tracking-wider font-sans">head</text>
                  </g>
                )}
              </g>
            ))}

            {/* Draw arrow edge links */}
            {edges?.map((edge, eIdx) => {
              const fromNode = nodes.find(n => n.id === edge.from);
              const toNode = nodes.find(n => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              const x1 = fromNode.x + 50;
              const y1 = fromNode.y + 18;
              const x2 = toNode.x;
              const y2 = toNode.y + 18;

              return (
                <g key={eIdx}>
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06B6D4" />
                    </marker>
                  </defs>
                  <motion.line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#06B6D4"
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </g>
              );
            })}
          </g>
        </svg>
      );
    }

    // ----------------------------------------------------
    // WIDGET: STACK
    // ----------------------------------------------------
    if (type === 'stack' && values) {
      return (
        <div className="flex flex-col-reverse items-center justify-center p-6 gap-1 min-h-[160px] w-full">
          {values.length === 0 ? (
            <span className="text-slate-500 italic text-xs font-sans">Empty Stack</span>
          ) : (
            values.map((val, idx) => {
              const isTop = idx === values.length - 1;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    backgroundColor: isTop ? "#7C3AED" : "#1E293B",
                    borderColor: isTop ? "#8B5CF6" : "#334155"
                  }}
                  className="w-40 py-2 border rounded-xl flex items-center justify-between px-4 font-mono font-bold text-xs"
                  key={idx}
                >
                  <span className="text-slate-400">[{idx}]</span>
                  <span className="text-white">{val}</span>
                  <span className="text-[9px] uppercase font-sans text-purple-300 font-bold">
                    {isTop ? "Top" : ""}
                  </span>
                </motion.div>
              );
            })
          )}
        </div>
      );
    }

    // ----------------------------------------------------
    // WIDGET: QUEUE
    // ----------------------------------------------------
    if (type === 'queue' && values) {
      return (
        <div className="flex items-center justify-center p-6 gap-1.5 min-h-[160px] w-full overflow-x-auto">
          {values.length === 0 ? (
            <span className="text-slate-500 italic text-xs font-sans">Empty Queue</span>
          ) : (
            <div className="flex items-center gap-1.5 border-y border-dashed border-slate-700 py-3 px-6">
              {values.map((val, idx) => {
                const isFront = idx === 0;
                const isRear = idx === values.length - 1;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      backgroundColor: isFront ? "#2563EB" : isRear ? "#7C3AED" : "#1E293B",
                      borderColor: isFront ? "#3B82F6" : isRear ? "#8B5CF6" : "#334155"
                    }}
                    className="w-12 h-12 rounded-xl border flex flex-col items-center justify-center font-mono font-bold text-xs shadow-md"
                    key={idx}
                  >
                    <span className="text-white text-xs">{val}</span>
                    <span className="text-[7px] uppercase font-sans text-slate-300 font-bold scale-90 mt-0.5">
                      {isFront ? "Front" : isRear ? "Rear" : ""}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    // ----------------------------------------------------
    // WIDGET: TREES / BST
    // ----------------------------------------------------
    if (type === 'tree' && nodes) {
      return (
        <svg width="340" height="150" viewBox="0 0 340 150" className="overflow-visible">
          <g>
            {/* Draw edge lines links */}
            {edges?.map((edge, eIdx) => {
              const fromNode = nodes.find(n => n.id === edge.from);
              const toNode = nodes.find(n => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              return (
                <line
                  key={eIdx}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="#334155"
                  strokeWidth="2"
                />
              );
            })}

            {/* Draw tree node circles */}
            {nodes.map((node) => (
              <g key={node.id}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="14"
                  fill="#1E293B"
                  stroke={node.active ? "#06B6D4" : "#334155"}
                  strokeWidth="2"
                  animate={{ scale: node.active ? [1, 1.2, 1] : 1 }}
                />
                <text
                  x={node.x}
                  y={node.y + 4}
                  fill={node.active ? "#06B6D4" : "#F8FAFC"}
                  fontSize="9"
                  textAnchor="middle"
                  className="font-bold font-mono"
                >
                  {node.val}
                </text>
              </g>
            ))}
          </g>
        </svg>
      );
    }

    // ----------------------------------------------------
    // WIDGET: GRAPH VISUALIZATION
    // ----------------------------------------------------
    if (type === 'graph' && nodes) {
      return (
        <svg width="340" height="150" viewBox="0 0 340 150" className="overflow-visible">
          <g>
            {/* Draw connection edge routes */}
            {edges?.map((edge, eIdx) => {
              const fromNode = nodes.find(n => n.id === edge.from);
              const toNode = nodes.find(n => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              return (
                <motion.line
                  key={eIdx}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={edge.active ? "#06B6D4" : "#334155"}
                  strokeWidth={edge.active ? "2.5" : "1.5"}
                />
              );
            })}

            {/* Draw vertices nodes */}
            {nodes.map((node) => (
              <g key={node.id}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="13"
                  fill="#1E293B"
                  stroke={node.active ? "#06B6D4" : "#334155"}
                  strokeWidth="2"
                  animate={{ scale: node.active ? [1, 1.25, 1] : 1 }}
                />
                <text
                  x={node.x}
                  y={node.y + 4}
                  fill={node.active ? "#06B6D4" : "#F8FAFC"}
                  fontSize="10"
                  textAnchor="middle"
                  className="font-bold font-mono"
                >
                  {node.val}
                </text>
              </g>
            ))}
          </g>
        </svg>
      );
    }

    return null;
  };

  return (
    <div className="p-6 space-y-6 flex flex-col flex-grow border-b border-slate-800 bg-[#1E293B]/20 rounded-2xl">
      
      {/* Canvas Header */}
      <div className="flex items-center justify-between font-sans">
        <span className="px-3 py-1 rounded bg-[#1E293B] border border-slate-800 text-[10px] uppercase font-bold tracking-widest text-[#06B6D4]">
          Live Algorithm Visualization
        </span>
        <div className="flex items-center gap-1.5 text-slate-400">
          <button onClick={() => setZoomScale(Math.min(editorZoomScale + 0.1, 1.4))} className="p-1.5 hover:text-white rounded bg-slate-800/40 hover:bg-slate-800 transition-all"><ZoomIn className="w-4 h-4" /></button>
          <button onClick={() => setZoomScale(Math.max(editorZoomScale - 0.1, 0.7))} className="p-1.5 hover:text-white rounded bg-slate-800/40 hover:bg-slate-800 transition-all"><ZoomOut className="w-4 h-4" /></button>
          <button onClick={() => setZoomScale(1)} className="p-1.5 hover:text-white rounded bg-slate-800/40 hover:bg-slate-800 transition-all"><Maximize2 className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Interactive Render Area */}
      <div className="relative bg-[#0F172A] rounded-xl border border-slate-800 p-4 flex items-center justify-center min-h-[220px] overflow-hidden flex-grow select-none">
        
        <div className="w-full flex justify-center transition-transform duration-300" style={{ transform: `scale(${editorZoomScale})` }}>
          {renderWidget()}
        </div>
      </div>

    </div>
  );
}
