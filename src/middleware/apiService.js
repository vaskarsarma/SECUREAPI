const axios = require("axios");
const {
  issuer,
  client_id,
  client_secret,
  audience,
  api_timeout, // in milliseconds
} = require("../config/config");

// API Url to generate the Authorization Token
const apiUrl = `${issuer}oauth/token`;
const {
  TimeOutError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  InternalServerError,
  ForbiddenError,
} = require("../utils/customError");

/**
 * Makes a POST request to the OAuth token API.
 * @returns {Promise<Object>} - The response data from the API.
 */
const getOAuthToken = async () => {
  try {
    // Prepare the request body for the POST request
    const requestBody = {
      client_id: client_id, // M2M client ID
      client_secret: client_secret, // M2M client secret
      audience: audience, // the appropriate audience
      grant_type: "client_credentials",
    };

    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: api_timeout, // in milliseconds
    });

    return response.data;
  } catch (ex) {
    /* istanbul ignore next */
    if (ex.response) {
      // Axios response errors
      const { status, data } = ex.response;
      if (status === 400) {
        throw new BadRequestError(
          `Bad Request: ${data.message || "Invalid request"}`,
        );
      }
      if (status === 401) {
        throw new UnauthorizedError(
          `Unauthorized: ${data.message || "Authentication failed"}`,
        );
      }
      if (status === 403) {
        throw new ForbiddenError(
          `Forbidden: ${data.message || "Access Denied to API or Invalid AUDIENCE"}`,
        );
      }
      if (status === 404) {
        throw new NotFoundError(
          `Bad Request: ${data.message || "Invalid Auth0 Domain or AUDIENCE"}`,
        );
      }
      if (status === 408) {
        throw new TimeOutError(
          `Request Timeout: ${data.message || "Request timed out"}`,
        );
      }
      if (status >= 500) {
        throw new InternalServerError(
          `Server Error: ${data.message || "Internal server error"}`,
        );
      }
    } else if (ex.code === "ECONNABORTED") {
      // Timeout error
      throw new TimeOutError(
        `Unexpected Error: ${ex.message || "Network Error"}`,
      );
    } else {
      // Other errors
      throw new InternalServerError(
        `Unexpected Error: ${ex.message || "An unexpected error occurred"}`,
      );
    }
  }
};

module.exports = {
  getOAuthToken,
};
