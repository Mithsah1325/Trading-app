import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import fetch from 'node-fetch';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// =======================
// AI + YT API Setup
// =======================
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const YT_API_KEY = process.env.YT_API_KEY;

// =======================
// DB Setup (MongoDB)
// =======================
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/tradingChallenge", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // change in prod

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  balance: { type: Number, default: 10000 },
  currentTask: { type: Number, default: 0 },
  history: [
    {
      taskId: Number,
      choice: String,
      profitLoss: Number,
      balanceAfter: Number,
    },
  ],
});

const User = mongoose.model("User", userSchema);

// =======================
// Middleware
// =======================
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("No token provided");

  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
};

// =======================
// Your Existing Routes
// =======================

// Simplified Explanation
app.post('/api/explain', async (req, res) => {
  const { term, definition, regenerate } = req.body;
  if (!term || !definition)
    return res.status(400).json({ error: 'Term and definition required.' });

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
    if (simplifiedText.includes('Example:')) {
      simplifiedText = simplifiedText.split('Example:')[1].trim();
    }

    res.status(200).json({ simplified: simplifiedText });
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
      res.status(200).json({ videoUrl: `https://www.youtube.com/embed/${videoId}` });
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
Each question must include: question, options (array of 4 strings), correct (0-3), and a short explanation.
Output ONLY valid JSON array. Example:

[
  {
    "question": "...",
    "options": ["...","...","...","..."],
    "correct": 0,
    "explanation": "..."
  }
]`,
        },
      ],
      max_tokens: 600,
    });

    let quizText = response.choices[0].message.content.trim();
    let quizData = [];

    try {
      quizData = JSON.parse(quizText);
    } catch {
      const match = quizText.match(/\[.*\]/s);
      if (match) {
        try {
          quizData = JSON.parse(match[0]);
        } catch (err) {
          console.error("Failed to parse extracted JSON:", err);
        }
      }
    }

    if (!Array.isArray(quizData)) quizData = [];

    res.status(200).json({ questions: quizData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ questions: [] });
  }
});

// =======================
// New Auth + Progress Routes
// =======================

// Register
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = new User({ name, email, password: hashed });
    await user.save();
    res.json({ message: "User registered" });
  } catch (err) {
    res.status(400).send("User already exists");
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).send("Wrong password");

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, user });
});

// Get Current User
app.get("/api/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user);
});

// Save Progress
app.post("/api/progress", authMiddleware, async (req, res) => {
  const { taskId, choice, profitLoss } = req.body;
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).send("User not found");

  user.balance += profitLoss;
  user.currentTask = taskId + 1;
  user.history.push({
    taskId,
    choice,
    profitLoss,
    balanceAfter: user.balance,
  });
  await user.save();

  res.json(user);
});

// Leaderboard
app.get("/api/leaderboard", async (req, res) => {
  const users = await User.find({}, "name balance").sort({ balance: -1 }).limit(10);
  res.json(users);
});

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
