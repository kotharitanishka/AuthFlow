const express = require('express');
const jwt_middleware = require("../utils/middleware")

const {
    signup,
    login,
    updatePass,
    forgotPass,
    resetPass
  } = require("../controllers/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/updatePass",  jwt_middleware ,updatePass);
router.post("/forgotPass", forgotPass);
router.post("/resetPass", resetPass);

module.exports = router;
