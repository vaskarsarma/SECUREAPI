const {
    CustomError,
    BadRequestError,
    UnauthorizedError,
    NotFoundError,
    InternalServerError,
  } = require('../src/utils/customError');
  
  describe('CustomError Classes', () => {
    test('CustomError should correctly initialize properties', () => {
      const error = new CustomError(400, 'Bad Request');
      expect(error).toBeInstanceOf(Error);
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Bad Request');
      expect(error.isOperational).toBe(true);
    });
  
    test('BadRequestError should default to status 400 and appropriate message', () => {
      const error = new BadRequestError();
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Bad Request');
    });
  
    test('UnauthorizedError should default to status 401 and appropriate message', () => {
      const error = new UnauthorizedError();
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('Unauthorized');
    });
  
    test('NotFoundError should default to status 404 and appropriate message', () => {
      const error = new NotFoundError();
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('Not Found');
    });
  
    test('InternalServerError should default to status 500 and have isOperational set to false', () => {
      const error = new InternalServerError();
      expect(error).toBeInstanceOf(CustomError);
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('Internal Server Error');
      expect(error.isOperational).toBe(false);
    });
  });
  