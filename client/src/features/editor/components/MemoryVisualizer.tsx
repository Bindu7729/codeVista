import { useExecutionStore } from '../store/useExecutionStore';
import { Layers, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MemoryVisualizer() {
  const { timeline, currentStepIndex } = useExecutionStore();
  const currentStep = timeline[currentStepIndex];

  if (!currentStep) {
    return (
      <div className="relative flex items-center justify-center bg-[#1E293B] border border-slate-800 p-4 rounded-xl h-44 text-slate-500 font-sans text-xs">
        No execution active.
      </div>
    );
  }

  const { stack, heap } = currentStep;

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#1E293B]/20 border border-slate-800/40 p-4 rounded-xl shrink-0 font-mono text-xs">
      
      {/* 1. STACK FRAME CONTAINER */}
      <div className="flex flex-col border border-slate-800 rounded-lg bg-[#0F172A] overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-800 bg-[#1E293B] shrink-0 text-left">
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px] text-[#F8FAFC] font-bold uppercase tracking-widest font-sans">
            Stack Frame (Scope)
          </span>
        </div>

        <div className="p-3 flex-grow overflow-y-auto max-h-36 min-h-24 flex flex-col gap-1.5 justify-start">
          <AnimatePresence mode="popLayout">
            {stack.length === 0 ? (
              <div className="text-slate-600 italic py-4 text-center font-sans text-xs">
                Stack empty (No active symbols).
              </div>
            ) : (
              stack.map((item) => {
                const isChanged = currentStep.changedVariables.includes(item.name);
                return (
                  <motion.div
                    key={`stack_${item.name}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      backgroundColor: isChanged ? "rgba(37, 99, 235, 0.15)" : "transparent",
                      borderColor: isChanged ? "rgba(37, 99, 235, 0.4)" : "rgba(255, 255, 255, 0.03)"
                    }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between px-3 py-2 border rounded-lg"
                  >
                    <span className="text-blue-300 font-bold">{item.name}</span>
                    <span className="text-emerald-400 font-medium truncate max-w-xs">{JSON.stringify(item.value)}</span>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. HEAP ALLOCATIONS CONTAINER */}
      <div className="flex flex-col border border-slate-800 rounded-lg bg-[#0F172A] overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-800 bg-[#1E293B] shrink-0 text-left">
          <Database className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-[10px] text-[#F8FAFC] font-bold uppercase tracking-widest font-sans">
            Heap Allocations
          </span>
        </div>

        <div className="p-3 flex-grow overflow-y-auto max-h-36 min-h-24 flex flex-col gap-1.5 justify-start">
          <AnimatePresence mode="popLayout">
            {heap.length === 0 ? (
              <div className="text-slate-600 italic py-4 text-center font-sans text-xs">
                Heap empty (No reference values).
              </div>
            ) : (
              heap.map((item) => (
                <motion.div
                  key={`heap_${item.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col border border-slate-800 bg-purple-950/5 p-2 rounded-lg text-left"
                >
                  <div className="flex items-center justify-between mb-1.5 border-b border-slate-800 pb-1">
                    <span className="text-[9px] text-purple-400 font-bold uppercase font-sans">Reference Obj</span>
                    <span className="text-[8px] text-slate-500 font-mono select-none">{item.id.substring(0, 12)}</span>
                  </div>
                  <div className="grid grid-cols-6 gap-1">
                    {Array.isArray(item.value) ? (
                      item.value.map((val, elIdx) => (
                        <div 
                          key={elIdx}
                          className="bg-[#0b0a17] border border-purple-500/20 text-center py-1 rounded text-[10px] text-purple-300 font-bold"
                          title={`Index ${elIdx}`}
                        >
                          {JSON.stringify(val)}
                        </div>
                      ))
                    ) : (
                      <div className="col-span-6 text-slate-350">{JSON.stringify(item.value)}</div>
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
