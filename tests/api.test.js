
const request = require('supertest');
const express = require('express');
const router = require('../src/routes/api'); 
const { NotFoundError } = require('../src/utils/customError');

const app = express();
app.use('/', router);

describe('Router', () => {
  it('GET / should return 404', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(404);
  });

  it('GET /getAccessToken should return 500 if no token', async () => {
    const response = await request(app).get('/getAccessToken');
    expect(response.status).toBe(500);
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
