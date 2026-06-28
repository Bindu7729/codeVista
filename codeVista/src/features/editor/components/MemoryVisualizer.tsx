import { useExecutionStore } from '../store/useExecutionStore';
import { Cpu, Layers, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MemoryVisualizer() {
  const { timeline, currentStepIndex } = useExecutionStore();
  const currentStep = timeline[currentStepIndex];

  if (!currentStep) {
    return (
      <div className="relative flex items-center justify-center bg-[#08070f] border border-white/[0.03] p-4 rounded-xl h-44 text-slate-500 font-sans text-xs">
        No execution active.
      </div>
    );
  }

  const { stack, heap } = currentStep;

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#08070f] border border-white/[0.03] p-4 rounded-xl shrink-0 font-mono text-xs">
      
      {/* 1. STACK FRAME CONTAINER */}
      <div className="flex flex-col border border-white/[0.03] rounded-lg bg-[#040308] overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.04] bg-[#0c0a18]/40 shrink-0 text-left">
          <Layers className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest font-sans">
            Stack Frame (Global Scope)
          </span>
        </div>

        <div className="p-3 flex-grow overflow-y-auto max-h-36 min-h-24 flex flex-col gap-1.5 justify-start">
          <AnimatePresence mode="popLayout">
            {stack.length === 0 ? (
              <div className="text-slate-600 italic py-4 text-center font-sans text-xs">
                Stack empty (No variables declared).
              </div>
            ) : (
              stack.map((item, idx) => {
                const isChanged = currentStep.changedVariables.includes(item.name);
                return (
                  <motion.div
                    key={`stack_${item.name}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      backgroundColor: isChanged ? "rgba(139, 92, 246, 0.15)" : "transparent",
                      borderColor: isChanged ? "rgba(139, 92, 246, 0.4)" : "rgba(255, 255, 255, 0.03)"
                    }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between px-3 py-2 border rounded-lg"
                  >
                    <span className="text-purple-300 font-bold">{item.name}</span>
                    <span className="text-emerald-400 font-medium truncate max-w-xs">{JSON.stringify(item.value)}</span>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. HEAP ALLOCATIONS CONTAINER */}
      <div className="flex flex-col border border-white/[0.03] rounded-lg bg-[#040308] overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.04] bg-[#0c0a18]/40 shrink-0 text-left">
          <Database className="w-3.5 h-3.5 text-teal-400" />
          <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest font-sans">
            Heap Allocations
          </span>
        </div>

        <div className="p-3 flex-grow overflow-y-auto max-h-36 min-h-24 flex flex-col gap-1.5 justify-start">
          <AnimatePresence mode="popLayout">
            {heap.length === 0 ? (
              <div className="text-slate-600 italic py-4 text-center font-sans text-xs">
                Heap empty (No reference objects).
              </div>
            ) : (
              heap.map((item) => (
                <motion.div
                  key={`heap_${item.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col border border-white/[0.03] bg-teal-950/5 p-2 rounded-lg text-left"
                >
                  <div className="flex items-center justify-between mb-1.5 border-b border-white/5 pb-1">
                    <span className="text-[9px] text-teal-400 font-bold uppercase font-sans">Object Array</span>
                    <span className="text-[8px] text-slate-500 font-mono select-none">{item.id.substring(0, 12)}</span>
                  </div>
                  <div className="grid grid-cols-6 gap-1">
                    {Array.isArray(item.value) ? (
                      item.value.map((val, elIdx) => (
                        <div 
                          key={elIdx}
                          className="bg-[#0b0a17] border border-teal-500/20 text-center py-1 rounded text-[10px] text-teal-300 font-bold"
                          title={`Index ${elIdx}`}
                        >
                          {JSON.stringify(val)}
                        </div>
                      ))
                    ) : (
                      <div className="col-span-6 text-slate-300">{JSON.stringify(item.value)}</div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
