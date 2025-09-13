// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  cash: {
    type: Number,
    default: 100000
  },
  portfolioValue: {
    type: Number,
    default: 100000
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);