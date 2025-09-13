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

export default weeks;
