const express = require("express");
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const users = mongoose.model(
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

module.exports = users;
