const express = require("express");
const apiRoutes = require("./routes/api");
const errorHandler = require("./middleware/errorHandler");
const initSwagger = require("./swaggerConfig");

const app = express();

require("dotenv").config();

const port = process.env.PORT || 7070;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Initialize Swagger
initSwagger(app);

app.use("/", apiRoutes);

// Error handling for 404 and others
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/api`);
  console.log(`Swagger JSON available at http://localhost:${port}/api.json`);
});
