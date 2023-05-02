require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwt_middleware = function (req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        res
          .status(403)
          .send({ success: false, message: "Error! Token was not provided." });
      }
      const user_data_decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.data = user_data_decoded;
      next();
    } catch (err) {
      res
        .status(403)
        .send({ message: "wrong token." + err, data: [], success: false });
    }
    next();
  };

  module.exports = jwt_middleware;