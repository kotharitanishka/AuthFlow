const express = require("express");
const mongoose = require("mongoose");
const users = require("./models/user");
const bcrypt = require("bcrypt");
require('dotenv').config();
const app = express();
const port = 3000;
app.use(express.json());

mongoose
  .connect(
    process.env.URL
  )
  .then(() => {
    console.log("connect: success");
  });

app.post("/login", async(req, res) => {
  console.log(req.body);
  try {
    const doc = await users.findOne({ email: req.body["email"] });
    if (doc == null) {
    res.send({ message: "login failed : user does not exist . please signup.", data: [], success: false });
    }
    else {
      bcrypt.compare(req.body["password"], doc['password'], function(err, result) {
        if (result == true){
          res.send({ message: "login", data: [], success: true });
        }
        else {
          res.send({ message: "login failed : wrong password.", data: [], success: false });
        }
      });
    }
  } catch (err) {
    console.log("Error during record insertion : " + err);
    res.send({ message: "login failed .", data: [], success: false });
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
      res.send({ message: "signup", data: [], success: true });
      console.log(doc);
    } catch (err) {
      console.log("Error during record insertion : " + err);
      res.send({ message: "signup failed : user already exists . please login.", data: [], success: false });
    }
  });
});

app.get("/", (req, res) => {
  res.send({ message: "welcome", data: [], success: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});