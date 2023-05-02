const mongoose = require('mongoose');
require("dotenv").config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error(`Error while connecting to MongoDB: `, error.message);
  }
};

module.exports = connectToDB;
