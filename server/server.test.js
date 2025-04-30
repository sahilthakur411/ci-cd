// Simple test for server health check endpoint
const request = require('supertest');
const app = require('./server');

describe('Server API', () => {
  it('Health check endpoint should return status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
}); 