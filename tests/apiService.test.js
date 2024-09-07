const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { getOAuthToken } = require('../src/middleware/apiService');
const {
  TimeOutError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  InternalServerError,
  ForbiddenError,
} = require('../src/utils/customError');

const {
  issuer,
} = require("../src/config/config");

const mock = new MockAdapter(axios);

describe('getOAuthToken', () => {
  const apiUrl = `${issuer}oauth/token`;

  beforeEach(() => {
    mock.reset();
  });

  it('should return data when the API call is successful', async () => {
    const mockData = { access_token: 'mockToken', expires_in: 3600, token_type: 'Bearer', scope: 'read' };
    mock.onPost(apiUrl).reply(200, mockData);

    const data = await getOAuthToken();
    expect(data).toEqual(mockData);
  });

  it('should throw BadRequestError for 400 error', async () => {
    mock.onPost(apiUrl).reply(400, { message: 'Invalid request' });

    await expect(getOAuthToken()).rejects.toThrow(BadRequestError);
  });

  test('should throw UnauthorizedError for 401 error', async () => {
    mock.onPost(apiUrl).reply(401, { message: 'Authentication failed' });

    await expect(getOAuthToken()).rejects.toThrow(UnauthorizedError);
  });

  test('should throw ForbiddenError for 403 error', async () => {
    mock.onPost(apiUrl).reply(403, { message: 'Access Denied' });

    await expect(getOAuthToken()).rejects.toThrow(ForbiddenError);
  });

  test('should throw NotFoundError for 404 error', async () => {
    mock.onPost(apiUrl).reply(404, { message: 'Not Found' });

    await expect(getOAuthToken()).rejects.toThrow(NotFoundError);
  });

  test('should throw TimeOutError for 408 error', async () => {
    mock.onPost(apiUrl).reply(408, { message: 'Request timed out' });

    await expect(getOAuthToken()).rejects.toThrow(TimeOutError);
  });

  test('should throw InternalServerError for 500 error', async () => {
    mock.onPost(apiUrl).reply(500, { message: 'Internal server error' });

    await expect(getOAuthToken()).rejects.toThrow(InternalServerError);
  });

  test('should throw TimeOutError for ECONNABORTED error', async () => {
    mock.onPost(apiUrl).networkErrorOnce();

    await expect(getOAuthToken()).rejects.toThrow(new TimeOutError("Unexpected Error: Network Error"));
  });

  test('should throw InternalServerError for unexpected errors', async () => {
    mock.onPost(apiUrl).reply(200); // Successful response for the purpose of error generation

    jest.spyOn(axios, 'post').mockRejectedValueOnce({ code: 'UNKNOWN_ERROR' });

    await expect(getOAuthToken()).rejects.toThrow(InternalServerError);
  });
});