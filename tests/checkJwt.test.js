const jwt = require('jsonwebtoken');
const { UnauthorizedError, BadRequestError } = require('../src/utils/customError');
const checkJwt = require('../src/middleware/checkJwt');

// Mock jwt.verify using Jest
jest.mock('jsonwebtoken');

describe('checkJwt Middleware', () => {

  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  test('should throw BadRequestError if Authorization header is missing', async () => {
    await checkJwt(req, res, next);

    // Verify that next was called with a BadRequestError
    expect(next).toHaveBeenCalledWith(expect.any(BadRequestError));
    expect(next).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Authorization header missing'
    }));
  });

  test('should throw BadRequestError if token is missing from Authorization header', async () => {
    req.headers.authorization = 'Bearer ';
    
    await checkJwt(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(BadRequestError));
    expect(next).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Token not available'
    }));
  });

  test('should throw UnauthorizedError for invalid token', async () => {
    req.headers.authorization = 'Bearer invalidtoken';
    
    jwt.verify.mockImplementation((token, key, options, callback) => {
      callback(new jwt.JsonWebTokenError('jwt malformed'), null);
    });

    await checkJwt(req, res, next);

    // Ensure next is called with UnauthorizedError
    expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
    expect(next).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Invalid Token'
    }));
  });

  test('should call next() with decoded user if token is valid', async () => {
    req.headers.authorization = 'Bearer validtoken';

    const decodedToken = { sub: '1234567890', name: 'John Doe' };

    // Mock jwt.verify to return a valid token
    jwt.verify.mockImplementation((token, key, options, callback) => {
      callback(null, decodedToken);
    });

    await checkJwt(req, res, next);

    // Ensure next was called without an error
    expect(next).toHaveBeenCalledWith();

    // Ensure req.user is populated with the decoded token
    expect(req.user).toEqual(decodedToken);
  });

  test('should throw UnauthorizedError if token is expired', async () => {
    req.headers.authorization = 'Bearer expiredtoken';

    jwt.verify.mockImplementation((token, key, options, callback) => {
      callback(new jwt.TokenExpiredError('jwt expired', new Date()), null);
    });

    await checkJwt(req, res, next);

    // Ensure next is called with an UnauthorizedError
    expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
    expect(next).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Token has expired'
    }));
  });
});
