const errorHandler = require('../src/middleware/errorHandler'); 
const { CustomError } = require('../src/utils/customError');

describe('errorHandler', () => {
  let req, res, next;

  beforeEach(() => {
    req = {}; // Mock request object
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    next = jest.fn();
  });

  test('should handle known CustomError', () => {
    const customError = new CustomError('Custom error message', 400);

    errorHandler(customError, req, res, next);

    expect(res.status).toHaveBeenCalledWith('Custom error message');
  });

  test('should handle unexpected errors in production', () => {
    process.env.NODE_ENV = 'production';
    const unexpectedError = new Error('Unexpected error message');

    errorHandler(unexpectedError, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test('should handle unexpected errors not in production', () => {
    process.env.NODE_ENV = 'development';
    const unexpectedError = new Error('Unexpected error message');

    // Mock console.error
    console.error = jest.fn();

    errorHandler(unexpectedError, req, res, next);

    expect(console.error).toHaveBeenCalledWith('Unexpected error:', unexpectedError);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: '500',
      message: 'Unexpected error message',
    });
  });
});
