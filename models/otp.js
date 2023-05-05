const mongoose = require("mongoose");
const validateEmail = require("../utils/common")
var Schema = mongoose.Schema;

const otp = mongoose.model(
  "otp_collection",
  new Schema({
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '2m' },
      },
    otp : Number,
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: [validateEmail, "Please enter a valid email"],
      unique: [true , "User already exists , please login"],
    },
  })
);

module.exports = otp;