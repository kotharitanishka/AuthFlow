const jwt_middleware = require("../utils/middleware")

const home =  (req, res) => {
  res.send({ message: "correct token.", data: req.data, success: true });
}

const welcome =  (req, res) => {
    res.send({ message: "welcome tk you have completesd the task successfully.", data: [], success: true });
  }

module.exports = {home , welcome}; 