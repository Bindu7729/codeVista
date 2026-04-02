import { describe, it, expect } from 'vitest';
import { generateExecutionTimeline, CODE_TEMPLATES } from '../codeInterpreter';

describe('Algorithm Simulation Suite', () => {
  describe('Linear Search Simulation', () => {
    it('executes python linear search finding target at index 3', () => {
      const code = CODE_TEMPLATES.linear_search.python;
      const timeline = generateExecutionTimeline(code, 'python', 'linear_search');

      expect(timeline.length).toBeGreaterThan(3);

      const finalStep = timeline[timeline.length - 1];
      expect(finalStep.stdout).toContain('index 3');
      expect(finalStep.variables.found_idx).toBe(3);
    });

    it('executes javascript linear search finding target at index 3', () => {
      const code = CODE_TEMPLATES.linear_search.javascript;
      const timeline = generateExecutionTimeline(code, 'javascript', 'linear_search');

      expect(timeline.length).toBeGreaterThan(3);

      const finalStep = timeline[timeline.length - 1];
      expect(finalStep.stdout).toContain('index 3');
      expect(finalStep.variables.found_idx).toBe(3);
    });
  });

  describe('Two-Pointer Array Reversal Simulation', () => {
    it('reverses array using python two-pointer while loop', () => {
      const code = CODE_TEMPLATES.two_pointer.python;
      const timeline = generateExecutionTimeline(code, 'python', 'two_pointer');

      expect(timeline.length).toBeGreaterThan(5);

      const stepWithPointers = timeline.find(s => s.variables.left !== undefined && s.variables.right !== undefined);
      expect(stepWithPointers?.variables.left).toBe(0);
      expect(stepWithPointers?.variables.right).toBe(5);

      const finalStep = timeline[timeline.length - 1];
      expect(finalStep.variables.arr).toEqual([6, 5, 4, 3, 2, 1]);
    });

    it('reverses array using javascript two-pointer while loop', () => {
      const code = CODE_TEMPLATES.two_pointer.javascript;
      const timeline = generateExecutionTimeline(code, 'javascript', 'two_pointer');

      expect(timeline.length).toBeGreaterThan(5);

      const stepWithPointers = timeline.find(s => s.variables.left !== undefined && s.variables.right !== undefined);
      expect(stepWithPointers?.variables.left).toBe(0);
      expect(stepWithPointers?.variables.right).toBe(5);

      const finalStep = timeline[timeline.length - 1];
      expect(finalStep.variables.arr).toEqual([6, 5, 4, 3, 2, 1]);
    });
  });

  describe('Selection Sort Simulation', () => {
    it('sorts array in ascending order via python selection sort', () => {
      const code = CODE_TEMPLATES.selection_sort.python;
      const timeline = generateExecutionTimeline(code, 'python', 'selection_sort');

      expect(timeline.length).toBeGreaterThan(10);
      const finalStep = timeline[timeline.length - 1];
      expect(finalStep.variables.arr).toEqual([11, 12, 22, 25, 64]);
    });
  });

  describe('Stack and Queue Operations Simulation', () => {
    it('handles push and pop operations on stack', () => {
      const code = CODE_TEMPLATES.stack_ops.javascript;
      const timeline = generateExecutionTimeline(code, 'javascript', 'stack_ops');

      expect(timeline.length).toBeGreaterThan(3);
      const finalStep = timeline[timeline.length - 1];
      expect(finalStep.variables.stack).toEqual([10, 20]);
      expect(finalStep.widgetData?.type).toBe('stack');
    });

    it('handles enqueue and dequeue operations on queue', () => {
      const code = CODE_TEMPLATES.queue_ops.javascript;
      const timeline = generateExecutionTimeline(code, 'javascript', 'queue_ops');

      expect(timeline.length).toBeGreaterThan(3);
      const finalStep = timeline[timeline.length - 1];
      expect(finalStep.variables.queue).toEqual([200, 300]);
      expect(finalStep.widgetData?.type).toBe('queue');
    });
  });
});
