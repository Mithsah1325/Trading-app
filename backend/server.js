import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import fetch from 'node-fetch';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// =======================
// OpenAI + YouTube API
// =======================
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const YT_API_KEY = process.env.YT_API_KEY;

// =======================
// MongoDB Setup
// =======================
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/tradingChallenge")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// =======================
// User Schema
// =======================
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  balance: { type: Number, default: 10000 },
  currentWeek: { type: Number, default: 1 },
  currentTask: { type: Number, default: 0 },
  history: [
    {
      week: Number,
      taskId: Number,
      choice: String,
      correct: Boolean,
      balanceAfter: Number,
    },
  ],
});

const User = mongoose.model("User", userSchema);

// =======================
// Auth Middleware
// =======================
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// =======================
// Week-Based Tasks
// =======================
const weeks = [
  {
    week: 1,
    tasks: [
      { id: 1, headline: "Week 1: Market Basics", choices: ["Buy Put", "Sell Put", "Short Call Spread", "Stay Neutral"], bestChoice: "Buy Put" },
      { id: 2, headline: "Week 1: Risk Awareness", choices: ["Invest All", "Diversify", "Ignore Market", "Random Choice"], bestChoice: "Diversify" },
    ],
  },
  {
    week: 2,
    tasks: [
      { id: 3, headline: "Week 2: Advanced Strategies", choices: ["Long Call", "Short Put", "Straddle", "Stay Neutral"], bestChoice: "Straddle" },
      { id: 4, headline: "Week 2: Portfolio Management", choices: ["All In", "Diversify", "Ignore Risk", "Random Choice"], bestChoice: "Diversify" },
    ],
  },
  {
    week: 3,
    tasks: [
      { id: 5, headline: "Week 3: Expert Scenario", choices: ["Aggressive", "Moderate", "Conservative", "Neutral"], bestChoice: "Conservative" },
    ],
  },
];

// =======================
// Routes
// =======================

// Explain Term
app.post('/api/explain', async (req, res) => {
  const { term, definition, regenerate } = req.body;
  if (!term || !definition) return res.status(400).json({ error: 'Term and definition required.' });

  try {
    const prompt = regenerate
      ? `Explain ${term} in an even simpler, beginner-friendly way. Use a short example. Only give the example for this term.`
      : `Explain ${term} in ONE simple line and give a short beginner-friendly example. Only focus on this term.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an expert options trading teacher.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 200,
    });

    let simplifiedText = response.choices[0].message.content.trim();
    if (simplifiedText.includes('Example:')) simplifiedText = simplifiedText.split('Example:')[1].trim();
    res.json({ simplified: simplifiedText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate explanation.' });
  }
});

// YouTube Video
app.post('/api/video', async (req, res) => {
  const { term } = req.body;
  if (!term) return res.status(400).json({ error: 'Term required' });

  try {
    const query = encodeURIComponent(`${term} options trading explanation`);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${YT_API_KEY}&type=video&maxResults=1`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.items?.length > 0) {
      const videoId = data.items[0].id.videoId;
      res.json({ videoUrl: `https://www.youtube.com/embed/${videoId}` });
    } else {
      res.status(404).json({ error: 'No video found for this term' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch video' });
  }
});

// Quiz
app.get('/api/quiz', async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an options trading teacher creating a quiz for beginners (high school level).
Generate 5 multiple-choice questions (4 options each) about options trading.
Output ONLY valid JSON array, no extra text.`
        },
      ],
      max_tokens: 600,
    });

    let quizText = response.choices[0].message.content.trim();
    let quizData = [];
    const match = quizText.match(/\[.*\]/s);
    if (match) {
      try {
        const sanitized = match[0].replace(/,(\s*[\]}])/g, '$1'); // remove trailing commas
        quizData = JSON.parse(sanitized);
      } catch (err) {
        console.error("Sanitized parse failed:", err);
      }
    }

    if (!Array.isArray(quizData) || quizData.length === 0) {
      quizData = [
        { question: "What is a call option?", options: ["A bet on stock down", "A bet on stock up", "A bond", "Savings account"], correct: 1, explanation: "Call option gives the holder the right to buy a stock at a specific price." },
        { question: "What does 'strike price' mean?", options: ["Price you pay for option", "Price to buy stock", "Stock dividend", "Broker fee"], correct: 1, explanation: "Strike price is the price at which the option holder can buy/sell." },
      ];
    }

    res.json({ questions: quizData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ questions: [] });
  }
});

// =======================
// Auth & Progress
// =======================

// Register
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();
    res.json({ message: "User registered" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "User already exists or invalid data" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: "Wrong password" });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, user });
});

// Current user
app.get("/api/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user);
});

// Save Progress (Week-Based)
app.post("/api/progress", authMiddleware, async (req, res) => {
  const { week, taskId, choice, correct } = req.body;
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const points = correct ? 100 : -50;
  user.balance = typeof user.balance === "number" ? user.balance + points : points;

  user.history.push({ week, taskId, choice, correct, balanceAfter: user.balance });

  // Move to next week if all tasks complete
  const tasksThisWeek = weeks.find(w => w.week === week)?.tasks.length || 0;
  const completedTasks = user.history.filter(h => h.week === week).length;
  if (completedTasks >= tasksThisWeek) user.currentWeek = week + 1;

  user.currentTask = taskId;
  await user.save();
  res.json(user);
});

// Leaderboard
app.get("/api/leaderboard", async (req, res) => {
  const users = await User.find({}, "name balance").sort({ balance: -1 }).limit(10);
  res.json(users);
});

// =======================
// Nodemailer: Send Congrats Email
// =======================
app.post("/api/congrats", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "🎉 Congratulations on Completing the Trading Challenge!",
    html: `<h1>Congratulations ${user.name}!</h1>
           <p>You have completed all trading challenges. Final balance: <b>$${user.balance}</b>.</p>
           <p>Keep up the great trading skills!</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Congratulations email sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
