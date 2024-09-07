const {
  CustomError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  TimeOutError,
  ForbiddenError,
  InternalServerError,
} = require('../src/utils/customError'); 

describe('CustomError Classes', () => {
  test('CustomError should set statusCode and message correctly', () => {
    const error = new CustomError(400, 'Test Error');
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Test Error');
    expect(error.isOperational).toBe(true);
  });

  test('BadRequestError should have statusCode 400 and default message', () => {
    const error = new BadRequestError();
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Bad Request');
    expect(error.isOperational).toBe(true);
  });

  test('UnauthorizedError should have statusCode 401 and default message', () => {
    const error = new UnauthorizedError();
    expect(error.statusCode).toBe(401);
    expect(error.message).toBe('Unauthorized');
    expect(error.isOperational).toBe(true);
  });

  test('NotFoundError should have statusCode 404 and default message', () => {
    const error = new NotFoundError();
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('Not Found');
    expect(error.isOperational).toBe(true);
  });

  test('TimeOutError should have statusCode 408 and default message', () => {
    const error = new TimeOutError();
    expect(error.statusCode).toBe(408);
    expect(error.message).toBe('ECONNABORTED');
    expect(error.isOperational).toBe(true);
  });

  test('ForbiddenError should have statusCode 403 and default message', () => {
    const error = new ForbiddenError();
    expect(error.statusCode).toBe(403);
    expect(error.message).toBe('Forbidden');
    expect(error.isOperational).toBe(true);
  });

  test('InternalServerError should have statusCode 500 and default message', () => {
    const error = new InternalServerError();
    expect(error.statusCode).toBe(500);
    expect(error.message).toBe('Internal Server Error');
    expect(error.isOperational).toBe(false);
  });
});
