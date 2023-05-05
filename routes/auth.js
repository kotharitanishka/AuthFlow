const express = require('express');
const jwt_middleware = require("../utils/middleware")

const {
    signup,
    login,
    updatePass
  } = require("../controllers/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/updatePass",  jwt_middleware ,updatePass);

module.exports = router;
