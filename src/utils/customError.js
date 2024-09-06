class CustomError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational; // Determines if it's a controlled error or a crash.
  }
}

// Extend the CustomError for common cases
class BadRequestError extends CustomError {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

class NotFoundError extends CustomError {
  constructor(message = "Not Found") {
    super(404, message);
  }
}

class InternalServerError extends CustomError {
  constructor(message = "Internal Server Error") {
    super(500, message, false); // Operational is false, as it’s an internal server error.
  }
}

module.exports = {
  CustomError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  InternalServerError,
};
