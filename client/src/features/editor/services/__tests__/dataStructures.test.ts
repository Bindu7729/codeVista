import { describe, it, expect } from 'vitest';
import { buildTreeStructure, buildListStructure } from '../codeInterpreter';

describe('Data Structure Layout Generators', () => {
  describe('buildTreeStructure', () => {
    it('returns empty nodes and edges for empty or undefined object', () => {
      const nodes: any[] = [];
      const edges: any[] = [];
      buildTreeStructure(null, 170, 25, 70, nodes, edges);
      expect(nodes).toHaveLength(0);
      expect(edges).toHaveLength(0);
    });

    it('creates single root node without edges for solitary node', () => {
      const root = { val: 40 };
      const nodes: any[] = [];
      const edges: any[] = [];
      buildTreeStructure(root, 170, 25, 70, nodes, edges);
      expect(nodes).toHaveLength(1);
      expect(nodes[0]).toEqual({ id: 'node_0', val: 40, x: 170, y: 25 });
      expect(edges).toHaveLength(0);
    });

    it('generates binary tree nodes with left and right child coordinates and directional edges', () => {
      const root = {
        val: 40,
        left: { val: 20 },
        right: { val: 60 }
      };
      const nodes: any[] = [];
      const edges: any[] = [];
      buildTreeStructure(root, 170, 25, 70, nodes, edges);

      expect(nodes).toHaveLength(3);
      expect(edges).toHaveLength(2);

      // Root
      expect(nodes[0]).toEqual({ id: 'node_0', val: 40, x: 170, y: 25 });
      // Left child
      expect(nodes[1]).toEqual({ id: 'node_1', val: 20, x: 100, y: 70 });
      // Right child
      expect(nodes[2]).toEqual({ id: 'node_2', val: 60, x: 240, y: 70 });

      // Edges
      expect(edges).toContainEqual({ from: 'node_0', to: 'node_1' });
      expect(edges).toContainEqual({ from: 'node_0', to: 'node_2' });
    });
  });

  describe('buildListStructure', () => {
    it('returns empty nodes and edges for null object', () => {
      const nodes: any[] = [];
      const edges: any[] = [];
      buildListStructure(null, 50, 70, nodes, edges);
      expect(nodes).toHaveLength(0);
      expect(edges).toHaveLength(0);
    });

    it('creates linear chain with horizontal offsets and edges', () => {
      const list = {
        val: 10,
        next: {
          val: 20,
          next: {
            val: 30,
            next: null
          }
        }
      };
      const nodes: any[] = [];
      const edges: any[] = [];
      buildListStructure(list, 50, 70, nodes, edges);

      expect(nodes).toHaveLength(3);
      expect(edges).toHaveLength(2);

      expect(nodes[0]).toEqual({ id: 'node_0', val: 10, x: 50, y: 70 });
      expect(nodes[1]).toEqual({ id: 'node_1', val: 20, x: 170, y: 70 });
      expect(nodes[2]).toEqual({ id: 'node_2', val: 30, x: 290, y: 70 });

      expect(edges[0]).toEqual({ from: 'node_0', to: 'node_1' });
      expect(edges[1]).toEqual({ from: 'node_1', to: 'node_2' });
    });
  });
});
