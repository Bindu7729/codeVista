import { describe, it, expect } from 'vitest';
import { evaluateExpression } from '../codeInterpreter';

describe('evaluateExpression', () => {
  describe('Literal & Primitive Parsing', () => {
    it('evaluates boolean literals in python and js', () => {
      expect(evaluateExpression('true', {}, 'javascript')).toBe(true);
      expect(evaluateExpression('false', {}, 'javascript')).toBe(false);
      expect(evaluateExpression('None', {}, 'python')).toBe(null);
      expect(evaluateExpression('null', {}, 'javascript')).toBe(null);
    });

    it('evaluates string literals with quotes', () => {
      expect(evaluateExpression('"hello world"', {}, 'javascript')).toBe('hello world');
      expect(evaluateExpression("'codevista'", {}, 'python')).toBe('codevista');
    });

    it('evaluates numeric literals', () => {
      expect(evaluateExpression('42', {}, 'python')).toBe(42);
      expect(evaluateExpression('3.14', {}, 'javascript')).toBe(3.14);
    });
  });

  describe('Arithmetic & Math Expressions', () => {
    it('evaluates basic arithmetic', () => {
      expect(evaluateExpression('10 + 20', {}, 'javascript')).toBe(30);
      expect(evaluateExpression('50 - 15', {}, 'python')).toBe(35);
      expect(evaluateExpression('6 * 7', {}, 'javascript')).toBe(42);
      expect(evaluateExpression('100 / 4', {}, 'python')).toBe(25);
    });

    it('handles Python floor division // correctly', () => {
      expect(evaluateExpression('7 // 2', {}, 'python')).toBe(3);
      expect(evaluateExpression('10 // 3', {}, 'python')).toBe(3);
      expect(evaluateExpression('(0 + 7) // 2', {}, 'python')).toBe(3);
    });
  });

  describe('Variable substitution from env', () => {
    it('substitutes integer variables in math expressions', () => {
      const env = { low: 0, high: 7 };
      expect(evaluateExpression('(low + high) // 2', env, 'python')).toBe(3);
    });

    it('indexes arrays from environment', () => {
      const env = { arr: [12, 24, 32, 45, 57], mid: 2 };
      expect(evaluateExpression('arr[mid]', env, 'python')).toBe(32);
      expect(evaluateExpression('arr[0]', env, 'javascript')).toBe(12);
    });

    it('evaluates relational comparisons', () => {
      const env = { guess: 45, target: 45 };
      expect(evaluateExpression('guess == target', env, 'python')).toBe(true);
      expect(evaluateExpression('guess > target', env, 'python')).toBe(false);
    });
  });

  describe('Data structure constructors & collections', () => {
    it('evaluates python/js array literals', () => {
      expect(evaluateExpression('[10, 20, 30]', {}, 'python')).toEqual([10, 20, 30]);
    });

    it('evaluates java array initializer curly braces', () => {
      expect(evaluateExpression('{5, 10, 15}', {}, 'java')).toEqual([5, 10, 15]);
    });

    it('evaluates Node and TreeNode instantiations', () => {
      const node = evaluateExpression('Node(10)', {}, 'python');
      expect(node).toEqual({ val: 10, left: null, right: null, next: null });

      const jsNode = evaluateExpression('new TreeNode(40)', {}, 'javascript');
      expect(jsNode).toEqual({ val: 40, left: null, right: null, next: null });
    });
  });

  describe('Comment & Semicolon Stripping', () => {
    it('strips inline python comments', () => {
      expect(evaluateExpression('10 + 5 # calculate sum', {}, 'python')).toBe(15);
    });

    it('strips inline javascript comments and trailing semicolon', () => {
      expect(evaluateExpression('20 * 2; // calculate product', {}, 'javascript')).toBe(40);
    });
  });
});
