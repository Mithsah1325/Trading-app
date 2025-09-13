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
