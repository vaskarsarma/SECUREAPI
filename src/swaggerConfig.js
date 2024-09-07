const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

// Swagger JSDoc options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sample Protected API",
      version: "1.0.0",
      description:
        "A simple, modularized protected endpoints using Auth0 Access Token",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      responses: {
        UnauthorizedError: {
          description: "Authentication information is missing or invalid",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string", example: "401" },
                  message: { type: "string", example: "Unauthorized" },
                },
              },
            },
          },
        },
        NotFoundError: {
          description: "The requested resource could not be found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string", example: "404" },
                  message: { type: "string", example: "Not Found" },
                },
              },
            },
          },
        },
        InternalServerError: {
          description: "An internal server error occurred",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string", example: "500" },
                  message: { type: "string", example: "Internal Server Error" },
                },
              },
            },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  // Files with JSDoc comments
  apis: [path.join(__dirname, "./routes/*.js")],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = (app) => {
  // Serve Swagger UI
  app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Route to serve Swagger JSON specification
  app.get("/api.json", (req, res) => {
    res.json(swaggerSpec); // Send the JSON spec as a response
  });
};
