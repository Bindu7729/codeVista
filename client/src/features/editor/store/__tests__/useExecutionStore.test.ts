import { describe, it, expect, beforeEach } from 'vitest';
import { useExecutionStore } from '../useExecutionStore';

describe('useExecutionStore (Zustand)', () => {
  beforeEach(() => {
    // Reset to defaults before each test
    useExecutionStore.getState().setTemplate('binary_search');
    useExecutionStore.getState().setLanguage('python');
    useExecutionStore.getState().resetExecution();
  });

  it('initializes with default binary search template in Python', () => {
    const state = useExecutionStore.getState();
    expect(state.language).toBe('python');
    expect(state.templateId).toBe('binary_search');
    expect(state.currentStepIndex).toBe(0);
    expect(state.isPlaying).toBe(false);
    expect(state.playbackSpeed).toBe(1500);
    expect(state.timeline.length).toBeGreaterThan(0);
  });

  it('steps forward and backward through timeline', () => {
    const store = useExecutionStore.getState();
    expect(store.currentStepIndex).toBe(0);

    store.nextStep();
    expect(useExecutionStore.getState().currentStepIndex).toBe(1);

    store.nextStep();
    expect(useExecutionStore.getState().currentStepIndex).toBe(2);

    store.prevStep();
    expect(useExecutionStore.getState().currentStepIndex).toBe(1);

    store.prevStep();
    expect(useExecutionStore.getState().currentStepIndex).toBe(0);

    // Cannot step back below 0
    store.prevStep();
    expect(useExecutionStore.getState().currentStepIndex).toBe(0);
  });

  it('clamps goToStep within timeline bounds', () => {
    const store = useExecutionStore.getState();
    const maxIdx = store.timeline.length - 1;

    store.goToStep(3);
    expect(useExecutionStore.getState().currentStepIndex).toBe(3);

    store.goToStep(-10);
    expect(useExecutionStore.getState().currentStepIndex).toBe(0);

    store.goToStep(99999);
    expect(useExecutionStore.getState().currentStepIndex).toBe(maxIdx);
  });

  it('toggles playback state and restarts if at end', () => {
    const store = useExecutionStore.getState();
    expect(store.isPlaying).toBe(false);

    store.togglePlay();
    expect(useExecutionStore.getState().isPlaying).toBe(true);

    store.togglePlay();
    expect(useExecutionStore.getState().isPlaying).toBe(false);

    // If at end, togglePlay jumps to step 0
    store.goToStep(store.timeline.length - 1);
    store.togglePlay();
    expect(useExecutionStore.getState().isPlaying).toBe(true);
    expect(useExecutionStore.getState().currentStepIndex).toBe(0);
  });

  it('updates language and reloads corresponding template code', () => {
    const store = useExecutionStore.getState();
    store.setLanguage('javascript');

    const state = useExecutionStore.getState();
    expect(state.language).toBe('javascript');
    expect(state.code).toContain('Math.floor');
    expect(state.currentStepIndex).toBe(0);
  });

  it('updates template and reloads timeline', () => {
    const store = useExecutionStore.getState();
    store.setTemplate('linked_list');

    const state = useExecutionStore.getState();
    expect(state.templateId).toBe('linked_list');
    expect(state.code).toContain('Node(10)');
    expect(state.currentStepIndex).toBe(0);
  });

  it('updates playback speed and zoom scale', () => {
    const store = useExecutionStore.getState();
    store.setPlaybackSpeed(800);
    expect(useExecutionStore.getState().playbackSpeed).toBe(800);

    store.setZoomScale(1.25);
    expect(useExecutionStore.getState().editorZoomScale).toBe(1.25);
  });
});
