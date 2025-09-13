// client/src/data/tasks.js
const tasks = [
  {
    id: 1,
    title: "Earnings Report Drop",
    description: "A tech company announces earnings tomorrow. Options are priced with high implied volatility.",
    choices: ["Buy Call", "Sell Call", "Buy Put", "Sell Put"],
    profitLoss: { "Buy Call": -200, "Sell Call": 150, "Buy Put": 300, "Sell Put": -250 }
  },
  {
    id: 2,
    title: "Fed Interest Rate Decision",
    description: "Markets are nervous about the Fed raising rates.",
    choices: ["Long Call Spread", "Short Put", "Buy Straddle", "Do Nothing"],
    profitLoss: { "Long Call Spread": -100, "Short Put": 250, "Buy Straddle": -50, "Do Nothing": 0 }
  },
  {
    id: 3,
    title: "Meme Stock Frenzy",
    description: "A stock is trending on social media with crazy call buying.",
    choices: ["Join the hype (Buy Call)", "Sell Call", "Short Put", "Stay Out"],
    profitLoss: { "Join the hype (Buy Call)": -400, "Sell Call": 500, "Short Put": -250, "Stay Out": 50 }
  },
  {
    id: 4,
    title: "Oil Prices Surge",
    description: "OPEC cuts production, oil futures spike.",
    choices: ["Buy Call", "Buy Put", "Sell Straddle", "Do Nothing"],
    profitLoss: { "Buy Call": 300, "Buy Put": -200, "Sell Straddle": -150, "Do Nothing": 0 }
  },
  {
    id: 5,
    title: "Company Merger Rumors",
    description: "Rumors spread about a big acquisition.",
    choices: ["Buy Call", "Sell Call", "Buy Put", "Sell Straddle"],
    profitLoss: { "Buy Call": 400, "Sell Call": -200, "Buy Put": -100, "Sell Straddle": 250 }
  },
  {
    id: 6,
    title: "Tech Layoffs",
    description: "Big layoffs in a major tech company drag the sector lower.",
    choices: ["Buy Put", "Sell Put", "Short Call Spread", "Stay Neutral"],
    profitLoss: { "Buy Put": 350, "Sell Put": -250, "Short Call Spread": 150, "Stay Neutral": 0 }
  },
  {
    id: 7,
    title: "Earnings Beat",
    description: "A retailer smashes earnings expectations.",
    choices: ["Buy Call", "Sell Put", "Short Straddle", "Avoid Trade"],
    profitLoss: { "Buy Call": 250, "Sell Put": 200, "Short Straddle": -300, "Avoid Trade": 0 }
  },
  {
    id: 8,
    title: "Volatility Spike",
    description: "The VIX spikes on geopolitical tensions.",
    choices: ["Buy Straddle", "Sell Straddle", "Buy Call", "Stay Out"],
    profitLoss: { "Buy Straddle": 400, "Sell Straddle": -300, "Buy Call": 150, "Stay Out": 0 }
  },
  {
    id: 9,
    title: "Dividend Announcement",
    description: "A utility company announces a special dividend.",
    choices: ["Buy Call", "Sell Put", "Buy Covered Call", "Do Nothing"],
    profitLoss: { "Buy Call": 150, "Sell Put": 250, "Buy Covered Call": 200, "Do Nothing": 0 }
  },
  {
    id: 10,
    title: "Tech Conference Hype",
    description: "A company teases a product launch at a major tech event.",
    choices: ["Buy Call", "Buy Straddle", "Sell Call", "Stay Neutral"],
    profitLoss: { "Buy Call": 300, "Buy Straddle": 250, "Sell Call": -200, "Stay Neutral": 0 }
  },
  {
    id: 11,
    title: "Unexpected CEO Resignation",
    description: "The CEO of a Fortune 500 company steps down suddenly.",
    choices: ["Buy Put", "Sell Call", "Buy Straddle", "Hold Position"],
    profitLoss: { "Buy Put": 350, "Sell Call": 200, "Buy Straddle": 400, "Hold Position": -100 }
  },
  {
    id: 12,
    title: "Positive Drug Trial Results",
    description: "A biotech announces strong Phase 3 drug results.",
    choices: ["Buy Call", "Sell Put", "Short Straddle", "Stay Out"],
    profitLoss: { "Buy Call": 500, "Sell Put": 300, "Short Straddle": -350, "Stay Out": 0 }
  },
  {
    id: 13,
    title: "Regulatory Crackdown",
    description: "Government announces stricter regulations on fintech.",
    choices: ["Buy Put", "Sell Call", "Buy Straddle", "Avoid Trade"],
    profitLoss: { "Buy Put": 400, "Sell Call": 200, "Buy Straddle": 350, "Avoid Trade": 0 }
  },
  {
    id: 14,
    title: "Holiday Shopping Boom",
    description: "Holiday sales smash expectations.",
    choices: ["Buy Call", "Sell Put", "Covered Call", "Stay Neutral"],
    profitLoss: { "Buy Call": 300, "Sell Put": 200, "Covered Call": 250, "Stay Neutral": 0 }
  },
  {
    id: 15,
    title: "Geopolitical Tension",
    description: "Markets tumble after geopolitical escalation.",
    choices: ["Buy Put", "Sell Put", "Buy Straddle", "Do Nothing"],
    profitLoss: { "Buy Put": 450, "Sell Put": -200, "Buy Straddle": 350, "Do Nothing": 0 }
  }
];

export default tasks;
