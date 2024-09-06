const express = require("express");
const checkJwt = require("../middleware/checkJwt");
const { NotFoundError } = require("../utils/customError");

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.send("Public Endpoint");
  } catch (ex) {
    next(ex);
  }
});

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
