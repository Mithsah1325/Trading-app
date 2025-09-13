// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://mithsah1325:mithsah1325@trading.caumabm.mongodb.net/?retryWrites=true&w=majority&appName=trading', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Import models
const Event = require('./models/Events');
const Trade = require('./models/Trade');
const Leaderboard = require('./models/Leaderboard');
const User = require('./models/User');

// Game state
let gameState = {
  currentPrice: 100,
  impliedVolatility: 0.5,
  time: 0
};

// Event types
const eventTypes = [
  {
    type: "TWEET",
    text: "Reddit rumor: STONKZ going to the moon 🚀 — IV up 40%",
    effect: { price: 0.15, iv: 0.4 }
  },
  {
    type: "CEO",
    text: "CEO posts meme of a doge 🐶 — stock +15% in 10 seconds",
    effect: { price: 0.15, iv: 0.2 }
  },
  {
    type: "SEC",
    text: "SEC inquiry leaked — stock -20%, IV explosion",
    effect: { price: -0.20, iv: 0.6 }
  },
  {
    type: "SHORT",
    text: "Hedge funds doubling down on short positions 📉",
    effect: { price: -0.10, iv: 0.3 }
  },
  {
    type: "GAMMA",
    text: "Gamma squeeze incoming! 🚀🚀🚀",
    effect: { price: 0.25, iv: 0.5 }
  }
];

// Start the game loop
setInterval(() => {
  // Random walk for price
  const randomChange = (Math.random() - 0.5) * gameState.impliedVolatility * 2;
  gameState.currentPrice *= (1 + randomChange);
  gameState.time += 1;
  
  // Emit price update
  io.emit('priceUpdate', {
    price: gameState.currentPrice,
    time: gameState.time
  });
}, 1000);

// Random events
setInterval(() => {
  if (Math.random() > 0.7) { // 30% chance of event
    const event = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    
    // Apply event effects
    gameState.currentPrice *= (1 + event.effect.price);
    gameState.impliedVolatility += event.effect.iv;
    
    // Clamp IV between 0.1 and 2.0
    gameState.impliedVolatility = Math.max(0.1, Math.min(2.0, gameState.impliedVolatility));
    
    // Save event to DB
    const newEvent = new Event({
      type: event.type,
      text: event.text,
      effect: event.effect,
      timestamp: new Date()
    });
    newEvent.save();
    
    // Emit event to all clients
    io.emit('marketEvent', {
      type: event.type,
      text: event.text,
      effect: event.effect
    });
  }
}, 15000); // Every 15 seconds

// Socket connections
io.on('connection', (socket) => {
  console.log('User connected');
  
  // Send initial game state
  socket.emit('initialState', gameState);
  
  // Handle trades
  socket.on('placeTrade', async (tradeData) => {
    // Calculate premium using Black-Scholes approximation
    const premium = calculateOptionPrice(
      gameState.currentPrice,
      tradeData.strike,
      gameState.impliedVolatility,
      (tradeData.expiry - gameState.time) / 100 // Time to expiration in "days"
    );
    
    // Save trade to DB
    const newTrade = new Trade({
      userId: tradeData.userId,
      stock: "STONKZ",
      optionType: tradeData.optionType,
      strike: tradeData.strike,
      expiry: tradeData.expiry,
      contracts: tradeData.contracts,
      premium: premium,
      status: "OPEN",
      openPrice: premium
    });
    
    await newTrade.save();
    
    // Update user's portfolio and leaderboard
    updateLeaderboard(tradeData.userId);
    
    // Confirm trade to client
    socket.emit('tradeConfirmation', newTrade);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Black-Scholes approximation for option pricing
function calculateOptionPrice(spot, strike, volatility, timeToExpiry) {
  // Simplified calculation for demo purposes
  const intrinsicValue = Math.max(0, spot - strike);
  const timeValue = volatility * Math.sqrt(timeToExpiry) * spot * 0.4;
  return intrinsicValue + timeValue;
}

// Update leaderboard
async function updateLeaderboard(userId) {
  // Calculate user's total PnL
  const userTrades = await Trade.find({ userId, status: "OPEN" });
  let totalPnL = 0;
  
  for (const trade of userTrades) {
    const currentPrice = calculateOptionPrice(
      gameState.currentPrice,
      trade.strike,
      gameState.impliedVolatility,
      (trade.expiry - gameState.time) / 100
    );
    totalPnL += (currentPrice - trade.openPrice) * trade.contracts * 100;
  }
  
  // Update leaderboard
  await Leaderboard.findOneAndUpdate(
    { userId },
    { netPnL: totalPnL, updatedAt: new Date() },
    { upsert: true, new: true }
  );
  
  // Emit leaderboard update
  const leaderboard = await Leaderboard.find().sort({ netPnL: -1 }).limit(10);
  io.emit('leaderboardUpdate', leaderboard);
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));