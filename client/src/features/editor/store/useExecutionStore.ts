import { create } from 'zustand';
import { generateExecutionTimeline, ExecutionStep, CODE_TEMPLATES } from '../services/codeInterpreter';

interface ExecutionState {
  code: string;
  language: string;
  templateId: string;
  timeline: ExecutionStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  playbackSpeed: number;
  editorZoomScale: number;
  feedback: string | null;
  
  // Actions
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  setTemplate: (templateId: string) => void;
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

const DEFAULT_LANG = 'python';
const DEFAULT_TEMPLATE = 'binary_search';
const INITIAL_CODE = CODE_TEMPLATES[DEFAULT_TEMPLATE][DEFAULT_LANG];

export const useExecutionStore = create<ExecutionState>((set, get) => {
  let feedbackTimeout: any = null;

  return {
    code: INITIAL_CODE,
    language: DEFAULT_LANG,
    templateId: DEFAULT_TEMPLATE,
    timeline: generateExecutionTimeline(INITIAL_CODE, DEFAULT_LANG, DEFAULT_TEMPLATE),
    currentStepIndex: 0,
    isPlaying: false,
    playbackSpeed: 1500,
    editorZoomScale: 1,
    feedback: null,

    setCode: (code) => {
      const { language, templateId } = get();
      set({ code });
      const timeline = generateExecutionTimeline(code, language, templateId);
      set({ timeline, currentStepIndex: 0, isPlaying: false });
    },

    setLanguage: (language) => {
      const { templateId } = get();
      const code = CODE_TEMPLATES[templateId][language] || CODE_TEMPLATES[templateId]['python'] || "";
      set({ language, code });
      const timeline = generateExecutionTimeline(code, language, templateId);
      set({ timeline, currentStepIndex: 0, isPlaying: false });
    },

    setTemplate: (templateId) => {
      const { language } = get();
      const code = CODE_TEMPLATES[templateId][language] || CODE_TEMPLATES[templateId]['python'] || "";
      set({ templateId, code });
      const timeline = generateExecutionTimeline(code, language, templateId);
      set({ timeline, currentStepIndex: 0, isPlaying: false });
    },

    runCode: () => {
      const { code, language, templateId } = get();
      const timeline = generateExecutionTimeline(code, language, templateId);
      set({ 
        timeline, 
        currentStepIndex: 0, 
        isPlaying: false,
        feedback: "Compiled code execution thread successfully."
      });

      if (feedbackTimeout) clearTimeout(feedbackTimeout);
      feedbackTimeout = setTimeout(() => set({ feedback: null }), 3000);
    },

    nextStep: () => {
      const { currentStepIndex, timeline } = get();
      if (currentStepIndex < timeline.length - 1) {
        set({ currentStepIndex: currentStepIndex + 1 });
      } else {
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
