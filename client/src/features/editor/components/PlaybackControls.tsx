import { useExecutionStore } from '../store/useExecutionStore';
import { Play, Pause, ArrowLeft, ArrowRight, RotateCcw, FastForward } from 'lucide-react';

export default function PlaybackControls() {
  const {
    timeline,
    currentStepIndex,
    isPlaying,
    playbackSpeed,
    nextStep,
    prevStep,
    goToStep,
    togglePlay,
    setPlaybackSpeed,
    resetExecution
  } = useExecutionStore();

  const currentStep = timeline[currentStepIndex];

  return (
    <div className="bg-[#1E293B] border border-slate-800 p-4 rounded-xl flex flex-col gap-4 shrink-0 font-sans">
      
      {/* 1. Playback controls buttons and speed selector row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={resetExecution}
            disabled={timeline.length <= 1}
            className="p-2 border border-slate-700 hover:border-blue-500/40 hover:bg-slate-800 text-[#94A3B8] hover:text-white rounded-lg transition-all disabled:opacity-30 disabled:pointer-events-none"
            title="Restart Execution"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <button
            onClick={prevStep}
            disabled={currentStepIndex === 0}
            className="p-2 border border-slate-700 hover:border-blue-500/40 hover:bg-slate-800 text-[#94A3B8] hover:text-white rounded-lg transition-all disabled:opacity-30 disabled:pointer-events-none"
            title="Step Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            disabled={timeline.length <= 1}
            className="px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:opacity-95 text-white rounded-lg flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 disabled:opacity-55"
            title={isPlaying ? "Pause Autoplay" : "Play Autoplay"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            onClick={nextStep}
            disabled={currentStepIndex === timeline.length - 1}
            className="p-2 border border-slate-700 hover:border-blue-500/40 hover:bg-slate-800 text-[#94A3B8] hover:text-white rounded-lg transition-all disabled:opacity-30 disabled:pointer-events-none"
            title="Step Forward"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => goToStep(timeline.length - 1)}
            disabled={currentStepIndex === timeline.length - 1}
            className="p-2 border border-slate-700 hover:border-blue-500/40 hover:bg-slate-800 text-[#94A3B8] hover:text-white rounded-lg transition-all disabled:opacity-30 disabled:pointer-events-none"
            title="Skip to End"
          >
            <FastForward className="w-4 h-4" />
          </button>
        </div>

        {/* Center/Right: Step Counter & Playback Speed selector */}
        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-start">
          <div className="text-xs font-mono text-[#94A3B8]">
            Step <span className="text-[#F8FAFC] font-bold">{currentStepIndex + 1}</span> of <span className="text-[#F8FAFC] font-bold">{timeline.length}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Speed:</span>
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              className="bg-[#0F172A] border border-slate-800 rounded-lg text-slate-350 text-xs py-1.5 px-2.5 outline-none focus:border-blue-500/50 cursor-pointer"
            >
              <option value="2000">0.5x (Slow)</option>
              <option value="1500">1.0x (Normal)</option>
              <option value="800">2.0x (Fast)</option>
              <option value="400">4.0x (Hyper)</option>
            </select>
          </div>
        </div>

      </div>

      {/* 2. Timeline slider scrubber track */}
      <div className="flex items-center gap-3">
        <input
          type="range"
          min="0"
          max={timeline.length - 1}
          value={currentStepIndex}
          onChange={(e) => goToStep(Number(e.target.value))}
          className="w-full h-1.5 bg-[#0F172A] rounded-lg appearance-none cursor-pointer accent-blue-500 outline-none"
          style={{
            background: `linear-gradient(to right, #2563EB 0%, #2563EB ${(currentStepIndex / (timeline.length - 1 || 1)) * 100}%, #0F172A ${(currentStepIndex / (timeline.length - 1 || 1)) * 100}%, #0F172A 100%)`
          }}
        />
      </div>

      {/* 3. Explanation logger snippet */}
      {currentStep && (
        <div className="bg-[#0F172A] border border-slate-800/40 p-3 rounded-lg text-left font-mono text-xs text-slate-300 leading-normal flex items-start gap-2.5">
          <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded shrink-0">
            Explain
          </span>
          <span className="text-[#F8FAFC]">{currentStep.explanation}</span>
        </div>
      )}

    </div>
  );
}
