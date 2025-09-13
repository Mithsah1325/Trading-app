export const questions = [
  {
    question: "What gives you the right to BUY a stock at a specific price?",
    options: ["Call Option", "Put Option", "Stock Certificate", "Bond"],
    correct: 0,
    explanation: "A call option gives you the right (but not obligation) to buy a stock at a predetermined price."
  },
  {
    question: "If you think a stock price will go DOWN, which option would you buy?",
    options: ["Call Option", "Put Option", "Both", "Neither"],
    correct: 1,
    explanation: "Put options increase in value when the underlying stock price decreases."
  },
  {
    question: "What's the maximum you can lose when buying an option?",
    options: ["Unlimited", "The strike price", "The premium you paid", "Nothing"],
    correct: 2,
    explanation: "When buying options, you can only lose the premium you paid upfront - never more."
  },
  {
    question: "What happens to an option on its expiration date if it's out-of-the-money?",
    options: ["It becomes more valuable", "It expires worthless", "It automatically exercises", "It gets extended"],
    correct: 1,
    explanation: "Options that are out-of-the-money at expiration have no intrinsic value and expire worthless."
  }
];