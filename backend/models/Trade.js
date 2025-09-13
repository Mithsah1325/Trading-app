// models/Trade.js
const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  stock: {
    type: String,
    default: "STONKZ"
  },
  optionType: {
    type: String,
    enum: ['CALL', 'PUT'],
    required: true
  },
  strike: {
    type: Number,
    required: true
  },
  expiry: {
    type: Number, // Game time when option expires
    required: true
  },
  contracts: {
    type: Number,
    required: true
  },
  premium: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['OPEN', 'CLOSED'],
    default: 'OPEN'
  },
  openPrice: {
    type: Number,
    required: true
  },
  currentPrice: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Trade', TradeSchema);