// models/Event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  effect: {
    price: Number,
    iv: Number
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', EventSchema);