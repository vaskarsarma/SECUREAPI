const { CustomError } = require("../utils/customError");
const isProduction = process.env.NODE_ENV === "production";

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Check if it's a known error (e.g., custom error)
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      status: `${err.statusCode}`,
      message: err.message,
    });
  }

  //Log the error for internal tracking
  /* istanbul ignore next */
  if (!isProduction) console.error("Unexpected error:", err);

  // Handle unexpected errors without exposing details
  /* istanbul ignore next */
  res.status(500).json({
    status: "500",
    message: isProduction
      ? "Something went wrong, please try again later"
      : err.message,
  });
};

module.exports = errorHandler;
