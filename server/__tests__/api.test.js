const request = require('supertest');
const app = require('../app');

describe('CodeVista Server API Endpoints', () => {
  describe('GET /api/trace-status', () => {
    it('returns ONLINE heartbeat and runtime environment list', async () => {
      const res = await request(app).get('/api/trace-status');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('ONLINE');
      expect(res.body.version).toBe('2.1.0-beta');
      expect(Array.isArray(res.body.runtimes)).toBe(true);
      expect(res.body.runtimes).toContain('python');
      expect(res.body.runtimes).toContain('javascript');
    });
  });

  describe('GET /api/snippets', () => {
    it('lists available algorithm snippets catalog', async () => {
      const res = await request(app).get('/api/snippets');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBeGreaterThanOrEqual(4);
      expect(res.body.snippets.some(s => s.id === 'binary_search')).toBe(true);
      expect(res.body.snippets.some(s => s.id === 'bubble_sort')).toBe(true);
    });

    it('returns snippet details for a valid snippet ID', async () => {
      const res = await request(app).get('/api/snippets/binary_search');
      expect(res.statusCode).toBe(200);
      expect(res.body.snippet.title).toBe('Binary Search');
      expect(res.body.snippet.timeComplexity).toBe('O(log n)');
    });

    it('returns 404 error for invalid snippet ID', async () => {
      const res = await request(app).get('/api/snippets/unknown_algorithm');
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toContain('not found');
    });
  });

  describe('POST /api/execute', () => {
    it('rejects empty code buffer with 400', async () => {
      const res = await request(app)
        .post('/api/execute')
        .send({ code: '', language: 'python' });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toContain('empty');
    });

    it('rejects unsupported language runtime with 400', async () => {
      const res = await request(app)
        .post('/api/execute')
        .send({ code: 'x = 10', language: 'ruby' });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toContain('Unsupported language');
    });

    it('simulates variable assignments and records steps', async () => {
      const res = await request(app)
        .post('/api/execute')
        .send({
          code: 'low = 0\nhigh = 10',
          language: 'python',
          templateId: 'binary_search'
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.steps.length).toBeGreaterThanOrEqual(2);
      expect(res.body.steps[1].variables).toHaveProperty('high', 10);
    });

    it('simulates print statement execution', async () => {
      const res = await request(app)
        .post('/api/execute')
        .send({
          code: 'print("Execution completed")',
          language: 'python'
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.steps[0].stdout).toContain('Execution completed');
    });
  });

  describe('Error handling & 404', () => {
    it('returns 404 for unknown endpoints', async () => {
      const res = await request(app).get('/api/invalid-route');
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe('API endpoint not found.');
    });
  });
});
