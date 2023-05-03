const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const validateEmail = function(email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const users = mongoose.model(
  "User",
  new Schema({
    name: String,
    password: String,
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: [validateEmail, "Please enter a valid email"],
      unique: [true , "User already exists , please login"],
    },
  })
);

module.exports = users;
