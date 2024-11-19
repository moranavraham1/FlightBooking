const request = require('supertest');

describe('GET /api/flights', () => {
  it('should return a list of available flights', async () => {
    // Simulate the request to the route on the actual server
    const response = await request('http://localhost:3000').get('/api/flights');

    // Assertions to verify the response
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0); // Ensures there is at least one flight
  });
});
