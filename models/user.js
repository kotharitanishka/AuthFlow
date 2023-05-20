const mongoose = require("mongoose");
const validateEmail = require("../utils/common")
var Schema = mongoose.Schema;

const users = mongoose.model(
  "User",
  new Schema({
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: [validateEmail, "Please enter a valid email"],
      unique: [true , "User already exists , please login"],
    },
  })
);

module.exports = users;
