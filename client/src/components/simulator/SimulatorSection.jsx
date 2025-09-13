import React, { useState, useEffect } from 'react';
import SimulatorControls from './SimulatorControls';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Area } from 'recharts';
import { blackScholesPrice, blackScholesGreeks } from '../../utils/blackScholes';
import SimulatorResult from './SimulatorResult';

const SimulatorSection = () => {
  const [selectedStock, setSelectedStock] = useState({ symbol: 'AAPL', price: 150 });
  const [optionType, setOptionType] = useState('call');
  const [strikePrice, setStrikePrice] = useState(150);
  const [expiration, setExpiration] = useState(30);
  const [investment, setInvestment] = useState(100);
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [optionPrice, setOptionPrice] = useState(0);
  const [greeks, setGreeks] = useState({ delta: 0, theta: 0, vega: 0 });

  const stocks = [
    { symbol: 'AAPL', price: 150 },
    { symbol: 'TSLA', price: 200 },
    { symbol: 'NFLX', price: 400 },
    { symbol: 'GOOGL', price: 120 }
  ];

  const r = 0.01; // Risk-free rate 1%
  const sigma = 0.3; // Volatility 30%

  // Calculate option price & Greeks
  useEffect(() => {
    const T = expiration / 365;
    const price = blackScholesPrice({ S: selectedStock.price, K: strikePrice, T, r, sigma, type: optionType });
    const greeks = blackScholesGreeks({ S: selectedStock.price, K: strikePrice, T, r, sigma, type: optionType });

    setOptionPrice(price.toFixed(2));
    setGreeks({ 
      delta: greeks.delta.toFixed(2), 
      theta: greeks.theta.toFixed(2), 
      vega: greeks.vega.toFixed(2) 
    });

    generateChartData(selectedStock.price, strikePrice, optionType, T);
  }, [selectedStock, strikePrice, optionType, expiration]);

  const generateChartData = (S, K, type, T) => {
    const data = [];
    for (let price = S - 20; price <= S + 20; price += 1) {
      const payoff = type === 'call' ? Math.max(0, price - K) : Math.max(0, K - price);
      data.push({ stockPrice: price, payoff });
    }
    setChartData(data);
  };

  const simulateTrade = () => {
    const priceChange = (Math.random() - 0.5) * 20;
    const newPrice = selectedStock.price + priceChange;

    let optionValue = optionType === 'call' ? Math.max(0, newPrice - strikePrice) : Math.max(0, strikePrice - newPrice);
    const finalValue = optionValue * 100;
    const profitLoss = finalValue - investment;

    setResult({
      newPrice,
      profitLoss,
      profitable: profitLoss > 0,
      hint: optionValue > 0 ? "In-the-money ✅" : "Out-of-the-money 💡"
    });
  };

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Options Trading Simulator</h2>

      {/* Controls */}
      <SimulatorControls
        stocks={stocks}
        selectedStock={selectedStock}
        setSelectedStock={setSelectedStock}
        optionType={optionType}
        setOptionType={setOptionType}
        strikePrice={strikePrice}
        setStrikePrice={setStrikePrice}
        expiration={expiration}
        setExpiration={setExpiration}
        investment={investment}
        setInvestment={setInvestment}
        onSimulate={simulateTrade}
      />

      {/* Black-Scholes Price & Payoff */}
      <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
        <h4 className="text-xl font-bold mb-2 text-gray-800 text-center">Black-Scholes Price 💰: ${optionPrice}</h4>
        <p className="text-center text-gray-600 mb-4">
          Delta: {greeks.delta} | Theta: {greeks.theta} | Vega: {greeks.vega}
        </p>

        <h4 className="text-xl font-bold mb-4 text-gray-800 text-center">Payoff Curve 📊</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="stockPrice" label={{ value: "Stock Price", position: "insideBottomRight", offset: -5 }} />
            <YAxis label={{ value: "Payoff", angle: -90, position: "insideLeft" }} />
            <Tooltip formatter={(value) => `$${value}`} />
            <Line type="monotone" dataKey="payoff" stroke="#4f46e5" strokeWidth={3} dot={false} />
            <Area type="monotone" dataKey="payoff" stroke="#4f46e5" fill="url(#colorPayoff)" fillOpacity={0.2} />
            <defs>
              <linearGradient id="colorPayoff" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Simulation Result */}
      {result && (
        <>
          <SimulatorResult
            result={result}
            selectedStock={selectedStock}
            optionType={optionType}
            strikePrice={strikePrice}
          />

          {/* Show Real Trading Redirect ONLY if profitable */}
          {result.profitable && (
            <div className="mt-8 flex justify-center">
              <div
                className="bg-white text-black p-6 rounded-3xl cursor-pointer transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-2xl text-center w-full max-w-md border border-gray-200"
                onClick={() => window.open('https://www.fidelity.com/options-trading', '_blank')}
              >
                <div className="text-5xl mb-4 animate-bounce">🚀</div>
                <h3 className="text-2xl font-bold mb-2">Try Real Options Trading</h3>
                <p className="text-sm opacity-80">
                  Take your skills to the real market! Visit Fidelity's Options Trading Portal.
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SimulatorSection;
