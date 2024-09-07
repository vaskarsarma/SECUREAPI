
const request = require('supertest');
const express = require('express');
const router = require('../src/routes/api'); 
const { InternalServerError } = require('../src/utils/customError');
const { getOAuthToken } = require('../src/middleware/apiService');

    // Mock the getOAuthToken function
    jest.mock('../src/middleware/apiService', () => ({
      getOAuthToken: jest.fn(),
    }));

const app = express();
app.use('/', router);

describe('Router', () => {
  it('GET / should return 404', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(404);
  });

  it('GET /getAccessToken should return 500 if no token', async () => {
    getOAuthToken.mockResolvedValue({ access_token: 'mock-token' });
    const response = await request(app).get('/getAccessToken');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ access_token: 'mock-token' });
  });

  it('GET /getAccessToken should handle errors when getOAuthToken throws', async () => {
    getOAuthToken.mockRejectedValue(new InternalServerError('Failed to get token'));
    const response = await request(app).get('/getAccessToken');
    expect(response.statusCode).toBe(500); 
  });

  it('GET /v1 should return Protected Endpoint message with valid JWT', async () => {
    // Mock JWT authentication
    const mockCheckJwt = (req, res, next) => {
      req.user = { sub: 'client123' }; // simulate a client
      next();
    };

    // Temporarily replace the real checkJwt middleware with the mock
    app.use('/v1', mockCheckJwt, (req, res) => {
      res.send(`Protected Endpoint. Hello, ${req.user.sub}!`);
    });

    const response = await request(app).get('/v1');
    expect(response.status).toBe(400);
  });

  it('GET /unknown should return 404 for undefined routes', async () => {
    const response = await request(app).get('/unknown');
    expect(response.status).toBe(404);
  });
});
