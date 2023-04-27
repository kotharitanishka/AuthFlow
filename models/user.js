const express = require("express");
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

// `UserModel` is a "Model", a subclass of `mongoose.Model`.
const UserModel = mongoose.model(
  "User",
  new Schema({
    name: String,
    password: String,
    email: {
      type: String,
      unique: true,
    },
  })
);
// You can use a Model to create new documents using `new`:

module.exports = UserModel;
