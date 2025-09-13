const weeks = [
  {
    week: 1,
    tasks: [
      {
        id: 1,
        type: "scenario",
        headline: "Week 1: Market Basics",
        choices: ["Buy low, sell high", "Sell high, buy high", "Buy high, sell low"],
        bestChoice: "Buy low, sell high",
      },
      {
        id: 2,
        type: "quiz",
        question: "What is a call option?",
        options: ["Bet stock down", "Bet stock up", "Bond", "Savings account"],
        correctAnswer: "Bet stock up",
      },
    ],
  },
  {
    week: 2,
    tasks: [
      {
        id: 3,
        type: "scenario",
        headline: "Week 2: Risk Management",
        choices: ["Invest all at once", "Diversify", "Ignore market"],
        bestChoice: "Diversify",
      },
      {
        id: 4,
        type: "quiz",
        question: "What is strike price?",
        options: ["Price to buy stock", "Dividend", "Broker fee", "Interest"],
        correctAnswer: "Price to buy stock",
      },
    ],
  },
  // Add more weeks as needed
];

export default weeks;
