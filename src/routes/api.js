const express = require("express");
const checkJwt = require("../middleware/checkJwt");
const { NotFoundError } = require("../utils/customError");

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Public Endpoint
 *     description: This endpoint is publicly accessible and returns a simple message.
 *     tags: [Public Endpoints]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Public Endpoint
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/", (req, res, next) => {
  try {
    res.send("Public Endpoint");
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
  try {
    // res.send(`I am acessing one Protected Endpoint. Hello, ${req.user.sub}!`);
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
