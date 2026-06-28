import { useEffect } from 'react';
import { AppShell } from '../../components/SideNav';
import { useExecutionStore } from './store/useExecutionStore';
import { 
  Folder, 
  ChevronRight, 
  Play, 
  Pause,
  Bug, 
  Sparkles, 
  Cpu, 
  Terminal,
  CheckCircle2,
  Code
} from 'lucide-react';
import VisualizationCanvas from './components/VisualizationCanvas';
import PlaybackControls from './components/PlaybackControls';
import MemoryVisualizer from './components/MemoryVisualizer';

export default function EditorPage() {
  const {
    code,
    timeline,
    currentStepIndex,
    isPlaying,
    playbackSpeed,
    feedback,
    setCode,
    runCode,
    nextStep,
    togglePlay,
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
            <span className="text-slate-200 font-semibold font-mono">live_compiler.py</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                togglePlay();
                triggerFeedback(isPlaying ? "Autoplay paused." : "Tracing step graph synchronized.");
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all shadow-md font-sans active:scale-95"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Engine' : 'Run Thread'}</span>
            </button>
            <button 
              onClick={() => {
                runCode();
              }}
              className="px-4 py-2 border border-white/10 hover:border-violet-500/40 hover:bg-violet-950/25 text-slate-200 rounded-lg flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all font-sans"
            >
              <Bug className="w-3.5 h-3.5 text-violet-400" />
              <span>Compile & Reset</span>
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
                <span>Interactive Program Source Code</span>
              </label>
              <textarea
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                className="w-full h-44 bg-[#040309] border border-white/10 rounded-xl p-4 text-xs font-mono text-emerald-400 placeholder-slate-700 focus:outline-none focus:border-purple-500/60 leading-relaxed resize-none transition-colors shadow-inner"
                placeholder="# Enter assignments (x = 5), math (y = x + 2), print(y), loop ranges or conditional steps..."
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

          {/* Right Block Side Window: HIGH FIDELITY DYNAMIC TREE & PLAYBACK VISUALIZER */}
          <div className="lg:col-span-6 bg-[#0a0914] flex flex-col justify-between overflow-hidden text-left">
            
            {/* Visualizer Canvas, Scrubber & Memory State columns */}
            <div className="p-6 space-y-4 flex flex-col flex-grow overflow-y-auto">
              
              {/* Node Relationships Tree Map */}
              <VisualizationCanvas />

              {/* Scrubber Playback Controls */}
              <PlaybackControls />

              {/* Stack & Heap Telemetry */}
              <MemoryVisualizer />

            </div>

            {/* Bottom Panel Console Status Logger Feedback */}
            <div className="bg-[#08070f] flex-col flex h-[130px] shrink-0 border-t border-white/[0.04]">
              <div className="flex border-b border-white/[0.04]">
                <span className="px-5 py-3.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-300 bg-violet-950/10 border-b-2 border-purple-500 font-sans">
                  <Terminal className="w-4 h-4 text-purple-400" />
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