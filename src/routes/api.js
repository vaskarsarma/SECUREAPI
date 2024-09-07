const express = require("express");
const checkJwt = require("../middleware/checkJwt");
const { getOAuthToken } = require("../middleware/apiService");
const { NotFoundError } = require("../utils/customError");

const router = express.Router();

/**
 * @swagger
 * /getAccessToken:
 *   get:
 *     summary: Fetch OAuth Token
 *     description: This endpoint calls an external OAuth token API to fetch an access token and returns it.
 *     tags: [Public Endpoints]
 *     responses:
 *       '200':
 *         description: Successful response with OAuth token data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   description: The access token provided by the OAuth API
 *                   example: "eyJhbGciOiJIUzI1NiIsIn..."
 *                 scope:
 *                   type: string
 *                   description: allowed scope to access the protected API
 *                   example: "read"
 *                 expires_in:
 *                   type: integer
 *                   description: Token expiration time in seconds
 *                   example: 3600
 *                 token_type:
 *                   type: string
 *                   description: Type of the token (e.g., Bearer)
 *                   example: "Bearer"
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '408':
 *         $ref: '#/components/responses/TimeOutError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/getAccessToken", async (req, res, next) => {
  /* istanbul ignore next */
  try {
    // Call the service to get the OAuth token
    const data = await getOAuthToken();

    // Send the response data back to the client
    res.json(data);
  } catch (ex) {
    next(ex);
  }
});

/**
 * @swagger
 * /v1:
 *   get:
 *     summary: Protected Endpoint
 *     description: This endpoint is protected and requires a valid JWT.
 *     tags: [Protected Endpoints]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sub:
 *                   type: string
 *                   example: auth0|1234567890abcdef
 *                 otherProperty:
 *                   type: string
 *                   example: Example value
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/v1", checkJwt, (req, res, next) => {
  /* istanbul ignore next */
  try {
    res.json(req.user);
  } catch (ex) {
    next(ex);
  }
});

// Handle 404 errors - for any undefined routes
router.use((req, res, next) => {
  next(new NotFoundError("Page not found!"));
});

module.exports = router;
