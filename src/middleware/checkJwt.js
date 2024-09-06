const jwt = require("jsonwebtoken");
const jwksRsa = require("jwks-rsa");
const { auth0Domain, audience, issuer } = require("../config/config");
const { BadRequestError, UnauthorizedError } = require("../utils/customError");
const util = require("util");

const client = jwksRsa({
  jwksUri: `https://${auth0Domain}/.well-known/jwks.json`,
  cache: true,
  cacheMaxEntries: 5,
  cacheMaxAge: 600000, // 10 minutes
});

const getKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      return callback(err);
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
};

// Use promisify to convert jwt.verify to return a promise
const verifyJwt = util.promisify(jwt.verify);

const checkJwt = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new BadRequestError("Authorization header missing");
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      throw new BadRequestError("Token not available");
    }

    // Verify the JWT token
    const decoded = await verifyJwt(token, getKey, {
      audience,
      issuer,
      algorithms: ["RS256"],
    });

    req.user = decoded;
    next();
  } catch (err) {
    // Log the error for internal tracking
    console.error("Token verification failed:", err.message);

    // Check if the token has expired
    if (err instanceof jwt.TokenExpiredError) {
      return next(new UnauthorizedError("Token has expired"));
    }

    // Check if the token is malformed
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new UnauthorizedError("Invalid Token"));
    }

    // Pass any other BadRequestError or unknown errors to the next middleware
    if (err instanceof BadRequestError) {
      return next(err);
    }

    // Default to "Invalid Token" for any other errors
    return next(new UnauthorizedError("Invalid Token"));
  }
};

module.exports = checkJwt;
