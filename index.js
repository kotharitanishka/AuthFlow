const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const users = require("./models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const app = express();
const port = 3000;
app.use(express.json());

mongoose.connect(process.env.URL).then(() => {
  console.log("connect: success");
});

app.post("/login", async (req, res) => {
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
                { expiresIn: "1h" }
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
});

app.post("/signup", (req, res) => {
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
      try {
        token = jwt.sign(
          { name: req.body["name"], email: req.body["email"] },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.send({
          message: "signup",
          data: [{ token: token }],
          success: true,
        });
      } catch (err) {
        res.send({
          message: "signup failed ." + err,
          data: [],
          success: false,
        });
      }
    } catch (err) {
      res.send({
        message: "signup failed : user already exists . please login." + err,
        data: [],
        success: false,
      });
    }
  });
});

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

app.get("/home", jwt_middleware, (req, res) => {
  res.send({ message: "correct token.", data: [], success: true });
});

app.get("/", jwt_middleware, (req, res) => {
  res.send({ message: "welcome", data: [], success: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
