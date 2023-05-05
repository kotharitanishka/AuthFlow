const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = require("../models/user");
const sendEmail = require("../utils/mailer");

const login = async (req, res) => {
  try {
    const doc = await users.findOne({ email: req.body["email"] });
    if (doc == null) {
      res.send({
        message: "login failed : user does not exist . please signup.",
        data: [],
        success: false,
      });
    } else {
      bcrypt.compare(
        req.body["password"],
        doc["password"],
        function (err, result) {
          if (result == true) {
            let token;
            try {
              token = jwt.sign(
                { name: req.body["name"], email: req.body["email"] },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
              );
              res.send({
                message: "login",
                data: [{ token: token }],
                success: true,
              });
            } catch (err) {
              res.send({
                message: "login failed ." + err,
                data: [],
                success: false,
              });
            }
          } else {
            res.send({
              message: "login failed : wrong password.",
              data: [],
              success: false,
            });
          }
        }
      );
    }
  } catch (err) {
    res.send({ message: "login failed ." + err, data: [], success: false });
  }
};

const signup = (req, res) => {
  console.log(req.body);
  bcrypt.hash(req.body["password"], 10, async (err, hash) => {
    console.log(hash);
    const userDoc = new users({
      name: req.body["name"],
      password: hash,
      email: req.body["email"],
    });
    try {
      const doc = await userDoc.save({});
      let token;
      token = jwt.sign(
        { name: req.body["name"], email: req.body["email"] },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      sendEmail(req.body["email"], req.body["name"]);
      res.send({
        message: "signup",
        data: [{ token: token }],
        success: true,
      });
    } catch (err) {
      res.send({
        message: "signup failed : please login. " + err,
        data: [],
        success: false,
      });
    }
  });
};

const updatePass = async (req, res) => {
  try {
    const check = await users.findOne({ email: req.data["email"] });
    bcrypt.compare(req.body["newPass"], check.password, function (err, result) {
      if (result == false) {
        bcrypt.hash(req.body["newPass"], 10, async (err, hash) => {
          await users.updateOne(
            { email: req.data["email"] },
            { password: hash },
            {
              returnOriginal: false,
            }
          );
          res.send({
            message: "password update successful. ",
            data: [],
            success: true,
          });
        });
      } else {
        res.send({
          message:
            "password update failed . new password and old password cannot be same",
          data: [],
          success: false,
        });
      }
    });
  } catch (err) {
    res.send({
      message: "password update failed . " + err,
      data: [],
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
  updatePass,
};
