import { create } from 'zustand';
import { generateExecutionTimeline, ExecutionStep } from '../services/codeInterpreter';

const INITIAL_PYTHON_MOCK = `# Paste any operational lines here to see a true visual step tree!
speed = 120
complexity = 45

total_overhead = speed + complexity
visualize_flow(total_overhead)

a = 15
b = 30
result = a * b
for i in range(3):
    result = result + i
print(result)`;

interface ExecutionState {
  code: string;
  timeline: ExecutionStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  playbackSpeed: number;
  editorZoomScale: number;
  feedback: string | null;
  
  // Actions
  setCode: (code: string) => void;
  runCode: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  togglePlay: () => void;
  setPlaybackSpeed: (speed: number) => void;
  setZoomScale: (scale: number) => void;
  triggerFeedback: (msg: string) => void;
  resetExecution: () => void;
}

export const useExecutionStore = create<ExecutionState>((set, get) => {
  let feedbackTimeout: any = null;

  return {
    code: INITIAL_PYTHON_MOCK,
    timeline: generateExecutionTimeline(INITIAL_PYTHON_MOCK),
    currentStepIndex: 0,
    isPlaying: false,
    playbackSpeed: 1500,
    editorZoomScale: 1,
    feedback: null,

    setCode: (code) => {
      set({ code });
      // Regenerate timeline on code changes, resetting playhead
      const timeline = generateExecutionTimeline(code);
      set({ timeline, currentStepIndex: 0, isPlaying: false });
    },

    runCode: () => {
      const { code } = get();
      const timeline = generateExecutionTimeline(code);
      set({ 
        timeline, 
        currentStepIndex: 0, 
        isPlaying: false,
        feedback: "Compiled code thread. Execution timeline ready."
      });

      if (feedbackTimeout) clearTimeout(feedbackTimeout);
      feedbackTimeout = setTimeout(() => set({ feedback: null }), 3000);
    },

    nextStep: () => {
      const { currentStepIndex, timeline } = get();
      if (currentStepIndex < timeline.length - 1) {
        set({ currentStepIndex: currentStepIndex + 1 });
      } else {
        // Loop back or stop autoplay
        set({ isPlaying: false });
      }
    },

    prevStep: () => {
      const { currentStepIndex } = get();
      if (currentStepIndex > 0) {
        set({ currentStepIndex: currentStepIndex - 1 });
      }
    },

    goToStep: (index) => {
      const { timeline } = get();
      const clamped = Math.max(0, Math.min(index, timeline.length - 1));
      set({ currentStepIndex: clamped });
    },

    togglePlay: () => {
      const { isPlaying, currentStepIndex, timeline } = get();
      
      // If we are at the end, restart from step 0 when playing
      if (!isPlaying && currentStepIndex === timeline.length - 1) {
        set({ currentStepIndex: 0 });
      }

      set({ isPlaying: !isPlaying });
    },

    setPlaybackSpeed: (playbackSpeed) => set({ playbackSpeed }),
    setZoomScale: (editorZoomScale) => set({ editorZoomScale }),
    
    triggerFeedback: (msg) => {
      set({ feedback: msg });
      if (feedbackTimeout) clearTimeout(feedbackTimeout);
      feedbackTimeout = setTimeout(() => set({ feedback: null }), 3000);
    },

    resetExecution: () => {
      set({ currentStepIndex: 0, isPlaying: false });
    }
  };
});
