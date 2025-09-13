// models/Leaderboard.js
const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  netPnL: {
    type: Number,
    default: 0
  },
  rank: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);