// models/User.js
const mongoose = require('mongoose');

// Define the schema for a User
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create the model for User
const User = mongoose.model('User', UserSchema);

module.exports = User;