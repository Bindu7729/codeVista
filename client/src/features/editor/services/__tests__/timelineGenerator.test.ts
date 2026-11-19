import { describe, it, expect } from 'vitest';
import { generateExecutionTimeline, CODE_TEMPLATES } from '../codeInterpreter';

describe('generateExecutionTimeline', () => {
  describe('Binary Search Simulation', () => {
    it('executes python binary search template finding target 45 at index 3', () => {
      const code = CODE_TEMPLATES.binary_search.python;
      const timeline = generateExecutionTimeline(code, 'python', 'binary_search');

      expect(timeline.length).toBeGreaterThan(5);

      // Verify initial array initialization step
      const firstStep = timeline[0];
      expect(firstStep.variables).toHaveProperty('arr');
      expect(firstStep.variables.arr).toEqual([12, 24, 32, 45, 57, 68, 79, 90]);

      // Verify stdout in final step contains success message
      const finalStep = timeline[timeline.length - 1];
      expect(finalStep.stdout).toContain('Target found at index 3');

      // Verify widgetData array exists with pointers
      const stepWithMid = timeline.find(s => s.variables.mid !== undefined);
      expect(stepWithMid).toBeDefined();
      expect(stepWithMid?.widgetData?.type).toBe('array');
      expect(stepWithMid?.widgetData?.pointers).toHaveProperty('mid');
    });

    it('executes javascript binary search template correctly', () => {
      const code = CODE_TEMPLATES.binary_search.javascript;
      const timeline = generateExecutionTimeline(code, 'javascript', 'binary_search');

      expect(timeline.length).toBeGreaterThan(5);
      const finalStep = timeline[timeline.length - 1];
      expect(finalStep.stdout).toContain('Target found at index 3');
    });
  });

  describe('Bubble Sort Simulation', () => {
    it('executes python bubble sort and sorts the array in-place', () => {
      const code = CODE_TEMPLATES.bubble_sort.python;
      const timeline = generateExecutionTimeline(code, 'python', 'bubble_sort');

      expect(timeline.length).toBeGreaterThan(10);

      // Final step should have sorted array
      const finalStep = timeline[timeline.length - 1];
      expect(finalStep.variables.arr).toEqual([12, 24, 32, 45, 57, 90]);
    });

    it('executes javascript bubble sort with for-loops', () => {
      const code = CODE_TEMPLATES.bubble_sort.javascript;
      const timeline = generateExecutionTimeline(code, 'javascript', 'bubble_sort');

      expect(timeline.length).toBeGreaterThan(10);
      const finalStep = timeline[timeline.length - 1];
      expect(finalStep.variables.arr).toEqual([12, 24, 32, 45, 57, 90]);
    });
  });

  describe('Linked List Simulation', () => {
    it('chains Node objects and tracks heap references', () => {
      const code = CODE_TEMPLATES.linked_list.python;
      const timeline = generateExecutionTimeline(code, 'python', 'linked_list');

      expect(timeline.length).toBeGreaterThan(3);

      const finalStep = timeline[timeline.length - 1];
      expect(finalStep.widgetData?.type).toBe('linkedlist');
      expect(finalStep.widgetData?.nodes?.length).toBe(3);
      expect(finalStep.widgetData?.edges?.length).toBe(2);

      // Verify heap mapping
      expect(finalStep.heap.length).toBeGreaterThan(0);
      expect(finalStep.stack.some(s => s.name === 'head')).toBe(true);
    });
  });

  describe('Binary Search Tree Simulation', () => {
    it('creates BST nodes with left and right children and tree widget data', () => {
      const code = CODE_TEMPLATES.bst_operations.python;
      const timeline = generateExecutionTimeline(code, 'python', 'bst_operations');

      expect(timeline.length).toBeGreaterThan(3);

      const finalStep = timeline[timeline.length - 1];
      expect(finalStep.widgetData?.type).toBe('tree');
      expect(finalStep.widgetData?.nodes?.length).toBe(5);
    });
  });

  describe('Edge Cases & Defensive Handling', () => {
    it('handles empty code string without throwing and returns fallback step', () => {
      const timeline = generateExecutionTimeline('', 'python', 'custom');
      expect(timeline).toHaveLength(1);
      expect(timeline[0].explanation).toBe('Start execution trace timeline.');
    });

    it('handles comment-only files gracefully', () => {
      const code = '# Just a comment\n# Another comment';
      const timeline = generateExecutionTimeline(code, 'python', 'custom');
      expect(timeline).toHaveLength(1);
    });

    it('handles print statements with string concatenation', () => {
      const code = 'x = 10\nprint("Result: " + str(x))';
      const timeline = generateExecutionTimeline(code, 'python', 'custom');
      const lastStep = timeline[timeline.length - 1];
      expect(lastStep.stdout).toContain('Result: 10');
    });
  });
});
