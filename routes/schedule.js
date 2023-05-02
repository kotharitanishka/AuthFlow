const express = require('express');
const jwt_middleware = require("../utils/middleware")

const {
    home,
    welcome
  } = require("../controllers/schedule");

const router = express.Router();

router.get("/home", jwt_middleware, home);
router.get("/", welcome);

module.exports = router;