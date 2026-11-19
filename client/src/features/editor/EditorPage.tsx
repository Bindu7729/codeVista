import { useEffect } from 'react';
import { AppShell } from '../../components/SideNav';
import { useExecutionStore } from './store/useExecutionStore';
import { 
  Folder, 
  ChevronRight, 
  Play, 
  Pause,
  Bug, 
  Terminal,
  CheckCircle2,
  Code
} from 'lucide-react';
import VisualizationCanvas from './components/VisualizationCanvas';
import PlaybackControls from './components/PlaybackControls';
import MemoryVisualizer from './components/MemoryVisualizer';
import LanguageSelector from './components/LanguageSelector';
import ErrorBoundary from './components/ErrorBoundary';

export default function EditorPage() {
  const {
    code,
    language,
    timeline,
    currentStepIndex,
    isPlaying,
    playbackSpeed,
    feedback,
    setCode,
    runCode,
    nextStep,
    prevStep,
    togglePlay,
    resetExecution,
    triggerFeedback
  } = useExecutionStore();

  const currentStep = timeline[currentStepIndex];

  // --- AUTOMATED INTERVAL AUTOPLAY LOOP ENGINE ---
  useEffect(() => {
    let simTimer: any;
    if (isPlaying) {
      simTimer = setInterval(() => {
        nextStep();
      }, playbackSpeed);
    }
    return () => clearInterval(simTimer);
  }, [isPlaying, playbackSpeed, nextStep]);

  // --- GLOBAL KEYBOARD SHORTCUTS ENGINE ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      if (activeTag === 'textarea' || activeTag === 'input') return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        nextStep();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        prevStep();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        resetExecution();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, nextStep, prevStep, resetExecution]);

  // Code Highlighting Token Matrix Line Parser
  const lines = code.split('\n');
  const currentLineNum = currentStep ? currentStep.lineNum : 1;
  const parsedLines = lines.map((lineText, index) => {
    const lineNum = index + 1;
    return {
      lineNum,
      text: lineText,
      highlight: lineNum === currentLineNum,
      isAction: lineText.trim().includes('visualize_flow') || lineText.trim().startsWith('print')
    };
  });

  return (
    <AppShell>
      <div className="flex flex-col h-screen bg-[#0F172A] text-[#F8FAFC] font-mono text-sm overflow-hidden select-none">
        
        {feedback && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#1E293B] border border-blue-500/40 text-slate-100 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 font-sans text-xs">
            <CheckCircle2 className="text-emerald-400 w-5 h-5" />
            <div className="text-sm font-medium">{feedback}</div>
          </div>
        )}

        {/* Toolbar Bar Ribbon Header Container */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-800 bg-[#0F172A] shrink-0 text-left">
          <div className="flex items-center gap-2.5 text-[#94A3B8] text-xs font-medium">
            <Folder className="w-4.5 h-4.5 text-blue-400 flex-shrink-0" />
            <span className="hover:text-white cursor-pointer font-sans">workspace</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
            <span className="text-slate-200 font-semibold font-mono">debugger_thread.{language === 'javascript' || language === 'typescript' ? 'ts' : language === 'python' ? 'py' : language === 'go' ? 'go' : 'cpp'}</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                togglePlay();
                triggerFeedback(isPlaying ? "Autoplay paused." : "Tracing step graph synchronized.");
              }}
              className="px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:opacity-95 text-white rounded-lg flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all shadow-md font-sans active:scale-95"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Engine' : 'Run Thread'}</span>
            </button>
            <button 
              onClick={() => {
                runCode();
              }}
              className="px-4 py-2 border border-slate-850 hover:border-blue-500/40 hover:bg-slate-800 text-slate-200 rounded-lg flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all font-sans"
            >
              <Bug className="w-3.5 h-3.5 text-blue-400" />
              <span>Compile & Reset</span>
            </button>
          </div>
        </div>

        {/* Workspace Splitting main dashboard body structures frame layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-grow overflow-hidden items-stretch">
          
          {/* Left Block Side Window Workspace Screen panel */}
          <div className="lg:col-span-6 border-r border-slate-800 bg-[#0F172A] flex flex-col p-6 overflow-y-auto text-left gap-4">
            
            {/* Language & Template Selection panel */}
            <LanguageSelector />

            <div className="space-y-2 flex flex-col shrink-0">
              <label className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-widest flex items-center gap-1.5 font-sans">
                <Code className="w-4 h-4 text-blue-400" />
                <span>Interactive Program Source Code</span>
              </label>
              <textarea
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                className="w-full h-44 bg-[#0A0F1D] border border-slate-800 rounded-xl p-4 text-xs font-mono text-emerald-400 placeholder-slate-700 focus:outline-none focus:border-blue-500/60 leading-relaxed resize-none transition-colors shadow-inner"
                placeholder="# Enter assignments (x = 5), math (y = x + 2), print(y), loop ranges or conditional steps..."
              />
            </div>

            {/* Code Highlight listing rows tracking matrix panel content */}
            <div className="space-y-1.5 bg-[#0A0F1D]/60 border border-slate-800/40 p-4 rounded-xl flex-grow overflow-y-auto select-none">
              <p className="text-[9px] text-[#94A3B8]/60 tracking-widest uppercase font-bold mb-3 font-sans">Live Highlighting Token Matrix</p>
              {parsedLines.map((line) => (
                <div 
                  key={line.lineNum} 
                  className={`flex items-start py-0.5 px-3 rounded-md transition-all duration-300 ${
                    line.highlight ? 'bg-blue-950/40 border-l-4 border-blue-500 -ml-2 pl-2 font-bold text-white' : 'text-slate-400'
                  }`}
                >
                  <span className="text-slate-600 select-none w-5 mr-6 text-right text-xs font-mono">{line.lineNum}</span>
                  <span className={`font-mono text-xs sm:text-[13px] whitespace-pre ${line.highlight ? 'text-white' : line.isAction ? 'text-cyan-400' : 'text-slate-350'}`}>
                    {line.text || " "}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block Side Window: HIGH FIDELITY DYNAMIC TREE & PLAYBACK VISUALIZER */}
          <div className="lg:col-span-6 bg-[#0A0F1D]/30 flex flex-col justify-between overflow-hidden text-left">
            
            {/* Visualizer Canvas, Scrubber & Memory State columns */}
            <div className="p-6 space-y-4 flex flex-col flex-grow overflow-y-auto">
              
              {/* Node Relationships Tree Map */}
              <ErrorBoundary fallbackTitle="Visualizer Canvas Error" onReset={resetExecution}>
                <VisualizationCanvas />
              </ErrorBoundary>

              {/* Scrubber Playback Controls */}
              <ErrorBoundary fallbackTitle="Playback Controls Error">
                <PlaybackControls />
              </ErrorBoundary>

              {/* Stack & Heap Telemetry */}
              <ErrorBoundary fallbackTitle="Memory Telemetry Error">
                <MemoryVisualizer />
              </ErrorBoundary>

            </div>

            {/* Bottom Panel Console Status Logger Feedback */}
            <div className="bg-[#0F172A] flex-col flex h-[130px] shrink-0 border-t border-slate-800">
              <div className="flex border-b border-slate-800">
                <span className="px-5 py-3.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-950/10 border-b-2 border-blue-500 font-sans">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  Terminal Stdout Console output
                </span>
              </div>

              <div className="p-5 flex-grow overflow-y-auto font-mono text-xs text-emerald-400/90 leading-normal whitespace-pre">
                {currentStep?.stdout || "[Execution ready. Run thread or step next to print telemetry output.]"}
              </div>
            </div>

          </div>
        </div>

      </div>
    </AppShell>
  );
}
